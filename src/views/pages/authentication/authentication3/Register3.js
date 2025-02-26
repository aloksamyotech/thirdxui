import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, Box } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1.js';
import AuthCardWrapper from '../AuthCardWrapper.js';
import AuthRegister from '../auth-forms/AuthRegister.js';
import LoginImage from 'assets/images/login-image.png';

// ===============================|| AUTH3 - REGISTER ||=============================== //

const Register = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

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
              <Grid item xs={12}>
                <Stack alignItems="center">
                  <Typography variant="h3" sx={{ fontWeight: 700, textAlign: 'center', color: '#240046' }}>
                    Sign Up here
                  </Typography>
                  <Typography textAlign="center" variant="body2" sx={{ color: 'black', mt: 1 }}>
                    Enter your Credentials to continue
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: '-20px' }}>
                <AuthRegister />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ backgroundColor: '#ffffff' }} />
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Typography
                  component={Link}
                  to="/login"
                  variant="subtitle1"
                  sx={{
                    textDecoration: 'none',
                    color: 'black',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Already have an account?<span style={{ color: '#15a6ca', fontWeight: 'bold' }}>Login</span>
                </Typography>
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

export default Register;
