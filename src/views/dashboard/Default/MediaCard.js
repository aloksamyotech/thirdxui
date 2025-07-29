import { Divider, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { IconSeeding } from '@tabler/icons';
import { urls, imageUrl } from 'common/urls';
import { getApi } from 'common/apiClient';
import { useNavigate } from 'react-router-dom';

const Card = () => {
  const [mediaList, setMediaList] = useState([]);
  const [search, setSearch] = useState('');
  const [imgErrors, setImgErrors] = useState({});
  const navigate = useNavigate();

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
    <Box sx={{ bgcolor: '#fff', p: 1, borderRadius: '10px', height: '430px' }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', p: '10px' }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Recent Media
        </Typography>
      </Stack>

      <Divider />

      <Box sx={{ height: 328, overflowY: 'auto' }}>
        {filteredMedia.length === 0 ? (
          <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
            <Typography variant="body2" color="text.secondary">
              No media found
            </Typography>
          </Stack>
        ) : (
          filteredMedia.map((item, idx) => {
            const finalImageUrl = item?.file ? `${imageUrl}${item.file}` : null;
            const hasError = imgErrors[finalImageUrl];

            return (
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
                      {finalImageUrl && !hasError ? (
                        <img
                          src={finalImageUrl}
                          alt="Media"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={() =>
                            setImgErrors((prev) => ({
                              ...prev,
                              [finalImageUrl]: true
                            }))
                          }
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
                  <InfoIcon sx={{ color: '#49494c' }} onPointerDown={(e) => e.stopPropagation()} />
                </Stack>
                <Divider />
              </React.Fragment>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default Card;
