import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, Box } from '@mui/material';

import AuthWrapper1 from '../AuthWrapper1.js';
import AuthCardWrapper from '../AuthCardWrapper.js';
import ForgotPassword3 from '../auth-forms/AuthForgotPassword.js';
import Logo from 'layout/MainLayout/LogoSection';
import AuthFooter from 'ui-component/cards/AuthFooter.js';
import LoginImage from 'assets/images/login-image.png';

const ForgotPassword = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AuthWrapper1>
      <Grid container sx={{ height: '100vh', overflow: 'hidden', backgroundColor: '#053146' }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8
          }}
        >
          <AuthCardWrapper
            sx={{
              maxWidth: 600,
              width: '100%',
              boxShadow: theme.shadows[3],
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
              padding: 0
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Logo height="60px" maxWidth="220px" />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  align="center"
                  sx={{
                    fontWeight: 500,
                    fontSize: '20px',
                    lineHeight: '32px',
                    letterSpacing: '0.15px',
                    color: '#000000'
                  }}
                >
                  Forgot Password ❓
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary" align="center">
                  No worries, we’ll send you reset instructions
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <ForgotPassword3 />
              </Grid>
            </Grid>
          </AuthCardWrapper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            backgroundColor: '#2f124c'
          }}
        >
          <Box
            component="img"
            src={LoginImage}
            alt="Thirdex"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: '75%',
              borderRadius: '0px'
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              top: '70%',
              left: '5%',
              color: 'white',
              textAlign: 'left',
              maxWidth: '60%',
              transform: 'translateY(-50%)'
            }}
          >
            <Typography variant="h5" sx={{ fontSize: '30px', color: 'white' }}>
              Thirdex helps you win!
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '18px', mt: 1, color: 'white' }}>
              Organize your forms, events, workshops, and more with our CRM suite.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default ForgotPassword;
