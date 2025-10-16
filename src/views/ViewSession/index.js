import React from 'react';
import { Box, Grid, Typography, Paper, Chip, Button, IconButton, Divider, Stack, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TagIcon from '@mui/icons-material/LocalOffer';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useEffect, useState } from 'react';
import { urls } from 'common/urls';
import CancelIcon from '@mui/icons-material/Cancel';
import { getApi, updateApi } from 'common/apiClient';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { imageUrl } from 'common/urls';
import OptionsPopover from 'components/AddFilter';
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';
import SectionSkeleton from 'ui-component/Loader/SectionSkeleton';
import { DataGrid } from '@mui/x-data-grid';
import PersonIcon from '@mui/icons-material/Person';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';
import toast from 'react-hot-toast';
import AddAttendeeDialog from 'components/AddAttendeeDialog';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const ServiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDialog, setOpen] = useState(false);

  // const { serviceid } = location.state || {};
  const [serviceTypeName, setServiceTypeName] = useState('');
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [groupedTagsArray, setGroupedTagsArray] = useState([]);

  const session = location.state?.session;
  const [rowsAttendee, setRowsAttendee] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5
  });
  const handleOpen = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);
  const [totalRows, setTotalRows] = useState(0);
  const sessionId = sessionData?.[0]?._id || location?.state?.sessionId || session?.sessionId;

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const formatDate = (date) => {
    if (!date) return 'N/A';
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-IN', options);
  };

  const fetchpeopleAttendee = async () => {
    if (!sessionId) return;
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        role: 'service_user'
      });

      const response = await getApi(`${urls.attendees.getAttendeesBySession}/${sessionId}?${queryParams.toString()}`);

      const attendeesData = response?.data?.data || [];
      const formattedUsers = attendeesData.map((item, index) => ({
        id: item._id,
        attendeeId: item.attendee?._id,
        serialNumber: `#C-${(index + 1).toString().padStart(3, '0')}`,
        firstName: item.attendee?.personalInfo?.firstName || '',
        lastName: item.attendee?.personalInfo?.lastName || '',
        address: item.attendee?.contactInfo?.addressLine1 || '',
        country: item.attendee?.contactInfo?.country || '',
        postcode: item.attendee?.contactInfo?.postcode || '',
        sessionName: item.session?.name || ''
      }));

      setRowsAttendee(formattedUsers);
      setTotalRows(response?.data?.meta?.total || 0);
    } catch (error) {
      toast.error('Failed to load attendees');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async (attendee) => {
    try {
      const attendeeId = attendee?.id;
      if (!sessionId || !attendeeId) {
        toast.error('Failed to Delete Attendee');
        return;
      }
      const response = await updateApi(`${urls.attendees.delete}/${sessionId}/${attendeeId}`);
      if (response?.message == 'Success') {
        toast.success('Attendee Deleted Successfully');
      } else {
        toast.success('Failed to Delete Attendee');
      }
    } catch {
      toast.error('Failed to Delete Attendee');
    } finally {
      fetchpeopleAttendee();
    }
  };

  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (!session?._id) return;
      try {
        const res = await getApi(urls.session.getById.replace(':id', session?._id));
        setSessionData(res?.data?.userData || {});
      } catch (error) {
        console.error('Failed to fetch service details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [session?._id]);

  useEffect(() => {
    const fetchServiceTypeName = async () => {
      try {
        const response = await getApi(urls.configuration.fetch);
        const configList = response?.data?.allConfiguration || [];
        const serviceTypeConfigs = configList.filter((item) => item.configurationType === 'Service Types');
        const matched = serviceTypeConfigs.find((item) => item._id === sessionData?.serviceType || item._id?.$oid === serviceType);

        if (matched) {
          setServiceTypeName(matched.name);
        } else {
          setServiceTypeName('Unknown');
        }
      } catch (error) {
        console.error('Error fetching configuration:', error);
        setServiceTypeName('Unknown');
      } finally {
        setLoading(false);
      }
    };
    if (sessionData?.serviceType) {
      fetchServiceTypeName();
    }
  }, [sessionData?.serviceType]);

  useEffect(() => {
    setLoading(true);

    const groupedTags = (sessionData?.[0]?.tags || []).reduce((acc, tag) => {
      const categoryName = tag?.tagCategoryId?.name || 'Uncategorized';

      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }

      acc[categoryName].push(tag.name);

      return acc;
    }, {});

    const groupedArray = Object.entries(groupedTags ?? {}).map(([category, tags]) => ({
      category,
      tags
    }));

    setGroupedTagsArray(groupedArray);
    setLoading(false);
  }, [sessionData]);
  useEffect(() => {
    if (sessionId) {
      fetchpeopleAttendee();
    }
  }, [paginationModel, sessionId]);
  const columns = [
    {
      field: 'details',
      headerName: 'Details',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={2} width="100%" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <PersonIcon />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 450 }}>
                {params.row.firstName} {params.row.lastName} {params.row.serialNumber}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {params.row.address} {params.row.country} {params.row.postcode}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Info" arrow>
              <IconButton>
                <InfoIcon sx={{ color: '#49494c' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" arrow>
              <IconButton
                sx={{ color: '#49494c' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(params.row);
                }}
              >
                <DeleteIcon sx={{ color: 'red' }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      )
    }
  ];
  return (
    <>
      <AddAttendeeDialog
        open={openDialog}
        onClose={handleCloseDialog}
        sessionId={sessionId}
        fetchpeopleAttendee={fetchpeopleAttendee}
      ></AddAttendeeDialog>
      <Box sx={{ p: 2 }}>
        <Grid item xs={12} mb={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ width: '100%' }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton onClick={() => navigate(-1)}>
                <KeyboardBackspaceIcon sx={{ fontSize: 20, color: 'black' }} />
              </IconButton>
              <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">
                {sessionData?.[0].serviceId?.name} Session
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid container spacing={2} sx={{ height: 'auto' }}>
          <Grid item xs={12} md={12} sx={{ height: 'auto' }}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Box display="flex" alignItems="center">
                  <Diversity2OutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">ABOUT SESSION</Typography>
                </Box>
                <Button
                  variant="contained"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate('/add-session', { state: { session } });
                  }}
                  sx={{
                    borderRadius: '6px',
                    width: '12%',
                    height: 'auto',
                    fontSize: '14px',
                    backgroundColor: '#009fc7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    '&:hover': {
                      backgroundColor: '#009fc7'
                    }
                  }}
                >
                  <EditOutlinedIcon sx={{ fontSize: 16 }} />
                  Edit
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ overflowY: 'auto', flexGrow: 1, borderRadius: 2 }} padding={2} bgcolor={'#F7F7F7'}>
                {loading ? (
                  <SectionSkeleton lines={1} variant="rectangular" height={150} spacing={1} />
                ) : (
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.5,
                          '& > *:first-of-type': {
                            fontWeight: 700,
                            fontSize: '12px',
                            lineHeight: '16px'
                          },
                          '& > *:last-of-type': {
                            fontWeight: 500,
                            fontSize: '12px',
                            lineHeight: '20px'
                          }
                        }}
                      >
                        <Typography component="span">Date:</Typography>
                        <Typography component="span">{formatDate(sessionData?.[0]?.createdAt) || '-'}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.5,
                          '& > *:first-of-type': {
                            fontWeight: 600,
                            fontSize: '12px',
                            lineHeight: '16px'
                          },
                          '& > *:last-of-type': {
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '20px'
                          }
                        }}
                      >
                        <Typography component="span">Time:</Typography>
                        <Typography component="span">{sessionData?.[0]?.time || '-'}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.5,
                          '& > *:first-of-type': {
                            fontWeight: 600,
                            fontSize: '12px',
                            lineHeight: '16px'
                          },
                          '& > *:last-of-type': {
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '20px'
                          }
                        }}
                      >
                        <Typography component="span">Location:</Typography>
                        <Typography component="span">{sessionData?.[0]?.country?.name || '-'}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.5,
                          '& > *:first-of-type': {
                            fontWeight: 600,
                            fontSize: '12px',
                            lineHeight: '16px'
                          },
                          '& > *:last-of-type': {
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '20px'
                          }
                        }}
                      >
                        <Typography component="span">Session Lead:</Typography>
                        <Typography component="span">{[sessionData?.[0]?.serviceuser?.name].filter(Boolean).join(' ') || '-'}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} sx={{ height: '100%' }}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Header */}
              <Box display="flex" alignItems="center" mb={0.5}>
                <Typography variant="subtitle1">Session Notes</Typography>
              </Box>

              <Box
                mb={2}
                p={2}
                sx={{
                  backgroundColor: '#F7F7F7',
                  borderRadius: 2,
                  width: '100%'
                }}
              >
                <Typography component="span">{[sessionData?.[0]?.description].filter(Boolean).join(' ') || '-'}</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={0.5}>
                <Typography variant="subtitle1">Attachments</Typography>
              </Box>

              <Box
                mb={2}
                p={2}
                sx={{
                  backgroundColor: '#F7F7F7',
                  borderRadius: 2,
                  width: '100%'
                }}
              >
                {sessionData?.[0]?.file ? (
                  <Chip
                    label={sessionData[0].file}
                    size="small"
                    onDelete={() => {}}
                    deleteIcon={
                      <CancelIcon
                        sx={{
                          fontSize: 16,
                          color: '#009FC7'
                        }}
                      />
                    }
                    sx={{
                      backgroundColor: '#009FC7',
                      color: '#FFFFFF',
                      height: 24,
                      fontSize: '0.75rem',
                      padding: '0 4px',
                      '& .MuiChip-deleteIcon': {
                        marginLeft: '4px',
                        color: '#009FC7'
                      }
                    }}
                  />
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No attachment available
                  </Typography>
                )}
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="subtitle1">Session Tags</Typography>
              </Box>

              <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
                {loading ? (
                  <SectionSkeleton lines={4} height={100} spacing={1} />
                ) : groupedTagsArray.length === 0 ? (
                  <Typography variant="body2" color="textSecondary">
                    No tags found.
                  </Typography>
                ) : (
                  groupedTagsArray.map((group, idx) => (
                    <Box
                      key={idx}
                      mb={2}
                      p={2}
                      sx={{
                        backgroundColor: '#F7F7F7',
                        borderRadius: 2,
                        width: '100%'
                      }}
                    >
                      <Box display="flex" alignItems="center" mb={1}>
                        <Typography variant="subtitle2">{group.category}</Typography>
                      </Box>

                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {group.tags.map((tag, i) => (
                          <Chip
                            key={i}
                            label={tag}
                            size="small"
                            onDelete={() => {}}
                            deleteIcon={
                              <CancelIcon
                                sx={{
                                  fontSize: 16,
                                  color: '#009FC7'
                                }}
                              />
                            }
                            sx={{
                              backgroundColor: '#009FC7',
                              color: '#FFFFFF',
                              height: 24,
                              fontSize: '0.75rem',
                              padding: '0 4px',

                              '& .MuiChip-deleteIcon': {
                                marginLeft: '4px',
                                color: '#009FC7'
                              }
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} sx={{ height: '100%' }}>
            <Paper
              variant="outlined"
              sx={{
                minHeight: 200,
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Header */}
              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="subtitle1">Attendee List</Typography>
              </Box>

              <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
                {loading ? (
                  <SectionSkeleton lines={4} height={100} spacing={1} />
                ) : rowsAttendee.length === 0 ? (
                  <Typography variant="body2" color="textSecondary">
                    No data found.
                  </Typography>
                ) : (
                  <DataGrid
                    rows={loading ? [] : rowsAttendee}
                    columns={columns}
                    rowCount={totalRows}
                    loading={loading}
                    pagination
                    paginationMode="server"
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10, 25, 50]}
                    rowHeight={65}
                    getRowId={(row) => row?.id}
                    onRowClick={(params) => navigate('/view-people', { state: { id: params.row.attendeeId } })}
                    slots={{
                      // toolbar: CustomHeader,
                      loadingOverlay: () => (
                        <Box
                          sx={{
                            minHeight: '200px',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'self-start',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)'
                          }}
                        >
                          <SingleRowLoader />
                        </Box>
                      ),
                      noRowsOverlay: () => (
                        <Box sx={{ padding: 2, textAlign: 'center' }}>{loading ? 'Loading...' : 'No data available'}</Box>
                      )
                    }}
                    sx={{
                      border: 'none',
                      '& .MuiDataGrid-columnHeaders': { display: 'none' },
                      '& .MuiDataGrid-cell': {
                        textAlign: 'left',
                        fontSize: '14px'
                        // borderBottom: 'none'
                      },
                      '& .MuiDataGrid-row': { cursor: 'pointer' },
                      '& .MuiDataGrid-footerContainer': {
                        borderTop: 'none'
                      }
                    }}
                    disableSelectionOnClick
                  />
                )}
              </Box>
              <Divider></Divider>
              <Box display="flex" alignItems="center" justifyContent="flex-end" mt={2.5} mb={2}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: '#009fc7',
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    '&:hover': { backgroundColor: '#009fc7' },
                    paddingInline: '15px',
                    paddingBlock: '7px',
                    borderRadius: '10px'
                  }}
                  onClick={handleOpen}
                >
                  Add Attendee <AddIcon sx={{ ml: 1 }} />
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ServiceDetails;
