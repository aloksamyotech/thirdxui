import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Stack, InputAdornment, Typography, FormControl, Select } from '@mui/material';
import Chart from 'react-apexcharts';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const optionsList = ['Borough', 'Case owner', 'Service', 'Ethnicity', 'Country of origin', 'Referral type'];

const TotalGrowthBarChart = ({ isLoading }) => {
  const [value, setValue] = useState('today');
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const { primary, secondary, text } = theme.palette;
  const [selectedValue, setSelectedValue] = useState('Borough');

  const chartOptions = {
    chart: {
      id: 'bar-chart',
      stacked: true,
      toolbar: { show: false }
    },
    colors: ['#2E86DE', '#E091FF'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      labels: {
        style: {
          colors: Array(7).fill(text.primary)
        }
      }
    },
    yaxis: [
      {
        title: {
          text: 'Website Blog',
          style: { color: '#9D9D9D', fontWeight: 400 }
        },
        max: 100000,
        labels: {
          formatter: (val) => `${val / 1000}k`,
          style: { colors: text.primary }
        }
      },
      {
        opposite: true,
        title: {
          text: 'Social Media',
          style: { color: '#9D9D9D', fontWeight: 400 }
        },
        max: 40,
        labels: {
          style: { colors: text.primary }
        }
      }
    ],
    grid: {
      borderColor: theme.palette.grey[200]
    },
    legend: {
      position: 'top',
      labels: {
        colors: theme.palette.grey[600]
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'light'
    }
  };

  const chartSeries = [
    {
      name: 'Website Blog',
      data: [28000, 32000, 60000, 21000, 40000, 32000, 32000]
    },
    {
      name: 'Social Media',
      data: [13000, 22000, 23000, 17000, 7000, 39000, 39000]
    }
  ];

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard sx={{ height: '430px' }}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Typography variant="h5" sx={{ fontWeight: 400, fontSize: 14 }}>
                  Open Cases By
                </Typography>

                <Stack direction="row" spacing={2}>
                  <Select value="This Week" size="small" sx={{ minWidth: 120 }} onPointerDown={(e) => e.stopPropagation()}>
                    <MenuItem value="This Week">This Week</MenuItem>
                    <MenuItem value="This Month">This Month</MenuItem>
                    <MenuItem value="This Year">This Year</MenuItem>
                  </Select>
                </Stack>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Chart options={chartOptions} series={chartSeries} type="bar" height={290} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
