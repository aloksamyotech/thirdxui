import React, { useState, useEffect, useMemo } from 'react';
import { Box, Card, Grid, IconButton, Modal, Stack, TextField, Typography, Button, InputBase } from '@mui/material';
import { Add } from '@mui/icons-material';
import FilterPanel from 'components/FilterPanel';
import SearchIcon from '@mui/icons-material/Search';
import AntSwitch from 'components/AntSwitch';
import { postApi, getApi, updateApi } from 'common/apiClient';
import { urls } from 'common/urls';
import toast from 'react-hot-toast';
import { IconTrash, IconPencil } from '@tabler/icons';
import CommonConfirmDialog from '../../components/deleteDialog';

const defaultTabTypes = [
  'Contact Types',
  'Referral Types',
  'Contact Purpose',
  'Campaign',
  'Location',
  'Key Indicators',
  'Payment Method',
  'Archive Reason',
  'Form Types',
  'Reason',
  'Service Types'
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
    if (!/^[A-Za-z0-9\s]+$/.test(value)) {
      setInputError('Only letters, numbers and spaces are allowed');
      return false;
    }
    if (value.length < 1 || value.length > 25) {
      setInputError('Length must be between 1 and 25 characters');
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
    } catch (err) {
      toast.error('Error saving configuration.');
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

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
        <Typography variant="h5">Configurations</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f8f9fa',
            borderRadius: '30px',
            paddingLeft: '16px',
            border: '1px solid #e0e0e0',
            width: '350px',
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
              flex: 1,
              color: 'text.primary'
            }}
          />
          <IconButton
            onClick={handleFilter}
            sx={{
              marginRight: '8px',
              width: 32,
              height: 32,
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
            {Object.entries(tabData).map(([section, items]) => (
              <Grid item xs={12} sm={6} md={4} key={section}>
                <Card
                  sx={{
                    p: 0,
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    height: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    sx={{
                      px: 2,
                      py: 1,
                      borderBottom: '1px solid #e0e0e0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Typography variant="h6" fontWeight="500">
                        {section}
                      </Typography>
                      <IconButton
                        onClick={() => handleOpenModal(section)}
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
                  </Box>
                  <Box sx={{ px: 2, py: 1, backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle2" fontWeight="medium">
                        Configuration
                      </Typography>
                      <Typography variant="subtitle2" fontWeight="medium">
                        Status
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ px: 2, py: 1, overflowY: 'auto', flexGrow: 1 }}>
                    {items.length > 0 ? (
                      items.map((item) => (
                        <Box
                          key={item.id}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 1,
                            pb: 1,
                            borderBottom: '1px solid #f0f0f0',
                            flexWrap: 'wrap'
                          }}
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              minWidth: 0,
                              wordBreak: 'break-word',
                              whiteSpace: 'pre-line',
                              pr: 2,
                              maxWidth: '60%'
                            }}
                          >
                            {item.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0, gap: 0.2 }}>
                            <AntSwitch checked={item.status} onChange={(e) => handleStatusUpdate(item.id, e.target.checked)} />
                            &nbsp;
                            <IconButton onClick={() => handleEdit(item)}>
                              <IconPencil color="orangered" size={18} />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteClick(item.id)}>
                              <IconTrash color="orangered" size={18} />
                            </IconButton>
                            <CommonConfirmDialog
                              open={confirmOpen}
                              onClose={() => setConfirmOpen(false)}
                              onConfirm={handleConfirmDelete}
                              content="Are you sure you want to delete ?"
                              title="⚠️ Delete"
                              confirmText="Delete"
                              cancelText="Cancel"
                            />
                          </Box>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No items found
                      </Typography>
                    )}
                  </Box>
                </Card>
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
                maxLength: 25,
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
              onClick={handleSaveConfiguration}
            >
              {editMode ? 'UPDATE' : 'SAVE CHANGES'}
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
