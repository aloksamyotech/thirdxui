import { useState } from 'react';
import {
  Stack,
  Button,
  Grid,
  Typography,
  Box,
  Card,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  IconButton,
  Tooltip,
  Chip,
  InputAdornment
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import AddIcon from '@mui/icons-material/Add';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TableStyle from '../../ui-component/TableStyle';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import AddService from './AddService.js';
import FilterPanel from 'components/FilterPanel.js';
import { use } from 'react';

const formTypes = [
  { value: 'Self Referral form', label: 'Self Referral form' },
  { value: 'Community Referral form', label: 'Community Referral form' },
  { value: 'Satisfaction survey', label: 'Satisfaction survey' },
  { value: 'Volunteer sign up form', label: 'Volunteer sign up form' },
  { value: 'Workshop sign up form', label: 'Workshop sign up form' }
];

const dateFilters = [
  { value: 'today', label: 'All Dates' },
  { value: 'week', label: 'Last 7 days' },
  { value: 'month', label: 'Last 30 days' },
  { value: 'year', label: 'Last 2 months' }
];

const Lead = () => {
  const [district, setDistrict] = useState('');
  const [status, setStatus] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formType, setFormType] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [showFilter , setShowFilter] = useState(true);
  const navigate = useNavigate();

  const handleFilterApply = () => {
    console.log('Filters Applied:', { district, status, fromDate, toDate });
  };

  const columns = [
    {
      field: 'details',
      headerName: 'SERVICE LIST',
      flex: 2,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => (
        <Stack>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {params.value.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {params.value.date}
          </Typography>
        </Stack>
      )
    },
    {
      field: 'status',
      headerName: 'STATUS',
      flex: 1,
      headerAlign: 'right',
      align: 'right',
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            color: params.value === 'Active' ? '#79dbfb' : '#ff6a67',
            backgroundColor: params.value === 'Active' ? '#e5f8fe' : '#ffeae9'
          }}
        />
      )
    }
  ];

  const rows = [
    {
      id: '1',
      details: { title: 'JACS: Communication  #127553', date: 'Sat May 25 2024' },
      status: 'Active'
    },
    {
      id: '2',
      details: { title: 'JACS: Counseling  #127554', date: 'Sat May 25 2024' },
      status: 'Inactive'
    },
    {
      id: '3',
      details: { title: 'JACS: Therapy Session  #127555', date: 'Sat May 25 2024' },
      status: 'Active'
    },
    {
      id: '4',
      details: { title: 'JACS: Rehabilitation  #127556', date: 'Sat May 25 2024' },
      status: 'Inactive'
    },
    {
      id: '5',
      details: { title: 'JACS: Vaccination  #127557', date: 'Sat May 25 2024' },
      status: 'Active'
    }
  ];

  return (
    <Card sx={{ backgroundColor: '#eef2f6' }}>
      {showForm ? (
        <AddService onCancel={() => setShowForm(false)} />
      ) : (
        <Grid>
          <Stack direction="row" alignItems="center" mb={2} spacing={2}>
            <Typography variant="h4">Add Services</Typography>
            <Tooltip title="Add Services" arrow>
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
                        InputLabelProps: { shrink: true },
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
                        InputLabelProps: { shrink: true },
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

                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search People..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ width: 200 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    )
                  }}
                />
              </Stack>
            </LocalizationProvider>
          </Card>
          <Grid container spacing={3}>
            <FilterPanel
              showFilter={showFilter}
              formTypes={formTypes}
              setFormType={setFormType}
              dateFilters={dateFilters}
              setDateFilter={setDateFilter}
            />
            <Grid item xs={9}>
              <TableStyle>
                <Box width="100%">
                  <Card style={{ height: '500px' }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      rowHeight={65}
                      getRowId={(row) => row.id}
                      pageSize={5}
                      rowsPerPageOptions={[5, 10]}
                      getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row')}
                      // onRowClick={(params) => navigate(`/dashboard/view-service/${params.id}`)}
                      onRowClick={() => navigate('/dashboard/view-service')}
                      sx={{
                        '& .even-row': { backgroundColor: '#ffffff' },
                        '& .odd-row': { backgroundColor: '#f5f5f5' },
                        '& .MuiDataGrid-row': {
                          borderBottom: '1px solid #ccc'
                        }
                      }}
                    />
                  </Card>
                </Box>
              </TableStyle>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Card>
  );
};

export default Lead;
