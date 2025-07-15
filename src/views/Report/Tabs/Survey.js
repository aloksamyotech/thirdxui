import React, { useState } from 'react';
import { Box, Tabs, Tab, Grid } from '@mui/material';
import { Button, TextField, Typography } from '@mui/material';
import Chart from './SurveyChart';
import CaseList from './SurveyList';

const Survey = ({ countryOfOriginFilter, selectedName, status, caseId, dateOpenedFilter }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid>
      <Tabs value={value} onChange={handleChange} sx={{ mb: 2 }} TabIndicatorProps={{ style: { backgroundColor: '#666CFF' } }}>
        <Tab
          label="Chart View"
          sx={{
            marginRight: 2,
            borderRadius: 1,
            textTransform: 'none',
            color: '#2E2E30E5',
            '&.Mui-selected': {
              color: '#666CFF'
            }
          }}
        />
        <Tab
          label="List View"
          sx={{
            marginRight: 2,
            borderRadius: 1,
            textTransform: 'none',
            color: '#2E2E30E5',
            '&.Mui-selected': {
              color: '#666CFF'
            }
          }}
        />
      </Tabs>

      <Box>
        {value === 0 && <Chart />}
        {value === 1 && (
          <CaseList
            countryOfOriginFilter={countryOfOriginFilter}
            selectedName={selectedName}
            status={status}
            caseId={caseId}
            dateOpenedFilter={dateOpenedFilter}
          />
        )}
      </Box>
    </Grid>
  );
};

export default Survey;
