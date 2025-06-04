import React from 'react';
import Typography from '@mui/material/Typography';
import { Card, Grid, useMediaQuery, Skeleton } from '@mui/material';
import { Box, Container } from '@mui/system';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const DashboardCard = ({ title, num1, num2, loading = false }) => {
  return (
    <Box
      sx={{
        bgcolor: '#fff',
        color: '#053146',
        height: '110px',
        minWidth: '220px',
        borderRadius: '15px',
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        border: '1px solid #e0e0e0',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}
      >
        {loading ? (
          <Skeleton variant="text" width={120} height={24} />
        ) : (
          <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>{title}</Typography>
        )}
        {loading ? (
          <Skeleton variant="circular" width={32} height={32} />
        ) : (
          <TrendingUpIcon
            sx={{
              color: '#fff',
              backgroundColor: '#053146',
              borderRadius: '45%',
              padding: '4px',
              fontSize: 28,
              mt: '-6px',
              ml: '-6px'
            }}
          />
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          mt: 1
        }}
      >
        {loading ? (
          <Skeleton variant="text" width={80} height={40} />
        ) : (
          <Typography sx={{ fontSize: '28px', fontWeight: '600' }}>{num1}</Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {loading ? (
            <>
              <Skeleton variant="circular" width={18} height={18} />
              <Skeleton variant="text" width={40} height={18} />
            </>
          ) : (
            <>
              <AccountCircleIcon sx={{ fontSize: 18, color: '#053146' }} />
              <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>{num2}</Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardCard;
