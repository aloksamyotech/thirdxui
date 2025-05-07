import React, { useState, useEffect, useMemo } from 'react';
import { Box, Card, Grid, IconButton, Modal, Stack, TextField, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import FilterPanel from 'components/FilterPanel';
import SearchIcon from '@mui/icons-material/Search';
import AntSwitch from 'components/AntSwitch';
import { postApi, getApi } from 'common/apiClient';
import { urls } from 'common/urls';

const defaultTabTypes = [
  'Contact Types',
  'Referral Types',
  'Contact Purpose',
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
  const [selectedSection, setSelectedSection] = useState('');
  const [status, setStatus] = useState('');
  const [tabData, setTabData] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);
  const [showFilter, setShowFilter] = useState(true);

  const handleOpenModal = (section) => {
    setSelectedSection(section);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setInputValue('');
    setToggleValue(true);
  };

  const configTypeFilter = useMemo(() => {
    return defaultTabTypes.map((type) => ({
      value: type,
      label: type
    }));
  }, []);

  const statusFilter = [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' }
  ];

  const fetchConfigurations = async () => {
    try {
      const res = await getApi(urls.configuration.fetch);
      const data = res?.data?.allConfiguration || [];

      const grouped = {};
      defaultTabTypes.forEach((type) => {
        grouped[type] = [];
      });

      data.forEach((item) => {
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
      console.error('Error fetching configurations:', error);
    }
  };

  useEffect(() => {
    fetchConfigurations();
  }, []);

  const handleSaveConfiguration = async () => {
    const payload = {
      name: inputValue,
      isActive: toggleValue,
      configurationType: selectedSection
    };

    try {
      const res = await postApi(urls.configuration.create, payload);
      console.log('Configuration added:', res.data);
      fetchConfigurations();
      handleCloseModal();
    } catch (err) {
      console.error('Error adding configuration:', err);
    }
  };

  const fetchFilteredConfigurations = async (type, statusFilterVal) => {
    try {
      let url = `${urls.configuration.filterType}?type=${type}`;
      if (statusFilterVal !== '') {
        url += `&status=${statusFilterVal}`;
      }

      if (!selectedSection) {
        url = `${urls.configuration.fetch}`;
      }

      const res = await getApi(url);
      const filteredData = res?.data || [];

      const grouped = {
        [type]: filteredData.map((item) => ({
          id: item._id,
          name: item.name,
          status: item.isActive
        }))
      };

      setTabData(grouped);
    } catch (error) {
      console.error('Error fetching filtered configurations:', error);
    }
  };

  useEffect(() => {
    if (selectedSection) {
      fetchFilteredConfigurations(selectedSection);
    }
  }, [selectedSection]);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
        <Typography variant="h4">Configurations</Typography>
        <TextField size="small" placeholder="Search..." InputProps={{ endAdornment: <SearchIcon /> }} sx={{ width: '350px' }} />
      </Stack>

      <Grid container spacing={2}>
        <FilterPanel
          showFilter={showFilter}
          statuses={statusFilter}
          configurationNames={configTypeFilter}
          configurationNameFilter={selectedSection}
          setConfigurationNameFilter={(val) => {
            if (val !== selectedSection) {
              setSelectedSection(val);
            }
          }}
          setStatusFilter={setStatus}
          selectedFilters={['configurationNameFilter', 'statusFilter']}
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
                      <Typography variant="subtitle1" fontWeight="bold">
                        {section}
                      </Typography>
                      <IconButton
                        onClick={() => handleOpenModal(section)}
                        sx={{
                          backgroundColor: '#41C048',
                          borderRadius: '50%',
                          width: '25px',
                          height: '25px',
                          boxShadow: 3,
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
                            borderBottom: '1px solid #f0f0f0'
                          }}
                        >
                          <Typography sx={{ flex: 1 }}>{item.name}</Typography>
                          <AntSwitch checked={item.status} />
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

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              bgcolor: 'white',
              p: 3,
              borderRadius: 2,
              boxShadow: 24
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Add to {selectedSection}
            </Typography>
            <TextField fullWidth label="New Item" value={inputValue} onChange={(e) => setInputValue(e.target.value)} sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="body1">Active?</Typography>
              <AntSwitch checked={toggleValue} onChange={(e) => setToggleValue(e.target.checked)} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button variant="contained" sx={{ background: '#053146' }} onClick={handleSaveConfiguration}>
                Save Changes
              </Button>
              <Button variant="outlined" color="error" onClick={handleCloseModal}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Grid>
    </>
  );
};

export default TabbedDataGrid;
