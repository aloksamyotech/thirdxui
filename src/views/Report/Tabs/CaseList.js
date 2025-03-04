import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import flag from '../../../assets/images/Flag_of_India.svg'
import { useState } from 'react';

const CaseList = () => {
  const [one, setOne] = useState('');
  const [two, setTwo] = useState('');
  const [three, setThree] = useState('');
  const [four, setFour] = useState('');
  const [filter, setFilter] = useState(false);
  const rows = [
    { id: 1, caseid: 'D-233', serviceUser: 'Snow', dob: '27-03-04', status: 'Closed', country: 'India', ethicity: 'Black', owner: 'Female' },
  ];
  const columns = [
    {
      field: 'caseid',
      headerName: 'Case ID',
      flex: 1,
      renderCell: (params) =>
        <Typography >{params?.value}</Typography>
    },
    {
      field: 'serviceUser',
      headerName: 'Service User',
      flex: 1,
      renderCell: (params) =>
        <Typography >{params?.value}</Typography>
    },
    {
      field: 'dob',
      headerName: 'Date Opened',
      flex: 1,
      renderCell: (params) =>
        <Typography color='secondary' sx={{ textDecoration: 'underline' }}>{params?.value}</Typography>
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) =>
        <Button size='small' variant="outlined" sx={{ p: 0, m: 0, borderRadius: '10px', color: '#ff7672', border: '1px solid #ff7672' }}>
          {params.value}
        </Button>
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 1,
      renderCell: (params) =>
        <Stack direction='row'>
          <img
            src={flag}
            alt="flag"
            style={{ width: 20, height: 20, objectFit: 'contain' }}
          />
          <Typography sx={{ ml: '5px' }}>{params?.value}</Typography>
        </Stack>
    },
    {
      field: 'owner',
      headerName: 'Owner',
      flex: 1,
      renderCell: (params) =>
        <Typography >{params?.value}</Typography>
    },
    {
      field: 'ethicity',
      headerName: 'Ethicity',
      flex: 1,
      renderCell: (params) =>
        <Typography >{params?.value}</Typography>
    }
  ];

  return (
    <>
      {!filter &&
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: '20px' }}>
          <Box>
            <FilterAltIcon fontSize='small' sx={{ marginX: '4px', cursor: 'pointer' }} onClick={() => setFilter(true)} />
            <DownloadIcon fontSize='small' sx={{ marginX: '4px' }} />
            <PrintIcon fontSize='small' sx={{ marginX: '4px' }} />
            <SystemUpdateAltIcon fontSize='small' sx={{ marginX: '4px' }} />
          </Box>
        </Box>
      }
      {filter &&
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '20px' }}>
          <TextField
            select
            label="Chooose Your Field"
            value={one}
            onChange={(e) => setOne(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: 200 }}
          >
            <MenuItem value="District 1">District 1</MenuItem>
            <MenuItem value="District 2">District 2</MenuItem>
          </TextField>
          <TextField
            select
            label="Service Date"
            value={two}
            onChange={(e) => setTwo(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: 100 }}
          >
            <MenuItem value="District 1">District 1</MenuItem>
            <MenuItem value="District 2">District 2</MenuItem>
          </TextField>
          <TextField
            select
            label="Referral Date"
            value={three}
            onChange={(e) => setThree(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: 120 }}
          >
            <MenuItem value="District 1">District 1</MenuItem>
            <MenuItem value="District 2">District 2</MenuItem>
          </TextField>
          <TextField
            select
            label="Age"
            value={four}
            onChange={(e) => setFour(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: 150 }}
          >
            <MenuItem value="District 1">District 1</MenuItem>
            <MenuItem value="District 2">District 2</MenuItem>
          </TextField>
          <Button color='secondary' variant='contained'>Apply</Button>
          <Stack sx={{ p: '5px', boxShadow: '1px 1px 5px #d4d4d4', borderRadius: '100%' }}>
            <FilterAltIcon
              fontSize='medium'
              sx={{ m: '4px', cursor: 'pointer' }}
              onClick={() => setFilter(false)} />
          </Stack>
          <Stack direction='row' sx={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
            <DownloadIcon fontSize='small' sx={{ marginX: '4px' }} />
            <PrintIcon fontSize='small' sx={{ marginX: '4px' }} />
            <SystemUpdateAltIcon fontSize='small' sx={{ marginX: '4px' }} />
          </Stack>
        </Box >
      }
      <Box height='500px' width='100%'>
        <DataGrid
          rows={rows ? rows : []}
          columns={columns}
          getRowId={(rows) => rows?.id}
          checkboxSelection
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#eeeeee',
            },
          }}
        />
      </Box>
    </>
  )
}

export default CaseList