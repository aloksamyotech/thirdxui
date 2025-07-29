import React, { useState } from 'react';
import { Box, Tabs, Tab, Grid } from '@mui/material';
import DonorList from './DonorList';
import FilterPanel from 'components/FilterPanel';

const Service = ({ selectedName, status, caseId, dateOpenedFilter,FilterPanelProp }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid>
      <Tabs value={value} onChange={handleChange} sx={{ mb: 2 }} TabIndicatorProps={{ style: { backgroundColor: '#666CFF' } }}>
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
        {value === 0 && (
          <Box
            sx={{
              px: 0,
              display: 'flex',
              gap: 4,
              alignItems: 'flex-start',
              width: '100%',
              flexWrap: 'nowrap'
            }}
          >
            <Box
              sx={{
                mt: 1,
                width: 300,
                flexShrink: 0,
                '& .MuiGrid-root': {
                  width: '100% !important',
                  minWidth: '300px !important'
                }
              }}
            >
              <FilterPanel {...FilterPanelProp} />
            </Box>
            <Box
              sx={{
                flexGrow: 2,
                flexShrink: 1,
                minWidth: 0
              }}
            >
            <DonorList selectedName={selectedName} status={status} caseId={caseId} dateOpenedFilter={dateOpenedFilter} />
             
            </Box>
          </Box>
        )}
      </Box>
    </Grid>
  );
};

export default Service;
