import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Grid, Typography, useMediaQuery, Box, Stack, TextField, Button } from '@mui/material';

import AuthWrapper1 from '../AuthWrapper1.js';
import AuthCardWrapper from '../AuthCardWrapper.js';
import Logo from 'layout/MainLayout/LogoSection';
import LoginImage from 'assets/images/login-image.png';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { postApi } from 'common/apiClient';
import { urls } from 'common/urls';
import toast from 'react-hot-toast';

const VerifyOtp = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state?.email;

  const handleVerifyOtp = async (otp) => {
    try {
      const res = await postApi(urls.login.otpvarify, { email, otp });

      const apiStatusCode = res?.data?.statusCode;
      const errorCode = res?.data?.errorCode;
      if (apiStatusCode === 400 || errorCode === 'NOT_FOUND') {
        toast.error(res?.message || 'Invalid or expired OTP');
        return;
      }
      const token = res.data.token;
      localStorage.setItem('token', token);

      toast.success('OTP verified successfully');
      navigate('/resetPassword', { state: { email } });
    } catch (err) {
      toast.error(err?.message || 'OTP verification failed');
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
                  Enter Your Code 📩
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary" align="center">
                  We sent a 5-digit code to{' '}
                  <span style={{ fontWeight: 600 }}>{email?.replace(/(.{2}).+(@.+)/, '$1*****$2') || 'example@gmail.com'}</span>
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Formik
                  initialValues={{ otp: ['', '', '', '', '', ''] }}
                  validationSchema={Yup.object().shape({
                    otp: Yup.array().of(Yup.string().length(1, 'Required').required('Required'))
                  })}
                  onSubmit={(values) => {
                    const otpCode = values.otp.join('');
                    handleVerifyOtp(otpCode);
                  }}
                >
                  {({ values, setFieldValue, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
                        {values.otp.map((val, idx) => (
                          <TextField
                            key={idx}
                            name={`otp[${idx}]`}
                            value={val}
                            onChange={(e) => {
                              const newVal = e.target.value.replace(/[^0-9]/g, '').slice(0, 1);
                              setFieldValue(`otp[${idx}]`, newVal);
                              if (newVal && idx < 5) {
                                const nextInput = document.querySelector(`[name="otp[${idx + 1}]"]`);
                                if (nextInput) nextInput.focus();
                              }
                            }}
                            inputProps={{
                              maxLength: 1,
                              style: { textAlign: 'center', fontSize: '24px' }
                            }}
                            sx={{ width: 56 }}
                          />
                        ))}
                      </Stack>

                      <Button fullWidth type="submit" variant="contained" sx={{ backgroundColor: '#f7931e', mb: 2 }}>
                        CONTINUE
                      </Button>

                      <Button fullWidth variant="outlined" onClick={() => navigate('/login')}>
                        ← BACK TO LOGIN
                      </Button>

                      <Typography variant="body2" sx={{ mt: 2 }}>
                        Didn’t receive the code?{' '}
                        <Button
                          variant="text"
                          sx={{ padding: 0, minWidth: 'auto', color: '#15a6ca', textTransform: 'none' }}
                          onClick={() => {
                            toast('Resending OTP...');
                            // Optionally add resendOtp API call here
                          }}
                        >
                          Click to resend.
                        </Button>
                      </Typography>
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

export default VerifyOtp;
