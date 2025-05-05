import React, { useState } from 'react';
import { Box, Tabs, Tab, Grid } from '@mui/material';
import Chart from './CaseChart.js';
import SessionList from './SessionList';

const Service = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid>
      <Tabs value={value} onChange={handleChange} sx={{ mb: 2 }}>
        <Tab
          label="Chart View"
          sx={{
            marginRight: 2,
            borderRadius: 1,
            textTransform: 'none'
          }}
        />
        <Tab
          label="List View"
          sx={{
            marginRight: 2,
            borderRadius: 1,
            textTransform: 'none'
          }}
        />
      </Tabs>

      <Box>
        {value === 0 && <Chart />}
        {value === 1 && <SessionList />}
      </Box>
    </Grid>
  );
};

export default Service;
