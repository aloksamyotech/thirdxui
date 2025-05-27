import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, Box } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1.js';
import AuthCardWrapper from '../AuthCardWrapper.js';
import AuthRegister from '../auth-forms/AuthRegister.js';
import Logo from 'layout/MainLayout/LogoSection';
import LoginImage from 'assets/images/login-image.png';
import { height } from '@mui/system';

// ===============================|| AUTH3 - REGISTER ||=============================== //

const Register = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

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
                <Stack alignItems="center">
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 600,
                      color: '#4C4E64DE',
                      fontSize: '22px'
                    }}
                  >
                    Signup to Thirdex!👋
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <AuthRegister />
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

export default Register;
