import React from 'react';
import { Box, Typography, Grid, Button, Divider, IconButton } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useLocation } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { urls } from 'common/urls';
import { updateApi } from 'common/apiClient';
const DuplicateDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { ids, names, emails, phones, dobs, added } = location.state || {};

  const rowLabelStyle = { fontWeight: 'bold', color: '#555', fontSize: '12px' };
  const rowDataStyle = { color: '#333', fontSize: '12px' };

  const rowLabels = ['Added', 'Name', 'Email', 'Phone', 'Date of Birth'];
  const rowValues = [added, names, emails, phones, dobs];
  const handleMerge = async (selectedId) => {
    const toDeleteIds = ids.filter((id) => id !== selectedId);

    try {
      for (const id of toDeleteIds) {
        const res = await updateApi(urls.serviceuser.deleteUser.replace(':userId', id));
      }

      navigate(-1);
    } catch (error) {
      console.error('Error while deleting users:', error);
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      <Typography fontWeight="600" fontSize="12px" display="flex" alignItems="center" mb={2}>
        <IconButton onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon sx={{ fontSize: 16, color: 'black' }} />
        </IconButton>
        Duplicates
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
            <Grid container sx={{ bgcolor: '#f9f9f9', p: 2 }}>
              <Grid item xs={3}>
                <Typography sx={{ fontWeight: 500, fontSize: '12px' }}>
                  Matched on <strong>Email, Name, DOB</strong>
                </Typography>
              </Grid>

              {names.map((_, idx) => (
                <Grid item xs key={idx}>
                  <Typography sx={{ fontWeight: 600, fontSize: '12px' }}>Test {String.fromCharCode(65 + idx)}</Typography>
                </Grid>
              ))}
            </Grid>
            <Divider />

            {rowLabels.map((label, idx) => (
              <React.Fragment key={idx}>
                <Grid container sx={{ p: 2 }}>
                  <Grid item xs={3}>
                    <Typography sx={rowLabelStyle}>{label}</Typography>
                  </Grid>
                  {rowValues[idx].map((value, valueIdx) => (
                    <Grid item xs key={valueIdx}>
                      <Typography sx={rowDataStyle}>{value}</Typography>
                    </Grid>
                  ))}
                </Grid>
                <Divider />
              </React.Fragment>
            ))}
          </Box>
        </Grid>

        <Grid item xs={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', marginTop: '40px' }}>
            <Button variant="outlined" color="inherit" sx={{ fontSize: '0.65rem', width: '120px' }} onClick={() => navigate(-1)}>
              NO ACTION
            </Button>

            {ids?.map((id, idx) => (
              <Button
                key={id}
                variant="contained"
                sx={{
                  width: '120px',
                  backgroundColor: '#009FC7',
                  fontSize: '0.65rem',
                  mt: 1,
                  '&:hover': { backgroundColor: '#007FA3' }
                }}
                onClick={() => handleMerge(id)}
              >
                <EastIcon sx={{ mr: 1 }} fontSize="small" /> MERGE {String.fromCharCode(65 + idx)}
              </Button>
            ))}

            <Button
              variant="contained"
              sx={{
                width: '120px',
                backgroundColor: '#053146',
                fontSize: '0.65rem',
                '&:hover': { backgroundColor: '#041F2C' }
              }}
              onClick={() => navigate(-1)}
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
