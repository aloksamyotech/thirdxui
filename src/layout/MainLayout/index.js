import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import MiniSidebar from './Sidebar/MiniSidebar';
import navigation from 'menu-items';
import { drawerWidth } from 'store/constant';
import { TOGGLE_MINI_SIDEBAR } from 'store/actions';
import { IconChevronRight } from '@tabler/icons';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open, miniSidebar }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    'margin',
    open
      ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }
      : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }
  ),
  [theme.breakpoints.up('md')]: {
    marginLeft: miniSidebar ? 0 : open ? 0 : -(drawerWidth - 20),
    width: `calc(100% - ${miniSidebar ? 60 : open ? drawerWidth : 0}px)`
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: '20px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px'
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px',
    marginRight: '10px'
  }
}));

const MainLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch();

  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const miniSidebar = useSelector((state) => state.customization.miniSidebar);

  const handleLeftDrawerToggle = () => {
    dispatch({ type: TOGGLE_MINI_SIDEBAR });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {matchDownMd ? (
        <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} miniSidebar={miniSidebar} />
      ) : miniSidebar ? (
        <MiniSidebar />
      ) : (
        <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} miniSidebar={miniSidebar} />
      )}

      <Main theme={theme} open={leftDrawerOpened} miniSidebar={miniSidebar}>
        <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
        <Outlet />
      </Main>
    </Box>
  );
};

export default MainLayout;
