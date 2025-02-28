import { Box, Stack } from '@mui/system'
import React from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts';

const Chart = () => {
  const [one, setOne] = useState('');
  const [two, setTwo] = useState('');
  const [three, setThree] = useState('');
  const [four, setFour] = useState('');
  const [filter, setFilter] = useState(false);
  console.log(filter);

  return (
    <>
      {!filter &&
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Box>
            <FilterAltIcon fontSize='small' sx={{ marginX: '4px', cursor: 'pointer' }} onClick={() => setFilter(true)} />
            <DownloadIcon fontSize='small' sx={{ marginX: '4px' }} />
            <PrintIcon fontSize='small' sx={{ marginX: '4px' }} />
            <SystemUpdateAltIcon fontSize='small' sx={{ marginX: '4px' }} />
          </Box>
        </Box>
      }
      {filter &&
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            select
            label="Chooose Your Field"
            value={one}
            onChange={(e) => setOne(e.target.value)}
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: false }}
            sx={{ width: 200 }}
          >
            <MenuItem value="District 1">District 1</MenuItem>
            <MenuItem value="District 2">District 2</MenuItem>
          </TextField>
          <TextField
            select
            label="Service Date"
            value={two}
            onChange={(e) => setTwo(e.target.value)}
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: false }}
            sx={{ width: 100 }}
          >
            <MenuItem value="District 1">District 1</MenuItem>
            <MenuItem value="District 2">District 2</MenuItem>
          </TextField>
          <TextField
            select
            label="Referral Date"
            value={three}
            onChange={(e) => setThree(e.target.value)}
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: false }}
            sx={{ width: 120 }}
          >
            <MenuItem value="District 1">District 1</MenuItem>
            <MenuItem value="District 2">District 2</MenuItem>
          </TextField>
          <TextField
            select
            label="Age"
            value={four}
            onChange={(e) => setFour(e.target.value)}
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: false }}
            sx={{ width: 150 }}
          >
            <MenuItem value="District 1">District 1</MenuItem>
            <MenuItem value="District 2">District 2</MenuItem>
          </TextField>
          <Button color='secondary' variant='contained'>Apply</Button>
          <Stack sx={{
            display: 'inline',
            marginTop: '5px'
          }}>
            <FilterAltIcon fontSize='medium' sx={{ marginX: '4px', borderRadius: '100%', boxShadow: '1px 1px 5px #d4d4d4', cursor: 'pointer' }} onClick={() => setFilter(false)} />
          </Stack>
          <Stack direction='row' sx={{ marginLeft: '10px' }}>
            <DownloadIcon fontSize='small' sx={{ marginX: '4px' }} />
            <PrintIcon fontSize='small' sx={{ marginX: '4px' }} />
            <SystemUpdateAltIcon fontSize='small' sx={{ marginX: '4px' }} />
          </Stack>
        </Box >
      }
      <Grid container spacing={4} sx={{ mt: '5px' }}>
        <Grid item xs={8}>
          <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>Traffic Source</Typography>
            <Stack direction='row'>
              <Typography>Total Service User - <span style={{ color: '#666cff' }}>654</span></Typography>
              <Typography sx={{ ml: '5px' }}>Total Reffered Accepted - <span style={{ color: '#666cff' }}>14</span></Typography>
            </Stack>
          </Stack>
          <Box sx={{ boxShadow: '1px 1px 5px #d4d4d4', borderRadius: '10px', padding: '10px', mt: '10px' }}>
            <BarChart
              series={[
                { data: [35, 44, 24, 34] },
                { data: [51, 6, 49, 30] },
                { data: [15, 25, 30, 50] },
                { data: [60, 50, 15, 25] },
              ]}
              height={290}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>Income</Typography>
          <Box sx={{ boxShadow: '1px 1px 5px #d4d4d4', borderRadius: '10px', mt: '10px' }}>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10 },
                    { id: 1, value: 15 },
                    { id: 2, value: 20 },
                  ],
                },
              ]}
              width={300}
              height={300}
              sx={{ ml: '50px' }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Chart