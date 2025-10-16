import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Card,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
  Button,
  InputBase,
  Skeleton,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { Add, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import FilterPanel from 'components/FilterPanel';
import SearchIcon from '@mui/icons-material/Search';
import AntSwitch from 'components/AntSwitch';
import { postApi, getApi, updateApi } from 'common/apiClient';
import { urls } from 'common/urls';
import toast from 'react-hot-toast';
import { IconTrash, IconPencil } from '@tabler/icons';
import CommonConfirmDialog from '../../components/deleteDialog';

const defaultTabTypes = [
  'Form Types',
  'Contact Types',
  'Referral Types',
  'Contact Purpose',
  'Key Indicators',
  'Payment Method',
  'Archive Reason',
  'Campaign',
  'Location',
  'Reason',
  'Service Types',
  'Product',
  'Currency'
];

const TabbedDataGrid = () => {
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [toggleValue, setToggleValue] = useState(true);
  const [configurationNameFilter, setConfigurationNameFilter] = useState('');
  const [modalSection, setModalSection] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState('');
  const [tabData, setTabData] = useState({});
  const [showFilter, setShowFilter] = useState(true);
  const [inputError, setInputError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 100
  });
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const [expandedPanels, setExpandedPanels] = useState(() => {
    const initialExpanded = {};
    defaultTabTypes.forEach((type, index) => {
      if (index < 6) {
        initialExpanded[type] = true;
      }
    });
    return initialExpanded;
  });

  const handleAccordionChange = (panel) => () => {
    setExpandedPanels((prev) => ({
      ...prev,
      [panel]: !prev[panel]
    }));
  };

  const handleEdit = (item) => {
    setInputValue(item.name);
    setToggleValue(item.status);
    setEditMode(true);
    setEditId(item.id);
    const sectionName = Object.entries(tabData).find(([_, items]) => items.some((configItem) => configItem.id === item.id))?.[0];
    setModalSection(sectionName);
    setOpenModal(true);
  };
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };
  const handleConfirmDelete = async () => {
    await updateApi(urls.configuration.delete.replace(':configId', selectedId));
    await fetchConfigurations();
    toast.success('Item deleted successfully!');
    setConfirmOpen(false);
    setSelectedId(null);
  };

  const handleOpenModal = (section) => {
    setModalSection(section);
    setInputValue('');
    setToggleValue(true);
    setEditMode(false);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setInputValue('');
    setToggleValue(true);
    setEditMode(false);
    setEditId(null);
    setInputError('');
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const configTypeFilter = useMemo(() => {
    return defaultTabTypes.map((type) => ({
      value: type,
      label: type
    }));
  }, []);

  const statusFilter = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const fetchConfigurations = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: paginationModel.page,
        limit: paginationModel.pageSize,
        search: searchQuery,
        status: status === 'active' ? 'true' : status === 'inactive' ? 'false' : '',
        configurationType: configurationNameFilter
      });

      const response = await getApi(`${urls.configuration.fetchWithPagination}?${queryParams.toString()}`);
      const allUser = response?.data?.data || [];
      const grouped = {};
      if (configurationNameFilter) {
        grouped[configurationNameFilter] = [];
      } else {
        defaultTabTypes.forEach((type) => {
          grouped[type] = [];
        });
      }
      allUser?.forEach((item) => {
        const type = item.configurationType;
        if (!grouped[type]) {
          grouped[type] = [];
        }
        grouped[type].push({
          id: item._id,
          name: item.name,
          status: item.isActive
        });
      });
      setTabData(grouped);
    } catch (error) {
      toast.error('Error fetching configurations');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleFilter = () => {
    setPaginationModel((prev) => ({
      ...prev,
      page: 1
    }));
    fetchConfigurations();
  };

  useEffect(() => {
    fetchConfigurations();
  }, [paginationModel.page, paginationModel.pageSize, configurationNameFilter, status, searchQuery]);

  const validateInput = (value) => {
    if (!value) {
      setInputError('This field is required');
      return false;
    }
    if (value.length < 1 || value.length > 50) {
      setInputError('Length must be between 1 and 50 characters');
      return false;
    }
    setInputError('');
    return true;
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    validateInput(value);
  };

  const handleSaveConfiguration = async () => {
    setLoading(true);
    if (!validateInput(inputValue)) {
      return;
    }
    const payload = {
      name: inputValue,
      isActive: toggleValue,
      configurationType: modalSection
    };
    try {
      if (editMode) {
        await updateApi(urls.configuration.updatedData.replace(':configId', editId), payload);
        toast.success('Item updated successfully!');
      } else {
        await postApi(urls.configuration.create, payload);
        toast.success('Item added successfully!');
      }
      fetchConfigurations();
      handleCloseModal();
      setEditMode(false);
      setEditId(null);
      setLoading(false);
    } catch (err) {
      toast.error('Error saving configuration.');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (itemId, newStatus) => {
    try {
      const payload = {
        isActive: newStatus
      };
      const url = `${urls.configuration.updateStatus.replace(':configId', itemId)}`;
      const res = await updateApi(url, payload);
      if (res?.data) {
        setTabData((prevData) => {
          const newData = { ...prevData };
          for (const type in newData) {
            const idx = newData[type].findIndex((item) => item.id === itemId);
            if (idx !== -1) {
              newData[type][idx] = { ...newData[type][idx], status: newStatus };
              break;
            }
          }
          return newData;
        });
        const statusMessage = newStatus ? 'Active' : 'Inactive';
        toast.success(`Status updated to ${statusMessage}`);
      }
    } catch (error) {
      toast.error('Error updating status');
    }
  };

  const headerContent = (section, loading, handleOpenModal, showAddIcon = true) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
      {loading ? (
        <Skeleton variant="text" width="60%" height={28} />
      ) : (
        <Typography variant="h6" fontWeight="500">
          {section}
        </Typography>
      )}
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          handleOpenModal(section);
        }}
        sx={{
          backgroundColor: '#41C048',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          color: 'white',
          '&:hover': { backgroundColor: '#41C048' }
        }}
      >
        <Add sx={{ fontSize: 16 }} />
      </IconButton>
    </Box>
  );

  const cardBodyContent = (
    items,
    loading,
    handleStatusUpdate,
    handleEdit,
    handleDeleteClick,
    confirmOpen,
    setConfirmOpen,
    handleConfirmDelete
  ) => (
    <>
      <Box sx={{ px: 2, py: 1, backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
        {loading ? (
          <Skeleton variant="text" width="80%" height={20} />
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flex: 2 }}>
              <Typography variant="subtitle2" fontWeight="medium">
                Name
              </Typography>
            </Box>
            <Box sx={{ flex: 2 }}>
              <Typography variant="subtitle2" fontWeight="medium">
                Status
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" fontWeight="medium">
                Action
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      <Box sx={{ px: 2, py: 1, overflowY: 'auto', flexGrow: 1 }}>
        {loading ? (
          [...Array(3)].map((_, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ flex: 2 }}>
                <Skeleton variant="text" width="60%" height={20} />
              </Box>
              <Box sx={{ flex: 2 }}>
                <Skeleton variant="circular" width={24} height={24} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="40%" height={20} />
              </Box>
            </Box>
          ))
        ) : items.length > 0 ? (
          items.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1,
                pb: 1,
                borderBottom: '1px solid #f0f0f0',
                flexWrap: 'wrap'
              }}
            >
              <Box sx={{ flex: 2, pr: 2 }}>
                <Typography
                  sx={{
                    minWidth: 0,
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {item.name}
                </Typography>
              </Box>
              <Box sx={{ flex: 2 }}>
                <AntSwitch checked={item.status} onChange={(e) => handleStatusUpdate(item.id, e.target.checked)} />
              </Box>
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <IconButton onClick={() => handleEdit(item)}>
                  <IconPencil color="orangered" size={18} />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(item.id)}>
                  <IconTrash color="orangered" size={18} />
                </IconButton>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No items found
          </Typography>
        )}
      </Box>
    </>
  );

  return (
    <>
      <CommonConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        content="Are you sure you want to delete ?"
        title="⚠️ Delete"
        confirmText="Delete"
        cancelText="Cancel"
      />
      <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
        <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">
          Configurations
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f8f9fa',
            borderRadius: '30px',
            paddingLeft: '16px',
            border: '1px solid #e0e0e0',
            width: '489px',
            height: '40px'
          }}
        >
          <InputBase
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleFilter();
              }
            }}
            sx={{
              '& .MuiInputBase-input::placeholder': {
                fontSize: '12 px',
                opacity: 1
              },
              '& .MuiInputBase-input': {
                fontSize: '14px'
              },
              '& .MuiInputLabel-root': {
                fontSize: '13px'
              },
              '& .MuiInputBase-root.Mui-focused': {
                backgroundColor: '#e0e0e0'
              },
              flex: 1,
              color: 'text.primary'
            }}
          />
          <IconButton
            onClick={handleFilter}
            sx={{
              marginRight: '8px',
              width: 18,
              height: 18,
              cursor: 'pointer'
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </Stack>
      <Grid container spacing={2}>
        <FilterPanel
          showFilter={showFilter}
          statuses={statusFilter}
          configurationNames={configTypeFilter}
          configurationNameFilter={configurationNameFilter}
          setConfigurationNameFilter={(val) => {
            setConfigurationNameFilter(val);
            setPaginationModel((prev) => ({ ...prev, page: 1 }));
          }}
          statusFilter={status}
          setStatusFilter={(val) => {
            setStatus(val);
            setPaginationModel((prev) => ({ ...prev, page: 1 }));
          }}
          selectedFilters={['configurationNameFilter', 'statusFilter']}
          onReset={() => {
            setConfigurationNameFilter('');
            setStatus('');
            setSearchQuery('');
            setPaginationModel((prev) => ({ ...prev, page: 1 }));
            fetchConfigurations();
          }}
        />
        <Grid item xs={9}>
          <Grid container spacing={2}>
            {Object.entries(tabData).map(([section, items], index) => (
              <Grid item xs={12} sm={12} md={6} key={section}>
                <Accordion
                  expanded={!!expandedPanels[section]}
                  onChange={handleAccordionChange(section)}
                  sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    '&::before': { display: 'none' }
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      px: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    {headerContent(section, loading, handleOpenModal, !!expandedPanels[section])}
                  </AccordionSummary>

                  <AccordionDetails sx={{ p: 0 }}>
                    <Card
                      sx={{
                        p: 0,
                        border: 'none',
                        borderRadius: '0',
                        height: '200px',
                        overflowY: 'auto'
                      }}
                    >
                      {cardBodyContent(
                        items,
                        loading,
                        handleStatusUpdate,
                        handleEdit,
                        handleDeleteClick,
                        confirmOpen,
                        setConfirmOpen,
                        handleConfirmDelete
                      )}
                    </Card>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 420,
            height: 'auto',
            bgcolor: '#fff',
            p: 2,
            borderRadius: '8px',
            boxShadow: 24
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, mt: 1 }}>
            <TextField
              placeholder="New item"
              value={inputValue}
              onChange={handleInputChange}
              error={!!inputError}
              helperText={inputError}
              inputProps={{
                maxLength: 50,
                style: {
                  fontSize: '14px',
                  padding: '10px 12px'
                }
              }}
              sx={{
                width: '65%',
                '& .MuiInputBase-root': {
                  height: '40px',
                  fontSize: '14px'
                },
                '& .MuiOutlinedInput-input': {
                  padding: '0 12px'
                }
              }}
              variant="outlined"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%' }}>
              <Typography sx={{ fontSize: '14px', mb: 0.5, ml: 2 }}>Active Or Inactive?</Typography>
              <AntSwitch checked={toggleValue} onChange={(e) => setToggleValue(e.target.checked)} sx={{ ml: -10 }} />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mt: 4
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#053146',
                borderRadius: '8px',
                width: '35%',
                height: '30px',
                fontSize: '12px',
                textTransform: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': {
                  backgroundColor: '#031e2a'
                }
              }}
              disabled={loading}
              onClick={handleSaveConfiguration}
            >
              {loading ? 'Saving...' : 'SAVE CHANGES'}
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderColor: '#178df9',
                color: '#178df9',
                borderRadius: '8px',
                width: '25%',
                height: '30px',
                fontSize: '12px',
                textTransform: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': {
                  borderColor: '#b39ddb',
                  backgroundColor: '#f3e5f5'
                }
              }}
              onClick={handleCloseModal}
            >
              CANCEL
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default TabbedDataGrid;
