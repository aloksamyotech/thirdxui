import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { urls } from 'common/urls';
import { postApi } from 'common/apiClient';

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

  return (
    <Formik
      initialValues={{
        userName: '',
        email: '',
        password: ''
      }}
      validationSchema={Yup.object().shape({
        userName: Yup.string().required('userName is required'),
        email: Yup.string().email('Must be a valid email').required('Email is required'),
        password: Yup.string().required('Password is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setLoading(true);
          const response = await postApi(`${urls.login.register}`, values);
          if (response?.data?.statusCode == 404) {
            toast.warn(response?.message || 'User already exists');
          } else if (response?.success) {
            toast.success(response?.message || 'User Registered Successfully');
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="UserName"
              margin="normal"
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

          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
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

          <FormControl
            fullWidth
            error={Boolean(touched.password && errors.password)}
            sx={{
              mt: 2,
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

          {errors.submit && (
            <Box sx={{ mt: 1 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            <Button
              disableElevation
              fullWidth
              size="small"
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#f7931e !important'
              }}
              disabled={loading}
            >
              REGISTER
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default AuthRegister;
