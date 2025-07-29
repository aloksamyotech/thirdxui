import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import female from '../../../assets/images/female.png';
import male from '../../../assets/images/male.png';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import SectionSkeleton from 'ui-component/Loader/SectionSkeleton';

const Chart = () => {
  const [ethnicityData, setEthnicityData] = useState([]);
  const [ageRangePieData, setAgeRangePieData] = useState([]);
  const [genderBarData, setGenderBarData] = useState([0, 0, 0, 0]);
  const [malePercent, setMalePercent] = useState(0);
  const [femalePercent, setFemalePercent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await getApi(urls.attendees.fetch);
        const attendee = response.data.data;

        const ethnicityCount = {
          'Black / Black British - Caribbean / African': 0,
          'Asian / Asian British': 0,
          'White British': 0,
          'Mixed Other': 0,
          'Mixed White And Black Caribbean / African': 0,
          Arab: 0,
          Other: 0
        };

        attendee.forEach((item) => {
          const ethnicity = item?.attendee?.personalInfo?.ethnicity || 'Other';
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
          NonBinary: 0,
          'Not prefer to say': 0
        };

        attendee.forEach((item) => {
          const gender = item?.attendee?.personalInfo?.gender?.toLowerCase()?.trim();
          if (gender === 'male') genderCount.Male++;
          else if (gender === 'female') genderCount.Female++;
          else if (gender === 'non-binary') genderCount.NonBinary++;
          else if (gender === 'not prefer to say') genderCount['Not prefer to say']++;
        });

        const genderData = [genderCount.Male, genderCount.Female, genderCount.NonBinary, genderCount['Not prefer to say']];
        setGenderBarData(genderData);

        const validTotal = genderCount.Male + genderCount.Female;
        const maleP = validTotal ? Math.round((genderCount.Male / validTotal) * 100) : 0;
        const femaleP = validTotal ? Math.round((genderCount.Female / validTotal) * 100) : 0;

        setMalePercent(maleP);
        setFemalePercent(femaleP);

      } catch (error) {
        console.error('Error fetching cases:', error);
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
            borderRadius: '12px',
            p: 2,
            height: 340
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: 16, mb: 1 }}>Cases By Age Range</Typography>

          {loading ? (
            <SectionSkeleton lines={1} variant="rectangular" height={290} spacing={1} />
          ) : (
            <>
              <Box
                sx={{
                  display: 'flex',
                  height: 10,
                  borderRadius: 5,
                  overflow: 'hidden',
                  mb: 2
                }}
              >
                <Box sx={{ width: `${femalePercent}%`, backgroundColor: '#ff2f92' }} />
                <Box sx={{ width: `${malePercent}%`, backgroundColor: '#00c7ff' }} />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                {/* Female Section */}
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
                    <img src={female} alt="Female Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Typography sx={{ fontWeight: 600 }}>Female</Typography>
                  <Typography sx={{ color: '#ff2f92', fontWeight: 700 }}>{femalePercent}%</Typography>
                </Box>

                {/* Male Section */}
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
                    <img src={male} alt="Male Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Typography sx={{ fontWeight: 600 }}>Male</Typography>
                  <Typography sx={{ color: '#00c7ff', fontWeight: 700 }}>{malePercent}%</Typography>
                </Box>
              </Box>
            </>
          )}
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
                {genderBarData.reduce((a, b) => a + b, 0)}
              </Box>
              Total
            </Box>
          </Box>

          {loading ? (
            <Box sx={{ p: 2 }}>
              <SectionSkeleton lines={1} variant="rectangular" height={260} spacing={1} />
            </Box>
          ) : (
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
                  data: ['Male', 'Female', 'Non-Binary', 'Not prefer to say']
                }
              ]}
              height={300}
              margin={{ top: 10, bottom: 30, left: 120, right: 20 }}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Chart;
