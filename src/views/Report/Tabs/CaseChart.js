import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import SectionSkeleton from 'ui-component/Loader/SectionSkeleton';

const Chart = () => {
  const [ethnicityData, setEthnicityData] = useState([]);
  const [ageRangePieData, setAgeRangePieData] = useState([]);
  const [ageBarData, setAgeBarData] = useState([0, 0, 0, 0, 0]);
  const [genderData, setGenderData] = useState([0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await getApi(urls.case.fetch);
        const cases = response.data;

        const ethnicityCount = {
          'Black / Black British - Caribbean / African': 0,
          'Asian / Asian British': 0,
          'White British': 0,
          'Mixed Other': 0,
          'Mixed White And Black Caribbean / African': 0,
          Arab: 0,
          Other: 0
        };

        cases.forEach((item) => {
          const ethnicity = item?.userServiceDetails?.personalInfo?.ethnicity || 'Other';

          if (ethnicity.includes('Black')) {
            ethnicityCount['Black / Black British - Caribbean / African']++;
          } else if (ethnicity.includes('Asian')) {
            ethnicityCount['Asian / Asian British']++;
          } else if (ethnicity.includes('White – British') || ethnicity.includes('White British')) {
            ethnicityCount['White British']++;
          } else if (ethnicity.includes('Mixed – White and Black Caribbean') || ethnicity.includes('Mixed – White and Black African')) {
            ethnicityCount['Mixed White And Black Caribbean / African']++;
          } else if (ethnicity.includes('Mixed')) {
            ethnicityCount['Mixed Other']++;
          } else if (ethnicity.includes('Arab')) {
            ethnicityCount['Arab']++;
          } else {
            ethnicityCount['Other']++;
          }
        });

        const finalEthnicityData = staticEthnicityConfig.map((item) => ({
          id: item.id,
          value: ethnicityCount[item.label],
          label: `${item.label} ${ethnicityCount[item.label]}%`,
          color: item.color,
          labelColor: item.labelColor
        }));
        setEthnicityData(finalEthnicityData);

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
      } catch (error) {
        console.error('API Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const staticEthnicityConfig = [
    { id: 1, label: 'Black / Black British - Caribbean / African', color: '#133144', labelColor: '#fff' },
    { id: 2, label: 'Asian / Asian British', color: '#86E5FC', labelColor: '#000' },
    { id: 3, label: 'White British', color: '#3E8EB6', labelColor: '#fff' },
    { id: 4, label: 'Mixed Other', color: '#B3F0FD', labelColor: '#000' },
    { id: 5, label: 'Mixed White And Black Caribbean / African', color: '#61CFF4', labelColor: '#000' },
    { id: 6, label: 'Arab', color: '#2A5B77', labelColor: '#fff' },
    { id: 7, label: 'Other', color: '#327193', labelColor: '#fff' }
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
          <Box>
            {loading ? (
              <SectionSkeleton lines={1} variant="rectangular" height={300} spacing={1} />
            ) : (
              <PieChart
                series={[
                  {
                    arcLabel: (item) => item.label,
                    arcLabelMinAngle: 15,
                    paddingAngle: 1,
                    data: ethnicityData,
                    arcLabelStyle: (item) => ({
                      fill: item.labelColor,
                      fontSize: 14
                    })
                  }
                ]}
                width={360}
                height={340}
                slotProps={{ legend: { hidden: true } }}
                sx={{
                  [`& .MuiPieArcLabel-root`]: {
                    fill: '#fff',
                    fontSize: '10px'
                  }
                }}
              />
            )}
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
          <Box>
            {loading ? (
              <SectionSkeleton lines={1} variant="rectangular" height={300} spacing={1} />
            ) : (
              <PieChart
                series={[
                  {
                    data: ageRangePieData,
                    arcLabel: (item) => item.label,
                    arcLabelMinAngle: 10,
                    paddingAngle: 1
                  }
                ]}
                width={360}
                height={340}
                slotProps={{ legend: { hidden: true } }}
                sx={{
                  [`& .MuiPieArcLabel-root`]: {
                    fill: '#fff',
                    fontSize: '14px'
                  }
                }}
              />
            )}
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
          <Box>
            {loading ? (
              <SectionSkeleton lines={1} variant="rectangular" height={300} spacing={1} />
            ) : (
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
            )}
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pt: 2 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 16 }}>Cases By Gender</Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#333',
                  color: '#fff',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: 14,
                  fontWeight: 500,
                  gap: 0.5
                }}
              >
                34
              </Box>
              Total
            </Box>
          </Box>
          <Box>
            {loading ? (
              <SectionSkeleton lines={1} variant="rectangular" height={300} spacing={1} />
            ) : (
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
                margin={{ top: 10, bottom: 30, left: 120, right: 20 }}
              />
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Chart;
