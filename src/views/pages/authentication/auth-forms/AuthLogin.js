import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import * as Yup from 'yup';
import Google from 'assets/images/icons/social-google.svg';
import toast from 'react-hot-toast';
import { Formik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { urls } from 'common/urls';
import { postApi } from 'common/apiClient';
import { useGoogleLogin } from '@react-oauth/google';


const AuthLogin = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleGoogleClick = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const data = { access_token: tokenResponse?.access_token };
        const response = await postApi(`${urls.login.googleSignin}`, data);
        if (response?.success === true) {
          toast.success('Login successful');
          localStorage.setItem('token', response.data.token);
          setTimeout(() => navigate('/dashboard/default'), 1000);
        } else {
          toast.error(response?.message || 'Login failed');
        }
      } catch (error) {
        toast.error('Login failed due to network or server error');
      }
    },
    onError: () => toast.error('Login failed')
  });

  return (
    <>
      <Formik
        initialValues={{
          email: localStorage.getItem('savedEmail') || '',
          password: localStorage.getItem('savedPassword') || '',
          rememberMe: localStorage.getItem('rememberMe') === 'true'
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus }) => {
          try {
            setIsSubmitting(true);
            const response = await postApi(`${urls.login.login}`, values);

            if (response?.data?.statusCode === 401) {
              toast.error(response?.message || 'Wrong Password');
            } else if (response?.data?.statusCode === 404) {
              toast.error(response?.message || 'Email Not Registered');
            } else if (response?.success) {
              toast.success('Login successful');
              localStorage.setItem('token', response?.data?.token);
              if (values.rememberMe) {
                localStorage.setItem('savedEmail', values.email);
                localStorage.setItem('savedPassword', values.password);
                localStorage.setItem('rememberMe', 'true');
              } else {
                localStorage.removeItem('savedEmail');
                localStorage.removeItem('savedPassword');
                localStorage.removeItem('rememberMe');
              }
              setTimeout(() => {
                navigate('/dashboard/default');
              }, 1000);
            }
          } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed due to network or server error');
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values, isValid, dirty }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl
              fullWidth
              size="small"
              error={Boolean(touched.email && errors.email)}
              sx={{
                '& .MuiFormLabel-root': {
                  color: '#000066'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: errors.email ? '#000066' : ''
                  }
                },
                mb: 2
              }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address"
              />
              {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              size="small"
              sx={{
                '& .MuiFormLabel-root': {
                  color: '#000066'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: errors.password ? '#000066' : ''
                  }
                }
              }}
            >
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ mb: 2 }}>
              <FormControl error={Boolean(touched.rememberMe && errors.rememberMe)}>
                <Box display="flex" alignItems="center" mt={1}>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={values.rememberMe}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ marginRight: '8px' }}
                  />
                  <Typography variant="body2">Remember Me</Typography>
                </Box>
                {touched.rememberMe && errors.rememberMe && <FormHelperText>{errors.rememberMe}</FormHelperText>}
              </FormControl>

              <Typography
                variant="body2"
                color="#009ec6"
                sx={{ textDecoration: 'none', cursor: 'pointer', marginTop: '8px' }}
                component={Link}
                to="/forgotPassword"
              >
                Forgot Password?
              </Typography>
            </Stack>

            <Box sx={{ mt: 2 }}>
              <Button
                disableElevation
                fullWidth
                size="small"
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#f7931e !important',
                  padding: '8px 0',
                  borderRadius: '8px'
                }}
                disabled={isSubmitting}
              >
                LOGIN
              </Button>

              <Grid item xs={12} mt={2}>
                <Grid item container direction="column" alignItems="center" xs={12}>
                  <Typography variant="body2" sx={{ textDecoration: 'none', color: '#4C4E64DE' }}>
                    New on our platform?{' '}
                    <Typography
                      component={Link}
                      to="/register"
                      variant="body2"
                      sx={{ textDecoration: 'none', color: '#15a6ca', display: 'inline' }}
                    >
                      Create an account
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} textAlign="center">
                or
              </Divider>

              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
                <IconButton onClick={handleGoogleClick}>
                  <img src={Google} alt="Google sign-in" width={20} height={20} style={{ cursor: 'pointer' }} />
                </IconButton>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
