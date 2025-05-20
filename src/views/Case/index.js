import React, { useState, useEffect } from 'react';
import { Stack, Grid, Typography, Box, Card, TextField, IconButton, Tooltip, Chip } from '@mui/material';
import { DataGrid, GridToolbarExport, GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import TableStyle from '../../ui-component/TableStyle';
import CheckIcon from '@mui/icons-material/Check';
import LoopIcon from '@mui/icons-material/Loop';
import SearchIcon from '@mui/icons-material/Search';
import FilterPanel from 'components/FilterPanel';
import { useNavigate } from 'react-router-dom';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';

const Lead = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [serviceTypeFilter, setServiceTypeFilterOptions] = useState([]);
  const [ownerFilters, setOwnerFilters] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
  const [serviceType, setServiceType] = useState('');
  const [status, setStatus] = useState('');
  const [owner, setOwner] = useState('');
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  const toggleSearch = () => setShowSearch((prev) => !prev);

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
    { field: 'serialNumber', headerName: 'Case Id', width: 100 },
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
    { field: 'dateOpened', headerName: 'Date Opened', width: 150 }
  ];

  const handleFilter = async () => {
    try {
      const queryParams = new URLSearchParams();

      if (serviceType && serviceType !== '') {
        queryParams.append('serviceId', serviceType);
      }
      if (status && status !== '') {
        queryParams.append('serviceStatus', status);
      }
      if (owner && owner !== '') {
        queryParams.append('serviceType', owner);
      }
      if (dateOpenedFilter && dateOpenedFilter !== '') {
        const formattedDate = new Date(dateOpenedFilter).toISOString().split('T')[0];
        queryParams.append('caseOpened', formattedDate);
      }

      if (searchQuery && searchQuery !== '') {
        queryParams.append('search', searchQuery);
      }

      const queryString = queryParams.toString();
      const url = `${urls.case.filterType}${queryString ? `?${queryString}` : ''}`;
      const response = await getApi(url);

    const filteredCases = response?.data || [];

      const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
      };

      const formattedUsers = filteredCases.map((user, index) => {
        const firstName = user?.serviceUserId?.personalInfo?.firstName || '';
        const lastName = user?.serviceUserId?.personalInfo?.lastName || '';

        return {
          id: user?._id,
          serialNumber: `#C-${(index + 1).toString().padStart(3, '0')}`,
          dateOpened: formatDate(user?.caseOpened),
          dateClosed: formatDate(user?.caseClosed),
          serviceUser: `${firstName} ${lastName}`.trim() || 'Unknown User',
          service: user?.serviceId?.name || '',
          owner: user?.serviceType || '',
          status: user?.serviceStatus === 'Active' ? 'Open' : 'Closed'
        };
      });

      setRows(formattedUsers);
      setIsFiltered(true);
    } catch (error) {
      console.error('Failed to fetch filtered cases:', error);
    }
  };

  const handleReset = () => {
    setServiceType('');
    setStatus('');
    setOwner('');
    setDateOpenedFilter('');
    setSearchQuery('');
    setIsFiltered(false);
    fetchInitialData();
  };

  useEffect(() => {
    if (serviceType || status || owner || dateOpenedFilter || searchQuery || isFiltered) {
      handleFilter();
    }
  }, [serviceType, status, owner, dateOpenedFilter, searchQuery]);

  const fetchInitialData = async () => {
    try {
      const response = await getApi(urls.case.fetch);
      const allCases = response?.data || [];

      const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
      };

      const formattedUsers = allCases?.map((user, index) => {
        const firstName = user?.userServiceDetails?.personalInfo?.firstName || '';
        const lastName = user?.userServiceDetails?.personalInfo?.lastName || '';

        return {
          id: user?._id,
          serialNumber: `#C-${(index + 1).toString().padStart(3, '0')}`,
          dateOpened: formatDate(user?.caseOpened),
          dateClosed: formatDate(user?.caseClosed),
          serviceUser: `${firstName} ${lastName}`.trim() || 'Unknown User',
          service: user?.serviceDetails?.name || '',
          owner: user?.serviceType || '',
          status: user?.serviceStatus === 'Active' ? 'Open' : 'Closed'
        };
      });

      setRows(formattedUsers);

      const uniqueServiceTypes = [...new Set(allCases.map((item) => item?.serviceDetails).filter(Boolean))].map((service) => ({
        value: service._id,
        label: service.name
      }));

      setServiceTypeFilterOptions(uniqueServiceTypes);

      const uniqueOwners = [...new Set(allCases.map((item) => item.serviceType).filter(Boolean))].map((value) => ({
        value,
        label: value
      }));
      setOwnerFilters(uniqueOwners);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleFilter();
              }
            }}
            InputProps={{
              endAdornment: <SearchIcon onClick={handleFilter} style={{ cursor: 'pointer' }} />
            }}
            sx={{ width: '350px' }}
          />
        </Stack>
        <Grid container spacing={2}>
          <FilterPanel
            showFilter={showFilter}
            serviceTypes={serviceTypeFilter}
            serviceTypeFilter={serviceType}
            setServiceTypeFilter={(value) => setServiceType(value)}
            statuses={statusFilter}
            statusFilter={status}
            setStatusFilter={(value) => setStatus(value)}
            dateAddedFilters={dateAddedFilters}
            dateOpenedFilter={dateOpenedFilter}
            setDateOpenedFilter={(value) => setDateOpenedFilter(value)}
            owners={ownerFilters}
            ownerFilter={owner}
            setOwnerFilter={(value) => setOwner(value)}
            selectedFilters={['statusFilter', 'serviceTypeFilter', 'dateOpenedFilter', 'ownerFilter']}
            onReset={handleReset}
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
                    onRowClick={(params) => navigate('/view-case', { state: { id: params.row.id } })}
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
