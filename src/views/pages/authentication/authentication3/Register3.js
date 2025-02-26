import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, Box } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1.js';
import AuthCardWrapper from '../AuthCardWrapper.js';
import AuthRegister from '../auth-forms/AuthRegister.js';
import AuthFooter from 'ui-component/cards/AuthFooter.js';
// import InventoryImage from 'assets/images/inventory_management_image.png';
// ===============================|| AUTH3 - REGISTER ||=============================== //

const Register = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AuthWrapper1>
      <Grid container sx={{ minHeight: '100vh', backgroundColor: '#441572' }}>
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
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#2f124c',
              padding: '4px',
              flexDirection: 'column'
            }}
          >
            <Box
              component="img"
              // src={InventoryImage}
              alt="Inventory Management"
              sx={{
                maxWidth: '60%',
                maxHeight: '60%',
                objectFit: 'contain',
                borderRadius: '20px'
              }}
            />
            <Typography
              variant="h2"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: '16px'
              }}
            >
              Inventory Management System <br />
              <span style={{ fontSize: '12px' }}>Streamline your inventory, track your products, and manage supplies effortlessly.</span>
            </Typography>
          </Box>
        </Grid>

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
                  Already have an account?<span style={{ color: '#441572', fontWeight: 'bold' }}>Login</span>
                </Typography>
              </Grid>
            </Grid>
          </AuthCardWrapper>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Register;
