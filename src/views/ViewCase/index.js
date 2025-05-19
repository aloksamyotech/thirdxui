import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Grid, Typography, Stack, Button, IconButton, Chip, TextField } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterPanel from 'components/FilterPanel';
import SearchIcon from '@mui/icons-material/Search';
import { Add, Visibility, VisibilityOff } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import LoopIcon from '@mui/icons-material/Loop';
import { useNavigate } from 'react-router-dom';
import CaseNoteDialog from 'components/AddCaseNote';
import UserProfileDialog from './userProfile.js';
import { useLocation } from 'react-router-dom';
import { getApi } from 'common/apiClient.js';
import { urls } from 'common/urls';
import dayjs from 'dayjs';

const CaseDetailsPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [caseData, setCaseData] = useState(null);
  const [serviceDetails, setServiceDetails] = useState('');
  const [serviceuserDetails, setServiceuserDetails] = useState('');

  const location = useLocation();
  const { id } = location.state || {};

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
            CASE NOTES
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GridToolbarExport />
            <Button
              variant="contained"
              size="small"
              onClick={() => setOpenDialog(true)}
              sx={{ backgroundColor: '#009fc7' }}
              endIcon={<Add />}
            >
              Add New Case Note
            </Button>
          </Box>
        </GridToolbarContainer>
      </Box>
    );
  };
  const dobRaw = serviceuserDetails?.personalInfo?.dateOfBirth;
  const dobFormatted = dobRaw ? dayjs(dobRaw).format('DD/MM/YYYY') : '';
  const age = dobRaw ? dayjs().diff(dayjs(dobRaw), 'year') : '';
  const UserDetails = {
    name: serviceuserDetails?.personalInfo?.firstName || '',
    lastname: serviceuserDetails?.personalInfo?.lastName || '',
    email: serviceuserDetails?.contactInfo?.email || '',
    phone: serviceuserDetails?.contactInfo?.phone || '',
    address: serviceuserDetails?.contactInfo?.addressLine1 || '',
    country: serviceuserDetails?.contactInfo?.country || '',
    userId: '01231',
    gender: serviceuserDetails?.personalInfo?.gender || '',
    ethnicity: serviceuserDetails?.personalInfo?.ethnicity || '',
    dob: dobFormatted || '',
    age: age || '',
    altUserId: serviceuserDetails?.contactInfo?.otherId,
    service: serviceDetails.name || '',
    referredDate: '02/02/2020',
    image: 'https://via.placeholder.com/64'
  };
  const handleSave = (data) => {
    setOpenDialog(false);
  };

  const dateAddedFilters = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'year', label: 'Last 1 Year' }
  ];

  const columnsCase = [
    { field: 'caseId', headerName: 'Case Id', width: 100 },

    {
      field: 'serviceUser',
      headerName: 'Service User',
      width: 160,
      renderCell: () => (
        <Typography variant="body2" sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {serviceDetails?.name || ''}
        </Typography>
      )
    },

    {
      field: 'owner',
      headerName: 'Owner',
      width: 110,
      valueGetter: (params) => params.row?.owner || '',
      renderCell: () => (
        <Typography variant="body2" sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {caseData?.serviceType || ''}
        </Typography>
      )
    },

    {
      field: 'dateOpened',
      headerName: 'Date Opened',
      width: 110,
      valueGetter: () => formatDate(caseData?.caseOpened || '')
    },

    {
      field: 'dateClosed',
      headerName: 'Date Closed',
      width: 110,
      valueGetter: () => formatDate(caseData?.caseOpened || '')
    },

    // { field: 'attachments', headerName: 'Attachments', width: 100 },

    // { field: 'totalHours', headerName: 'Total Hours', width: 100 },

    {
      field: 'serviceStatus',
      headerName: 'Status',
      width: 120,
      renderCell: () => {
        const status = caseData?.serviceStatus;

        return (
          <Chip
            label={status || 'N/A'}
            icon={status === 'Active' ? <CheckIcon sx={{ color: 'green' }} /> : <LoopIcon sx={{ color: 'gray' }} />}
            variant="outlined"
            sx={{
              borderColor: status === 'Active' ? 'green' : 'gray',
              color: status === 'Active' ? 'green' : 'gray'
            }}
          />
        );
      }
    }
  ];

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return isNaN(date) ? '' : date.toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
  };

  const rows = [
    {
      id: 1,
      caseId: 'RD-9477',
      serviceUser: 'Aidan Ayonaudu',
      owner: 'Daniel Thompson',
      dateOpened: '31/10/2021',
      dateClosed: '23/10/2025',
      attachments: '1 File',
      totalHours: '24 hrs',
      status: 'Open'
    }
  ];

  const caseNotes = [
    {
      id: 1,
      date: '08/25/2017',
      subject: 'SUPERVISION',
      contactType: 'Email',
      createdBy: 'Sammy odoi',
      hours: '2 Hr',
      hidden: false
    },
    {
      id: 2,
      date: '08/25/2017',
      subject: 'AA–Mum and AA–Phone Contact',
      contactType: 'Email',
      createdBy: 'Sammy odoi',
      hours: '2 Hr',
      hidden: true
    },
    {
      id: 3,
      date: '08/25/2017',
      subject: 'SUPERVISION',
      contactType: 'Email',
      createdBy: 'Sammy odoi',
      hours: '2 Hr',
      hidden: false
    }
  ];

  const columns = [
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'subject', headerName: 'Subject', flex: 2 },
    { field: 'contactType', headerName: 'Contact Type', flex: 1.5 },
    { field: 'createdBy', headerName: 'Created By', flex: 1.5 },
    {
      field: 'hours',
      headerName: 'Hours',
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            color: '#0798bd',
            backgroundColor: '#e5f8fe',
            fontWeight: 500
          }}
        />
      )
    },
    {
      field: 'hidden',
      headerName: 'Hide',
      flex: 0.7,
      renderCell: (params) => <IconButton>{params.value ? <VisibilityOff /> : <Visibility />}</IconButton>
    }
  ];
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await getApi(urls.case.getById.replace(':id', id));
        const Data = response?.data?.caseData;
        setCaseData(Data);
        setServiceDetails(Data?.serviceDetails);
        setServiceuserDetails(Data?.userServiceDetails);
      } catch (error) {
        console.error('Error fetching case data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
              <Stack direction="row" alignItems="center">
                <IconButton onClick={() => navigate('/case')}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" gutterBottom>
                  {serviceDetails.name}
                </Typography>
              </Stack>

              <TextField
                size="small"
                placeholder="Search..."
                InputProps={{
                  endAdornment: <SearchIcon />
                }}
                sx={{ width: '350px' }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ mb: 2, backgroundColor: '#042E4C', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white' }}>
                    Service User Summary
                  </Typography>
                  <Chip
                    label="View"
                    size="small"
                    onClick={() => setOpen(true)}
                    sx={{
                      backgroundColor: 'white',
                      color: '#042E4C',
                      fontWeight: 400,
                      '&:hover': {
                        backgroundColor: 'white',
                        color: '#042E4C'
                      }
                    }}
                  />
                </Box>
                <Typography sx={{ color: 'white', fontSize: '0.6rem' }}>
                  Name: {serviceuserDetails?.personalInfo?.firstName || ''} {serviceuserDetails?.personalInfo?.lastName || ''}
                </Typography>

                <Typography sx={{ color: 'white', fontSize: '0.6rem' }}>User ID: 01231</Typography>
                <Typography sx={{ color: 'white', fontSize: '0.6rem' }}>
                  Gender: {serviceuserDetails?.personalInfo?.gender || ''}
                </Typography>
                <Typography sx={{ color: 'white', fontSize: '0.6rem' }}>Contact: {serviceuserDetails?.contactInfo?.phone || ''}</Typography>
                <Typography sx={{ color: 'white', fontSize: '0.6rem' }}>
                  DOB:{' '}
                  {serviceuserDetails?.personalInfo?.dateOfBirth
                    ? dayjs(serviceuserDetails.personalInfo.dateOfBirth).format('DD/MM/YYYY')
                    : ''}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={9}>
            <Box sx={{ backgroundColor: '#ffff', height: 'auto', width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columnsCase}
                hideFooter
                rowHeight={70}
                sx={{
                  '& .MuiDataGrid-columnHeader': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <FilterPanel
            showFilter={showFilter}
            dateAddedFilters={dateAddedFilters}
            setDateAddedFilter={setDateOpenedFilter}
            selectedFilters={['dateOpenedFilter']}
          />

          <Grid item xs={12} md={9}>
            <Box sx={{ height: 'auto', width: '100%', backgroundColor: '#ffff' }}>
              <DataGrid
                rows={caseNotes}
                columns={columns}
                components={{
                  Toolbar: () => <CustomHeader />
                }}
                disableSelectionOnClick
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f9fafb',
                    fontWeight: 'bold'
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <CaseNoteDialog open={openDialog} handleClose={() => setOpenDialog(false)} onSubmit={handleSave} title="Add Case Note" caseid={id} />
      <UserProfileDialog open={open} handleClose={() => setOpen(false)} user={UserDetails} />
    </>
  );
};

export default CaseDetailsPage;
