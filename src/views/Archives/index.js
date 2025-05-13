import React from 'react';
import {  Card, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import InfoIcon from '@mui/icons-material/Info';
import FilterPanel from 'components/FilterPanel';
import dayjs from 'dayjs';

const BulkDelete = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [activityType, setActivityTypeFilter] = useState('');
  const [sessionName, setSessionNameFilter] = useState('');
  const [dateAddedFilter, setDateAddedFilter] = useState(dayjs());

  const activityTypes = [
    { value: 'outreach', label: 'Outreach' },
    { value: 'training', label: 'Training' }
  ];

  const sessionNames = [
    { value: 'sessionA', label: 'Session A' },
    { value: 'sessionB', label: 'Session B' }
  ];

  const CustomHeader = () => {
    return (
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
              fontWeight: 'bold',
              color: '#333',
              ml: 2,
              fontSize: '14px',
              lineHeight: '36px'
            }}
          >
            PEOPLE LIST
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GridToolbarExport />
          </Box>
        </GridToolbarContainer>
      </Box>
    );
  };

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
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {params.row.name} #{params.row.id}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {params.row.address}
              </Typography>
            </Box>
          </Stack>

          <Tooltip title="Info" arrow>
            <IconButton>
              <InfoIcon color="action" />
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
        <Typography variant="h4">Archives</Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            size="small"
            placeholder="Search..."
            InputProps={{
              endAdornment: <SearchIcon />
            }}
            sx={{ width: '350px' }}
          />
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
          selectedFilters={['activityTypeFilter', 'dateAddedFilter', 'sessionNameFilter']}
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
