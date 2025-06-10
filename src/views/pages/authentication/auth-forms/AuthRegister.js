import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Divider,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material';
import Google from 'assets/images/icons/social-google.svg';
import * as Yup from 'yup';
import { Formik } from 'formik';
import toast from 'react-hot-toast';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { urls } from 'common/urls';
import { postApi } from 'common/apiClient';
import { useGoogleLogin } from '@react-oauth/google';

const AuthRegister = ({ ...others }) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
    <Formik
      initialValues={{
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
      }}
      validationSchema={Yup.object().shape({
        userName: Yup.string().required('UserName is required'),
        email: Yup.string().email('Must be a valid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Confirm password must match')
          .required('Confirm Password is required'),
        acceptTerms: Yup.boolean().oneOf([true], 'You must accept the privacy policy & terms')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setLoading(true);
          const response = await postApi(`${urls.login.register}`, values);
          if (response?.data?.statusCode == 400) {
            toast.error(response?.message || 'User already exists');
          } else if (response?.success) {
            toast.success('User Registered Successfully');
            setTimeout(() => {
              navigate('/login');
            }, 1000);
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message || 'Something went wrong' });
          toast.error('Registration failed');
          setSubmitting(false);
        } finally {
          setLoading(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                size="small"
                name="email"
                type="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                sx={{
                  '& .MuiFormLabel-root': {
                    color: '#000066'
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: errors.email ? '#000066' : ''
                    }
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                margin="normal"
                size="small"
                name="userName"
                value={values.userName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.userName && errors.userName)}
                helperText={touched.userName && errors.userName}
                sx={{
                  '& .MuiFormLabel-root': {
                    color: '#000066'
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: errors.userName ? '#000066' : ''
                    }
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                error={Boolean(touched.password && errors.password)}
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
                <InputLabel htmlFor="register-password">Password</InputLabel>
                <OutlinedInput
                  id="register-password"
                  size="small"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" size="small">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                size="small"
                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                sx={{
                  '& .MuiFormLabel-root': {
                    color: '#000066'
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: errors.confirmPassword ? '#000066' : ''
                    }
                  }
                }}
              >
                <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                <OutlinedInput
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" size="small">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
                {touched.confirmPassword && errors.confirmPassword && <FormHelperText error>{errors.confirmPassword}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>

          {errors.submit && (
            <Box sx={{ mt: 1 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <FormControl error={Boolean(touched.acceptTerms && errors.acceptTerms)}>
            <Box display="flex" alignItems="center" mt={1}>
              <input
                type="checkbox"
                name="acceptTerms"
                checked={values.acceptTerms}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ marginRight: '8px' }}
              />
              <Typography variant="body2">I Agree to privacy policy & terms</Typography>
            </Box>
            {touched.acceptTerms && errors.acceptTerms && <FormHelperText>{errors.acceptTerms}</FormHelperText>}
          </FormControl>

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
              disabled={loading}
            >
              SIGN UP
            </Button>

            <Grid item xs={12} mt={2}>
              <Grid item container direction="column" alignItems="center" xs={12}>
                <Typography variant="body2" sx={{ textDecoration: 'none', color: '#4C4E64DE' }}>
                  Already have an account?{' '}
                  <Typography
                    component={Link}
                    to="/login"
                    variant="body2"
                    sx={{ textDecoration: 'none', color: '#15a6ca', display: 'inline' }}
                  >
                    Sign in instead
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
  );
};

export default AuthRegister;
