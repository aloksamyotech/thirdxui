import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import flag from '../../../assets/images/Flag_of_India.svg';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import { useState } from 'react';
import { useEffect } from 'react';
import config from '../../../config';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';

const ServiceList = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [loading, setLoading] = useState(true);
  const [includeArchives, setIncludeArchives] = useState(false);
  const [rows, setRows] = useState([]);
  const [countriesWithFlags, setCountriesWithFlags] = useState([]);
  const [totalRows, setTotalRows] = useState(0);

  const columns = [
    {
      field: 'userid',
      headerName: 'Case ID',
      width: 100,
      align: 'center',
      renderCell: (params) => <Typography sx={{ fontSize: '12px' }}>{params?.value}</Typography>
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      renderCell: (params) => (
        <Typography sx={{ fontSize: '12px' }}>
          {params?.row?.firstName} {params?.row?.lastName}
          {params?.value}
        </Typography>
      )
    },
    {
      field: 'dob',
      headerName: 'DOB',
      width: 100,
      renderCell: (params) => <Typography sx={{ fontSize: '12px' }}>{params?.value}</Typography>
    },
    {
      field: 'age',
      headerName: 'Age',
      width: 70,
      renderCell: (params) => (
        <Box
          sx={{
            width: 35,
            height: 30,
            borderRadius: '40%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#555',
            fontSize: '14px',
            fontWeight: 'bold',
            border: '1px solid #d4d4d4'
          }}
        >
          {params.value}
        </Box>
      )
    },
    {
      field: 'country',
      headerName: 'Country',
      width: 150,
      renderCell: (params) => (
        <Stack direction="row">
          {params.row.countryFlag && (
            <img src={params.row.countryFlag} alt={params.row.country} style={{ width: 20, height: 20, objectFit: 'contain' }} />
          )}
          <Typography sx={{ fontSize: '12px', ml: '5px' }}>{params.row.country}</Typography>
        </Stack>
      )
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 100,
      renderCell: (params) => <Typography sx={{ fontSize: '12px' }}>{params?.value}</Typography>
    },
    {
      field: 'ethicity',
      headerName: 'Ethicity',
      width: 100,
      renderCell: (params) => <Typography sx={{ fontSize: '12px' }}>{params?.value}</Typography>
    },
    {
      field: 'no',
      headerName: 'ContactNo.',
      width: 150,
      renderCell: (params) => <Typography sx={{ fontSize: '12px' }}>{params?.value}</Typography>
    }
  ];
  useEffect(() => {
    fetch(config.country)
      .then((res) => res.json())
      .then((data) => {
        const countries = data.map((country) => ({
          value: country.cca2,
          label: country.name.common,
          flag: country.flags.png
        }));
        setCountriesWithFlags(countries);
      });
  }, []);
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
              color: '#333',
              fontSize: '14px',
              lineHeight: '36px'
            }}
          >
            Service User Report List
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              size="small"
              placeholder="Search..."
              InputProps={{
                endAdornment: <SearchIcon />
              }}
              sx={{ width: '200px' }}
            />
            <GridToolbarExport />
          </Box>
        </GridToolbarContainer>
      </Box>
    );
  };
  const getAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const fetchpeople = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        role: 'service_user'
      });

      if (!includeArchives) {
        queryParams.append('archive', 'false');
      }

      const response = await getApi(`${urls.serviceuser.fetchWithPagination}?${queryParams.toString()}`);
      const allUser = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };

      const formattedUsers = allUser?.map((user, index) => {
        const dob = user.personalInfo?.dateOfBirth ? new Date(user.personalInfo?.dateOfBirth).toLocaleDateString() : '-';
        const age = dob !== '-' ? getAge(dob) : '-';
        const countryName = user?.contactInfo?.country || '-';
        const matchedCountry = countriesWithFlags.find((c) => c.label.toLowerCase() === countryName.toLowerCase());

        return {
          id: user._id,
          serialNumber: `#C-${(index + 1).toString().padStart(3, '0')}`,
          userid: '-',
          firstName: user.personalInfo?.firstName || '-',
          lastName: user.personalInfo?.lastName || '-',
          dob,
          age,
          country: countryName,
          countryFlag: matchedCountry?.flag || '',
          ethicity: user.personalInfo?.ethnicity || '-',
          no: user.contactInfo?.phone || '-',
          gender: user.personalInfo?.gender || ''
        };
      });

      setRows(formattedUsers);
      setTotalRows(pagination?.total);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchpeople();
  }, [paginationModel]);

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
            loading={loading}
            pagination
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10]}
            rowCount={totalRows}
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
            checkboxSelection
            components={{
              Toolbar: () => <CustomHeader />
            }}
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

export default ServiceList;
