/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { Stack, Button, Grid, Typography, Box, Card, TextField, IconButton, Tooltip, InputBase,Chip } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import TableStyle from '../../ui-component/TableStyle';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import FilterPanel from 'components/FilterPanel.js';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import toast from 'react-hot-toast';

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
            fontWeight: '',
            color: '#333',
            fontSize: '14px',
            lineHeight: '36px'
          }}
        >
          Service List
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GridToolbarExport />
        </Box>
      </GridToolbarContainer>
    </Box>
  );
};

const Lead = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(true);
  const [serviceType, setServiceType] = useState('');
  const [status, setStatus] = useState('');
  const [rows, setRows] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [serviceTypeOptions, setServiceTypeOptions] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });

  const columns = [
{
  field: 'name',
  headerName: 'Service Name',
  flex: 1.5,
  renderCell: (params) => (
    <Stack sx={{ overflow: 'hidden', width: '100%' }}>
      <Typography
        variant="body1"
        sx={{
          textTransform: 'uppercase',
          fontWeight: 400,
          whiteSpace: 'normal',         
          wordBreak: 'break-word',      
          overflowWrap: 'break-word',
        }}
        mb={1}
      >
        {params.row.name}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ whiteSpace: 'nowrap' }}  
      >
        {new Date(params.row.updatedAt).toDateString()}
      </Typography>
    </Stack>
  )
}
,

    {
      field: 'serviceType',
      headerName: 'Service Type',
      flex: 1,
      renderCell: (params) => params.row.serviceType?.name || '-'
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
        const isActive = typeof params.value === 'boolean' ? params.value : params.value === 'active';
        const label = isActive ? 'Active' : 'Inactive';
        return (
          <Chip
            label={label}
            sx={{
              color: isActive ? '#79dbfb' : '#ff6a67',
              backgroundColor: isActive ? '#e5f8fe' : '#ffeae9',
              maxWidth: '80px'
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
            borderRadius: '12px',
            cursor: 'pointer'
          }}
        >
          <Typography color="grey">View More</Typography>
        </Box>
      )
    }
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApi(urls.configuration.fetch);

        const options = response?.data?.allConfiguration
          ?.filter((item) => item.configurationType === 'Service Types')
          ?.map((item) => ({
            value: item._id,
            label: item.name
          }));

        setServiceTypeOptions(options);
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    };
    fetchData();
  }, []);

  const handleFilter = async () => {
    try {
      const queryParams = new URLSearchParams();

      if (serviceType) queryParams.append('serviceType', serviceType);
      if (status) queryParams.append('status', status === 'active');

      if (searchQuery && searchQuery.trim() !== '') {
        queryParams.append('search', searchQuery.trim());
      }

      queryParams.append('page', paginationModel.page + 1);
      queryParams.append('limit', paginationModel.pageSize);

      const url = `${urls.service.fetchWithPagination}?${queryParams.toString()}`;
      const response = await getApi(url);

      const serviceList = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };

      setRows(serviceList);
      setTotalRows(pagination?.total);
      setIsFiltered(true);
    } catch (error) {
      console.error('Failed to fetch filtered services:', error);
    }
  };

  const handleReset = () => {
    setServiceType('');
    setStatus('');
    setIsFiltered(false);
    fetchServices();
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await getApi(
        `${urls.service.fetchWithPagination}?page=${paginationModel.page + 1}&limit=${paginationModel.pageSize}`
      );

      const serviceList = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };

      setRows(serviceList);
      setTotalRows(pagination?.total);
    } catch (error) {
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [paginationModel]);

  useEffect(() => {
    if (serviceType || status || searchQuery || isFiltered) {
      handleFilter();
    }
  }, [serviceType, status, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
                width: '220px',
                height: '35px',
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
            <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f8f9fa',
              borderRadius: '30px',
              paddingLeft: '16px',
                border: '1px solid #e0e0e0',
              width: '350px',
              height: '40px'
            }}
          >
          <InputBase
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleFilter();
                }
              }}
              sx={{
                flex: 1,
                color: 'text.primary'
              }}
            />
          <IconButton
              onClick={handleFilter}
              sx={{
                marginRight: '8px',
                width: 32,
                height: 32,
                cursor: 'pointer'
              }}
          >
          <SearchIcon />
          </IconButton>
          </Box>
     
        </Stack>

        <Grid container spacing={2}>
          <FilterPanel
            showFilter={showFilter}
            serviceTypes={serviceTypeOptions}
            serviceTypeFilter={serviceType}
            setServiceTypeFilter={setServiceType}
            statuses={statusFilter}
            statusFilter={status}
            setStatusFilter={setStatus}
            selectedFilters={['serviceTypeFilter', 'statusFilter']}
            onReset={handleReset}
          />

          <Grid item xs={9}>
            <TableStyle>
              <Box width="100%">
                <Card style={{ height: 'auto' }}>
                  <DataGrid
                    rows={
                      loading
                        ? []
                        : rows.map((row, index) => ({
                            ...row,
                            sNo: paginationModel.page * paginationModel.pageSize + index + 1
                          }))
                    }
                    columns={columns}
                    rowCount={totalRows}
                    loading={loading}
                    pagination
                    paginationMode="server"
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[10]}
                    rowHeight={70}
                    getRowId={(row) => row._id}
                    components={{
                      Toolbar: () => <CustomHeader />
                    }}
                    onRowClick={(params) => navigate('/view-service', { state: { row: params.row } })}
                    sx={{
                      '& .MuiDataGrid-row': {
                        borderBottom: '1px solid #ccc',
                        cursor:'pointer'
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
