import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Grid, Typography, InputBase, Stack, Button, IconButton, Chip, TextField } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import FilterPanel from 'components/FilterPanel';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Add, Visibility, VisibilityOff } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import LoopIcon from '@mui/icons-material/Loop';
import { useNavigate } from 'react-router-dom';
import CaseNoteDialog from 'components/AddCaseNote';
import UserProfileDialog from './userProfile.js';
import { useLocation } from 'react-router-dom';
import { getApi } from 'common/apiClient.js';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { urls } from 'common/urls';
import dayjs from 'dayjs';
import { imageUrl } from 'common/urls';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader.js';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SectionSkeleton from 'ui-component/Loader/SectionSkeleton.js';
import { decodedToken } from 'utils/adminData.js';
import StatusChip from 'views/AboutCase/StatusChip.js';
import AboutCaseNote from 'views/AboutCaseNote/CaseNoteDialog.js';
import DescriptionIcon from '@mui/icons-material/Description';

const CaseDetailsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [open, setOpen] = useState(false);
  const [openNote, setOpenNote] = useState(false);
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
    pageSize: 5
  });
  const [isFiltered, setIsFiltered] = useState(false);
  const [createdByFilter, setCreatedByFilter] = useState('');
  const [createdByOptions, setCreatedByOptions] = useState([]);
  const [AdminData, setAdminData] = useState([]);
  const [selectedCaseNote, setSelectedCaseNote] = useState(null);
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
              color: '#878787',
              fontSize: '14px',
              lineHeight: '36px'
            }}
          >
            Case Notes
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

  const dateAddedFilters = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'year', label: 'Last 1 Year' }
  ];

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return isNaN(date) ? '' : date.toLocaleDateString('en-GB');
  };

  const userProfile = serviceuserDetails?.otherInfo?.file;
  const fullImageUrl = userProfile ? `${imageUrl}${userProfile}` : '';

  const columns = [
    { field: 'date', headerName: 'Date', flex: 1 },
    {
      field: 'subject',
      headerName: 'Subject',
      flex: 1,
      renderCell: (params) => <Box sx={{ whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: '1.4' }}>{params.value}</Box>
    },
    { field: 'configurationName', headerName: 'Contact Type', flex: 1 },
    { field: 'createdBy', headerName: 'Created By', flex: 1 },
    {
      field: 'hours',
      headerName: 'Hours',
      flex: 0.5,
      renderCell: (params) => (
        <Chip
          label={params.value || '-'}
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
      headerName: 'View More',
      flex: 0.7,
      renderCell: (params) => <IconButton>{params.value ? <VisibilityOff /> : <Visibility />}</IconButton>
    }
  ];

  const handleReset = () => {
    setDateOpenedFilter('');
    setSearchQuery('');
    setCreatedByFilter('');
    setIsFiltered(false);
    fetchCaseNotes();
  };
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
      if (createdByFilter && createdByFilter !== '') {
        queryParams.append('createdBy', createdByFilter);
      }

      const url = `${urls.casenote?.fetchWithPagination}?${queryParams.toString()}`;
      const response = await getApi(url);
      const allCasesNotes = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };

      const formattedData = allCasesNotes.map((note, index) => {
        let configName = '-';

        if (note?.configurationId && typeof note.configurationId === 'object') {
          configName = note.configurationId.name || '-';
        } else if (note?.name) {
          configName = note.name;
        }
        const createdByAdmin = note?.createdBy?.userName || '-';
        return {
          id: note._id,
          date: note.date ? dayjs(note.date).format('DD-MM-YYYY') : '-',
          subject: note.subject || '-',
          createdBy: createdByAdmin || '-',
          configurationName: configName,
          sNo: paginationModel.page * paginationModel.pageSize + index + 1
        };
      });

      setRows(formattedData);
      setTotalRows(pagination?.total);
      setIsFiltered(true);
    } catch (error) {
      console.error('Failed to fetch filtered cases:', error);
    }
  };

  useEffect(() => {
    if (dateOpenedFilter || searchQuery || createdByFilter || isFiltered) {
      handleFilter();
    }
  }, [dateOpenedFilter, searchQuery, createdByFilter]);

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

  const fetchCaseNotes = async () => {
    try {
      setLoading2(true);
      const response = await getApi(
        `${urls.casenote.fetchWithPagination}?page=${paginationModel.page + 1}&limit=${paginationModel.pageSize}&caseId=${id}`
      );
      const allCasesNotes = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };
      const formattedData = allCasesNotes.map((note, index) => {
        let configName = '-';

        if (note?.configurationId && typeof note.configurationId === 'object') {
          configName = note.configurationId.name || '-';
        } else if (note?.name) {
          configName = note.name;
        }

        return {
          id: note._id,
          date: note.date ? dayjs(note.date).format('DD-MM-YYYY') : '-',
          subject: note.subject || '-',
          createdBy: note?.createdBy?.userName || '-',
          configurationName: configName,
          time: note?.time,
          sNo: paginationModel.page * paginationModel.pageSize + index + 1
        };
      });

      setRows(formattedData);
      setTotalRows(pagination?.total);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    fetchCaseNotes();
  }, [paginationModel]);

  useEffect(() => {
    handleFilter();
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApi(urls.login.getAllAdmin);
        const allAdmins = response?.data?.allAdmins || [];

        const formattedOptions = allAdmins.map((admin) => ({
          label: admin.userName,
          value: admin._id
        }));
        setCreatedByOptions(formattedOptions);
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    };
    fetchData();
  }, []);

  const handleClick = () => {
    navigate('/about-case', {
      state: {
        caseData
      }
    });
  };

  const viewUser = () => {
    navigate('/view-people', {
      state: { id: serviceuserDetails?._id }
    });
  };
  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center">
                <Typography fontWeight="bold" display="flex" alignItems="center">
                  <IconButton onClick={() => navigate(-1)}>
                    <KeyboardBackspaceIcon sx={{ fontSize: 20, color: 'black' }} />
                  </IconButton>
                  {serviceDetails?.name} Case
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
            <Card sx={{ mb: 2, backgroundColor: '#052c3f33', color: 'black', border: '1px solid #0080A1', minHeight: 171.5 }}>
              {loading ? (
                <Box
                  sx={{
                    margin: '5px'
                  }}
                >
                  <SectionSkeleton lines={1} variant="rectangular" width="100%" height={120} />
                </Box>
              ) : (
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%'
                    }}
                  >
                    <Typography variant="h6" sx={{ color: 'black', fontWeight: 500 }}>
                      Service User Summary
                    </Typography>

                    <Chip
                      label="View"
                      size="small"
                      onClick={viewUser}
                      sx={{
                        backgroundColor: 'white',
                        color: '#042E4C',
                        fontWeight: 300,
                        fontSize: '0.65rem',
                        height: 22,
                        padding: '0 6px',
                        '& .MuiChip-label': {
                          padding: 0
                        },
                        '&:hover': {
                          backgroundColor: 'white',
                          color: '#042E4C'
                        }
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }} mt={1}>
                    <Typography sx={{ color: 'black', fontSize: '0.7rem' }}>
                      <span style={{ fontWeight: 600 }}>Name:</span> {serviceuserDetails?.personalInfo?.firstName || '-'}
                      {serviceuserDetails?.personalInfo?.lastName || ''}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: 'black', fontSize: '0.7rem' }}>
                        <span style={{ fontWeight: 600 }}>User ID:</span> {serviceuserDetails?.uniqueId || '-'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: 'black', fontSize: '0.7rem' }}>
                        <span style={{ fontWeight: 600 }}>Gender:</span> {serviceuserDetails?.personalInfo?.gender || '-'}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: 'black', fontSize: '0.7rem' }}>
                        <span style={{ fontWeight: 600 }}>Contact:</span> {serviceuserDetails?.contactInfo?.phone || '-'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: 'black', fontSize: '0.7rem' }}>
                        <span style={{ fontWeight: 600 }}>DOB:</span>
                        {serviceuserDetails?.personalInfo?.dateOfBirth
                          ? dayjs(serviceuserDetails.personalInfo.dateOfBirth).format('DD-MM-YYYY')
                          : '-'}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              )}
            </Card>
          </Grid>

          <Grid item xs={12} md={9}>
            {loading ? (
              <Box>
                <SectionSkeleton lines={1} variant="rectangular" width="100%" height={130} />
              </Box>
            ) : (
              // <Box sx={{ backgroundColor: '#fff', width: '100%', borderRadius: '4px' }}>
              //   <TableContainer component={Paper} elevation={0}>
              //     <Table size="small" sx={{ borderCollapse: 'separate', borderSpacing: 0 }}>
              //       <TableHead sx={{ backgroundColor: '#f5f5f5', padding: '20px' }}>
              //         <TableRow>
              //           {[
              //             'Case Id',
              //             'Service User',
              //             'Owner',
              //             'Date Opened',
              //             'Date Closed',
              //             'Attachments',
              //             'Total Hours',
              //             'Status',
              //             'View More'
              //           ].map((header) => (
              //             <TableCell
              //               key={header}
              //               sx={{
              //                 fontSize: '12px',
              //                 whiteSpace: 'nowrap',
              //                 padding: '4px',
              //                 borderBottom: 'none',
              //                 height: '50px',
              //                 ...(header === 'Total Hours' && { pr: 2 })
              //               }}
              //             >
              //               {header}
              //             </TableCell>
              //           ))}
              //         </TableRow>
              //       </TableHead>
              //       <TableBody
              //         sx={{
              //           height: '73px',
              //           cursor: 'pointer',
              //           '&:hover': {
              //             backgroundColor: 'grey.200'
              //           }
              //         }}
              //         onClick={handleClick}
              //       >
              //         <TableRow key={row.caseId}>
              //           <TableCell sx={{ fontSize: '12px', padding: '6px', borderBottom: 'none' }}>
              //             {serviceuserDetails?.uniqueId || '-'}
              //           </TableCell>
              //           <TableCell sx={{ fontSize: '12px', padding: '6px', borderBottom: 'none' }}>
              //             <Typography variant="body2" sx={{ fontSize: '12px' }}>
              //               {serviceuserDetails?.personalInfo?.firstName || '-'}
              //             </Typography>
              //             <Typography variant="body2" sx={{ fontSize: '12px' }}>
              //               {serviceuserDetails?.personalInfo?.lastName || ''}
              //             </Typography>
              //           </TableCell>

              //           <TableCell sx={{ fontSize: '12px', padding: '6px', borderBottom: 'none' }}>
              //             <Typography variant="body2" sx={{ fontSize: '12px' }}>
              //               {caseData?.caseOwnerDetails?.[0]?.personalInfo?.firstName || '-'}
              //             </Typography>
              //             <Typography variant="body2" sx={{ fontSize: '12px' }}>
              //               {caseData?.caseOwnerDetails?.[0]?.personalInfo?.lastName || ''}
              //             </Typography>
              //           </TableCell>

              //           <TableCell sx={{ fontSize: '12px', padding: '6px', borderBottom: 'none' }}>
              //             {formatDate(caseData?.caseOpened || '')}
              //           </TableCell>
              //           <TableCell sx={{ fontSize: '12px', padding: '6px', borderBottom: 'none' }}>
              //             {formatDate(caseData?.caseClosed || '')}
              //           </TableCell>
              //           <TableCell sx={{ fontSize: '12px', padding: '6px', borderBottom: 'none' }}>
              //             {caseData?.attachments?.length || 0} {caseData?.attachments?.length === 1 ? 'File' : 'Files'}
              //           </TableCell>
              //           <TableCell sx={{ fontSize: '12px', padding: '6px', borderBottom: 'none' }}>
              //             {(() => {
              //               if (!caseData?.caseOpened || !caseData?.caseClosed) return '0 hrs';
              //               const startDate = new Date(caseData.caseOpened);
              //               const endDate = new Date(caseData.caseClosed);
              //               const diffTime = Math.abs(endDate - startDate);
              //               const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
              //               return `${diffHours} hrs`;
              //             })()}
              //           </TableCell>
              //           <TableCell sx={{ fontSize: '14px', borderBottom: 'none' }}>
              //             <StatusChip status={caseData?.status.charAt(0).toUpperCase() + caseData?.status.slice(1).toLowerCase()} />
              //           </TableCell>
              //           <TableCell sx={{ fontSize: '14px', padding: '6px', borderBottom: 'none' }}>
              //             <IconButton>
              //               {' '}
              //               <Visibility />
              //             </IconButton>
              //           </TableCell>
              //         </TableRow>
              //       </TableBody>
              //     </Table>
              //   </TableContainer>
              // </Box>

              <Box
                sx={{
                  backgroundColor: '#fff',
                  width: '100%',
                  borderRadius: '8px',
                  p: 2,
                  border: '1px solid #e0e0e0'
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography fontWeight="600">Case Information</Typography>
                  <IconButton size="small" onClick={handleClick}>
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight={500}>Case Id</Typography>
                    <Typography color="text.secondary">{caseData?.uniqueId || '-'}</Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight={500}>Service User</Typography>
                    <Typography color="text.secondary">
                      {serviceuserDetails?.personalInfo?.firstName || ''} {serviceuserDetails?.personalInfo?.lastName || ''}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight={500}>Owner</Typography>
                    <Typography color="text.secondary">{caseData?.caseOwnerDetails?.[0]?.name || ''} </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight={500}>Status</Typography>
                    <Typography color="text.secondary">
                      {caseData?.status ? caseData.status.charAt(0).toUpperCase() + caseData.status.slice(1).toLowerCase() : '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight={500}>Date Opened</Typography>
                    <Typography color="text.secondary">{caseData?.caseOpened ? formatDate(caseData.caseOpened) : '-'}</Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight={500}>Date Closed</Typography>
                    <Typography color="text.secondary">{caseData?.caseClosed ? formatDate(caseData.caseClosed) : '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight={500}>Attachments</Typography>

                    {caseData?.file ? (
                      <DescriptionIcon sx={{ fontSize: 26, color: '#555' }} />
                    ) : (
                      <Typography color="text.secondary">0 Files</Typography>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight={500}>Total hours</Typography>
                    <Typography color="text.secondary">
                      {(() => {
                        if (!caseData?.caseOpened || !caseData?.caseClosed) return '0 hrs';
                        const startDate = new Date(caseData.caseOpened);
                        const endDate = new Date(caseData.caseClosed);
                        const diffTime = Math.abs(endDate - startDate);
                        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
                        return `${diffHours} hrs`;
                      })()}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <FilterPanel
            showFilter={showFilter}
            dateAddedFilters={dateAddedFilters}
            dateOpenedFilter={dateOpenedFilter}
            setDateOpenedFilter={(value) => setDateOpenedFilter(value)}
            createdBy={createdByOptions}
            createdByFilter={createdByFilter}
            setCreatedByFilter={setCreatedByFilter}
            selectedFilters={['dateOpenedFilter', 'createdByFilter']}
            onReset={handleReset}
          />

          <Grid item xs={12} md={9}>
            <Box sx={{ height: '500px', width: '100%', backgroundColor: '#ffff' }}>
              <DataGrid
                loading={loading2}
                rows={
                  loading2
                    ? []
                    : row.map((row, index) => ({
                        ...row,
                        sNo: paginationModel.page * paginationModel.pageSize + index + 1
                      }))
                }
                columns={columns}
                rowCount={totalRows}
                pagination
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10, 25, 50]}
                rowHeight={70}
                getRowId={(row) => row.id}
                onRowClick={(row) => {
                  setSelectedCaseNote(row?.row);
                  setOpenNote(true);
                }}
                // onRowClick={(row) => {
                // navigate('/about-case-note', { state: { caseData: row?.row } });
                // }}
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
                  noRowsOverlay: () => (loading2 ? null : <Box sx={{ padding: 2, textAlign: 'center' }}>No data available.</Box>)
                }}
                disableSelectionOnClick
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f9fafb',
                    fontWeight: 'bold'
                  },
                  '& .MuiDataGrid-row:hover': {
                    cursor: 'pointer'
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <CaseNoteDialog
        open={openDialog}
        fetchdata={fetchCaseNotes}
        handleClose={() => setOpenDialog(false)}
        onSubmit={handleSave}
        title="Add Case Note"
        caseid={id}
      />
      <AboutCaseNote
        open={openNote}
        onClose={() => setOpenNote(false) }
        caseData={selectedCaseNote}
        setSelectedCaseNote={setSelectedCaseNote}
      />
      <UserProfileDialog open={open} handleClose={() => setOpen(false)} user={UserDetails} userView={fullImageUrl} />
    </>
  );
};

export default CaseDetailsPage;
