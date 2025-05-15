import { useState, useEffect } from 'react';
import { Stack, Button, Grid, Typography, Box, Card, TextField, IconButton, Tooltip, Chip } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import TableStyle from '../../ui-component/TableStyle';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import FilterPanel from 'components/FilterPanel.js';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';

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
          SERIVCE LIST
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GridToolbarExport />
        </Box>
      </GridToolbarContainer>
    </Box>
  );
};

const Lead = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [serviceType, setServiceType] = useState('');
  const [status, setStatus] = useState('');
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      field: 'name',
      headerName: 'Service Name',
      flex: 1.5,
      renderCell: (params) => (
        <Stack>
          <Typography variant="body1" sx={{ textTransform: 'uppercase', fontWeight: 'normal' }}>
            {params.row.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {new Date(params.row.updatedAt).toDateString()}
          </Typography>
        </Stack>
      )
    },

    {
      field: 'type',
      headerName: 'Service Type',
      flex: 1
    },
    {
      field: 'code',
      headerName: 'Service Code',
      flex: 0.8,
      renderCell: (params) => `#${params.value}`
    },

    {
      field: 'isActive',
      headerName: 'Status',
      flex: 0.8,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        const isActive = params.value;
        const label = isActive ? 'Active' : 'Inactive';
        return (
          <Chip
            label={label}
            sx={{
              color: isActive ? '#79dbfb' : '#ff6a67',
              backgroundColor: isActive ? '#e5f8fe' : '#ffeae9'
            }}
          />
        );
      }
    },

    {
      field: 'more',
      headerName: 'More',
      flex: 0.8,
      headerAlign: 'center',
      align: 'center',
      renderCell: () => (
        <Box
          sx={{
            backgroundColor: '#f0f0f0',
            padding: '4px 8px',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          <Typography color="black">View More</Typography>
        </Box>
      )
    }
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getApi(urls.service.fetch);
        if (response?.data) {
          setRows(response.data.allService);
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    fetchServices();
  }, []);
  return (
    <Card sx={{ backgroundColor: '#eef2f6' }}>
      <Grid>
        <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
          <Tooltip title="Add" arrow>
            <IconButton
              onClick={() => navigate('/add-service')}
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
              Add New Service
              <AddIcon fontSize="small" />
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
            selectedFilters={['statusFilter', 'serviceTypeFilter']}
          />

          <Grid item xs={9}>
            <TableStyle>
              <Box width="100%">
                <Card style={{ height: 'auto' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    rowHeight={65}
                    getRowId={(row) => row._id}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
                    components={{
                      Toolbar: () => <CustomHeader />
                    }}
                    onRowClick={(params) => navigate('/view-service', { state: { row: params.row } })}
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
