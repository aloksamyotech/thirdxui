import { Box, Stack } from '@mui/system';
import React from 'react';
import { Grid, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

const Chart = () => {
  const data = [3, 7, 10, 12, 6];
  const labels = ['Sammy', 'Tasmin', 'James', 'Carl', 'Bradley'];

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <Box
          sx={{
            backgroundColor: '#fff',
            boxShadow: '1px 1px 5px #d4d4d4',
            borderRadius: '10px',
            mt: 1
          }}
        >
          <Typography sx={{ fontWeight: 'bold', fontSize: '16px', px: 2, pt: 2 }}>Random</Typography>
          <BarChart
            layout="horizontal"
            series={[
              {
                id: 'bar-series-1',
                data: [3, 7, 10, 12, 6],
                color: '#009FC7'
              }
            ]}
            xAxis={[
              {
                id: 'x-axis',
                scaleType: 'linear',
                label: 'Units of measure'
              }
            ]}
            yAxis={[
              {
                id: 'y-axis',
                scaleType: 'band',
                data: ['Sammy', 'Tasmin', 'James', 'Carl', 'Bradley']
              }
            ]}
            height={300}
            margin={{ top: 10, bottom: 30, left: 80, right: 20 }}
          />
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box
          sx={{
            backgroundColor: '#fff',
            boxShadow: '1px 1px 5px #d4d4d4',
            borderRadius: '10px',
            mt: 1
          }}
        >
          <Typography sx={{ fontWeight: 'bold', fontSize: '16px', px: 2, pt: 2 }}>Random</Typography>

          <Box sx={{ paddingLeft: '50px' }}>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 1, label: '1%', color: '#B9EAFE' },
                    { id: 1, value: 5, label: '5%', color: '#8DD8F8' },
                    { id: 2, value: 11, label: '14 - 15\n11%', color: '#4C9BB8' },
                    { id: 3, value: 64, label: '16 - 17\n64%', color: '#092E43' },
                    { id: 4, value: 19, label: '18 - 19\n19%', color: '#44B5DD' }
                  ],
                  arcLabel: (item) => item.label,
                  arcLabelMinAngle: 10,
                  paddingAngle: 1
                }
              ]}
              width={320}
              height={300}
              slotProps={{ legend: { hidden: true } }}
              sx={{
                [`& .MuiPieArcLabel-root`]: {
                  fill: '#fff',
                  fontSize: '14px'
                }
              }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Chart;
