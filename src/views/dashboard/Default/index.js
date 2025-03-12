import { useEffect, useState } from 'react';

// material-ui
import { Grid, Avatar, Divider } from '@mui/material';
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
import cricket from 'assets/images/cricket.webp'
import pickleball from 'assets/images/pickleball.jpg'
import DashboardCard from 'ui-component/cards/DashboardCard';
import NewDashboardCard from 'ui-component/cards/NewDashboardCard';
import Sessions from './Sessions';
import Map from '../Map';
import Shortcut2 from './Shortcut2';
import EmptyCard from './EmptyCard';
import Media from './Media';
// import Map from 'components/Map';

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
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <DashboardCard title='Actice Service User' num1='234' num2='119' color="linear-gradient(135deg,rgb(255, 162, 75) 0%,rgb(255, 136, 39) 100%)" color2='#ff7c11' />
          </Grid>
          <Grid item xs={3}>
            <DashboardCard title='Open Cases' num1='145' num2='62' color="linear-gradient(135deg,rgb(255, 162, 75) 0%,rgb(255, 136, 39) 100%)" color2='#ff7c11' />
          </Grid>
          <Grid item xs={3}>
            <DashboardCard title='Sessions Deliver' num1='34' num2='19' color='linear-gradient(135deg, rgb(135, 206, 250) 0%, rgb(70, 130, 180) 100%)' color2='#4682b4' />
          </Grid>
          <Grid item xs={3}>
            <DashboardCard title='Total Donation' num1='145M' num2='62' color='linear-gradient(135deg, rgb(135, 206, 250) 0%, rgb(70, 130, 180) 100%)' color2='#4682b4' />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={8} sx={{ px: '20px' }}>
          <Grid item xs={3}>
            <Shortcut2 icon={1} title={'Add Person'} path={'/dashboard/people'} />
          </Grid>
          <Grid item xs={3}>
            <Shortcut2 icon={2} title={'Add New Case'} path={'/dashboard/services'} />
          </Grid>
          <Grid item xs={3}>
            <Shortcut2 icon={3} title={'Add Session Attendies'} path={'/dashboard/people'} />
          </Grid>
          <Grid item xs={3}>
            <Shortcut2 icon={4} title={'Add Donor'} path={'/dashboard/referral'} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={12} sx={{ justifyContent: 'center' }}>
        <Divider sx={{ width: '70%', borderWidth: '1px' }} />
      </Grid>
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={6}>
          <Sessions />
        </Grid>
        <Grid item xs={6}>
          <TotalGrowthBarChart isLoading={isLoading} />
        </Grid>
        <Grid item xs={6}>
          <AppTasks
            title="My Task"
            list={[
              { id: '1', label: 'Task call due for A.Alka Saxena 9876567378 on 12/01/2024' },
              { id: '2', label: 'Task call due for Anindya on 12/01/2023 Comment: call Himand confirm commented by HeadSalesMarketing' },
              { id: '3', label: 'Task call due for Dheeraj Kumar on 12/01/2024' },
              { id: '4', label: 'Task call due for Dheeraj Kumar on 12/01/2024' }
            ]}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <AppTrafficBySite
            title="Recent Media"
            list={[
              { name: 'Football', image: footballImg },
              { name: 'Volleyball', image: volleyballImg },
              { name: 'Group Work', image: groupWorkImg },
              { name: 'Arts & Craft', image: artsImg },
              { name: 'Cricket', image: cricket },
              { name: 'PickleBall', image: pickleball }
            ]}
          /> */}
          <Media />
        </Grid>
        <Grid item xs={6}>
          <Map />
        </Grid>
        <Grid item xs={6}>
          <EmptyCard />
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
