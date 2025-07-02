import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

const Chart = () => {
  return (
    <Grid item xs={12}>
      <Typography sx={{ fontWeight: 600, fontSize: 16, mb: 1 }}>Cases by Risk Factors</Typography>
      <Box
        sx={{
          backgroundColor: '#fff',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.05)',
          borderRadius: '12px',
          padding: '16px'
        }}
      >
        <BarChart
          layout="horizontal"
          series={[
            {
              id: 'risk-series',
              data: [1, 1, 1, 1, 1, 4, 3, 1, 2, 4, 1],
              color: '#0C3149'
            }
          ]}
          xAxis={[
            {
              id: 'x-axis',
              scaleType: 'linear',
              min: 0,
              max: 5
            }
          ]}
          yAxis={[
            {
              id: 'y-axis',
              scaleType: 'band',
              data: [
                'Special Educational Needs (SEN)',
                'Offending history',
                'CAHMS',
                'Mental health issues',
                'Criminal or Sexual Exploitation (CRE/ CSE)',
                'Risk of offending',
                'Experience of DV',
                'School exclusion (temp or perm)',
                'Substance Misuse',
                'Social Services',
                'Poor school Attendance and engagement'
              ]
            }
          ]}
          height={400}
          margin={{ top: 10, bottom: 30, left: 250, right: 20 }}
          sx={{
            '& .{MuiChartsAxis-tickContainer"]': {
              backgroundColor: '#13314433',
              borderRadius: '4px',
              padding: '2px 6px'
            }
          }}
        />
      </Box>
    </Grid>
  );
};

export default Chart;
