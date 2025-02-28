import { useState } from 'react';
import { Stack, Grid, Typography, Box, Card, Chip, Tooltip, IconButton, Modal, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete, Add, Close } from '@mui/icons-material';

const getCountryFlag = (countryCode) => `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;

const User = () => {
  const [showForm, setShowForm] = useState(false);

  const columns = [
    {
      field: 'name',
      headerName: 'NAME',
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Typography sx={{ fontWeight: 'bold' }}>{params.row.name}</Typography>
          <Typography sx={{ fontSize: '12px', color: 'gray' }}>{params.row.email}</Typography>
        </Box>
      )
    },
    {
      field: 'country',
      headerName: 'COUNTRY',
      flex: 1.5,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img src={getCountryFlag(params.row.countryCode)} alt={params.value} width="24px" height="16px" />
          <Typography>{params.value}</Typography>
        </Box>
      )
    },
    { field: 'date', headerName: 'DATE', flex: 1 },
    { field: 'age', headerName: 'AGE', flex: 1 },
    {
      field: 'status',
      headerName: 'STATUS',
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            color: params.value === 'Active' ? '#79dbfb' : '#ff6a67',
            backgroundColor: params.value === 'Active' ? '#e5f8fe' : '#ffeae9'
          }}
        />
      )
    },
    {
      field: 'actions',
      headerName: 'MANAGE',
      renderCell: () => (
        <Box sx={{ display: 'flex', width: '100%' }}>
          <IconButton color="error" size="small">
            <Delete sx={{ fontSize: '16px' }} />
          </IconButton>
          <IconButton color="error" size="small">
            <Edit sx={{ fontSize: '16px' }} />
          </IconButton>
        </Box>
      ),
      flex: 1
    }
  ];

  const rows = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      country: 'USA',
      countryCode: 'US',
      date: '2025/02/28',
      age: 30,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Alice Smith',
      email: 'alice@example.com',
      country: 'UK',
      countryCode: 'GB',
      date: '2025/01/15',
      age: 25,
      status: 'Inactive'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      country: 'India',
      countryCode: 'IN',
      date: '2024/12/10',
      age: 35,
      status: 'Active'
    },
    {
      id: 4,
      name: 'Hilda Rath',
      email: 'rath@example.com',
      country: 'United Arab Emirates',
      countryCode: 'AE',
      date: '2024/02/28',
      age: 30,
      status: 'Inactive'
    },
    {
      id: 5,
      name: 'Herman Miller',
      email: 'miller@example.com',
      country: 'Switzerland',
      countryCode: 'CH',
      date: '2024/01/15',
      age: 25,
      status: 'Inactive'
    },
    {
      id: 6,
      name: 'Jaccy Smith',
      email: 'smith@example.com',
      country: 'Canada',
      countryCode: 'CA',
      date: '2023/12/10',
      age: 35,
      status: 'Active'
    }
  ];

  return (
    <Card sx={{ backgroundColor: '#EEF2F6' }}>
      <Grid>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} spacing={2} sx={{ width: '100%' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
            Add User
          </Typography>
          <Tooltip title="Invite User" arrow>
            <IconButton
              onClick={() => setShowForm(true)}
              sx={{
                backgroundColor: '#41C048',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: 3,
                color: 'white',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#41C048',
                  color: '#ffffff'
                }
              }}
            >
              <Add />
            </IconButton>
          </Tooltip>
        </Stack>

        <Box width="100%">
          <Card>
            <DataGrid
              rows={rows}
              columns={columns}
              rowHeight={65}
              getRowId={(row) => row.id}
              pageSize={5}
              sx={{
                '& .MuiDataGrid-columnHeader': {
                  backgroundColor: '#f5f5f5'
                },
                '& .MuiDataGrid-row:nth-of-type(2n)': {
                  backgroundColor: '#F9F9F9'
                },
                '& .MuiDataGrid-cell': {
                  textAlign: 'left',
                  fontSize: '14px'
                }
              }}
              disableSelectionOnClick
              checkboxSelection
            />
          </Card>
        </Box>
      </Grid>

      <Modal open={showForm} onClose={() => setShowForm(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            minWidth: 400
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4">Invite User</Typography>
            <IconButton onClick={() => setShowForm(false)}>
              <Close />
            </IconButton>
          </Stack>

          <TextField fullWidth label="Invite user via their email" variant="outlined" sx={{ mb: 2 }} />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="contained" color="secondary">
              Invite
            </Button>
            <Button variant="outlined" color="error" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Card>
  );
};

export default User;
