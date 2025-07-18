import React from 'react';
import { Box, Typography, Grid, Button, Divider, IconButton } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';

const DuplicateDetails = () => {
  const navigate = useNavigate();

  const recordA = {
    added: '29/01/2020',
    firstName: 'A',
    lastName: 'Test',
    email: 'family@test.com',
    address: ''
  };

  const recordB = {
    added: '29/01/2020',
    firstName: 'B',
    lastName: 'Test',
    email: 'family@test.com',
    address: ''
  };

  const rowLabelStyle = { fontWeight: 'bold', color: '#555' };
  const rowDataStyle = { color: '#333' };

  return (
    <Box sx={{ p: 1 }}>
      <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center" mb={2}>
        <IconButton onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon sx={{ fontSize: 20, color: 'black' }} />
        </IconButton>
        Duplicates
      </Typography>

      <Grid container spacing={2}>
        {/* Main Content */}
        <Grid item xs={10}>
          <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
            <Grid container sx={{ bgcolor: '#f9f9f9', p: 2 }}>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: 500 }}>
                  Matched on <strong>Email, Last Name</strong>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: 600 }}>Test, A (2042)</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontWeight: 600 }}>Test, B (2043)</Typography>
              </Grid>
            </Grid>
            <Divider />

            {['Added', 'First Name', 'Last Name', 'Email', 'Address'].map((label, index) => (
              <React.Fragment key={index}>
                <Grid container sx={{ p: 2 }}>
                  <Grid item xs={4}>
                    <Typography sx={rowLabelStyle}>{label}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={rowDataStyle}>{recordA[label.toLowerCase().replace(/ /g, '')]}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={rowDataStyle}>{recordB[label.toLowerCase().replace(/ /g, '')]}</Typography>
                  </Grid>
                </Grid>
                <Divider />
              </React.Fragment>
            ))}
          </Box>
        </Grid>

        {/* Vertical Buttons */}
        <Grid item xs={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button variant="outlined" color="inherit" sx={{ fontSize: '0.75rem' }} fullWidth>
              NO ACTION
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: '#009FC7', fontSize: '0.75rem', '&:hover': { backgroundColor: '#007FA3' } }}
            >
              <WestIcon fontSize="small" sx={{ mr: 1 }} />
              MERGE
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: '#009FC7', fontSize: '0.75rem', '&:hover': { backgroundColor: '#007FA3' } }}
            >
              <EastIcon sx={{ mr: 1 }} fontSize="small" /> MERGE
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: '#053146', fontSize: '0.75rem', '&:hover': { backgroundColor: '#041F2C' } }}
            >
              NOT DUPLICATES
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DuplicateDetails;
