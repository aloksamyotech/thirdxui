import React, { useState } from 'react';
import { Box, Tabs, Tab, Grid } from '@mui/material';
import Chart from './SessionChart.js';
import SessionList from './SessionList';
import FilterPanel from 'components/FilterPanel.js';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import PrintStyles from 'themes/print.js';
const Service = ({ countryOfOriginFilter, selectedName, status, caseId, dateOpenedFilter, FilterPanelProp }) => {
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
        {value === 0 && (
          <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
              mb: 2.5,
              flexWrap: 'wrap',
              gap: 1
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap'
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '24px',
                  px: 2.5,
                  py: 1.5,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontWeight: 500
                }}
              >
                <span>Total Sessions Delivered</span>
                <span style={{ color: '#00B8D9', fontWeight: '600' }}>36</span>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PrintOutlinedIcon
                sx={{ cursor: 'pointer' }}
                onClick={() => window.print()}
              />
              <SaveAltOutlinedIcon
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/api/report/download-csv'; 
                  link.download = 'report.csv';
                  link.click();
                }}
              />
              <OpenInNewIcon
                sx={{ cursor: 'pointer' }}
                onClick={() => window.open(window.location.href, '_blank')}
              />
            </Box>
          </Box>
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
             <PrintStyles targetId="print-chart" />
            <Box
             id="print-chart"
              sx={{
                flexGrow: 2,
                flexShrink: 1,
                minWidth: 0
              }}
            >
              <Chart />
            </Box>
          </Box>
              </>
        )}
        {value === 1 && (
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
              <SessionList
                countryOfOriginFilter={countryOfOriginFilter}
                selectedName={selectedName}
                status={status}
                caseId={caseId}
                dateOpenedFilter1={dateOpenedFilter}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Grid>
  );
};

export default Service;
