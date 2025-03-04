import React, { useState } from 'react';
import { Stack, Button, Grid, Typography, Box, Card, TextField, Menu, MenuItem, IconButton,InputAdornment, Tooltip, Chip, Toolbar } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import AddIcon from '@mui/icons-material/Add';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TableStyle from '../../ui-component/TableStyle';
import CheckIcon from '@mui/icons-material/Check';
import LoopIcon from '@mui/icons-material/Loop';
import AddCaseForm from './AddCase.js';
import { Search, Download, PictureAsPdf, Print, ExpandMore, Archive, Edit, MergeType, Delete } from '@mui/icons-material';

const Lead = () => {
  const [district, setDistrict] = useState('');
  const [owner, setOwner] = useState('');
  const [status, setStatus] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => setShowSearch((prev) => !prev);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterApply = () => {
    console.log('Filters Applied:', { district, owner, status, fromDate, toDate });
  };

  const columns = [
    { field: 'caseId', headerName: 'CASE ID', width: 100 },
    { field: 'serviceUser', headerName: 'SERVICE USER', width: 150 },
    { field: 'owner', headerName: 'OWNER', width: 120 },
    {
      field: 'status',
      headerName: 'STATUS',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          icon={params.value === 'Open' ? <CheckIcon sx={{ color: 'green' }} /> : <LoopIcon sx={{ color: 'gray' }} />}
          sx={{
            borderColor: params.value === 'Open' ? 'green' : 'gray'
          }}
        />
      )
    },
    { field: 'service', headerName: 'SERVICE', width: 120 },
    { field: 'dateOpened', headerName: 'DATE OPENED', width: 150 },
    { field: 'dateClosed', headerName: 'DATE CLOSED', width: 150 }
  ];

  const rows = [
    {
      id: 1,
      caseId: 'C-001',
      serviceUser: 'John Doe',
      owner: 'Admin',
      status: 'Open',
      service: 'IT Support',
      dateOpened: '2024-02-01',
      dateClosed: '2025-08-10'
    },
    {
      id: 2,
      caseId: 'C-002',
      serviceUser: 'Jane Smith',
      owner: 'Manager',
      status: 'Close',
      service: 'HR Support',
      dateOpened: '2024-01-25',
      dateClosed: '2024-02-10'
    }
  ];

  return (
    <Card sx={{ backgroundColor: '#eef2f6' }}>
      {showForm ? (
        <AddCaseForm onCancel={() => setShowForm(false)} />
      ) : (
        <Grid>
          <Stack direction="row" alignItems="center" mb={2} spacing={2}>
            <Typography variant="h4">Add Cases</Typography>
            <Tooltip title="Add Case" arrow>
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
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Card sx={{ marginBottom: 3, backgroundColor: '#eef2f6' }}>
            <Stack direction="row" alignItems="center" spacing={2} mb={1}>
              <FilterAltOutlinedIcon color="grey" />
              <Typography variant="h6">Filter</Typography>
            </Stack>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ whiteSpace: 'nowrap' }}>
                <TextField
                  select
                  label="Select District"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{ width: 150 }}
                >
                  <MenuItem value="District 1">District 1</MenuItem>
                  <MenuItem value="District 2">District 2</MenuItem>
                </TextField>

                <TextField
                  select
                  label="Select Owner"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{ width: 150 }}
                >
                  <MenuItem value="Owner 1">Owner 1</MenuItem>
                  <MenuItem value="Owner 2">Owner 2</MenuItem>
                </TextField>

                <TextField
                  select
                  label="Select Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{ width: 150 }}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </TextField>

                <Box sx={{ width: 150 }}>
                  <DatePicker
                    label="From"
                    value={fromDate}
                    onChange={(newValue) => setFromDate(newValue)}
                    slotProps={{
                      textField: {
                        size: 'small',
                        sx: {
                          width: '100%',
                          '& .MuiInputBase-input': {
                            fontSize: '12px',
                            padding: '6px 8px',
                            textAlign: 'center'
                          }
                        }
                      }
                    }}
                  />
                </Box>

                <Box sx={{ width: 150 }}>
                  <DatePicker
                    label="To"
                    value={toDate}
                    onChange={(newValue) => setToDate(newValue)}
                    slotProps={{
                      textField: {
                        size: 'small',
                        sx: {
                          width: '100%',
                          '& .MuiInputBase-input': {
                            fontSize: '12px',
                            padding: '6px 8px',
                            textAlign: 'center'
                          }
                        }
                      }
                    }}
                  />
                </Box>

                <Button variant="contained" color="secondary" sx={{ height: 40, borderRadius: '12px' }}>
                  Apply
                </Button>

                <FilterAltOffOutlinedIcon color="grey" />
              </Stack>
            </LocalizationProvider>
          </Card>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Quick Action"
                onClick={handleClick}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClick}>
                        <ExpandMore />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{ maxWidth: 180 }}
              />
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                  <Archive fontSize="small" sx={{ mr: 1 }} /> Archive
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <MergeType fontSize="small" sx={{ mr: 1 }} /> Merge
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
                </MenuItem>
              </Menu>
            </Stack>

            <Stack direction="row">
              <IconButton onClick={toggleSearch}>
                <Search />
              </IconButton>
              {showSearch && <TextField variant="outlined" size="small" placeholder="Search..." autoFocus />}
              <IconButton>
                <Download />
              </IconButton>
              <IconButton>
                <PictureAsPdf />
              </IconButton>
              <IconButton>
                <Print />
              </IconButton>
            </Stack>
          </Stack>
          <TableStyle>
            <Box width="100%">
              <Card style={{ height: '600px' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  rowHeight={60}
                  checkboxSelection
                  getRowId={(row) => row.id}
                  pageSize={5}
                  rowsPerPageOptions={[5, 10]}
                  sx={{
                    '& .MuiDataGrid-row': {
                      borderBottom: '1px solid #ccc'
                    }
                  }}
                />
              </Card>
            </Box>
          </TableStyle>
        </Grid>
      )}
    </Card>
  );
};

export default Lead;
