import React, { useState } from 'react';
import { Avatar, Button, Grid, Stack, Box, TextField, Typography, InputBase, IconButton, Checkbox } from '@mui/material';
import FilterPanel from 'components/FilterPanel';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import { IconTrash } from '@tabler/icons';

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
  const [selectedIds, setSelectedIds] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

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
      renderCell: (params) => <Typography>{params?.row?.name || '-'}</Typography>
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      renderCell: (params) => <Typography>{params?.value || '-'}</Typography>
    },
    {
      field: 'no',
      headerName: 'Contact No.',
      flex: 1,
      renderCell: (params) => <Typography>{params?.value || '-'}</Typography>
    },
    {
      field: 'dob',
      headerName: 'Date',
      flex: 1,
      renderCell: (params) => <Typography>{params?.value || '-'}</Typography>
    },
    {
      field: 'select',
      headerName: '',
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <Checkbox
          // checked={isAllSelected}
          // indeterminate={isIndeterminate}
          // onChange={handleSelectAllChange}
          size="small"
        />
      ),
      renderCell: (params) => (
        <Checkbox checked={selectedIds.includes(params.row.id)} onChange={() => handleCheckboxChange(params.row.id)} size="small" />
      )
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
              fontWeight: '450',
              color: '#333',
              fontSize: '14px',
              lineHeight: '36px'
            }}
          >
            Duplicate List
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
          <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">Duplicates</Typography>
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

        <Grid container spacing={2}>
          <FilterPanel
            showFilter={showFilter}
            statuses={statusFilter}
            setStatusFilter={setStatus}
            dateAddedFilters={dateAddedFilters}
            setDateAddedFilter={setDateOpenedFilter}
            names={nameFilter}
            setNameFilter={setNameFilter}
            selectedFilters={['nameFilter', 'dateOpenedFilter', 'statusFilter']}
            customDateLabel="By Date"
          />

          <Grid item xs={9}>
            <Box sx={{ boxShadow: 1, borderRadius: 2, overflow: 'hidden', bgcolor: '#fff' }}>
              <DataGrid
                rows={rows}
                columns={columns}
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
                <Button
                  size="small"
                  variant="outlined"
                  endIcon={<CallMergeIcon />}
                  sx={{
                    color: 'black',
                    borderColor: 'black',
                    borderRadius: '8px'
                  }}
                >
                  Merge
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  endIcon={<IconTrash size={16} />}
                  sx={{
                    color: 'red',
                    borderColor: 'red',
                    borderRadius: '8px'
                  }}
                >
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
