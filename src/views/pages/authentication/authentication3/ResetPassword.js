import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, Box, Button, TextField, InputAdornment, IconButton, Stack } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

import LoginImage from 'assets/images/login-image.png';
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'layout/MainLayout/LogoSection';
import { postApi } from 'common/apiClient';
import { urls } from 'common/urls';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleResetPassword = async (values) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Token is missing. Please verify OTP again.');
        return;
      }

      const res = await postApi(urls.login.resetPassword, {
        token,
        newPassword: values.password
      });

      toast.success('Password reset successful!');
      localStorage.removeItem('resetToken');
      navigate('/login');
    } catch (err) {
      toast.error(err?.message || 'Something went wrong');
    }
  };

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
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
                  Set New Password
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary" align="center">
                  Must be at least 8 characters long.
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Formik
                  initialValues={{ password: '', confirmPassword: '' }}
                  validationSchema={Yup.object().shape({
                    password: Yup.string().min(8, 'Minimum 8 characters').required('Required'),
                    confirmPassword: Yup.string()
                      .oneOf([Yup.ref('password')], 'Passwords must match')
                      .required('Required')
                  })}
                  onSubmit={handleResetPassword}
                >
                  {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <Stack spacing={2}>
                        <TextField
                          fullWidth
                          type={showPassword ? 'text' : 'password'}
                          label="New Password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.password && Boolean(errors.password)}
                          helperText={touched.password && errors.password}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />

                        <TextField
                          fullWidth
                          type={showConfirm ? 'text' : 'password'}
                          label="Confirm Password"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                          helperText={touched.confirmPassword && errors.confirmPassword}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </Stack>

                      <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, backgroundColor: '#f7931e' }}>
                        RESET PASSWORD
                      </Button>

                      <Button fullWidth variant="outlined" sx={{ mt: 1 }} onClick={() => navigate('/login')}>
                        ← BACK TO LOGIN
                      </Button>
                    </form>
                  )}
                </Formik>
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

export default ResetPassword;
