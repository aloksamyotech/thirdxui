import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import female from '../../../assets/images/female.png';
import male from '../../../assets/images/male.png';
const Chart = () => {
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
                  data: [
                    { id: 0, value: 9, label: 'Other 9%', color: '#0C3149' },
                    { id: 1, value: 5.4, label: 'Arab 5.4%', color: '#2A5B77' },
                    { id: 2, value: 18, label: 'Asian 18%', color: '#64CAFF' },
                    { id: 3, value: 7.2, label: 'Mixed 7.2%', color: '#61CFF4' },
                    { id: 4, value: 13.2, label: 'White 13.2%', color: '#86D6FF' },
                    { id: 5, value: 47.4, label: 'Black 47.4%', color: '#092E43' }
                  ]
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
              <Typography sx={{ color: '#ff2f92', fontWeight: 700 }}>29%</Typography>
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
              <Typography sx={{ color: '#00c7ff', fontWeight: 700 }}>71%</Typography>
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
              34 Total
            </Box>
          </Typography>
          <BarChart
            layout="horizontal"
            series={[
              {
                id: 'bar-series-2',
                data: [3, 7, 2, 18, 14],
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
                data: [
                  'London Borough of Camden',
                  'London Borough of Islington',
                  'London Borough of Harrow',
                  'London Borough of Hackney',
                  'London Borough of Barnet'
                ]
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
