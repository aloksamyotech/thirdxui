import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Typography, Button, TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// project imports
import LogoSection from '../LogoSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';

// assets
import { IconChevronsLeft } from '@tabler/icons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const getFormattedDate = (date) => {
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  let formattedDate = date.toLocaleDateString('en-GB', options);

  const day = date.getDate();
  const suffix = day === 1 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th';

  formattedDate = formattedDate.replace(/(\w+)\s(\d+)/, '$1, $2' + suffix);

  return formattedDate;
};

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
  const today = new Date();
  const datePickerRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(today);

  const handleDateClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDateChange = (newDate) => {
    if (newDate) setSelectedDate(newDate);
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: { width: 'auto' }
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: '#ffff !important',
              color: '#053146 !important',
              '&:hover': { background: '#ffff !important', color: '#053146 !important' }
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconChevronsLeft stroke={2} size="1.5rem" />
          </Avatar>
        </ButtonBase>
      </Box>
      &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
      <Box
        sx={{
          flexGrow: 1,
          textAlign: 'left',
          paddingTop: '7px'
        }}
      >
        <Typography sx={{ fontSize: '18px', fontWeight: 800, fontFamily: 'Playfair Display, serif' }}>Welcome back Joy!</Typography>
        <Typography variant="body2" sx={{ fontStyle: 'italic', color: theme.palette.text.secondary }}>
          Don&rsquo;t forget to smile today:)
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, flexDirection: 'column', alignItems: 'left', justifyContent: 'left' }}>
        <Typography variant="h6" sx={{ fontWeight: 300, fontSize: '14px', textAlign: 'left' }}>
          Today is
        </Typography>
        <ButtonBase onClick={() => datePickerRef.current.setOpen(true)} sx={{ cursor: 'pointer', textDecoration: 'none' }}>
          <Typography variant="h5" sx={{ fontWeight: 500, fontSize: '16px', textAlign: 'left', ml: '-70px' }}>
            {getFormattedDate(selectedDate)}
          </Typography>

          <DatePicker
            id="date-picker"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            customInput={<></>} 
            ref={datePickerRef} 
          />
        </ButtonBase>
      </Box>
      {/* Profile & Notifications */}
      <NotificationSection />
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
