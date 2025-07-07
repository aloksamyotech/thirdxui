import React, { useState } from 'react';
import { Box, Tabs, Tab, Grid } from '@mui/material';
import DonorList from './DonorList';

const Service = ({ selectedName, status, caseId, dateOpenedFilter }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid>
      <Tabs value={value} onChange={handleChange} sx={{ mb: 2 }}>
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
        {value === 0 && <DonorList selectedName={selectedName} status={status} caseId={caseId} dateOpenedFilter={dateOpenedFilter} />}
      </Box>
    </Grid>
  );
};

export default Service;
