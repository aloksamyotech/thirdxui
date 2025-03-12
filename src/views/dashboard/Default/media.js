import { Divider, Select, MenuItem, TextField, Typography } from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { IconSeeding } from '@tabler/icons';

const Sessions = () => {
  return (
    <Box sx={{ bgcolor: '#fff', p: '10px', borderRadius: '10px' }}>
      <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Recent Media
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
        <Stack direction="row" sx={{ padding: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row">
            <Stack>
              <Box
                sx={{
                  width: 80,
                  height: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#CCC5C5',
                  borderRadius: '10%',
                  color: 'white'
                }}
              >
                <IconSeeding fontSize="medium" />
              </Box>
            </Stack>

            <Stack sx={{ ml: '40px' }}>
              <Typography sx={{ opacity: '0.9', fontSize: '14px', fontWeight: 600 }}>File Name</Typography>
              <Typography sx={{ opacity: '0.9', fontSize: '12px', mt: '5px' }}>
                Created by : Robert &nbsp;&nbsp; | &nbsp; Created on : 23 Oct&apos;25
              </Typography>
            </Stack>
          </Stack>

          <Stack>
            <InfoIcon />
          </Stack>
        </Stack>

        <Divider />
        <Stack direction="row" sx={{ padding: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row">
            <Stack>
              <Box
                sx={{
                  width: 80,
                  height: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#CCC5C5',
                  borderRadius: '10%',
                  color: 'white'
                }}
              >
                <IconSeeding fontSize="medium" />
              </Box>
            </Stack>

            <Stack sx={{ ml: '40px' }}>
              <Typography sx={{ opacity: '0.9', fontSize: '14px', fontWeight: 600 }}>File Name</Typography>
              <Typography sx={{ opacity: '0.9', fontSize: '12px', mt: '5px' }}>
                Created by : Robert &nbsp;&nbsp; | &nbsp; Created on : 23 Oct&apos;25
              </Typography>
            </Stack>
          </Stack>

          <Stack>
            <InfoIcon />
          </Stack>
        </Stack>

        <Divider />
        <Stack direction="row" sx={{ padding: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row">
            <Stack>
              <Box
                sx={{
                  width: 80,
                  height: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#CCC5C5',
                  borderRadius: '10%',
                  color: 'white'
                }}
              >
                <IconSeeding fontSize="medium" />
              </Box>
            </Stack>

            <Stack sx={{ ml: '40px' }}>
              <Typography sx={{ opacity: '0.9', fontSize: '14px', fontWeight: 600 }}>File Name</Typography>
              <Typography sx={{ opacity: '0.9', fontSize: '12px', mt: '5px' }}>
                Created by : Robert &nbsp;&nbsp; | &nbsp; Created on : 23 Oct&apos;25
              </Typography>
            </Stack>
          </Stack>

          <Stack>
            <InfoIcon />
          </Stack>
        </Stack>

        <Divider />
        <Stack sx={{ mt: 1, alignItems: 'center' }}>
          <Typography sx={{ fontSize: '12px' }}>View All Media</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Sessions;
