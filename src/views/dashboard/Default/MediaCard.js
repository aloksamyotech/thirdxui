import { Divider, Select, MenuItem, TextField, Typography, InputAdornment } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { IconSeeding } from '@tabler/icons';
import SearchIcon from '@mui/icons-material/Search';
import { urls } from 'common/urls';
import { getApi } from 'common/apiClient';
const Card = () => {
  const [mediaList, setMediaList] = useState([]);
  const [search, setSearch] = useState('');

  const getAllForms = async () => {
    const fromUrl = urls?.dashboard?.getMedia;
    const response = await getApi(fromUrl);
    if (response?.success) {
      setMediaList(response.data);
    }
  };

  useEffect(() => {
    getAllForms();
  }, []);

const filteredMedia = mediaList.filter((item) =>
  (item?.fileName?.toLowerCase().includes(search?.toLowerCase()) ||
   item?.name?.toLowerCase().includes(search?.toLowerCase()))
);


  return (
    <Box sx={{ bgcolor: '#fff', p: 1, borderRadius: '10px', height: 'auto' }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Recent Media
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ maxWidth: 150 }}
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

      <Divider />

   <Box sx={{ height: 300, overflowY: 'auto' }}>
  {filteredMedia.map((item, idx) => (
    <React.Fragment key={idx}>
      <Stack direction="row" sx={{ padding: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row">
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
          <Stack sx={{ ml: '20px' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{item?.fileName}</Typography>
            <Typography sx={{ fontSize: '12px', mt: '4px', color: '#555' }}>
              Created by: {item?.name || 'N/A'} &nbsp;&nbsp;|&nbsp;&nbsp; Created on: {item?.date}
            </Typography>
          </Stack>
        </Stack>
        <InfoIcon sx={{ color: '#49494c' }} />
      </Stack>
      <Divider />
    </React.Fragment>
  ))}
</Box>


      <Stack sx={{ mt: 1, alignItems: 'center' }}>
        <Typography sx={{ fontSize: '12px', cursor: 'pointer' }}>View All Media</Typography>
      </Stack>
    </Box>
  );
};

export default Card;
