import { Divider, Select, MenuItem, TextField, Typography, InputAdornment } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { IconSeeding } from '@tabler/icons';
import SearchIcon from '@mui/icons-material/Search';
import { urls, imageUrl } from 'common/urls';
import { getApi } from 'common/apiClient';
const Card = () => {
  const [mediaList, setMediaList] = useState([]);
  const [search, setSearch] = useState('');
  const [imgError, setImgError] = useState(false);

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

  const filteredMedia = mediaList.filter(
    (item) => item?.fileName?.toLowerCase().includes(search?.toLowerCase()) || item?.name?.toLowerCase().includes(search?.toLowerCase())
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
                    borderRadius: '10%',
                    overflow: 'hidden',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {item?.file && !imgError ? (
                    <Box
                      component="img"
                      src={
                        item.file?.startsWith('https://') ? item.file : `${imageUrl.replace(/\/$/, '')}/${item.file?.replace(/^\//, '')}`
                      }
                      alt="Media"
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <IconSeeding fontSize="medium" />
                  )}
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
