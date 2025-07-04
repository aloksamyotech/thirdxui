import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
const Chart = () => {
  const [ethnicityData, setEthnicityData] = useState([]);
  const [ageRangePieData, setAgeRangePieData] = useState([]);
  const [ageBarData, setAgeBarData] = useState([0, 0, 0, 0, 0]);
  const [genderData, setGenderData] = useState([0, 0, 0, 0]);
 
  useEffect(() => {
    getApi(urls.case.fetch)
      .then((response) => {
        const cases = response.data;
        // ===== 1. Ethnicity Count =====
        const ethnicityCount = {
          Other: 0,
          Arab: 0,
          Asian: 0,
          Mixed: 0,
          White: 0,
          Black: 0
        };

        cases.forEach((item) => {
          const ethnicity = item?.userServiceDetails?.personalInfo?.ethnicity || 'Other';
          if (ethnicity.includes('Arab')) ethnicityCount['Arab']++;
          else if (ethnicity.includes('Asian')) ethnicityCount['Asian']++;
          else if (ethnicity.includes('Mixed')) ethnicityCount['Mixed']++;
          else if (ethnicity.includes('White')) ethnicityCount['White']++;
          else if (ethnicity.includes('Black')) ethnicityCount['Black']++;
          else ethnicityCount['Other']++;
        });

        const finalEthnicityData = staticEthnicityConfig.map((item) => ({
          id: item.id,
          value: ethnicityCount[item.label],
          label: `${item.label} ${ethnicityCount[item.label]}%`,
          color: item.color
        }));
        setEthnicityData(finalEthnicityData);

        // ===== 2. Age Range Pie Chart Data =====
        const ageRangeCount = {
          '15 - 24': 0,
          '25 - 39': 0,
          '40 - 54': 0,
          '55 - 69': 0,
          '70+': 0
        };

        const today = new Date();

        cases.forEach((item) => {
          const dobStr = item?.userServiceDetails?.personalInfo?.dateOfBirth;
          if (dobStr) {
            const dob = new Date(dobStr);
            const age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));

            if (age >= 15 && age <= 24) ageRangeCount['15 - 24']++;
            else if (age <= 39) ageRangeCount['25 - 39']++;
            else if (age <= 54) ageRangeCount['40 - 54']++;
            else if (age <= 69) ageRangeCount['55 - 69']++;
            else if (age >= 70) ageRangeCount['70+']++;
          }
        });

        const finalAgeRangeData = ageRangeConfig.map((item) => ({
          id: item.id,
          value: ageRangeCount[item.label],
          label: `${item.label}\n${ageRangeCount[item.label]}%`,
          color: item.color
        }));

        setAgeRangePieData(finalAgeRangeData);

        // ===== 3. Age Group Bar Chart Data (with Static Labels) =====
        const barAgeGroupCount = {
          Adults: 0,
          Infants: 0,
          Seniors: 0,
          Kids: 0,
          Anyone: 0
        };

        cases.forEach((item) => {
          const dobStr = item?.userServiceDetails?.personalInfo?.dateOfBirth;
          if (dobStr) {
            const dob = new Date(dobStr);
            const age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));

            if (age <= 5) barAgeGroupCount['Infants']++;
            else if (age >= 6 && age <= 14) barAgeGroupCount['Kids']++;
            else if (age >= 15 && age <= 59) barAgeGroupCount['Adults']++;
            else if (age >= 60) barAgeGroupCount['Seniors']++;
            else barAgeGroupCount['Anyone']++;
          }
        });
        const barLabels = ['Adults', 'Infants', 'Seniors', 'Kids', 'Anyone'];
        const finalBarData = barLabels.map((label) => barAgeGroupCount[label] ?? 0);
        setAgeBarData(finalBarData);

        // ===== 4. Gender Count =====
        const genderCount = {
          Male: 0,
          Female: 0,
          Binary: 0,
          'Not prefer to say': 0
        };

        cases.forEach((item) => {
          const gender = item?.userServiceDetails?.personalInfo?.gender?.toLowerCase().trim();

          if (gender === 'male') genderCount.Male++;
          else if (gender === 'female') genderCount.Female++;
          else if (gender === 'binary') genderCount.Binary++;
          else if (gender === 'not prefer to say') genderCount['Not prefer to say']++;
        });

        const finalGenderBarData = [genderCount.Male, genderCount.Female, genderCount.Binary, genderCount['Not prefer to say']];

        setGenderData(finalGenderBarData);
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  }, []);

  const staticEthnicityConfig = [
    { id: 0, label: 'Other', color: '#0C3149' },
    { id: 1, label: 'Arab', color: '#2A5B77' },
    { id: 2, label: 'Asian', color: '#64CAFF' },
    { id: 3, label: 'Mixed', color: '#61CFF4' },
    { id: 4, label: 'White', color: '#86D6FF' },
    { id: 5, label: 'Black', color: '#092E43' }
  ];
  const ageRangeConfig = [
    { id: 0, label: '15 - 24', color: '#0C3149' },
    { id: 1, label: '25 - 39', color: '#2A5B77' },
    { id: 2, label: '40 - 54', color: '#86D6FF' },
    { id: 3, label: '55 - 69', color: '#61CFF4' },
    { id: 4, label: '70+', color: '#44B5DD' }
  ];
  const genderCount = {
    Male: 0,
    Female: 0,
    Binary: 0,
    'Not Prefer to Say': 0,
    Other: 0
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Box
          sx={{
            backgroundColor: '#fff',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.05)',
            borderRadius: '12px',
            mt: 1
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: 16, px: 2, pt: 2 }}>Cases By Ethnicity</Typography>
          <Box sx={{ paddingLeft: '50px' }}>
            <PieChart
              series={[
                {
                  arcLabel: (item) => item.label,
                  arcLabelMinAngle: 10,
                  paddingAngle: 1,
                  data: ethnicityData
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

      <Grid item xs={6}>
        <Box
          sx={{
            backgroundColor: '#fff',
            boxShadow: '1px 1px 5px #d4d4d4',
            borderRadius: '10px',
            mt: 1
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: 16, px: 2, pt: 2 }}>Cases By Age Range</Typography>
          <Box sx={{ paddingLeft: '50px' }}>
            <PieChart
              series={[
                {
                  data: ageRangePieData,
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

      <Grid item xs={6}>
        <Box
          sx={{
            backgroundColor: '#fff',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.05)',
            borderRadius: '12px'
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: 16, px: 2, pt: 2 }}>Cases By Age Range</Typography>

          <BarChart
            layout="horizontal"
            series={[
              {
                id: 'bar-series-1',
                data: ageBarData,
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
                data: ['Adults', 'Infants', 'Seniors', 'Kids', 'Anyone']
              }
            ]}
            height={300}
            margin={{ top: 10, bottom: 30, left: 60, right: 20 }}
          />
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box
          sx={{
            backgroundColor: '#fff',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.05)',
            borderRadius: '12px'
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: 16, px: 2, pt: 2 }}>
            Cases By Gender{' '}
            <Box component="span" sx={{ fontWeight: 400, fontSize: 14 }}>
              34 Total
            </Box>
          </Typography>
          <BarChart
            layout="horizontal"
            series={[
              {
                id: 'bar-series-2',
                data: genderData,
                color: '#1B4B66'
              }
            ]}
            xAxis={[
              {
                id: 'x-axis',
                scaleType: 'linear'
              }
            ]}
            yAxis={[
              {
                id: 'y-axis',
                scaleType: 'band',
                data: ['Male', 'Female', 'Binary', 'Not prefer to say']
              }
            ]}
            height={300}
            margin={{ top: 10, bottom: 30, left: 100, right: 20 }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Chart;
