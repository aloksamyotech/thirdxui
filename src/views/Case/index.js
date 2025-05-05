import React, { useState } from 'react';
import {
  Stack,
  Grid,
  Typography,
  Box,
  Card,
  TextField,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import { DataGrid, GridToolbarExport, GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import TableStyle from '../../ui-component/TableStyle';
import CheckIcon from '@mui/icons-material/Check';
import LoopIcon from '@mui/icons-material/Loop';
import SearchIcon from '@mui/icons-material/Search';
import FilterPanel from 'components/FilterPanel';
import { useNavigate } from 'react-router-dom';

const Lead = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(true);
  const [serviceType, setServiceType] = useState('');
  const [status, setStatus] = useState('');
  const [owner, setOwner] = useState('');
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');

  const toggleSearch = () => setShowSearch((prev) => !prev);

  const serviceTypeFilter = [
    { value: 'Education', label: 'Education' },
    { value: 'Health', label: 'Health' },
    { value: 'Mentoring', label: 'Mentoring' },
    { value: 'Group Work', label: 'Group Work' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Social Work', label: 'Social Work' }
  ];

  const statusFilter = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const dateAddedFilters = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'year', label: 'Last 1 Year' }
  ];

  const ownerFilters = [
    { value: 'owner1', label: 'Owner 1' },
    { value: 'owner2', label: 'Owner 2' }
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
            CASE LIST
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GridToolbarExport />
          </Box>
        </GridToolbarContainer>
      </Box>
    );
  };

  const columns = [
    { field: 'caseId', headerName: 'Case Id', width: 100 },
    { field: 'serviceUser', headerName: 'Service User', width: 150 },
    { field: 'owner', headerName: 'Owner', width: 120 },
    {
      field: 'status',
      headerName: 'Status',
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
    { field: 'service', headerName: 'Service', width: 120 },
    { field: 'dateOpened', headerName: 'Date Opened', width: 150 },
    { field: 'dateClosed', headerName: 'Date Closed', width: 150 }
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
      <Grid>
        <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
          <Tooltip title="Add" arrow>
            <IconButton
              onClick={() => navigate('/add-case')}
              sx={{
                backgroundColor: '#009fc7',
                borderRadius: '4px',
                width: 'auto',
                height: '35px',
                px: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                gap: 1,
                fontSize: '14px',
                '&:hover': {
                  backgroundColor: '#1565c0',
                  color: '#ffffff'
                }
              }}
            >
              Add New Case <AddIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <TextField
            size="small"
            placeholder="Search..."
            InputProps={{
              endAdornment: <SearchIcon />
            }}
            sx={{ width: '350px' }}
          />
        </Stack>
        <Grid container spacing={2}>
          <FilterPanel
            showFilter={showFilter}
            serviceTypes={serviceTypeFilter}
            setServiceTypeFilter={setServiceType}
            statuses={statusFilter}
            setStatusFilter={setStatus}
            dateAddedFilters={dateAddedFilters}
            setDateAddedFilter={setDateOpenedFilter}
            owners={ownerFilters}
            setOwnerFilter={setOwner}
            selectedFilters={['statusFilter', 'serviceTypeFilter', 'dateOpenedFilter', 'ownerFilter']}
          />
          <Grid item xs={9}>
            <TableStyle>
              <Box width="100%">
                <Card style={{ height: 'auto' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    rowHeight={60}
                    checkboxSelection
                    components={{
                      Toolbar: () => <CustomHeader />
                    }}
                    onRowClick={() => navigate('/view-case')}
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
        </Grid>
      </Grid>
    </Card>
  );
};

export default Lead;
