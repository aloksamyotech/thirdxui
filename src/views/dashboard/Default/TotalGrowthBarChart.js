import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid, MenuItem, TextField, Stack, Select, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Chart from 'react-apexcharts';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
const TotalGrowthBarChart = ({ isLoading }) => {
  const [chartSeries, setChartSeries] = useState([]);
  const [range, setRange] = useState('this-year');
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const { primary, secondary, text } = theme.palette;

  const chartOptions = {
    chart: { id: 'bar-chart', stacked: true, toolbar: { show: false } },
    colors: ['#2E86DE'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      categories: ['Open', 'Pending', 'Close'],
      labels: {
        style: {
          colors: Array(3).fill(text.primary)
        }
      }
    },
    yaxis: [
      {
        title: {
          text: 'Case Count',
          style: { fontWeight: 400 }
        },
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
  const fetchChartData = async () => {
    try {
      setLoading(true);

      const response = await getApi(urls.dashboard.getAllCasesWithPagination, { range, limit: 100 });

      const counts = response?.data?.meta?.statusCounts || {};

      setChartSeries([
        {
          name: 'Tasks',
          data: [counts.open || 0, counts.pending || 0, counts.close || 0]
        }
      ]);
    } catch (error) {
      console.error('Error loading chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [range]);

  return (
    <>
      {isLoading || loading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard sx={{ height: '430px' }}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Typography variant="h5" fontWeight={500} fontSize={14}>
                  Open Cases By
                </Typography>

                <Stack direction="row" spacing={2}>
                  <Select
                    value={range}
                    size="small"
                    onChange={(e) => setRange(e.target.value)}
                    onPointerDown={(e) => e.stopPropagation()}
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="this-week">This Week</MenuItem>
                    <MenuItem value="this-month">This Month</MenuItem>
                    <MenuItem value="this-year">This Year</MenuItem>
                  </Select>
                </Stack>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              {chartSeries[0]?.data?.some((value) => value > 0) ? (
                <Chart options={chartOptions} series={chartSeries} type="bar" height={290} />
              ) : (
                <Stack alignItems="center" justifyContent="center" height={290}>
                  <Typography variant="body2" color="text.secondary">
                    No data found in this range
                  </Typography>
                </Stack>
              )}
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
