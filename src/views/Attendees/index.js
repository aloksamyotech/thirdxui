import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Card,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { urls } from 'common/urls';
import { getApi, postApi } from 'common/apiClient';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

export default function SessionRegisterPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  const location = useLocation();

  const session = location?.state?.session || {};

  const sessionId = session?._id;

  useEffect(() => {
    const fetchpeople = async () => {
      const response = await getApi(urls?.serviceuser?.fetch);
      const allUser = response?.data?.allUser || [];

      const formattedUsers = allUser.map((user) => ({
        id: user?._id,
        name: `${user?.personalInfo?.firstName || ''} ${user?.personalInfo?.lastName || ''}`
      }));
      setRows(formattedUsers);
    };
    fetchpeople();
  }, []);

  const handleSubmit = async () => {
    if (!selectedUserId) {
      toast.error('Please select a user!');
      return;
    }

    try {
      const payload = {
        sessionId: sessionId,
        userId: selectedUserId
      };

      const response = await postApi(urls.attendees.create, payload);
      toast.success('Attendees added successfully');
    } catch (error) {
      console.error('Error while add attendee:', error);
      toast.error('Error while add attendee');
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => navigate('/view-session')}>
            <ArrowBackIcon />
          </IconButton>

          <Typography fontWeight="bold">SESSION REGISTER</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography color="text.secondary">Add Session attendees</Typography>
        </Box>
      </Box>

      <Box sx={{ minHeight: '100vh', mt: '10px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Card sx={{ p: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  {/* <Typography fontWeight="bold">16 Jan 2023 12:00 - 1h</Typography> */}
                  <Typography fontWeight="bold"> {moment(session?.date).format('D MMM YYYY HH:mm')}</Typography>
                  <Typography mt={1}>Lunch Club</Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <LocationOnIcon fontSize="small" color="action" />
                    <Typography ml={0.5} color="text.secondary">
                      {session?.country}
                    </Typography>
                  </Box>
                </Box>

                <Box textAlign="right">
                  <Typography fontSize={14} mb={1} color="text.secondary">
                    Session Registrar
                  </Typography>
                  <Typography>{session?.name}</Typography>
                </Box>
              </Box>

              <Box display="flex" justifyContent="flex-end" gap={1}>
                <Button variant="contained" size="small" sx={{ backgroundColor: '#042E4C' }}>
                  View Map
                </Button>
                <Button variant="outlined" size="small" sx={{ color: '#042E4C' }}>
                  Media
                </Button>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card sx={{ p: 2, height: '250px' }}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Typography fontWeight="bold">Add An Attendee</Typography>
                <AddCircleIcon sx={{ color: 'green' }} onClick={() => navigate('/add-serviceuser')} />
              </Box>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={8}>
                  <FormControl fullWidth>
                    <InputLabel>Select Attendee</InputLabel>
                    <Select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
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
                    >
                      SUBMIT
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
