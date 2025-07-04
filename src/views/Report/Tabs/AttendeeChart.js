import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import female from '../../../assets/images/female.png';
import male from '../../../assets/images/male.png';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
const Chart = () => {
  const [ethnicityData, setEthnicityData] = useState([]);
  const [ageRangePieData, setAgeRangePieData] = useState([]);
  const [genderBarData, setGenderBarData] = useState([0, 0, 0, 0]);
  const [malePercent, setMalePercent] = useState(0);
  const [femalePercent, setFemalePercent] = useState(0);

  useEffect(() => {
    getApi(urls.attendees.fetch)
      .then((response) => {
        const attendee = response.data.data;
        // ===== Ethnicity Chart =====
        const ethnicityCount = {
          Other: 0,
          Arab: 0,
          Asian: 0,
          Mixed: 0,
          White: 0,
          Black: 0
        };

        attendee.forEach((item) => {
          const ethnicity = item?.attendee?.personalInfo?.ethnicity || 'Other';
          if (ethnicity.includes('Arab')) ethnicityCount.Arab++;
          else if (ethnicity.includes('Asian')) ethnicityCount.Asian++;
          else if (ethnicity.includes('Mixed')) ethnicityCount.Mixed++;
          else if (ethnicity.includes('White')) ethnicityCount.White++;
          else if (ethnicity.includes('Black')) ethnicityCount.Black++;
          else ethnicityCount.Other++;
        });

        const ethnicityChartData = [
          { id: 0, value: ethnicityCount.Other, label: `Other ${ethnicityCount.Other}%`, color: '#0C3149' },
          { id: 1, value: ethnicityCount.Arab, label: `Arab ${ethnicityCount.Arab}%`, color: '#2A5B77' },
          { id: 2, value: ethnicityCount.Asian, label: `Asian ${ethnicityCount.Asian}%`, color: '#64CAFF' },
          { id: 3, value: ethnicityCount.Mixed, label: `Mixed ${ethnicityCount.Mixed}%`, color: '#61CFF4' },
          { id: 4, value: ethnicityCount.White, label: `White ${ethnicityCount.White}%`, color: '#86D6FF' },
          { id: 5, value: ethnicityCount.Black, label: `Black ${ethnicityCount.Black}%`, color: '#092E43' }
        ];
        setEthnicityData(ethnicityChartData);

        // ===== Age Range Pie Chart =====
        const ageRangeCount = {
          '15 - 24': 0,
          '25 - 39': 0,
          '40 - 54': 0,
          '55 - 69': 0,
          '70+': 0
        };
        const today = new Date();

        attendee.forEach((item) => {
          const dobStr = item?.attendee?.personalInfo?.dateOfBirth;
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

        const agePieData = Object.entries(ageRangeCount).map(([label, count], index) => ({
          id: index,
          value: count,
          label: `${label}\n${count}%`,
          color: ['#B9EAFE', '#8DD8F8', '#4C9BB8', '#092E43', '#44B5DD'][index]
        }));
        setAgeRangePieData(agePieData);

        // ===== Gender Bar Chart =====
        const genderCount = {
          Male: 0,
          Female: 0,
          Binary: 0,
          'Not prefer to say': 0
        };

        attendee.forEach((item) => {
          const gender = item?.userServiceDetails?.personalInfo?.gender?.toLowerCase()?.trim();
          if (gender === 'male') genderCount.Male++;
          else if (gender === 'female') genderCount.Female++;
          else if (gender === 'binary') genderCount.Binary++;
          else if (gender === 'not prefer to say') genderCount['Not prefer to say']++;
        });

        const genderData = [genderCount.Male, genderCount.Female, genderCount.Binary, genderCount['Not prefer to say']];
        setGenderBarData(genderData);
        const totalGender = Object.values(genderCount).reduce((a, b) => a + b, 0);
        const maleP = totalGender ? Math.round((genderCount.Male / totalGender) * 100) : 0;
        const femaleP = totalGender ? Math.round((genderCount.Female / totalGender) * 100) : 0;

        setMalePercent(maleP);
        setFemalePercent(femaleP);

        const femalePercent = totalGender ? Math.round((genderCount.Female / totalGender) * 100) : 0;
      })
      .catch((error) => {
        console.error('Error fetching cases:', error);
      });
  }, []);
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
            borderRadius: '12px',
            p: 2,
            height: 340
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: 16, mb: 1 }}>Cases By Age Range</Typography>

          <Box sx={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', mb: 2 }}>
            <Box sx={{ width: '60%', backgroundColor: '#ff2f92' }} />
            <Box sx={{ width: '80%', backgroundColor: '#00c7ff' }} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  border: '2px solid #ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  mb: 1
                }}
              >
                <img src={female} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>

              <Typography sx={{ fontWeight: 600 }}>Female</Typography>
              <Typography sx={{ color: '#ff2f92', fontWeight: 700 }}>{femalePercent}%</Typography>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  border: '2px solid #ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  mb: 1
                }}
              >
                <img src={male} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <Typography sx={{ fontWeight: 600 }}>Male</Typography>
              <Typography sx={{ color: '#00c7ff', fontWeight: 700 }}>{malePercent}%</Typography>
            </Box>
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
          <Typography sx={{ fontWeight: 600, fontSize: 16, px: 2, pt: 2 }}>
            Cases By Gender{' '}
            <Box component="span" sx={{ fontWeight: 400, fontSize: 14 }}>
              {genderBarData.reduce((a, b) => a + b, 0)} Total
            </Box>
          </Typography>

          <BarChart
            layout="horizontal"
            series={[
              {
                id: 'bar-series-gender',
                data: genderBarData,
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
                data: ['Male', 'Female', 'Binary', 'Not prefer to say'] // <-- static labels
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
