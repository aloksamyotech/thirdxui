import { useState, useEffect } from 'react';
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import useScriptRef from 'hooks/useScriptRef.js';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; // Import the Copy Icon

const AuthLogin = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const scriptedRef = useScriptRef();
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const handleAccordian = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy!');
    });
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus }) => {
          try {
            setIsSubmitting(true);
            const res = await addApi('/user/login/', values);

            if (res?.data && res?.data?.jwtToken && res?.data?.user) {
              const storageMethod = rememberMe ? localStorage : sessionStorage;
              storageMethod.setItem('imstoken', JSON.stringify(res.data.jwtToken));
              storageMethod.setItem('user', JSON.stringify(res.data.user));
              storageMethod.setItem('userId', res.data.user._id);
              storageMethod.setItem('email', res.data.user.email);
              storageMethod.setItem('role', res.data.user.role);
              storageMethod.setItem('permissions', res.data.user.permissions || []);

              if (res.data.user.role === 'user') {
                navigate('/dashboard/default');
                window.location.reload();
              } else if (res.data.user.role === 'admin') {
                navigate('/dashboard/admin');
                window.location.reload();
              } else if (res.data.user.role === 'employee') {
                const permissions = (localStorage.getItem('permissions') || '').split(',');
                const filteredMenu = filterMenuItems(dashboard.children, permissions);
                const firstAvailableRoute = filteredMenu.length > 0 ? filteredMenu[0].url : '/dashboard/default';

                window.location.replace(firstAvailableRoute);
              }

              toast.success('Logged in successfully');
            } else {
              throw new Error('Unexpected response structure');
            }
          } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Logged in failed');
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl
              fullWidth
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
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
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
            {/* <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    name="rememberMe"
                    color="primary"
                  />
                }
                label="Remember me"
              />
            </Stack> */}

            <Box sx={{ width: '100%' }}>
              <Accordion expanded={expanded === 'panel1'} onChange={handleAccordian('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                  <Typography variant="h5">Admin Credentials</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Email: admin@gmail.com
                      <IconButton
                        aria-label="copy email"
                        size="small"
                        onClick={() => {
                          handleCopyToClipboard('admin@gmail.com');
                          setFieldValue('email', 'admin@gmail.com');
                        }}
                        sx={{ marginLeft: 1 }}
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Password: admin123
                      <IconButton
                        aria-label="copy password"
                        size="small"
                        onClick={() => {
                          handleCopyToClipboard('admin123');
                          setFieldValue('password', 'admin123');
                        }}
                        sx={{ marginLeft: 1 }}
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'panel2'} onChange={handleAccordian('panel2')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
                  <Typography variant="h5">User Credentials</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Email: samyotech@gmail.com
                      <IconButton
                        aria-label="copy email"
                        size="small"
                        onClick={() => {
                          handleCopyToClipboard('samyotech@gmail.com');
                          setFieldValue('email', 'samyotech@gmail.com');
                        }}
                        sx={{ marginLeft: 1 }}
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Password: 123456
                      <IconButton
                        aria-label="copy password"
                        size="small"
                        onClick={() => {
                          handleCopyToClipboard('123456');
                          setFieldValue('password', '123456');
                        }}
                        sx={{ marginLeft: 1 }}
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>

            <Box  sx={{display: 'flex', justifyContent: 'center' }}>
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
                    },
                  }}
                >
                  {isSubmitting ? 'Logging in...' : 'Sign in'}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
