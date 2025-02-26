import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, Box } from '@mui/material';

import AuthWrapper1 from '../AuthWrapper1.js';
import AuthCardWrapper from '../AuthCardWrapper.js';
import AuthLogin from '../auth-forms/AuthLogin.js';
import Logo from 'layout/MainLayout/LogoSection';
import AuthFooter from 'ui-component/cards/AuthFooter.js';
import LoginImage from 'assets/images/login-image.png';

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AuthWrapper1>
      <Grid container sx={{ minHeight: '100vh', backgroundColor: '#053146' }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <AuthCardWrapper
            sx={{
              maxWidth: 400,
              width: '100%',
              boxShadow: theme.shadows[3],
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item sx={{ mb: 2, textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '2px',
                    marginLeft: 12
                  }}
                >
                  <Logo />
                </Box>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: '-20px' }}>
                <Stack alignItems="center">
                  <Typography variant="h3" sx={{ fontWeight: 700, textAlign: 'center', color: '#240046' }}>
                    Welcome to Thridex!
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <AuthLogin />
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
              borderRadius: '0px',
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              top: '70%',
              left: '5%',
              color: 'white',
              textAlign: 'left',
              maxWidth: '50%',
              transform: 'translateY(-50%)'
            }}
          >
            <Typography variant="h2" sx={{ color: 'white' }}>
              Thirdex helps you win!
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '14px', mt: 1, color: 'white' }}>
              Organize your forms, events, workshops, and more with our CRM suite.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
