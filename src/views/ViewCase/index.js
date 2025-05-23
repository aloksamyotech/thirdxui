import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Grid, Typography, InputBase, Stack, Button, IconButton, Chip, TextField } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
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
import { imageUrl } from 'common/urls';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader.js';

const CaseDetailsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [caseData, setCaseData] = useState(null);
  const [serviceDetails, setServiceDetails] = useState('');
  const [serviceuserDetails, setServiceuserDetails] = useState('');
  const [row, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });


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
    service: serviceDetails?.name || '',
    referredDate: '02/02/2020',
    image: 'https://via.placeholder.com/64'
  };
  const handleSave = (data) => {
    setOpenDialog(false);
  };

  // const dateAddedFilters = [
  //   { value: 'today', label: 'Today' },
  //   { value: 'week', label: 'Last 7 Days' },
  //   { value: 'month', label: 'Last 30 Days' },
  //   { value: 'year', label: 'Last 1 Year' }
  // ];

  const columnsCase = [
    { field: 'caseId', headerName: 'Case Id', width: 100 },
    {
      field: 'serviceUser',
      headerName: 'Service User',
      width: 120,
      renderCell: () => (
        <Typography variant="body2" sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {`${serviceuserDetails?.personalInfo?.firstName || ''} ${serviceuserDetails?.personalInfo?.lastName || ''}`}
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

    { field: 'attachments', headerName: 'Attachments', width: 110 },

    { field: 'totalHours', headerName: 'Total Hours', width: 100 },

    {
      field: 'serviceStatus',
      headerName: 'Status',
      width: 120,
      renderCell: () => {
        const status = caseData?.serviceStatus;

        return (
          <Chip
            label={status === 'Active' ? 'Open' : 'Close'}
            icon={status === 'Active' ? <CheckIcon sx={{ color: 'gray' }} /> : <LoopIcon sx={{ color: 'gray' }} />}
            variant="outlined"
            sx={{
              borderColor: 'gray',
              color: 'gray',
              backgroundColor: 'transparent'
            }}
          />
        );
      }
    }
  ];

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return isNaN(date) ? '' : date.toLocaleDateString('en-GB');
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

  const userProfile = serviceuserDetails?.otherInfo?.file;
  const fullImageUrl = userProfile ? `${imageUrl}${userProfile}` : '';

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

  const handleFilter = async () => {
    try {
      const queryParams = new URLSearchParams();

      queryParams.append('caseId', id);
      if (dateOpenedFilter && dateOpenedFilter !== '') {
        const formattedDate = new Date(dateOpenedFilter).toISOString().split('T')[0];
        queryParams.append('date', formattedDate);
      }
      if (searchQuery && searchQuery !== '') {
        queryParams.append('search', searchQuery);
      }

      const queryString = queryParams.toString();
      const url = `${urls.casenote?.fetchWithPagination}?${queryParams.toString()}`;

      const response = await getApi(url);

      const filteredCases = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };

      const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
      };

      const formattedUsers = filteredCases.map((user, index) => {
        return {
          id: user?._id,
          date: formatDate(user?.date),
          subject: user?.subject || '',
          contactType: user?.configurationId?.name || '',
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
    setSearchQuery('');
  };

  useEffect(() => {
    if (dateOpenedFilter) {
      handleFilter();
    }
  }, [dateOpenedFilter]);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getApi(urls.case.getById.replace(':id', id));
        const Data = response?.data?.caseData;
        setCaseData(Data);
        setServiceDetails(Data?.serviceDetails);
        setServiceuserDetails(Data?.userServiceDetails);
      } catch (error) {
        console.error('Error fetching case data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const fetchdata = async () => {
    try {
      setLoading(true)
      const response = await getApi(
        `${urls.casenote.fetchWithPagination}?page=${paginationModel.page + 1}&limit=${paginationModel.pageSize}&caseId=${id}`
      );
      const allCasesNotes = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };

      const formattedCasesNotes = allCasesNotes?.map((item, index) => ({
        id: item._id || index,
        date: item.date ? new Date(item.date).toLocaleDateString() : '',
        subject: item?.subject || '',
        contactType: item?.configurationId?.name || '',

      }));

      setRows(formattedCasesNotes);

      setTotalRows(pagination?.total);

    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchdata();
  }, [paginationModel]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center">
                <Typography fontWeight="bold" display="flex" alignItems="center">
                  <IconButton onClick={() => navigate('/case')}>
                    <KeyboardBackspaceIcon sx={{ fontSize: 20, color: 'black' }} />
                  </IconButton>
                  {serviceDetails?.name}
                </Typography>
              </Stack>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '30px',
                  paddingLeft: '16px',
                  width: '350px',
                  height: '40px'
                }}
              >
                <InputBase
                  placeholder="Search..."
                  sx={{
                    flex: 1,
                    color: 'text.primary'
                  }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <IconButton
                  sx={{
                    marginRight: '8px',
                    width: 32,
                    height: 32
                  }}
                  onClick={handleFilter}
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ mb: 2, backgroundColor: '#042E4C', color: 'white' }}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: '4px 0'
                  }}
                >
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 500 }}>
                    Service User Summary
                  </Typography>

                  <Chip
                    label="View"
                    size="small"
                    onClick={() => setOpen(true)}
                    sx={{
                      backgroundColor: 'white',
                      color: '#042E4C',
                      fontWeight: 300,
                      '&:hover': {
                        backgroundColor: 'white',
                        color: '#042E4C'
                      }
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Typography sx={{ color: 'white', fontSize: '0.6rem' }}>
                    <strong>Name:</strong> {serviceuserDetails?.personalInfo?.firstName || ''}{' '}
                    {serviceuserDetails?.personalInfo?.lastName || ''}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'white', fontSize: '0.6rem' }}>
                      <strong>User ID :</strong> 01231
                    </Typography>
                    <Typography sx={{ color: 'white', fontSize: '0.6rem' }}>
                      <strong>Gender:</strong> {serviceuserDetails?.personalInfo?.gender || ''}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'white', fontSize: '0.6rem' }}>
                      <strong>Contact:</strong> {serviceuserDetails?.contactInfo?.phone || ''}
                    </Typography>
                    <Typography sx={{ color: 'white', fontSize: '0.6rem' }}>
                      <strong>DOB:</strong>{' '}
                      {serviceuserDetails?.personalInfo?.dateOfBirth
                        ? dayjs(serviceuserDetails.personalInfo.dateOfBirth).format('DD-MM-YYYY')
                        : ''}
                    </Typography>
                  </Box>
                </Box>
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
            dateOpenedFilter={dateOpenedFilter}
            setDateOpenedFilter={(value) => setDateOpenedFilter(value)}
            selectedFilters={['dateOpenedFilter']}
            onReset={handleReset}
          />

          <Grid item xs={12} md={9} >
            <Box sx={{ height: '400px', width: '100%', backgroundColor: '#ffff' }}>
              <DataGrid
                loading={loading}
                rows={row}
                columns={columns}
                slots={{
                  toolbar: () => <CustomHeader />,
                  loadingOverlay: () => (
                    <Box
                      sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'self-start',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      }}
                    >
                      <SingleRowLoader />
                    </Box>
                  ),
                  noRowsOverlay: () => (
                    loading ? null : (
                      <Box sx={{ padding: 2, textAlign: 'center' }}>
                        No data available.
                      </Box>
                    )
                  ),
                }}
                disableSelectionOnClick
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f9fafb',
                    fontWeight: 'bold',
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <CaseNoteDialog open={openDialog} fetchdata={fetchdata} handleClose={() => setOpenDialog(false)} onSubmit={handleSave} title="Add Case Note" caseid={id} />
      <UserProfileDialog open={open} handleClose={() => setOpen(false)} user={UserDetails} userView={fullImageUrl} />
    </>
  );
};

export default CaseDetailsPage;
