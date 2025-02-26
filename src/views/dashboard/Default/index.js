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
            <DashboardCard title='Actice Service User' num1='234' num2='119' color="linear-gradient(135deg,rgb(255, 162, 75) 0%,rgb(255, 136, 39) 100%)" color2='#ff7c11' />
          </Grid>
          <Grid item xs={3}>
            <DashboardCard title='Accepted referal this year' num1='71' num2='119' color='linear-gradient(135deg, rgb(135, 206, 250) 0%, rgb(70, 130, 180) 100%)' color2='#4682b4' />
          </Grid>
          <Grid item xs={3}>
            <DashboardCard title='Open Cases' num1='145' num2='62' color="linear-gradient(135deg,rgb(255, 162, 75) 0%,rgb(255, 136, 39) 100%)" color2='#ff7c11' />
          </Grid>
          <Grid item xs={3}>
            <DashboardCard title='Sessions Delievered' num1='34' num2='19' color='linear-gradient(135deg, rgb(135, 206, 250) 0%, rgb(70, 130, 180) 100%)' color2='#4682b4' />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={7}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid item container xs={5}>
            <Grid item xs={12}>
              <AppTasks
                title="My Task"
                list={[
                  { id: '1', label: 'Task call due for A.Alka Saxena 9876567378 on 12/01/2024' },
                  { id: '2', label: 'Tasj call due for Anindya on 12/01/2023 Comment: call himand confirm commented by HeadSalesMarketing' },
                  { id: '4', label: 'Task call due for Dheeraj Kumar on 12/01/2024' }
                ]}
              />
            </Grid>
            <Grid item xs={12} >
              <AppTrafficBySite
                title="Recent Media"
                list={[
                  { name: 'Football', image: footballImg },
                  { name: 'Volleyball', image: volleyballImg },
                  { name: 'Group Work', image: groupWorkImg },
                  { name: 'Arts & Craft', image: artsImg }
                ]}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
      {/* <Grid item xs={12}>
        <Grid container >
          <Grid item xs={3}>
            <NewDashboardCard val1='Company Value' val2='Year of 2024' val3='$5000' val4='+15.6%' />
          </Grid>
          <Grid item xs={3}>
            <NewDashboardCard val1='Expenses' val2='Last month' val3='$4450' val4='+10%' />
          </Grid>
          <Grid item xs={3}>
            <NewDashboardCard val1='Spendings' val2='Year of 2024' val3='$1.5M' val4='+22%' />
          </Grid>
          <Grid item xs={3}>
            <NewDashboardCard val1='Totals' val2='Last month' val3='$31,564' val4='+14%' />
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
};

export default Dashboard;
