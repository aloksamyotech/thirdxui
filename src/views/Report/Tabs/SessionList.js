import { Button, Grid, MenuItem, TextField, Typography, IconButton, InputBase } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useGridApiContext } from '@mui/x-data-grid';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
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
import config from '../../../config';

const CaseList = ({ countryOfOriginFilter, selectedName, status, caseId, dateOpenedFilter1 }) => {
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
  const [countriesWithFlags, setCountriesWithFlags] = useState([]);

  useEffect(() => {
    fetch(config.filter_Country)
      .then((res) => res.json())
      .then((data) => {
        const countries = data.map((country) => ({
          value: country?.name?.common,
          label: country?.name?.common,
          flag: country?.flags?.png
        }));
        setCountriesWithFlags(countries);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize
        });

        if (countryOfOriginFilter) {
          const selectedCountry = countriesWithFlags.find((country) => country.value === countryOfOriginFilter);
          if (selectedCountry) {
            queryParams.append('country', selectedCountry.label);
          }
        }

        if (selectedName) {
          queryParams.append('name', selectedName);
        }

        if (status) queryParams.append('status', status === 'active');

        if (caseId) queryParams.append('uniqueId', caseId);

        if (dateOpenedFilter1 && dateOpenedFilter1 !== '') {
          const formattedDate = new Date(dateOpenedFilter1).toISOString().split('T')[0];
          queryParams.append('date', formattedDate);
        }

        const response = await getApi(`${urls.session.fetchWithPagination}?${queryParams.toString()}`);

        const data = response?.data?.data || [];
        const pagination = response?.data?.meta || { total: 0 };

        const transformedRows = data.map((item, index) => {
          const personalInfo = item?.serviceuser?.personalInfo || {};
          const fullName = personalInfo.name || '';
          const caseid = item?.serviceuser?.uniqueId;
          const countryName = item?.country || '-';
          const matchedCountry = countriesWithFlags.find((c) => c.label.toLowerCase() === countryName.toLowerCase());

          return {
            id: item._id || index,
            caseid: caseid || '-',
            serviceUser: fullName || '-',
            dob: item.date ? dayjs(item.date).format('DD/MM/YYYY') : '-',
            status: item.isActive ? 'Open' : 'Closed',
            country: item.country || '-',
            countryFlag: matchedCountry?.flag || '',
            ethicity: item.serviceuser?.personalInfo?.ethnicity || '-',
            owner: item.serviceId?.name || '-'
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
  }, [countriesWithFlags, paginationModel, countryOfOriginFilter, selectedName, status, caseId, dateOpenedFilter1]);

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
        const personalInfo = user?.serviceuser?.personalInfo || {};
        const fullName = personalInfo.name || '';

        return {
          id: user?._id,
          serialNumber: `RD-${(index + 1).toString().padStart(3, '0')}`,
          dateOpened: formatDate(user?.caseOpened),
          dateClosed: formatDate(user?.caseClosed),
          serviceUser: fullName,
          service: user?.serviceId?.name || '',
          owner: user?.serviceId?.name || '',
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
      renderCell: (params) => <Typography sx={{ fontSize: '12px' }}>{params?.value || '-'}</Typography>
    },
    {
      field: 'serviceUser',
      headerName: 'Service User',
      flex: 1,
      renderCell: (params) => <Typography sx={{ fontSize: '12px' }}>{params?.value || '-'}</Typography>
    },
    {
      field: 'dob',
      headerName: 'Date Opened',
      flex: 1,
      renderCell: (params) => <Typography sx={{ fontSize: '12px' }}>{params?.value || '-'}</Typography>
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
          {params.value || '-'}
        </Button>
      )
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center">
          <img src={params.row.countryFlag} alt={params.row.country} style={{ width: 20, height: 20, objectFit: 'contain' }} />
          <Typography sx={{ ml: '5px', fontSize: '12px' }}>{params?.value || '-'}</Typography>
        </Stack>
      )
    },
    {
      field: 'owner',
      headerName: 'Owner',
      flex: 1,
      renderCell: (params) => <Typography sx={{ fontSize: '12px' }}>{params?.value || '-'}</Typography>
    },
    {
      field: 'ethicity',
      headerName: 'Ethicity',
      flex: 1,
      renderCell: (params) => <Typography sx={{ fontSize: '12px' }}>{params?.value || '-'}</Typography>
    }
  ];

  const CustomHeader = () => {
     const apiRef = useGridApiContext();

    const handleExportCSV = () => {
      apiRef.current.exportDataAsCsv();
    };

    const handlePrint = () => {
      apiRef.current.exportDataAsPrint();
    };
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
           

             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PrintOutlinedIcon sx={{ cursor: 'pointer' }} onClick={handlePrint} />
            <SaveAltOutlinedIcon sx={{ cursor: 'pointer' }} onClick={handleExportCSV} />
            <OpenInNewIcon sx={{ cursor: 'pointer' }} onClick={() => window.open(window.location.href, '_blank')} />
          </Box>
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
          pageSizeOptions={[5, 10, 25, 50]}
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
