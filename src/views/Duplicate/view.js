import React, { useState } from 'react';
import { Button, Grid, Stack, Box, Typography, InputBase, IconButton, Checkbox } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import { Visibility } from '@mui/icons-material';
import { IconTrash } from '@tabler/icons';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CustomHeader from 'components/CustomHeader';

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
      headerName: 'Phone',
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
      headerName: 'View',
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <IconButton>
          <Visibility />
        </IconButton>
      )
    }
  ];

  return (
    <>
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">
            <IconButton onClick={() => navigate('/services')}>
              <KeyboardBackspaceIcon sx={{ fontSize: 20, color: 'black' }} />
            </IconButton>
            Duplicates
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
          <Grid item xs={12}>
            <Box sx={{ boxShadow: 1, borderRadius: 2, overflow: 'hidden', bgcolor: '#fff' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                pagination={false}
                hideFooterPagination
                hideFooter
                components={{
                  toolbar: () => (
                    <CustomHeader
                      entityType="duplicates"
                      title="Duplicates"
                      selectedIds={selectedIds}
                      enableBulkActions={false}
                      exportEnabled={true}
                      extraActions={null}
                    />
                  )
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
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Duplicate;
