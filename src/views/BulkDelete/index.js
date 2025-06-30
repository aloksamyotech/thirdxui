import React, { useState } from 'react';
import { Button, Card, Grid, IconButton, TextField, Tooltip, Typography, InputBase } from '@mui/material';
import { Box, Stack } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { IconTrash } from '@tabler/icons';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import InfoIcon from '@mui/icons-material/Info';
import FilterPanel from 'components/FilterPanel';
import dayjs from 'dayjs';

const activityTypes = [
  { value: 'outreach', label: 'Outreach' },
  { value: 'training', label: 'Training' }
];

const sessionNames = [
  { value: 'sessionA', label: 'Session A' },
  { value: 'sessionB', label: 'Session B' }
];

const BulkDelete = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [activityType, setActivityTypeFilter] = useState('');
  const [includeArchives, setIncludeArchives] = useState(false);
  const [sessionName, setSessionNameFilter] = useState('');
  const [dateAddedFilter, setDateAddedFilter] = useState(dayjs());

  const CustomHeader = () => (
    <Box sx={{ height: '50px', display: 'flex', alignItems: 'center' }}>
      <GridToolbarContainer
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #ddd',
          width: '100%',
          height: '100%',
          padding: '0 12px'
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: '450',
            color: '#333',
            ml: 2,
            fontSize: '14px',
            lineHeight: '36px'
          }}
        >
          People List
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GridToolbarExport />
        </Box>
      </GridToolbarContainer>
    </Box>
  );

  const columns = [
    {
      field: 'person',
      headerName: 'Details',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={2} width="100%" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            {params.row.type === 'person' ? <PersonIcon /> : <ApartmentIcon />}
            <Box>
              <Typography variant="body1" sx={{ fontWeight: '450' }}>
                {params.row.name} #{params.row.id}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {params.row.address}
              </Typography>
            </Box>
          </Stack>
          <Tooltip title="Info" arrow>
            <IconButton>
              <InfoIcon sx={{ color: '#49494c' }} />
            </IconButton>
          </Tooltip>
        </Stack>
      )
    }
  ];

  const rows = [
    { id: 'C-001', name: 'John Doe', address: '123 Main Street, New York, NY 10001', type: 'person' },
    { id: 'C-002', name: 'Jane Smith', address: '456 Elm Street, Los Angeles, CA 90001', type: 'apartment' },
    { id: 'C-003', name: 'Michael Johnson', address: '789 Oak Street, Chicago, IL 60601', type: 'person' },
    { id: 'C-004', name: 'Emily Davis', address: '321 Pine Avenue, Houston, TX 77001', type: 'apartment' },
    { id: 'C-005', name: 'David Brown', address: '654 Maple Drive, Miami, FL 33101', type: 'person' },
    { id: 'C-006', name: 'Sophia Wilson', address: '987 Cedar Lane, San Francisco, CA 94101', type: 'apartment' }
  ];

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
        <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">Bulk Delete</Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            size="small"
            variant="outlined"
            endIcon={<IconTrash size={16} />}
            sx={{
              color: '#ff4d4d',
              borderColor: '#ff4d4d',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#fff0f0',
                borderColor: '#ff4d4d'
              }
            }}
          >
            Delete All
          </Button>

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
              // value={searchQuery}
              // onChange={handleSearchChange}
              // onKeyPress={(e) => {
              //   if (e.key === 'Enter') {
              //     handleFilter();
              //   }
              // }}
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
              // onClick={handleFilter}
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
      </Stack>

      <Grid container spacing={2}>
        <FilterPanel
          showFilter={showFilter}
          activityTypes={activityTypes}
          setActivityTypeFilter={setActivityTypeFilter}
          sessionNames={sessionNames}
          setSessionNameFilter={setSessionNameFilter}
          dateAddedFilter={dateAddedFilter}
          setDateAddedFilter={setDateAddedFilter}
          includeArchives={includeArchives}
          setIncludeArchives={setIncludeArchives}
          selectedFilters={['activityTypeFilter', 'dateAddedFilter', 'sessionNameFilter', 'includeArchives']}
        />
        <Grid item xs={9}>
          <Box width="100%">
            <Card style={{ height: 'auto' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                rowHeight={65}
                getRowId={(row) => row.id}
                components={{ Toolbar: CustomHeader }}
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    display: 'none'
                  },
                  '& .MuiDataGrid-cell': {
                    textAlign: 'left',
                    fontSize: '14px'
                  }
                }}
                disableSelectionOnClick
              />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default BulkDelete;
