import React, { useState } from 'react';
import { Avatar, Button, Grid, Stack, Box, TextField, Typography } from '@mui/material';
import FilterPanel from 'components/FilterPanel';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import DeleteIcon from '@mui/icons-material/Delete';

const statusFilter = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
];

const dateAddedFilters = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Last 7 Days' },
  { value: 'month', label: 'Last 30 Days' },
  { value: 'year', label: 'Last 1 Year' }
];

const nameFilter = [
  { value: 'name1', label: 'Name 1' },
  { value: 'name2', label: 'Name 2' }
];

const Duplicate = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [status, setStatus] = useState('');
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [name, setNameFilter] = useState('');

  const rows = [
    {
      id: 1,
      userid: 'D-123',
      name: 'Snow',
      email: 'bob@gmail.com',
      dob: '27-03-04',
      age: '20',
      country: 'India',
      gender: 'Male',
      ethicity: 'Black',
      no: '1234561234'
    }
  ];
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: (params) => <Typography>{params?.row?.name}</Typography>
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      renderCell: (params) => <Typography>{params?.value}</Typography>
    },
    {
      field: 'no',
      headerName: 'Contact No.',
      flex: 1,
      renderCell: (params) => <Typography>{params?.value}</Typography>
    },
    {
      field: 'dob',
      headerName: 'Date',
      flex: 1,
      renderCell: (params) => <Typography>{params?.value}</Typography>
    }
  ];

  const CustomHeader = () => {
    return (
      <Box sx={{ height: '50px', display: 'flex', alignItems: 'center' }}>
        <GridToolbarContainer
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
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
              fontSize: '14px',
              lineHeight: '36px'
            }}
          >
            DUPLICATE LIST
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GridToolbarExport />
          </Box>
        </GridToolbarContainer>
      </Box>
    );
  };

  return (
    <>
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4">Duplicates</Typography>
          <TextField
            size="small"
            placeholder="Search..."
            InputProps={{
              endAdornment: <SearchIcon />
            }}
            sx={{ width: 350 }}
          />
        </Stack>

        <Grid container spacing={2}>
          <FilterPanel
            showFilter={showFilter}
            statuses={statusFilter}
            setStatusFilter={setStatus}
            dateAddedFilters={dateAddedFilters}
            setDateAddedFilter={setDateOpenedFilter}
            names={nameFilter}
            setNameFilter={setNameFilter}
            selectedFilters={['nameFilter', 'statusFilter', 'dateOpenedFilter']}
          />

          <Grid item xs={9}>
            <Box sx={{ boxShadow: 1, borderRadius: 2, overflow: 'hidden', bgcolor: '#fff' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row.id}
                pagination={false}
                hideFooterPagination
                hideFooter
                components={{
                  Toolbar: () => <CustomHeader />
                }}
                sx={{
                  '& .MuiDataGrid-row': {
                    borderBottom: '1px solid #ccc'
                  },
                  '& .MuiDataGrid-columnHeader': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              />
              <Stack direction="row" justifyContent="flex-end" spacing={2} p={2}>
                <Button size="small" variant="outlined" endIcon={<CallMergeIcon />} sx={{ color: '#fdc250', borderColor: '#fdc250' }}>
                  Merge
                </Button>
                <Button size="small" variant="outlined" endIcon={<DeleteIcon />} sx={{ color: '#ff918d', borderColor: '#ff918d' }}>
                  Delete
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Duplicate;
