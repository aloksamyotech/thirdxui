import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { urls } from 'common/urls';
import { postApi } from 'common/apiClient';

const ForgotPassword3 = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
        })}
        onSubmit={async (values, { setErrors, setStatus }) => {}}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
              <Grid item xs={12} width="100%">
                <FormControl
                  fullWidth
                  size="small"
                  error={Boolean(touched.email && errors.email)}
                  sx={{
                    '& .MuiFormLabel-root': { color: '#000066' },
                    '& .MuiOutlinedInput-root fieldset': {
                      borderColor: errors.email ? '#000066' : ''
                    }
                  }}
                >
                  <InputLabel>Email</InputLabel>
                  <OutlinedInput type="email" name="email" value={values.email} onBlur={handleBlur} onChange={handleChange} label="Email" />
                  {touched.email && errors.email && <FormHelperText>{errors.email}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} width="100%">
                <Button
                  fullWidth
                  size="small"
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    backgroundColor: '#f7931e !important',
                    padding: '8px 0',
                    borderRadius: '8px'
                  }}
                >
                  RESET PASSWORD
                </Button>
              </Grid>

              <Grid item xs={12} width="100%">
                <Button fullWidth size="small" component={Link} to="/login" variant="outlined" sx={{ borderRadius: '8px' }}>
                  ← BACK TO LOGIN
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  Don’t have an account?{' '}
                  <Link to="/register" style={{ color: '#15a6ca', textDecoration: 'none' }}>
                    Create Account.
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ForgotPassword3;
