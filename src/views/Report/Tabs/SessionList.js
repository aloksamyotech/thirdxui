import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import flag from '../../../assets/images/Flag_of_India.svg';
import { useState } from 'react';

const CaseList = () => {
  const rows = [
    { id: 1, caseid: 'D-233', serviceUser: 'Snow', dob: '27-03-04', status: 'Closed', country: 'India', ethicity: 'Black', owner: 'Female' }
  ];
  const columns = [
    {
      field: 'caseid',
      headerName: 'Case ID',
      flex: 1,
      renderCell: (params) => <Typography>{params?.value}</Typography>
    },
    {
      field: 'serviceUser',
      headerName: 'Service User',
      flex: 1,
      renderCell: (params) => <Typography>{params?.value}</Typography>
    },
    {
      field: 'dob',
      headerName: 'Date Opened',
      flex: 1,
      renderCell: (params) => (
        <Typography color="secondary" sx={{ textDecoration: 'underline' }}>
          {params?.value}
        </Typography>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Button size="small" variant="outlined" sx={{ p: 0, m: 0, borderRadius: '10px', color: '#ff7672', border: '1px solid #ff7672' }}>
          {params.value}
        </Button>
      )
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row">
          <img src={flag} alt="flag" style={{ width: 20, height: 20, objectFit: 'contain' }} />
          <Typography sx={{ ml: '5px' }}>{params?.value}</Typography>
        </Stack>
      )
    },
    {
      field: 'owner',
      headerName: 'Owner',
      flex: 1,
      renderCell: (params) => <Typography>{params?.value}</Typography>
    },
    {
      field: 'ethicity',
      headerName: 'Ethicity',
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
              SESSION REPORT LIST
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
