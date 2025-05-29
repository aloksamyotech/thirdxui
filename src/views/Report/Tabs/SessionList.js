import { Button, Grid, MenuItem, TextField, Typography, IconButton, InputBase } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import flag from '../../../assets/images/Flag_of_India.svg';
import { useState } from 'react';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import CheckIcon from '@mui/icons-material/Check';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';

const CaseList = () => {
  const [rows, setRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApi(
          `${urls.session.fetchWithPagination}?page=${paginationModel.page + 1}&limit=${paginationModel.pageSize}`
        );

        const data = response?.data?.data || [];
        const pagination = response?.data?.meta || { total: 0 };

        const transformedRows = data.map((item, index) => {
          const emergencyContact = item?.serviceuser?.emergencyContact || {};
          const fullName = `${emergencyContact.firstName || ''} ${emergencyContact.lastName || ''}`.trim();

          return {
            id: item._id || index,
            caseid: '-',
            serviceUser: fullName || '-',
            dob: item.date ? dayjs(item.date).format('DD/MM/YYYY') : '-',
            status: item.isActive ? 'Open' : 'Closed',
            country: item.country || '-',
            ethicity: item.ethnicity || '-',
            owner: item.owner || '-'
          };
        });

        setTotalRows(pagination?.total);
        setRows(transformedRows);
      } catch (error) {
        console.error('API Error:', error);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [paginationModel]);

  const handleFilter = async () => {
    try {
      const queryParams = new URLSearchParams();

      if (serviceType && serviceType !== '') {
        queryParams.append('serviceId', serviceType);
      }
      if (status) queryParams.append('status', status === 'active');
      if (owner && owner !== '') {
        queryParams.append('serviceType', owner);
      }
      if (dateOpenedFilter && dateOpenedFilter !== '') {
        const formattedDate = new Date(dateOpenedFilter).toISOString().split('T')[0];
        queryParams.append('createdAt', formattedDate);
      }

      if (searchQuery && searchQuery !== '') {
        queryParams.append('search', searchQuery);
      }

      const queryString = queryParams.toString();
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
          serialNumber: `RD-${(index + 1).toString().padStart(3, '0')}`,
          dateOpened: formatDate(user?.caseOpened),
          dateClosed: formatDate(user?.caseClosed),
          serviceUser: `${firstName} ${lastName}`.trim() || 'Unknown User',
          service: user?.serviceId?.name || '',
          owner: user?.serviceType || '',
          status: user?.isActive === true ? 'Open' : 'Closed'
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
    setDateOpenedFilter('');
  };

  useEffect(() => {
    if (status || dateOpenedFilter || searchQuery || isFiltered) {
      handleFilter();
    }
  }, [status, dateOpenedFilter, searchQuery, isFiltered]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const columns = [
    {
      field: 'caseid',
      headerName: 'Case ID',
      flex: 1,
      renderCell: (params) => <Typography sx={{ fontSize: '12px' }}>{params?.value}</Typography>
    },
    {
      field: 'serviceUser',
      headerName: 'Service User',
      flex: 1,
      renderCell: (params) => <Typography sx={{ fontSize: '12px' }}>{params?.value}</Typography>
    },
    {
      field: 'dob',
      headerName: 'Date Opened',
      flex: 1,
      renderCell: (params) => <Typography sx={{ fontSize: '12px' }}>{params?.value}</Typography>
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Button
          size="small"
          variant="outlined"
          startIcon={<CheckIcon />}
          sx={{
            p: 0,
            pr: 0.5,
            pl: 0.5,
            m: 0,
            borderRadius: '15px',
            color: '#737586',
            border: '1px solid #737586',
            textTransform: 'none',
            fontSize: '0.65rem',
            minWidth: 0
          }}
        >
          {params.value}
        </Button>
      )
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center">
          <img src={flag} alt="flag" style={{ width: 20, height: 20, objectFit: 'contain' }} />
          <Typography sx={{ ml: '5px', fontSize: '12px' }}>{params?.value}</Typography>
        </Stack>
      )
    },
    {
      field: 'owner',
      headerName: 'Owner',
      flex: 1,
      renderCell: (params) => <Typography sx={{ fontSize: '12px' }}>{params?.value}</Typography>
    },
    {
      field: 'ethicity',
      headerName: 'Ethicity',
      flex: 1,
      renderCell: (params) => <Typography sx={{ fontSize: '12px' }}>{params?.value}</Typography>
    }
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
              fontWeight: 400,
              color: '#5f5955',
              fontSize: '13px'
            }}
          >
            Session Report List
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: '30px',
                paddingLeft: '16px',
                border: '1px solid #e0e0e0',
                width: '250px',
                height: '30px'
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

            <GridToolbarExport />
          </Box>
        </GridToolbarContainer>
      </Box>
    );
  };

  return (
    <Grid container>
      <Box sx={{ backgroundColor: '#fff', borderRadius: 2 }} height="100vh" width="100%">
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
          rowHeight={65}
          getRowId={(row) => row.id}
          slots={{
            toolbar: () => <CustomHeader />,
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
          components={{
            Toolbar: () => <CustomHeader />
          }}
          checkboxSelection
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#eeeeee',
              fontSize: '0.75rem'
            },
            '& .MuiDataGrid-checkboxInput': {
              padding: '2px',
              transform: 'scale(0.8)'
            }
          }}
        />
      </Box>
    </Grid>
  );
};

export default CaseList;
