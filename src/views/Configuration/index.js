import React, { useState } from 'react';
import { Box, Card, Grid, IconButton, Modal, Stack, TextField, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import FilterPanel from 'components/FilterPanel';
import SearchIcon from '@mui/icons-material/Search';
import AntSwitch from 'components/AntSwitch';

const tabData = {
  'Contact Types': [
    { id: 1, name: 'Email', status: true },
    { id: 2, name: 'Phone text', status: true },
    { id: 3, name: 'Group sessions', status: true },
    { id: 4, name: 'Missed appointments', status: true }
  ],
  'Referral Types': [
    { id: 1, name: 'Family Member', status: true },
    { id: 2, name: 'Community Member', status: true },
    { id: 3, name: 'School', status: true },
    { id: 4, name: 'Self Referral', status: true }
  ],
  'Contact Purpose': [
    { id: 1, name: 'Newsletter', status: true },
    { id: 2, name: 'Upcoming Events', status: true },
    { id: 3, name: 'Professional Meetings', status: true }
  ],
  'Key Indicators': [
    { id: 1, name: 'Poor School Attendance and Engagement', status: true },
    { id: 2, name: 'School exclusion (temp or perm)', status: true },
    { id: 3, name: 'Not in education, training or work (NEET)', status: true },
    { id: 4, name: 'CAHMS', status: true },
    { id: 5, name: 'Child Criminal and Sexual Exploitation (CRE/ CSE)', status: true }
  ],
  'Payment Method': [
    { id: 1, name: 'Credit or Debit Card', status: true },
    { id: 2, name: 'Cash', status: true },
    { id: 3, name: 'ApplePay', status: true },
    { id: 4, name: 'Cheque', status: true }
  ],
  'Archive Reason': [
    { id: 1, name: 'Deceased', status: true },
    { id: 2, name: 'Gone Away', status: true }
  ],
  'Form Types': [
    { id: 1, name: 'Referral Form', status: true },
    { id: 12, name: 'Workshop Sign-up form', status: true }
  ],
  Reason: [
    { id: 1, name: 'By Request', status: true },
    { id: 2, name: 'Legitimate Interest', status: true },
    { id: 3, name: 'Deceased', status: true },
    { id: 4, name: 'Gone Away', status: true }
  ],
  'Service Types': [
    { id: 1, name: 'Education', status: true },
    { id: 2, name: 'Health', status: true },
    { id: 3, name: 'Mentoring', status: true },
    { id: 4, name: 'Groupwork', status: true },
    { id: 5, name: 'Sports', status: true },
    { id: 6, name: 'Arts and Culture', status: true },
    { id: 7, name: 'Social Programs', status: true }
  ]
};

const TabbedDataGrid = () => {
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [toggleValue, setToggleValue] = useState(true);
  const [selectedSection, setSelectedSection] = useState('');
  const [showFilter, setShowFilter] = useState(true);
  const [status, setStatus] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);

  const handleOpenModal = (section) => {
    setSelectedSection(section);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setInputValue('');
    setToggleValue(true);
  };

  const statusFilter = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
        <Typography variant="h4">Configurations</Typography>

        <TextField
          size="small"
          placeholder="Search..."
          InputProps={{
            endAdornment: <SearchIcon />
          }}
          sx={{ width: '350px' }}
        />
      </Stack>
      <Grid container spacing={2}>
        <FilterPanel
          showFilter={showFilter}
          statuses={statusFilter}
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
                          '&:hover': {
                            backgroundColor: '#41C048'
                          }
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
                    {items.map((item) => (
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
                    ))}
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
              <Button variant="contained" sx={{ background: '#053146' }} onClick={handleCloseModal}>
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
