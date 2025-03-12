import { Divider, Select, MenuItem, TextField, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';

const Sessions = () => {
  return (
    <Box sx={{ bgcolor: '#fff', p: '10px', borderRadius: '10px', height: '430px' }}>
      <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
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
        <Stack direction="row" sx={{ padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
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
          <Stack direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontSize: '8px', bgcolor: '#053146', color: '#fff', py: '2px', px: '5px', borderRadius: '5px' }}>Edit Session</Typography>
            <Typography sx={{ fontSize: '8px', bgcolor: '#fff', border: '1px solid #053146', color: '#053146', py: '2px', px: '5px', borderRadius: '5px' }}>Add Register</Typography>
          </Stack>
          <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <InfoIcon />
          </Stack>
        </Stack>
        <Divider />
        <Stack direction="row" sx={{ padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
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
          <Stack direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontSize: '8px', bgcolor: '#053146', color: '#fff', py: '2px', px: '5px', borderRadius: '5px' }}>Edit Session</Typography>
            <Typography sx={{ fontSize: '8px', bgcolor: '#fff', border: '1px solid #053146', color: '#053146', py: '2px', px: '5px', borderRadius: '5px' }}>Add Register</Typography>
          </Stack>
          <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <InfoIcon />
          </Stack>
        </Stack>
        <Divider />
        <Stack direction="row" sx={{ padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
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
          <Stack direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontSize: '8px', bgcolor: '#053146', color: '#fff', py: '2px', px: '5px', borderRadius: '5px' }}>Edit Session</Typography>
            <Typography sx={{ fontSize: '8px', bgcolor: '#fff', border: '1px solid #053146', color: '#053146', py: '2px', px: '5px', borderRadius: '5px' }}>Add Register</Typography>
          </Stack>
          <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <InfoIcon />
          </Stack>
        </Stack>
        <Divider />
        <Stack direction="row" sx={{ padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
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
          <Stack direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontSize: '8px', bgcolor: '#053146', color: '#fff', py: '2px', px: '5px', borderRadius: '5px' }}>Edit Session</Typography>
            <Typography sx={{ fontSize: '8px', bgcolor: '#fff', border: '1px solid #053146', color: '#053146', py: '2px', px: '5px', borderRadius: '5px' }}>Add Register</Typography>
          </Stack>
          <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <InfoIcon />
          </Stack>
        </Stack>
        <Divider />
        <Typography sx={{ textAlign: 'center', py: '10px', fontSize: '10px' }}>View All Sessions</Typography>
      </Stack>
    </Box>
  );
};

export default Sessions;
