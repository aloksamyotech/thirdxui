import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

const CaseList = () => {
  const columns = [
    {
      field: 'receipt',
      headerName: 'Receipt No.',
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value}
        </Typography>
      )
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: (params) => <Typography variant="body2">{params.value}</Typography>
    },
    {
      field: 'date',
      headerName: 'Credited At',
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="500">
          {params.value}
        </Typography>
      )
    },

    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="600" sx={{ color: 'green' }}>
          {params.value}
        </Typography>
      )
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <Typography variant="body2">{params.value}</Typography>
    }
  ];

  const rows = [
    {
      id: '1',
      receipt: '#56',
      name: 'Merry Christian',
      date: '11/3/2024',
      amount: '$6754',
      phone: '9876454633'
    },
    {
      id: '2',
      receipt: '#56',
      name: 'Merry Christian',
      date: '11/3/2024',
      amount: '$6754',
      phone: '9876454633'
    },
    {
      id: '3',
      receipt: '#56',
      name: 'Merry Christian',
      date: '11/3/2024',
      amount: '$6754',
      phone: '9876454633'
    },
    {
      id: '4',
      receipt: '#56',
      name: 'Merry Christian',
      date: '11/3/2024',
      amount: '$6754',
      phone: '9876454633'
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
            DONOR REPORT LIST
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              size="small"
              placeholder="Search..."
              InputProps={{
                endAdornment: <SearchIcon />
              }}
              sx={{ width: '200px' }}
            />
            <GridToolbarExport />
          </Box>
        </GridToolbarContainer>
      </Box>
    );
  };

  return (
    <>
      <Grid container>
        <Box sx={{ backgroundColor: '#fff', borderRadius: 2 }} height="auto" width="100%">
          <DataGrid
            rows={rows ? rows : []}
            columns={columns}
            getRowId={(rows) => rows?.id}
            components={{
              Toolbar: () => <CustomHeader />
            }}
            checkboxSelection
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#eeeeee'
              }
            }}
          />
        </Box>
      </Grid>
    </>
  );
};

export default CaseList;
