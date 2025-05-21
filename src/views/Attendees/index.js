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
import { getApi } from 'common/apiClient';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CloseIcon from '@mui/icons-material/Close';

export default function SessionRegisterPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchpeople = async () => {
      const response = await getApi(urls.serviceuser.fetch);
      const allUser = response?.data?.allUser || [];
      const formattedUsers = allUser.map((user) => ({
        id: user._id,
        name: `${user.personalInfo?.firstName || ''} ${user.personalInfo?.lastName || ''}`
      }));
      setRows(formattedUsers);
    };
    fetchpeople();
  }, []);

   {/* <Box display="flex" alignItems="center">
          <IconButton onClick={() => navigate('/view-session')}>
            <ArrowBackIcon />
          </IconButton>

          <Typography fontWeight="bold">SESSION REGISTER</Typography>
        </Box> */}

  return (
    <>
      {/* <Box display="flex" justifyContent="space-between" alignItems="center">
       
         <Grid item xs={12} mb={2}>
        <Stack direction="row" alignItems="center">
          <Typography fontWeight="bold" display="flex" alignItems="center">
            <IconButton onClick={() => navigate('/view-session')}>
              <KeyboardBackspaceIcon sx={{ fontSize: 20, color: 'black' }} />
            </IconButton>
           SESSION REGISTER
          </Typography>
        </Stack>
      </Grid>


  <Box display="flex" alignItems="center" gap={1}>
          <Typography color="text.secondary">Add Session attendees</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'grey',
              borderRadius: '50%',
              width: 32,
              height: 32,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/case')}
          >
            <CloseIcon sx={{ color: 'white', fontSize: 20 }} />
          </Box>
        </Box>

      </Box> */}
       <Box display="flex" justifyContent="space-between" alignItems="center">
        <Grid item xs={12} mb={2}>
          <Stack direction="row" alignItems="center">
            <Typography fontWeight="bold" display="flex" alignItems="center">
              <IconButton onClick={() => navigate('/services')}>
                <KeyboardBackspaceIcon sx={{ fontSize: 20, color:"#515153" }} />
              </IconButton>
              SESSION REGISTER
            </Typography>
          </Stack>
        </Grid>

        <Box display="flex" alignItems="center" gap={1}>
          <Typography color="text.secondary">Add Session attendees</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'grey',
              borderRadius: '50%',
              width: 32,
              height: 32,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/services')}
          >
            <CloseIcon sx={{ color: 'white', fontSize: 20 }} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ minHeight: '100vh', mt: '10px' }}>
        <Grid container spacing={2}>
     <Grid item xs={12} md={5}>
  <Card
    sx={{
      p: 2,
      borderRadius: '10px',
      boxShadow: 'none',
      backgroundColor:'#fff',
       border: '2px solid #ececec'
    }}
  >
    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
      <Box>
        <Typography  fontSize="15px" fontWeight={500} color="#999999">
          16 Jan 2023&nbsp;&nbsp;12:00&nbsp;&nbsp;- 1h
        </Typography>

        <Typography mt={1} fontSize="15px" fontWeight={500} color="#999999">
          Lunch Club
        </Typography>
      </Box>

      <Box textAlign="right">
        <Typography fontSize="15px" color="#6E6E6E" fontWeight={500} mb={0.5}>
          Session Registrar
        </Typography>
        <Typography fontSize="15px" color="#999999" fontWeight={500}>
          Alfie James
        </Typography>
      </Box>
    </Box>

    {/* Location + Buttons Row */}
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
      <Box display="flex" alignItems="center">
        <LocationOnIcon fontSize="small" sx={{ color: '#333' }} />
        <Typography ml={0.5} fontSize="12px" >
          Kyson Primary
        </Typography>
      </Box>

      <Box display="flex" gap={1}>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: '#042E4C',
            color: '#FFFFFF',
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: '8px',
            boxShadow: 'none',
            '&:hover': { backgroundColor: '#042E4C' },
          }}
        >
          View Map
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{
            color: '#042E4C',
            textTransform: 'none',
            fontWeight: 500,
            borderColor: '#DADADA',
            borderRadius: '8px',
            backgroundColor: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#F0F0F0',
              borderColor: '#DADADA',
            },
          }}
        >
          Media
        </Button>
      </Box>
    </Box>
  </Card>
</Grid>



          <Grid item xs={12} md={7}>
            <Card sx={{ p: 2, height: '250px' ,  border: '2px solid #ececec'}}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Typography >Add An Attendee</Typography>
                <AddCircleIcon sx={{ color: 'green' }} onClick={() => navigate('/add-serviceuser')} />
              </Box>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={8}>
                  <FormControl fullWidth>
                    <InputLabel>Select Attendee</InputLabel>
                    <Select defaultValue="">
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
                        py: 0.5,
                        borderRadius: 2
                      }}
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
