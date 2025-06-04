import { Box, IconButton, Tooltip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  IconHome,
  IconUser,
  IconSettingsAutomation,
  IconFileInvoice,
  IconMail,
  IconSeeding,
  IconClipboardData,
  IconChartBar,
  IconRefresh,
  IconSettings
} from '@tabler/icons';

const menuItems = [
  {
    icon: <IconHome />,
    label: 'Dashboard',
    route: '/dashboard/default'
  },
  {
    icon: <IconUser />,
    label: 'People',
    route: '/people'
  },
  {
    icon: <IconSettingsAutomation />,
    label: 'Services',
    route: '/services'
  },
  {
    icon: <IconFileInvoice />,
    label: 'Cases',
    route: '/case'
  },
  {
    icon: <IconMail />,
    label: 'Mailing List',
    route: '/mail'
  },
  {
    icon: <IconSeeding />,
    label: 'Donor Management',
    route: '/donor'
  },
  {
    icon: <IconClipboardData />,
    label: 'Forms',
    route: '/manage-form'
  },
  {
    icon: <IconChartBar />,
    label: 'Report',
    route: '/report'
  },
  {
    icon: <IconRefresh />,
    label: 'Data Management',
    route: '/bulkupload'
  },
  {
    icon: <IconSettings />,
    label: 'Settings',
    route: '/configuration'
  }
];

const MiniSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        width: '60px',
        backgroundColor: '#053146',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 12,
        pb: 2,
        minHeight: '100vh'
      }}
    >
      {menuItems.map((item, index) => (
        <Tooltip title={item.label} placement="right" key={index}>
          <IconButton
            onClick={() => navigate(item.route)}
            sx={{
              paddingY: '5px',
              marginY: '5px',
              backgroundColor: location.pathname === item.route ? '#eaeaed' : 'transparent',
              color: location.pathname === item.route ? '#606276' : 'white',
              '&:hover': { backgroundColor: '#021d2a' },
              borderRadius: '8px',
              fontSize: '0.8rem'
            }}
          >
            {item.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};

export default MiniSidebar;
