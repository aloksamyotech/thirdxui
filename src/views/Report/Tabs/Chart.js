import { Box, Stack } from '@mui/system';
import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts';

const Chart = () => {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>Traffic Source</Typography>
            <Stack direction="row" spacing={2}>
              <Typography sx={{ fontSize: '12px' }}>
                Total Service User - <span style={{ color: '#666cff' }}>654</span>
              </Typography>
              <Typography sx={{ fontSize: '12px' }}>
                Total Referred Accepted - <span style={{ color: '#666cff' }}>14</span>
              </Typography>
            </Stack>
          </Stack>

          <Box
            sx={{
              backgroundColor: '#fff',
              boxShadow: '1px 1px 5px #d4d4d4',
              borderRadius: '10px',
              padding: '10px',
              mt: 2
            }}
          >
            <BarChart
              series={[{ data: [35, 44, 24, 34] }, { data: [51, 6, 49, 30] }, { data: [15, 25, 30, 50] }, { data: [60, 50, 15, 25] }]}
              height={290}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>Income</Typography>
          <Box
            sx={{
              backgroundColor: '#fff',
              boxShadow: '1px 1px 5px #d4d4d4',
              borderRadius: '10px',
              mt: 2
            }}
          >
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10 },
                    { id: 1, value: 15 },
                    { id: 2, value: 20 }
                  ]
                }
              ]}
              width={300}
              height={300}
              sx={{ ml: 1 }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Chart;
