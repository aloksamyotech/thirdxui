import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import SectionSkeleton from 'ui-component/Loader/SectionSkeleton';

const Chart = () => {
  const [riskLabels, setRiskLabels] = useState([]);
  const [riskBarData, setRiskBarData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        const [userRes, configRes] = await Promise.all([getApi(urls.serviceuser.getAllServicesUser), getApi(urls.configuration.fetch)]);

        const attendees = userRes?.data?.allUser || [];

        const keyIndicatorConfig = configRes?.data?.allConfiguration?.filter((item) => item.configurationType === 'Key Indicators') || [];

        const idToNameMap = {};
        keyIndicatorConfig.forEach((item) => {
          idToNameMap[item._id] = item.name;
        });

        const idCountMap = {};
        keyIndicatorConfig.forEach((item) => {
          idCountMap[item._id] = 0;
        });

        attendees.forEach((user) => {
          const selectedIndicators = user?.riskAssessment?.keyIndicators || [];
          selectedIndicators.forEach((id) => {
            if (Object.prototype.hasOwnProperty.call(idCountMap, id)) {
              idCountMap[id]++;
            }
          });
        });

        const labels = [];
        const counts = [];
        keyIndicatorConfig.forEach((item) => {
          labels.push(item.name);
          counts.push(idCountMap[item._id] || 0);
        });

        setRiskLabels(labels);
        setRiskBarData(counts);
      } catch (err) {
        console.error('Error fetching risk factor chart data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  return (
    <Grid item xs={12}>
      <Box
        sx={{
          backgroundColor: '#fff',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.05)',
          borderRadius: '12px',
          padding: '16px'
        }}
      >
        {loading ? (
          <SectionSkeleton lines={1} variant="rectangular" height={200} spacing={1} />
        ) : (
          <BarChart
            layout="horizontal"
            series={[
              {
                id: 'risk-series',
                data: riskBarData,
                color: '#0C3149',
                barCategoryGapRatio: 0.5
              }
            ]}
            xAxis={[{ id: 'x-axis', scaleType: 'linear', min: 0 }]}
            yAxis={[{ id: 'y-axis', scaleType: 'band', data: riskLabels }]}
            height={riskLabels.length * 50}
            margin={{ top: 10, bottom: 40, left: 150, right: 20 }}
          />
        )}
      </Box>
    </Grid>
  );
};

export default Chart;
