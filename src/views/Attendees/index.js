/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, IconButton, Card, Button, Select, MenuItem, FormControl, InputLabel, Tooltip, Stack } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { urls } from 'common/urls';
import { getApi, postApi } from 'common/apiClient';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';
import toast from 'react-hot-toast';

export default function SessionRegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedUserId, setSelectedUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowsAttendee, setRowsAttendee] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5
  });
  const [totalRows, setTotalRows] = useState(0);

  const session = location?.state?.session || {};
  const sessionId = session?._id;

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
          <Tooltip title="Info" arrow>
            <IconButton>
              <InfoIcon sx={{ color: '#49494c' }} />
            </IconButton>
          </Tooltip>
        </Stack>
      )
    }
  ];

  const fetchpeopleAttendee = async () => {
    try {
      setLoading(true);
      const response = await getApi(`${urls.attendees.getAttendeesBySession}/${sessionId}`, {
        params: {
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize,
          role: 'service_user'
        }
      });

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
      console.error('Failed to fetch attendees:', error);
      toast.error('Failed to load attendees');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableUsers = async () => {
    try {
      const response = await getApi(urls?.serviceuser?.fetch);
      const allUser = response?.data?.allUser || [];
      const formattedUsers = allUser.map((user) => ({
        id: user?._id,
        name: `${user?.personalInfo?.firstName || ''} ${user?.personalInfo?.lastName || ''}`
      }));
      setRows(formattedUsers);
    } catch (error) {
      console.error('Failed to fetch available users:', error);
      toast.error('Failed to load available users');
    }
  };

  const handleSubmit = async () => {
    if (!selectedUserId) {
      toast.error('Please select a user!');
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        sessionId: sessionId,
        userId: selectedUserId
      };

      const response = await postApi(urls.attendees.create, payload);
      console.log(response, 'responseresponse');

      if (response.success) {
        toast.success('Attendee added successfully');
        fetchpeopleAttendee(); 
        setSelectedUserId(''); 
      } else {
        toast.error(response.data.message || 'Failed to add attendee');
      }
    } catch (error) {
      console.error('Error while adding attendee:', error);
      toast.error(error.response?.data?.message || 'Error while adding attendee');
    } finally {
      setIsSubmitting(false);
    }
  };

  const CustomHeader = () => (
    <Box sx={{ height: '50px', display: 'flex', alignItems: 'center' }}>
      <GridToolbarContainer
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #ddd',
          width: '100%',
          height: '100%',
          padding: '0 12px'
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: '', color: '#333', fontSize: '14px', lineHeight: '36px' }}>
          People List
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GridToolbarExport />
        </Box>
      </GridToolbarContainer>
    </Box>
  );

  useEffect(() => {
    fetchpeopleAttendee();
  }, [paginationModel]);

  useEffect(() => {
    fetchAvailableUsers();
  }, []);

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => navigate('/view-session')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography fontWeight="bold">Attendee List</Typography>
        </Box>
      </Box>

<Box sx={{ minHeight: 'auto', mt: '10px' }}>        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card style={{ height: 'auto'}}>
              <DataGrid
                rows={loading ? [] : rowsAttendee}
                columns={columns}
                rowCount={totalRows}
                loading={loading}
                pagination
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5]}
                rowHeight={65}
                getRowId={(row) => row.id}
                onRowClick={(params) => navigate('/services', { state: params.row })}
                slots={{
                  toolbar: CustomHeader,
                  loadingOverlay: () => (
                    <Box
                      sx={{
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
                  noRowsOverlay: () => <Box sx={{ padding: 2, textAlign: 'center' }}>{loading ? 'Loading...' : 'No data available'}</Box>
                }}
                sx={{
                  '& .MuiDataGrid-columnHeaders': { display: 'none' },
                  '& .MuiDataGrid-cell': { textAlign: 'left', fontSize: '14px' },
                  '& .MuiDataGrid-row': { cursor: 'pointer' }
                }}
                disableSelectionOnClick
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, height: '250px' }}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Typography fontWeight="bold">Add An Attendee</Typography>
                <AddCircleIcon sx={{ color: 'green', cursor: 'pointer' }} onClick={() => navigate('/add-serviceuser')} />
              </Box>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={8}>
                  <FormControl fullWidth>
                    <InputLabel>Select Attendee</InputLabel>
                    <Select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)} label="Select Attendee">
                      {rows.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#042E4C',
                        px: 2,
                        py: 1,
                        borderRadius: 2
                      }}
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Adding...' : 'SUBMIT'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
