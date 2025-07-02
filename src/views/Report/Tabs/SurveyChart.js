import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
const Chart = () => {
  const riskFactors = [
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
  ];
  const [riskBarData, setRiskBarData] = useState(new Array(riskFactors.length).fill(0));

  useEffect(() => {
    getApi(urls.serviceuser.getAllServicesUser)
      .then((response) => {
        const attendees = response.data.allUser;
        const riskCountArray = new Array(riskFactors.length).fill(0);

        attendees.forEach((item) => {
          const risks = item?.riskAssessment?.keyIndicators || [];

          risks.forEach((risk) => {
            const index = riskFactors.indexOf(risk);
            if (index !== -1) {
              riskCountArray[index]++;
            }
          });
        });

        setRiskBarData(riskCountArray);
      })
      .catch((err) => {
        console.error('Failed to fetch risk data:', err);
      });
  }, []);

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
              data: riskBarData,
              color: '#0C3149'
            }
          ]}
          xAxis={[
            {
              id: 'x-axis',
              scaleType: 'linear',
              min: 0
            }
          ]}
          yAxis={[
            {
              id: 'y-axis',
              scaleType: 'band',
              data: riskFactors
            }
          ]}
          height={riskFactors.length * 35}
          margin={{ top: 10, bottom: 30, left: 250, right: 20 }}
        />
      </Box>
    </Grid>
  );
};

export default Chart;
