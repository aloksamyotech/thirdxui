/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card, IconButton, Toolbar, Select, MenuItem, TextField, Grid } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import Iconify from '../../ui-component/iconify';
import AddContact from './AddContact';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
// ----------------------------------------------------------------------


const Contact = () => {
  const [openAdd, setOpenAdd] = useState(false);

  const columns = [
    {
      field: 'serviceList',
      headerName: 'Service List',
      flex: 1,
      renderCell: (params) => (
        <Grid container sx={{ ml: '10px' }}>
          <Grid item container>
            <Grid item>
              <Typography>
                {params?.row?.sub}: {params?.row?.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ ml: '10px' }}>
                {params?.row?.code}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: '10px', mt: '5px' }}>
              {params?.row?.date}
            </Typography>
          </Grid>
        </Grid>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.2,
      renderCell: (params) =>
        <Grid container>
          <Grid item xs={12}>
            <Button size='small' variant='contained'
              sx={{
                color: (params?.value) === 'pending' ? '#ffc107' : ((params?.value) === 'active' ? '#2196f3' : '#d84315'),
                backgroundColor: (params?.value) === 'pending' ? '#fff8e1' : ((params?.value) === 'active' ? '#dae8f2' : '#fbe9e7'), boxShadow: 'none', borderRadius: '10px', padding: '0px', paddingX: '10px', fontWeight: '400',
                '&:hover': {
                  color: (params?.value) === 'pending' ? '#ffc107' : ((params?.value) === 'active' ? '#2196f3' : '#d84315'),
                  backgroundColor: (params?.value) === 'pending' ? '#fff8e1' : ((params?.value) === 'active' ? '#dae8f2' : '#fbe9e7'), boxShadow: 'none'
                }
              }}>{params?.value}</Button>
          </Grid>
        </Grid >
    }
  ];
  const leadData = [
    {
      id: 1,
      sub: 'JACS',
      name: 'COMMUNICATION',
      code: '#104122',
      date: 'Sat May 25 2025',
      status: 'active'
    },
    {
      id: 2,
      sub: 'JACS',
      name: 'CITIZENSHIP',
      code: '#231122',
      date: 'Sat May 25 2025',
      status: 'inActive'
    }
  ];

  const CustomToolbar = () => {
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', ml: '10px' }}>
          <FilterAltIcon /><Typography sx={{ display: 'inline' }}>Filter</Typography>
        </Box>
        <Toolbar sx={{ gap: 2 }}>
          <Select
            value=''
            displayEmpty
            size="small"
            sx={{
              minWidth: 120,
              "& fieldset": {
                border: "none",
              },
              "& .MuiSelect-select": {
                color: "#5c5c5c",
              },
            }}
          >
            <MenuItem value="">Select Service</MenuItem>
          </Select>
          <Select
            value=''
            displayEmpty
            size="small"
            sx={{
              minWidth: 120,
              "& fieldset": {
                border: "none",
              },
              "& .MuiSelect-select": {
                color: "#5c5c5c",
              },
            }}
          >
            <MenuItem value="">Select Status</MenuItem>
          </Select>
          <Select
            value=''
            displayEmpty
            size="small"
            sx={{
              minWidth: 120,
              "& fieldset": {
                border: "none",
              },
              "& .MuiSelect-select": {
                color: "#5c5c5c",
              }
            }}
          >
            <MenuItem value="">Start Date</MenuItem>
          </Select>
          <Select
            value=''
            displayEmpty
            size="small"
            sx={{
              minWidth: 120,
              "& fieldset": {
                border: "none",
              },
              "& .MuiSelect-select": {
                color: "#5c5c5c",
              }
            }}

          >
            <MenuItem value="">End Date</MenuItem>
          </Select>
          <Button variant="contained" color="secondary" sx={{ paddingX: '20px' }}>
            Apply
          </Button>
          <TextField
            size="small"
            placeholder="Search..."
            sx={{
              "& fieldset": {
                border: "none",
              }
            }}
          />
        </Toolbar>
      </>
    );
  };

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  return (
    <>
      <AddContact open={openAdd} handleClose={handleCloseAdd} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'start'} gap={2}>
          <Typography variant="h4">Add Services</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <IconButton
              onClick={handleOpenAdd}
              sx={{
                bgcolor: '#40bd3e',
                color: '#fff',
                fontSize: '40px',
                borderRadius: '100%',
                '&:hover': { bgcolor: '#40bd3e', color: '#fff', }
              }}
            >
              <AddIcon fontSize='small' />
            </IconButton>
          </Stack>
        </Stack>
        <TableStyle sx={{ mt: '-20px' }}>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={leadData}
                columns={columns}
                rowHeight={70}
                getRowId={(row) => row.id}
                components={{
                  Toolbar: () => <CustomToolbar />,
                }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default Contact;
