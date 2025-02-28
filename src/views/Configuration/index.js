import React, { useState } from 'react';
import { Tabs, Tab, Box, Switch, IconButton, Card, Modal, Typography, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete, Add } from '@mui/icons-material';

const tabLabels = [
  'Contact Types',
  'Referral Types',
  'Contact Purpose',
  'Key Indicator',
  'Archive Reason',
  'Payment Method',
  'Form Types',
  'Reason',
  'Service Types',
  'Locations'
];

const tabData = {
  'Contact Types': [
    { id: 1, name: 'Email', status: true },
    { id: 2, name: 'Phone text', status: true },
    { id: 3, name: 'Group sessions', status: true },
    { id: 4, name: 'Missed appointments', status: true },
    { id: 5, name: 'Bertha Heller', status: true },
    { id: 6, name: 'Note', status: true }
  ],
  'Referral Types': [
    { id: 1, name: 'Family Member', status: true },
    { id: 2, name: 'Community Member', status: true },
    { id: 3, name: 'Parent', status: true },
    { id: 4, name: 'School', status: true },
    { id: 5, name: 'Self Referral', status: true }
  ],
  'Contact Purpose': [
    { id: 1, name: 'Newsletter', status: true },
    { id: 2, name: 'Upcoming Events', status: true },
    { id: 3, name: 'Professional Meetings', status: true }
  ],
  'Key Indicator': [
    { id: 1, name: 'Poor School Attendance and Engagement', status: true },
    { id: 2, name: 'School Exclusion (temp or perm)', status: true },
    { id: 3, name: 'Not in education,trianing or work (NEET)', status: true },
    { id: 4, name: 'Parent', status: true },
    { id: 5, name: 'CAHMS', status: true },
    { id: 6, name: 'Social Service', status: true },
    { id: 7, name: 'Child Criminal and Sexual Exploitation (CRE/CSE)', status: true }
  ],
  'Archive Reason': [
    { id: 1, name: 'Deceased', status: true },
    { id: 2, name: 'Gone Away', status: true }
  ],
  'Payment Method': [
    { id: 1, name: 'Credit or Debit Card', status: true },
    { id: 2, name: 'Cash', status: true },
    { id: 3, name: 'Cheque', status: true },
    { id: 4, name: 'ApplePal', status: true }
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
  ],
  Locations: [
    { id: 1, name: 'Youth Center', status: true },
    { id: 12, name: 'Youth Center', status: true }
  ]
};

const columns = [
  { field: 'name', headerName: 'CONFIGURATION', flex: 1 },
  {
    field: 'status',
    headerName: 'STATUS',
    renderCell: (params) => <Switch defaultChecked={params.value} color="primary" />,
    flex: 1
  },
  {
    field: 'actions',
    headerName: 'DELETE/EDIT',
    headerAlign: 'right',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <IconButton color="error" size="small">
          <Delete sx={{ fontSize: '16px' }} />
        </IconButton>
        <IconButton color="error" size="small">
          <Edit sx={{ fontSize: '16px' }} />
        </IconButton>
      </Box>
    ),
    flex: 1,
    align: 'right'
  }
];

const TabbedDataGrid = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [toggleValue, setToggleValue] = useState(true);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setInputValue('');
    setToggleValue(true);
  };

  return (
    <Card sx={{ backgroundColor: 'white', height: '100%' }}>
      <Box sx={{ width: '100%', p: 1 }}>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ '& .MuiTab-root': { fontSize: '0.75rem', display: 'flex', alignItems: 'center' } }}
        >
          {tabLabels.map((label, index) => (
            <Tab
              key={index}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {label}
                  {selectedTab === index && (
                    <IconButton
                      onClick={handleOpenModal}
                      sx={{
                        bgcolor: '#41c048',
                        color: 'white',
                        width: 15,
                        height: 15,
                        borderRadius: '50%',
                        '&:hover': { bgcolor: '#41c048', color:'white' } 
                      }}
                    >
                      <Add sx={{ fontSize: '16px' }}  />
                    </IconButton>
                  )}
                </Box>
              }
            />
          ))}
        </Tabs>

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
            <Typography variant="h4" sx={{ mb: 2 }}>
              New Item
            </Typography>
            <TextField label="Enter Name" fullWidth value={inputValue} onChange={(e) => setInputValue(e.target.value)} sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="body1">Active or Inactive ?</Typography>
              <Switch checked={toggleValue} onChange={(e) => setToggleValue(e.target.checked)} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button variant="contained" color="secondary" onClick={handleCloseModal}>
                Submit
              </Button>
              <Button onClick={handleCloseModal} variant="outlined" color="error">
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ '& .MuiTab-root': { fontSize: '0.85rem' } }}
        >
          {tabLabels.map((label, index) => (
            <Tab key={index} label={label} />
          ))}
        </Tabs> */}

        <Box sx={{ height: 'auto', mt: 2 }}>
          <DataGrid
            rows={tabData[tabLabels[selectedTab]] || []}
            columns={columns}
            pageSize={5}
            disableSelectionOnClick
            getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row')}
            sx={{
              '& .even-row': { backgroundColor: '#ffffff' },
              '& .odd-row': { backgroundColor: '#f5f5f5' },
              '& .MuiDataGrid-row': {
                borderBottom: '1px solid #ccc'
              },
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: '#f5f5f5'
              }
            }}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default TabbedDataGrid;
