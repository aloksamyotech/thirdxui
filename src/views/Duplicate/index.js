import React from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Avatar, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import DeleteIcon from '@mui/icons-material/Delete';

const Duplicate = () => {
  const [one, setOne] = useState('');
  const [two, setTwo] = useState('');
  const [three, setThree] = useState('');
  const [four, setFour] = useState('');
  const [filter, setFilter] = useState(false);

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
      renderCell: (params) => (
        <Grid container sx={{ ml: '10px' }}>
          <Grid item xs={3}>
            <Avatar src={params?.row?.avatar} alt={params?.row?.name} />
          </Grid>
          <Grid item xs={9}>
            <Grid container>
              <Grid item xs={7.5}>
                <Typography
                  color="primary"
                  sx={{
                    display: 'inline',
                    paddingX: '12px',
                    marginLeft: '-13px',
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  {params?.row?.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: '10px' }}>{params?.row?.email}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )
    },
    {
      field: 'dob',
      headerName: 'Date',
      flex: 1,
      renderCell: (params) => (
        <Typography color="secondary" sx={{ textDecoration: 'underline' }}>
          {params?.value}
        </Typography>
      )
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
    }
  ];

  return (
    <Box sx={{ width: '100%', typography: 'body1', bgcolor: '#fff', borderRadius: '10px', minHeight: '100vh' }}>
      {!filter && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '20px' }}>
          <Typography>Duplicates</Typography>
          <FilterAltIcon fontSize="small" sx={{ marginX: '4px', cursor: 'pointer' }} onClick={() => setFilter(true)} />
        </Box>
      )}
      {filter && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: '20px' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <FilterAltIcon/>
            <Typography variant="h6" fontWeight="bold">
              Filter
            </Typography>
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              select
              label="Service"
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
              sx={{ width: 150 }}
            >
              <MenuItem value="District 1">District 1</MenuItem>
              <MenuItem value="District 2">District 2</MenuItem>
            </TextField>

            <TextField
              select
              label="Service User Tags"
              value={three}
              onChange={(e) => setThree(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ width: 150 }}
            >
              <MenuItem value="District 1">District 1</MenuItem>
              <MenuItem value="District 2">District 2</MenuItem>
            </TextField>

            <TextField
              select
              label="Country Of Origin"
              value={four}
              onChange={(e) => setFour(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ width: 180 }}
            >
              <MenuItem value="District 1">District 1</MenuItem>
              <MenuItem value="District 2">District 2</MenuItem>
            </TextField>

            <Button color="secondary" variant="contained">
              Apply
            </Button>

            <Stack sx={{ p: '5px', boxShadow: '1px 1px 5px #d4d4d4', borderRadius: '100%' }}>
              <FilterAltIcon fontSize="medium" sx={{ m: '4px', cursor: 'pointer' }} onClick={() => setFilter(false)} />
            </Stack>
          </Box>
        </Box>
      )}
      <Box height="200px" width="100%">
        <DataGrid
          rows={rows ? rows : []}
          columns={columns}
          getRowId={(rows) => rows?.id}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#eeeeee'
            }
          }}
        />
        <Stack direction="row" sx={{ display: 'flex', justifyContent: 'flex-end', m: '10px' }}>
          <Button
            size="small"
            variant="outlined"
            endIcon={<CallMergeIcon />}
            sx={{ marginRight: '10px', color: '#fdc250', border: '1px solid #fdc250' }}
          >
            Merge
          </Button>
          <Button
            size="small"
            variant="outlined"
            endIcon={<DeleteIcon />}
            sx={{ marginRight: '10px', color: '#ff918d', border: '1px solid #ff918d' }}
          >
            Delete
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Duplicate;
