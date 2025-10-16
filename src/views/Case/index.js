import React, { useState, useEffect } from 'react';
import { Stack, Grid, Typography, Box, Card, TextField, InputBase, IconButton, Tooltip, Chip } from '@mui/material';
import { DataGrid, GridToolbarExport, GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import TableStyle from '../../ui-component/TableStyle';
import CheckIcon from '@mui/icons-material/Check';
import LoopIcon from '@mui/icons-material/Loop';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import FilterPanel from 'components/FilterPanel';
import { useNavigate } from 'react-router-dom';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';
import StatusChip from 'views/AboutCase/StatusChip';
import CustomHeader from 'components/CustomHeader';

const Case = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [serviceTypeFilter, setServiceTypeFilterOptions] = useState([]);
  const [ownerFilters, setOwnerFilters] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [serviceType, setServiceType] = useState('');
  const [status, setStatus] = useState('');
  const [caseOwner, setOwner] = useState('');
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);

  const toggleSearch = () => setShowSearch((prev) => !prev);

  const statusFilter = [
    { value: 'open', label: 'Open' },
    { value: 'close', label: 'Close' },
    { value: 'pending', label: 'Pending' }
  ];

  const dateAddedFilters = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'year', label: 'Last 1 Year' }
  ];

  const columns = [
    {
      field: 'serialNumber',
      headerName: 'Case Id',
      width: 80,
      valueGetter: (params) => params.value || '-'
    },
    {
      field: 'serviceUser',
      headerName: 'Service User',
      width: 130,
      valueGetter: (params) => params.value || '-'
    },
    {
      field: 'caseOwner',
      headerName: 'Owner',
      width: 90,
      valueGetter: (params) => params.value || '-'
    },

    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => <StatusChip status={params.value} />
    },
    {
      field: 'service',
      headerName: 'Service',
      width: 120,
      valueGetter: (params) => params.value || '-'
    },
    {
      field: 'dateOpened',
      headerName: 'Date Opened',
      width: 105,
      valueGetter: (params) => params.value || '-'
    },
    {
      field: 'dateClosed',
      headerName: 'Date Closed',
      width: 105,
      valueGetter: (params) => {
        const status = params.row.status;
        const dateClosed = params.row.dateClosed;
        if (status === 'close' && dateClosed) {
          return dateClosed;
        }
        return '-';
      }
    }
  ];

  const handleFilter = async () => {
    try {
      const queryParams = new URLSearchParams();

      if (serviceType && serviceType !== '') {
        queryParams.append('serviceId', serviceType);
      }
      if (status) queryParams.append('status', status);
      if (caseOwner && caseOwner !== '') {
        queryParams.append('caseOwner', caseOwner);
      }
      if (startDate) {
        queryParams.append('startDate', new Date(startDate).toISOString());
      }
      if (endDate) {
        queryParams.append('endDate', new Date(endDate).toISOString());
      }
      if (dateOpenedFilter && dateOpenedFilter !== '') {
        const formattedDate = new Date(dateOpenedFilter).toISOString().split('T')[0];
        queryParams.append('createdAt', formattedDate);
      }

      if (searchQuery && searchQuery !== '') {
        queryParams.append('search', searchQuery);
      }

      const url = `${urls.case.fetchWithPagination}?${queryParams.toString()}`;

      const response = await getApi(url);

      const filteredCases = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };

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
          serialNumber: `RD-${user?.uniqueId}`,
          dateOpened: formatDate(user?.caseOpened),
          dateClosed: formatDate(user?.caseClosed),
          serviceUser: `${firstName} ${lastName}`.trim() || 'Unknown User',
          service: user?.serviceId?.name || '',
          caseOwner: user?.caseOwner?.name || '',
          status: user?.status
        };
      });

      setRows(formattedUsers);
      setTotalRows(pagination?.total);
      setIsFiltered(true);
    } catch (error) {
      console.error('Failed to fetch filtered cases:', error);
    }
  };

  const handleReset = () => {
    setServiceType('');
    setStatus('');
    setOwner('');
    setStartDate(null);
    setEndDate(null);
    setDateOpenedFilter('');
    setSearchQuery('');
    setIsFiltered(false);
    fetchInitialData();
  };

  useEffect(() => {
    if (serviceType || status || caseOwner || dateOpenedFilter || startDate || endDate || searchQuery || isFiltered) {
      handleFilter();
    }
  }, [serviceType, status, caseOwner, dateOpenedFilter, searchQuery, startDate, endDate]);

  const fetchInitialData = async () => {
    setLoading(true);

    try {
      const response = await getApi(`${urls.case.fetchWithPagination}?page=${paginationModel.page + 1}&limit=${paginationModel.pageSize}`);

      const allCases = response?.data?.data || [];
      const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
      };

      const formattedUsers = allCases?.map((user, index) => {
        const firstName = user?.serviceUserId?.personalInfo?.firstName || '';
        const lastName = user?.serviceUserId?.personalInfo?.lastName || '';
        const caseOwnerFirstName = user?.caseOwner?.name || '';
        return {
          id: user?._id,
          serialNumber: user?.uniqueId,
          dateOpened: formatDate(user?.caseOpened),
          dateClosed: formatDate(user?.caseClosed),
          serviceUser: `${firstName} ${lastName}`.trim() || '',
          service: user?.serviceId?.name || '',
          caseOwner: caseOwnerFirstName || '',
          status: user?.status
        };
      });

      const pagination = response?.data?.meta || { total: 0 };

      setRows(formattedUsers);
      setTotalRows(pagination?.total);
      const serviceMap = new Map();

      allCases.forEach((item) => {
        const service = item.serviceId;
        if (service && !serviceMap.has(service._id)) {
          serviceMap.set(service._id, {
            label: service.name,
            value: service._id
          });
        }
      });

      const uniqueServiceTypes = Array.from(serviceMap.values());

      setServiceTypeFilterOptions(uniqueServiceTypes);

      const uniqueOwners = [
        ...new Map(
          allCases
            .filter((item) => item?.caseOwner?._id)
            .map((item) => [
              item.caseOwner._id,
              {
                value: item.caseOwner._id,
                label: item.caseOwner.name ?? ''
              }
            ])
        ).values()
      ];

      setOwnerFilters(uniqueOwners);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [paginationModel]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Card sx={{ backgroundColor: '#eef2f6' }}>
      <Grid>
        <Stack direction="row" alignItems="center" justifyContent="space-between" m={1} marginBlock={3}>
          <Tooltip title="Add" arrow>
            <IconButton
              onClick={() => navigate('/add-case')}
              sx={{
                backgroundColor: '#009fc7',
                textTransform: 'none',
                whiteSpace: 'nowrap',
                paddingInline: '15px',
                paddingBlock: '7px',
                borderRadius: '10px',
                width: '220px',
                height: '35px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                gap: 1,
                fontSize: '14px',
                padding: '22px',
                '&:hover': {
                  backgroundColor: '#009fc7'
                }
              }}
            >
              Add New Case <AddIcon fontSize="small" />
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
              width: '489px',
              height: '45px'
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
                '& .MuiInputBase-input::placeholder': {
                  fontSize: '12 px',
                  opacity: 1
                },
                '& .MuiInputBase-input': {
                  fontSize: '14px'
                },
                '& .MuiInputLabel-root': {
                  fontSize: '13px'
                },
                '& .MuiInputBase-root.Mui-focused': {
                  backgroundColor: '#e0e0e0'
                },
                flex: 1,
                color: 'text.primary'
              }}
            />
            <IconButton
              onClick={handleFilter}
              sx={{
                marginRight: '8px',
                width: 18,
                height: 18,
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
            service={serviceTypeFilter}
            serviceFilter={serviceType}
            setServiceFilter={(value) => setServiceType(value)}
            statuses={statusFilter}
            statusFilter={status}
            setStatusFilter={(value) => setStatus(value)}
            dateAddedFilters={dateAddedFilters}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setDateOpenedFilter={(value) => setDateOpenedFilter(value)}
            owners={ownerFilters}
            ownerFilter={caseOwner}
            setOwnerFilter={(value) => setOwner(value)}
            selectedFilters={['serviceFilter', 'statusFilter', 'startDate', 'endDate', 'ownerFilter']}
            customDateLabel="Date Opened"
            onReset={handleReset}
          />

          <Grid item xs={9}>
            <TableStyle>
              <Box width="100%">
                <Card style={{ height: '100vh' }}>
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
                    pageSizeOptions={[5, 10, 25, 50]}
                    paginationMode="server"
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    onRowSelectionModelChange={(newSelection) => {
                      setSelectedIds(newSelection);
                    }}
                    rowHeight={65}
                    getRowId={(row) => row.id}
                    slots={{
                      toolbar: () => (
                        <CustomHeader
                          entityType="cases"
                          title="Case List"
                          selectedIds={selectedIds}
                          enableBulkActions={false}
                          exportEnabled={true}
                          extraActions={null}
                          refetchData={fetchInitialData}
                        />
                      ),
                      loadingOverlay: () => (
                        <Box
                          sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'self-start',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.15)'
                          }}
                        >
                          <SingleRowLoader />
                        </Box>
                      ),
                      noRowsOverlay: () => (loading ? null : <Box sx={{ padding: 2, textAlign: 'center' }}>No data available.</Box>)
                    }}
                    onRowClick={(params) => navigate('/view-case', { state: { id: params.row.id } })}
                    sx={{
                      '& .MuiDataGrid-row': {
                        borderBottom: '1px solid #ccc',
                        cursor: 'pointer'
                      },
                      '& .MuiDataGrid-columnHeaders': {
                        fontSize: '14px'
                      },
                      '& .MuiDataGrid-cell': {
                        fontSize: '12px'
                      },

                      '& .MuiDataGrid-cellCheckbox, & .MuiDataGrid-columnHeaderCheckbox': {
                        padding: '0px'
                      },
                      '& .MuiCheckbox-root': {
                        padding: '4px',
                        transform: 'scale(0.8)'
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

export default Case;
