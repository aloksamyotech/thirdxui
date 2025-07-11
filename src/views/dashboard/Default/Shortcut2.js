import { Box, Stack } from '@mui/system'
import React from 'react'
import { Card, Typography } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AirplayIcon from '@mui/icons-material/Airplay';
import { IconSeeding, IconClipboardData} from '@tabler/icons';
import { useNavigate } from 'react-router';

const Shortcut2 = ({ icon, title, path, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (path) {
      navigate(path);
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        border: '1px solid #00000033',
        justifyContent: 'center',
        alignItems: 'center',
        py: '10px'
      }}
      onClick={handleClick}
    >
      {icon == 1 && <PersonOutlineIcon sx={{ fontSize: '24px' }} />}
      {icon == 2 && <IconClipboardData sx={{ fontSize: '30px' }} />}
      {icon == 3 && <AirplayIcon sx={{ fontSize: '24px' }} />}
      {icon == 4 && <IconSeeding sx={{ fontSize: '30px' }} />}
      <Typography sx={{ ml: '5px' }}>{title}</Typography>
    </Card>
  );
};

export default Shortcut2