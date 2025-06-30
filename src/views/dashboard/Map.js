import { InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

import map from '../../assets/images/map.png';
import GoogleMap from '../../components/GoogleMap';

const Map = () => {

  return (
    <Box sx={{ bgcolor: '#fff', borderRadius: '10px', overflow: 'hidden', height: '430px' }}>
      <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '20px' }}>
        <Typography sx={{ fontSize: '16px', lineHeight:'22px' }}>
          Where We Have Deliver Session ?
        </Typography>
        <Stack direction="row" spacing={1}>
          <Select value="This Week" size="small">
            <MenuItem value="This Week">This Week</MenuItem>
            <MenuItem value="This Month">This Month</MenuItem>
            <MenuItem value="This Year">This Year</MenuItem>
          </Select>
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            sx={{ maxWidth: 120 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Stack>
      </Stack>
      <Stack>
        <GoogleMap />
      </Stack>
    </Box>
  );
};

export default Map;
