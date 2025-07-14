import React from 'react';
import { Card, Typography, Box } from '@mui/material';

const BulkUploadInfoBox = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        backgroundColor: '#fff',
        p: 2,
        maxWidth: '100%',
        boxShadow: 'none',
        borderColor: '#eee',
      }}
    >
      <Typography fontSize='14px' fontWeight="500" color="text.primary">
        Getting started with bulk upload ?
      </Typography>

      <Typography fontSize='12px' fontWeight='400' color="text.secondary" mt={1} mb={2}>
        Please note the following before proceeding further:
      </Typography>

      <Box component="ol" sx={{ pl: 3, color: '#636578' }}>
        <li>
          <Typography marginBlock={1} variant="body2">You can upload <b>.xlsx</b> or <b>.csv</b> file.</Typography>
        </li>
        <li>
          <Typography marginBlock={1} variant="body2">Make sure your file has correct column headers.</Typography>
        </li>
        <li>
          <Typography marginBlock={1} variant="body2">The number of rows should not exceed 1000.</Typography>
        </li>
      </Box>
    </Card>
  );
};

export default BulkUploadInfoBox;