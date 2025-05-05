import React from 'react';
import { Box, Stack } from '@mui/system';
import {
  Grid,
  Typography,
  TextField,
  IconButton,
  Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

const Chart = () => {
  return (
    <Grid container spacing={4}>
     

      <Grid item xs={8}>
        <Typography sx={{ fontSize: 16, fontWeight: 500, mb: 1 }}>
          Contact type breakdown
        </Typography>
        <Box
          sx={{
            borderRadius: '12px',
            backgroundColor: '#fff',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.05)',
            padding: 2
          }}
        >
          <LineChart
            height={300}
            series={[
              {
                data: [150, 300, 450, 600, 800, 550, 400],
                label: 'Contacts',
                color: '#666CFF',
                curve: 'monotoneX'
              }
            ]}
            xAxis={[{ scaleType: 'point', data: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'] }]}
            sx={{
              '.MuiLineElement-root': { strokeWidth: 3 },
              '.MuiMarkElement-root': { display: 'none' },
              '.MuiChartsAxisLine-root, .MuiChartsTick-root': { display: 'none' },
              '.MuiChartsGrid-line': { display: 'none' }
            }}
          />
        </Box>
      </Grid>

      <Grid item xs={4}>
        <Typography sx={{ fontSize: 16, fontWeight: 500, mb: 1 }}>
          Data
        </Typography>
        <Box
          sx={{
            borderRadius: '12px',
            backgroundColor: '#fff',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.05)',
            padding: 2
          }}
        >
          <PieChart
            series={[
              {
                innerRadius: 50,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                data: [
                  { id: 0, value: 240, color: '#673AB7' },
                  { id: 1, value: 36,  color: '#E91E63' },
                  { id: 2, value: 284,  color: '#FF9800' }
                ]
              }
            ]}
            width={300}
            height={300}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Chart;
