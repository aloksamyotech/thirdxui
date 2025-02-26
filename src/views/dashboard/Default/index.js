import { useEffect, useState } from 'react';

// material-ui
import { Grid, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
//import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import AppTrafficBySite from './TrafficBySiteCard';
import Iconify from '../../../ui-component/iconify';
import AppTasks from './AppTask';
import AppConversionRates from './AppConversionCard';
import AppCurrentVisits from './AppCurrentVisitCard';
import footballImg from 'assets/images/football.jpg';
import volleyballImg from 'assets/images/volleyball.jpg';
import groupWorkImg from 'assets/images/groupWork.jpg';
import artsImg from 'assets/images/arts.jpg';
import DashboardCard from 'ui-component/cards/DashboardCard';
import NewDashboardCard from 'ui-component/cards/NewDashboardCard';
import Sessions from './Sessions';
import Map from '../Map';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container >
          <Grid item xs={3}>
            <DashboardCard />
          </Grid>
          <Grid item xs={3}>
            <DashboardCard />
          </Grid>
          <Grid item xs={3}>
            <DashboardCard />
          </Grid>
          <Grid item xs={3}>
            <DashboardCard />
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={3}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>

          <Grid item sm={6} xs={12} md={6} lg={3}>
            <EarningCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid> */}
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
            <AppTrafficBySite
              title="Recent Media"
              list={[
                { name: 'Football', image: footballImg },
                { name: 'Volleyball', image: volleyballImg },
                { name: 'Group Work', image: groupWorkImg },
                { name: 'Arts & Craft', image: artsImg }
              ]}
            />
            <AppTasks
              title="My Task"
              list={[
                { id: '1', label: 'Task call due for A.Alka Saxena 9876567378 on 12/01/2024' },
                { id: '2', label: 'Tasj call due for Anindya on 12/01/2023 Comment: call himand confirm commented by HeadSalesMarketing' },
                { id: '4', label: 'Task call due for Dheeraj Kumar on 12/01/2024' }
              ]}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6} lg={6}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 }
              ]}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={6}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 }
              ]}
              chartColors={[theme.palette.primary.main, theme.palette.info.main, theme.palette.warning.main, theme.palette.error.main]}
            />
          </Grid>
        </Grid>
      </Grid> */}
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Sessions />
          </Grid>
          <Grid item xs={6}>
            <Map />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container >
          <Grid item xs={3}>
            <NewDashboardCard />
          </Grid>
          <Grid item xs={3}>
            <NewDashboardCard />
          </Grid>
          <Grid item xs={3}>
            <NewDashboardCard />
          </Grid>
          <Grid item xs={3}>
            <NewDashboardCard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
