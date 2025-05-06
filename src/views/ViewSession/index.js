import { useState, useEffect } from 'react';
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
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const columns = [
  { field: 'location', headerName: 'Location', flex: 1 },
  { field: 'sessionLead', headerName: 'Session Lead', flex: 1 },
  { field: 'serviceType', headerName: 'Service Type', flex: 1 },
  { field: 'date', headerName: 'Date', flex: 1 },
  { field: 'time', headerName: 'Time', flex: 1 }
];

const rows = [
  {
    id: 1,
    location: 'New York',
    sessionLead: 'Aidan Ayonaudu',
    serviceType: 'Counseling',
    date: '2025-05-06',
    time: '10:00 AM'
  },
  {
    id: 2,
    location: 'Los Angeles',
    sessionLead: 'Jessica Cole',
    serviceType: 'Support Group',
    date: '2025-05-07',
    time: '2:30 PM'
  }
];

const UserProfile = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={() => navigate('/services')}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" fontWeight="bold">
              JACS : COMMUNICATION SESSION
            </Typography>
          </Stack>
          <Button
            variant="contained"
            size="small"
            sx={{ textTransform: 'none', backgroundColor: '#1B4B66' }}
            onClick={() => navigate('/attendees')}
          >
            View Attendees List
          </Button>
        </Stack>
      </Box>

      <Box sx={{ height: 'auto', width: '100%', background: '#ffff' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          disableSelectionOnClick
          sx={{
            border: 0,
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              fontWeight: 'bold'
            }
          }}
        />
      </Box>
    </>
  );
};

export default UserProfile;
