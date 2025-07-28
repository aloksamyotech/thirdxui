import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useGridApiContext } from '@mui/x-data-grid';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import flag from '../../../assets/images/Flag_of_India.svg';
import { useState } from 'react';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import { useEffect } from 'react';
import config from '../../../config';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';
import CheckIcon from '@mui/icons-material/Check';

const CaseList = ({ countryOfOriginFilter, selectedName, status, caseId, dateOpenedFilter }) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [countriesWithFlags, setCountriesWithFlags] = useState([]);

  const columns = [
    {
      field: 'caseid',
      headerName: 'Case ID',
      width: 80,
      renderCell: (params) => <Typography sx={{ fontSize: '12px' }}>{params?.value || '-'}</Typography>
    },
    {
      field: 'serviceUser',
      headerName: 'Service User',
      width: 120,
      renderCell: (params) => <Typography sx={{ fontSize: '12px' }}>{params?.value || '-'}</Typography>
    },
    {
      field: 'dateOpened',
      headerName: 'Date Opened',
      width: 100,
      renderCell: (params) => <Typography sx={{ fontSize: '10px' }}>{params?.value || '-'}</Typography>
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 80,
      renderCell: (params) => (
        <Button
          size="small"
          variant="outlined"
          sx={{ p: 0, m: 0, pr: 0.5, pl: 0.5, borderRadius: '15px', color: '#737586', border: '1px solid #737586', fontSize: '0.65rem' }}
          startIcon={<CheckIcon />}
        >
          {params.value || '-'}
        </Button>
      )
    },
    {
      field: 'country',
      headerName: 'Country',
      width: 90,
      renderCell: (params) => (
        <Stack direction="row">
          <img src={params.row.countryFlag} alt={params.row.country} style={{ width: 20, height: 20, objectFit: 'contain' }} />
          <Typography sx={{ fontSize: '12px', ml: '5px' }}>{params.row.country || '-'}</Typography>
        </Stack>
      )
    },
    {
      field: 'owner',
      headerName: 'Owner',
      width: 80,
      renderCell: (params) => <Typography sx={{ fontSize: '12px' }}>{params?.value || '-'}</Typography>
    },
    {
      field: 'ethicity',
      headerName: 'Ethicity',
      width: 160,
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
              fontWeight: '400',
              color: '#333',
              fontSize: '14px',
              lineHeight: '36px'
            }}
          >
            {' '}
            Case Report List
          </Typography>
             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PrintOutlinedIcon sx={{ cursor: 'pointer' }} onClick={handlePrint} />
            <SaveAltOutlinedIcon sx={{ cursor: 'pointer' }} onClick={handleExportCSV} />
            <OpenInNewIcon sx={{ cursor: 'pointer' }} onClick={() => window.open(window.location.href, '_blank')} />
          </Box>
        
        </GridToolbarContainer>
      </Box>
    );
  };
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
  const fetchInitialData = async () => {
    try {
      setLoading(true);
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

      if (dateOpenedFilter && dateOpenedFilter !== '') {
        const formattedDate = new Date(dateOpenedFilter).toISOString().split('T')[0];
        queryParams.append('caseOpened', formattedDate);
      }

      const response = await getApi(`${urls.case.fetchWithPagination}?${queryParams.toString()}`);

      const allCases = response?.data?.data || [];

      const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
      };

      const formattedUsers = allCases?.map((user, index) => {
        const firstName = user?.serviceUserId?.personalInfo?.firstName || '';
        const lastName = user?.serviceUserId?.personalInfo?.lastName || '';
        const countryName = user?.serviceUserId?.contactInfo?.country || '-';
        const matchedCountry = countriesWithFlags.find((c) => c.label.toLowerCase() === countryName.toLowerCase());

        return {
          id: user?._id,
          serialNumber: `RD-${(index + 1).toString().padStart(3, '0')}`,
          caseid: user?.uniqueId || '',
          dateOpened: formatDate(user?.caseOpened),
          dateClosed: formatDate(user?.caseClosed),
          serviceUser: `${firstName} ${lastName}`.trim() || '',
          service: user?.serviceId?.name || '',
          owner: user?.serviceId?.name || '',
          status: user?.isActive === true ? 'Open' : 'Closed',
          ethicity: user?.serviceUserId?.personalInfo?.ethnicity || '-',
          country: countryName,
          countryFlag: matchedCountry?.flag || ''
        };
      });

      const pagination = response?.data?.meta || { total: 0 };

      setRows(formattedUsers);
      setTotalRows(pagination?.total);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [countriesWithFlags, paginationModel, countryOfOriginFilter, selectedName, status, caseId, dateOpenedFilter]);

  return (
    <>
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
            getRowId={(rows) => rows?.id}
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
    </>
  );
};

export default CaseList;
