import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import flag from '../../../assets/images/Flag_of_India.svg';

const ServiceList = () => {
  const rows = [
    {
      id: 1,
      userid: 'D-123',
      name: 'John Doe',
      dob: '27-03-04',
      age: '20',
      country: 'India',
      gender: 'Male',
      ethicity: 'Black',
      no: '9875646643'
    },
    {
      id: 2,
      userid: 'D-123',
      name: 'John Doe',
      dob: '27-03-04',
      age: '20',
      country: 'India',
      gender: 'Male',
      ethicity: 'Black',
      no: '9875646643'
    },
    {
      id: 3,
      userid: 'D-123',
      name: 'Snow',
      dob: '27-03-04',
      age: '20',
      country: 'India',
      gender: 'Male',
      ethicity: 'Black',
      no: '9875646643'
    }
  ];

  const columns = [
    {
      field: 'userid',
      headerName: 'Case ID',
      flex: 1,
      renderCell: (params) => <Typography>{params?.value}</Typography>
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1.5,
      renderCell: (params) => <Typography>{params?.value}</Typography>
    },
    {
      field: 'dob',
      headerName: 'DOB',
      flex: 1,
      renderCell: (params) => <Typography>{params?.value}</Typography>
    },
    {
      field: 'age',
      headerName: 'Age',
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            width: 35,
            height: 30,
            borderRadius: '40%',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#555',
            fontSize: '14px',
            fontWeight: 'bold',
            border: '1px solid #d4d4d4'
          }}
        >
          {params.value}
        </Box>
      )
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 1.5,
      renderCell: (params) => (
        <Stack direction="row">
          <img src={flag} alt="flag" style={{ width: 20, height: 20, objectFit: 'contain' }} />
          <Typography sx={{ ml: '5px' }}>{params?.value}</Typography>
        </Stack>
      )
    },
    {
      field: 'gender',
      headerName: 'Gender',
      flex: 1,
      renderCell: (params) => <Typography>{params?.value}</Typography>
    },
    {
      field: 'ethicity',
      headerName: 'Ethicity',
      flex: 1,
      renderCell: (params) => <Typography>{params?.value}</Typography>
    },
    {
      field: 'no',
      headerName: 'ContactNo.',
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
            SERVICE USER REPORT LIST
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
        <Box  sx={{ backgroundColor: '#fff', borderRadius: 2 }} height="auto" width="100%">
          <DataGrid
            rows={rows ? rows : []}
            columns={columns}
            getRowId={(rows) => rows?.id}
            checkboxSelection
            components={{
              Toolbar: () => <CustomHeader />
            }}
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

export default ServiceList;
