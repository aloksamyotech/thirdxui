import { Divider, Select, MenuItem, TextField, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';

const Sessions = () => {
  return (
    <Box sx={{ bgcolor: '#fff', p: '10px', borderRadius: '10px' }}>
        <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px'}}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Current Sessions
          </Typography>
          <Stack direction="row" spacing={1}>
            <Select value="This Week" size="small">
              <MenuItem value="This Week">This Week</MenuItem>
              <MenuItem value="This Month">This Month</MenuItem>
              <MenuItem value="This Year">This Year</MenuItem>
            </Select>
            <TextField variant="outlined" placeholder="search" size="small" />
          </Stack>
        </Stack>
   

      <Stack sx={{ marginTop: '5px' }}>
        <Divider />
        <Stack direction="row" sx={{ padding: '10px' }}>
          <Stack>
            <Stack>
              <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>25 oct 2021</Typography>
            </Stack>
            <Stack>
              <Typography sx={{ fontSize: '11px', textAlign: 'center' }}>18:00</Typography>
            </Stack>
          </Stack>
          <Stack sx={{ ml: '10px' }}>
            <Stack>
              <Typography sx={{ opacity: '0.9', fontSize: '12px', fontWeight: 600 }}>Cover Letter Writing</Typography>
            </Stack>
            <Stack>
              <Typography sx={{ opacity: '0.9', fontSize: '12px', mt: '3px' }}>Online session conducted by</Typography>
            </Stack>
            <Stack>
              <Typography sx={{ opacity: '0.9', fontSize: '12px' }}>Maria imparted...</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mt: '16px', ml: '30px' }}>
            <Box
              sx={{
                fontSize: '10px',
                textTransform: 'none',
                backgroundColor: '#053146',
                color: 'white',
                borderRadius: '4px',
                padding: '1px 2px',
                maxWidth: '90px',
                maxHeight: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#021d2a',
                  color: 'white'
                }
              }}
            >
              Edit Session
            </Box>
            <Box
              sx={{
                fontSize: '10px',
                textTransform: 'none',
                backgroundColor: 'white',
                color: '#053146',
                border: '1px solid #053146',
                borderRadius: '4px',
                padding: '1px 2px',
                maxWidth: '90px',
                maxHeight: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  color: '#053146',
                  border: '2px solid #053146'
                }
              }}
            >
              Add Register
            </Box>
          </Stack>

          <Stack sx={{ mt: '12px', ml: '70px' }}>
            <InfoIcon />
          </Stack>
        </Stack>
        <Divider />
        <Stack direction="row" sx={{ padding: '10px' }}>
          <Stack>
            <Stack>
              <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>25 oct 2021</Typography>
            </Stack>
            <Stack>
              <Typography sx={{ fontSize: '11px', textAlign: 'center' }}>18:00</Typography>
            </Stack>
          </Stack>
          <Stack sx={{ ml: '10px' }}>
            <Stack>
              <Typography sx={{ opacity: '0.9', fontSize: '12px', fontWeight: 600 }}>Cover Letter Writing</Typography>
            </Stack>
            <Stack>
              <Typography sx={{ opacity: '0.9', fontSize: '12px', mt: '3px' }}>Online session conducted by</Typography>
            </Stack>
            <Stack>
              <Typography sx={{ opacity: '0.9', fontSize: '12px' }}>Maria imparted...</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mt: '16px', ml: '30px' }}>
            <Box
              sx={{
                fontSize: '10px',
                textTransform: 'none',
                backgroundColor: '#053146',
                color: 'white',
                borderRadius: '4px',
                padding: '1px 2px',
                maxWidth: '90px',
                maxHeight: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#021d2a',
                  color: 'white'
                }
              }}
            >
              Edit Session
            </Box>
            <Box
              sx={{
                fontSize: '10px',
                textTransform: 'none',
                backgroundColor: 'white',
                color: '#053146',
                border: '1px solid #053146',
                borderRadius: '4px',
                padding: '1px 2px',
                maxWidth: '90px',
                maxHeight: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  color: '#053146',
                  border: '2px solid #053146'
                }
              }}
            >
              Add Register
            </Box>
          </Stack>

          <Stack sx={{ mt: '12px', ml: '70px' }}>
            <InfoIcon />
          </Stack>
        </Stack>

        <Divider />
        <Stack direction="row" sx={{ padding: '10px' }}>
          <Stack>
            <Stack>
              <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>25 oct 2021</Typography>
            </Stack>
            <Stack>
              <Typography sx={{ fontSize: '11px', textAlign: 'center' }}>18:00</Typography>
            </Stack>
          </Stack>
          <Stack sx={{ ml: '10px' }}>
            <Stack>
              <Typography sx={{ opacity: '0.9', fontSize: '12px', fontWeight: 600 }}>Cover Letter Writing</Typography>
            </Stack>
            <Stack>
              <Typography sx={{ opacity: '0.9', fontSize: '12px', mt: '3px' }}>Online session conducted by</Typography>
            </Stack>
            <Stack>
              <Typography sx={{ opacity: '0.9', fontSize: '12px' }}>Maria imparted...</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mt: '16px', ml: '30px' }}>
            <Box
              sx={{
                fontSize: '10px',
                textTransform: 'none',
                backgroundColor: '#053146',
                color: 'white',
                borderRadius: '4px',
                padding: '1px 2px',
                maxWidth: '90px',
                maxHeight: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#021d2a',
                  color: 'white'
                }
              }}
            >
              Edit Session
            </Box>
            <Box
              sx={{
                fontSize: '10px',
                textTransform: 'none',
                backgroundColor: 'white',
                color: '#053146',
                border: '1px solid #053146',
                borderRadius: '4px',
                padding: '1px 2px',
                maxWidth: '90px',
                maxHeight: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  color: '#053146',
                  border: '2px solid #053146'
                }
              }}
            >
              Add Register
            </Box>
          </Stack>

          <Stack sx={{ mt: '12px', ml: '70px' }}>
            <InfoIcon />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Sessions;
