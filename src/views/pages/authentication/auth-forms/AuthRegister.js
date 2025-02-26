import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
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

import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const AuthRegister = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        phone: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().required('Password is required'),
        phone: Yup.string()
          .matches(/^[1-9][0-9]{9}$/, 'Phone number must be 10 digits and cannot start with 0')
          .required('Phone number is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        console.log('Attempting to register user:', values);
        try {
          if (scriptedRef.current) {
            const res = await addUser(values);
            console.log('User registered successfully:', res.data);
            setStatus({ success: true });
            toast.success('Customer added successfully');
            values.name = '';
            values.email = '';
            values.password = '';
            values.phone = '';
          }
        } catch (err) {
          console.error('Registration error:', err.response ? err.response.data : err);
          if (scriptedRef.current) {
            setStatus({ success: false });
            if (err.response && err.response.data && err.response.data.message) {
              const message = err.response.data.message;
              if (message.includes('User already registered')) {
                toast.error('Email already in use. Please use a different email.');
              } else {
                toast.error(message);
              }
              setErrors({ submit: message });
            } else {
              toast.error('Failed to add customer');
              setErrors({ submit: err.message });
            }
            setSubmitting(false);
          }
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              name="name"
              type="text"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              sx={{
                '& .MuiFormLabel-root': {
                  color: '#000066'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: errors.name ? '#000066' : ''
                  }
                }
              }}
            />
            {touched.name && errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
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

          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            InputProps={{
              endAdornment: (
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
              )
            }}
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
          />

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              margin="normal"
              name="phone"
              type="text"
              value={values.phone}
              onBlur={handleBlur}
              onChange={handleChange}
              sx={{
                '& .MuiFormLabel-root': {
                  color: '#000066'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: errors.phone ? '#000066' : ''
                  }
                }
              }}
            />
            {touched.phone && errors.phone && <FormHelperText error>{errors.phone}</FormHelperText>}
          </Grid>

          {/* <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label={
                  <Typography variant="subtitle1">
                    Agree with &nbsp;
                    <Typography variant="subtitle1" component={Link} to="#">
                      Terms & Condition.
                    </Typography>
                  </Typography>
                }
              />
            </Grid>
          </Grid> */}

          {errors.submit && (
            <Box sx={{ mt: 1 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}

          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
            <AnimateButton>
              <Button
                disableElevation
                disabled={isSubmitting}
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
                sx={{
                  background: 'linear-gradient(45deg, #441572, #7c4bad)',
                  borderRadius: '50px',
                  '&:hover': {
                    background: 'linear-gradient(to right, #4b6cb7, #182848)',
                    boxShadow: '2'
                  }
                }}
              >
                Register
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default AuthRegister;
