import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Divider,
  TextField,
  Stack,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Background from 'assets/images/groupWork.jpg';
import Profile from 'assets/images/viewProfile.png';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PersonIcon from '@mui/icons-material/Person';
import AddSessionForm from './addSession.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [sessionLead, setSessionLead] = useState('');
  const sessionData = [
    { date: '8 Apr 2023', time: '10:00 AM', status: 'Cover letter writing-Group sessions', name: 'MARKET ROAD ATP-You', users: 9 },
    { date: '8 Apr 2023', time: '10:00 AM', status: 'Cover letter writing-Group sessions', name: 'MARKET ROAD ATP-You', users: 5 },
    { date: '8 Apr 2023', time: '10:00 AM', status: 'Cover letter writing-Group sessions', name: 'MARKET ROAD ATP-You', users: 3 }
  ];

  return (
    <Card sx={{ backgroundColor: '#eef2f6' }}>
      {showForm ? (
        <AddSessionForm onCancel={() => setShowForm(false)} />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center">
              <Typography variant="h4" display="flex" alignItems="center">
                <IconButton onClick={() => navigate('/dashboard/services')} sx={{ ml: 1 }}>
                  <ArrowBackIcon />
                </IconButton>
                DETAILS
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, overflow: 'hidden', maxWidth: 400, height: '450px' }}>
              <Box
                sx={{
                  height: 110,
                  backgroundImage: `url(${Background})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: 'blur(0.5px)',
                  px: 2
                }}
              ></Box>

              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', mt: -6 }}>
                <Avatar
                  src={Profile}
                  alt="User Avatar"
                  sx={{
                    width: 70,
                    height: 70,
                    border: '4px solid white'
                  }}
                />

                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Typography variant="h4" fontWeight="bold">
                    John Doe
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#41c048',
                      color: 'white',
                      fontSize: '8px',
                      borderRadius: '10px',
                      px: 1,
                      py: 0.5,
                      minWidth: 'auto'
                    }}
                  >
                    CURRENTLY ACTIVE
                  </Button>
                </Box>

                <Typography variant="body2" color="textSecondary">
                  Service Code: SC-12345
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Start Date: 2024-03-01
                </Typography>

                <Typography variant="body1" sx={{ mt: 2 }}>
                  <span style={{ fontWeight: 'bold' }}>Service Description:</span>&nbsp; Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Nulla convallis egestas rhoncus. Donec facilisis fermentum sem, ac viverra ante luctus vel.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: '20px', height: '450px' }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h4" fontWeight="bold">
                  Session List
                </Typography>
                <Tooltip title="Add Session" arrow>
                  <IconButton
                    onClick={() => setShowForm(true)}
                    sx={{
                      backgroundColor: '#41C048',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      boxShadow: 3,
                      color: 'white',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#41C048',
                        color: '#ffffff'
                      }
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Stack direction="row" alignItems="center" spacing={1}>
                <FilterAltIcon />
                <Typography variant="h6" fontWeight="bold">
                  Filter
                </Typography>
              </Stack>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ flexWrap: 'wrap', mb: 3 }}>
                  <Box sx={{ width: 100 }}>
                    <DatePicker
                      label="Date"
                      value={date}
                      onChange={(newValue) => setDate(newValue)}
                      slotProps={{
                        textField: {
                          size: 'small',
                          sx: { width: '100%' }
                        }
                      }}
                    />
                  </Box>

                  <TextField
                    select
                    label="Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    variant="outlined"
                    size="small"
                    sx={{ width: 100 }}
                  >
                    <MenuItem value="Morning">Morning</MenuItem>
                    <MenuItem value="Afternoon">Afternoon</MenuItem>
                    <MenuItem value="Evening">Evening</MenuItem>
                  </TextField>

                  <TextField
                    select
                    label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    variant="outlined"
                    size="small"
                    sx={{ width: 120 }}
                  >
                    <MenuItem value="Delhi">Delhi</MenuItem>
                    <MenuItem value="Mumbai">Mumbai</MenuItem>
                  </TextField>

                  <TextField
                    select
                    label="Session Lead"
                    value={sessionLead}
                    onChange={(e) => setSessionLead(e.target.value)}
                    variant="outlined"
                    size="small"
                    sx={{ width: 120 }}
                  >
                    <MenuItem value="Lead 1">Lead 1</MenuItem>
                    <MenuItem value="Lead 2">Lead 2</MenuItem>
                  </TextField>

                  <Button variant="contained" color="secondary" sx={{ height: 40, borderRadius: '12px' }}>
                    Apply
                  </Button>
                </Stack>
              </LocalizationProvider>

              <Card
                sx={{
                  height: 400,
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  '&::-webkit-scrollbar': {
                    width: '6px',
                    height: '8px'
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                    borderRadius: '10px'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#888',
                    borderRadius: '10px'
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: '#555'
                  }
                }}
              >
                <Grid container spacing={2}>
                  {sessionData.map((session, index) => (
                    <Grid item xs={12} key={index}>
                      <Card
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          boxShadow: 4
                        }}
                      >
                        <Box display="flex" justifyContent="flex-start" gap={4}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {session.date}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {session.status}
                          </Typography>
                        </Box>

                        <Box display="flex" justifyContent="flex-start" gap={5}>
                          <Typography variant="body2" color="textSecondary">
                            {session.time}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {session.name}
                          </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" justifyContent="left" gap={6}>
                          <Box display="flex" alignItems="center" sx={{ mr: 2 }}>
                            <PersonIcon fontSize="small" />
                            <Typography variant="body1" sx={{ ml: 0.5 }}>
                              {session.users}
                            </Typography>
                          </Box>

                          <Box display="flex" alignItems="center">
                            {['Edit Register', 'Edit Session', 'Add Media', 'Notes'].map((option, i) => (
                              <Box key={i} display="flex" alignItems="center">
                                <Typography
                                  variant="body2"
                                  sx={{
                                    px: 1,
                                    cursor: 'pointer',
                                    color: 'primary.main',
                                    textAlign: 'center'
                                  }}
                                >
                                  {option}
                                </Typography>
                                {i < 3 && <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 20 }} />}
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Card>
          </Grid>
        </Grid>
      )}
    </Card>
  );
};

export default UserProfile;
