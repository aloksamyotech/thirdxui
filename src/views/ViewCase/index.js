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

const sampleUser = {
  name: 'Aidan Ayonaudu',
  email: 'aidan.@example.com',
  phone: '(123) 456-7890',
  address: '5033 Transit Road, Clarence NY 14031',
  country: 'USA',
  userId: '01231',
  gender: 'Male',
  ethnicity: 'American',
  dob: 'USA',
  age: '49',
  altUserId: '12365479+',
  service: 'Communication',
  referredDate: '02/02/2020',
  image: 'https://via.placeholder.com/64'
};

const CaseDetailsPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [caseData, setCaseData] = useState(null);
  const [serviceName, setServiceName] = useState('');

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

  const handleSave = (data) => {
    console.log('Case note submitted:', data);
    setOpenDialog(false);
  };

  const dateAddedFilters = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'year', label: 'Last 1 Year' }
  ];

  const columnsCase = [
    { field: 'caseId', headerName: 'Case Id', width: 70 },
    {
      field: 'serviceUser',
      headerName: 'Service User',
      width: 100,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </Typography>
      )
    },
    {
      field: 'owner',
      headerName: 'Owner',
      width: 80,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </Typography>
      )
    },
    { field: 'dateOpened', headerName: 'Date Opened', width: 100 },
    { field: 'dateClosed', headerName: 'Date Closed', width: 100 },
    { field: 'attachments', headerName: 'Attachments', width: 80 },
    { field: 'totalHours', headerName: 'Total hours', width: 80 },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          icon={params.value === 'Open' ? <CheckIcon sx={{ color: 'green' }} /> : <LoopIcon sx={{ color: 'gray' }} />}
          sx={{
            borderColor: params.value === 'Open' ? 'green' : 'gray'
          }}
        />
      )
    }
  ];

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

        const caseData = response?.data?.caseData;
        setCaseData(caseData);

        const name = caseData?.serviceDetails?.name || '';
        setServiceName(name);
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
                  {serviceName}
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
                <Typography sx={{ color: 'white', fontSize: '0.6rem' }}>Name: Aidan Ayonaudu</Typography>
                <Typography sx={{ color: 'white', fontSize: '0.6rem' }}>User ID: 01231</Typography>
                <Typography sx={{ color: 'white', fontSize: '0.6rem' }}>Gender: Male</Typography>
                <Typography sx={{ color: 'white', fontSize: '0.6rem' }}>Contact: (123) 456-7890</Typography>
                <Typography sx={{ color: 'white', fontSize: '0.6rem' }}>DOB: 27-10-1999</Typography>
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

      <CaseNoteDialog open={openDialog} handleClose={() => setOpenDialog(false)} onSubmit={handleSave} title="Add Case Note" />
      <UserProfileDialog open={open} handleClose={() => setOpen(false)} user={sampleUser} />
    </>
  );
};

export default CaseDetailsPage;
