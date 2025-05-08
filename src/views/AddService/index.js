import React from 'react';
import { Grid, TextField, Box, Paper, Button, InputAdornment, Card, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

const AddCaseForm = ({ onCancel }) => {
  const navigate = useNavigate();

  const textOnlyRegex = /^[A-Za-z\s]+$/;
  const numberOnlyRegex = /^[0-9]+$/;

  // Restrict key presses
  const allowOnlyText = (e) => {
    const regex = /^[A-Za-z\s]$/;
    if (!regex.test(e.key) && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };

  const allowOnlyNumber = (e) => {
    const regex = /^[0-9]$/;
    if (!regex.test(e.key) && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange', 
    defaultValues: {
      homePhone: '',
      phone: '',
      email: '',
      beneficiaryInformation: '',
      campaignsSupported: '',
      engagement: '',
      eventsAttended: '',
      fundingInterests: '',
      fundraisingActivities: '',
      notes: '',
      file: null
    }
  });

  const onSubmit = (data) => {
    onCancel();
  };

  return (
    <Card sx={{ position: 'relative', backgroundColor: '#eef2f6', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Add New Service</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/services')}>
          <ArrowBackIcon sx={{ color: 'grey' }} />
          <Typography variant="h6" sx={{ mr: 1 }}>
            Back
          </Typography>
        </Box>
      </Box>

      <Card sx={{ padding: 2, marginTop: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Controller
                    name="homePhone"
                    control={control}
                    rules={{
                      required: 'Service Name is required',
                      minLength: { value: 3, message: 'Minimum 3 characters' },
                      maxLength: { value: 50, message: 'Maximum 50 characters' },
                      pattern: { value: textOnlyRegex, message: 'Only letters allowed' }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Service Name"
                        size="small"
                        onKeyDown={allowOnlyText}
                        error={!!errors.homePhone}
                        helperText={errors.homePhone?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: 'Service Code is required',
                      pattern: { value: numberOnlyRegex, message: 'Only numbers allowed' },
                      minLength: { value: 3, message: 'Minimum 3 digits' },
                      maxLength: { value: 10, message: 'Maximum 10 digits' }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Service Code"
                        size="small"
                        onKeyDown={allowOnlyNumber}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: 'Service Type is required',
                      pattern: { value: textOnlyRegex, message: 'Only letters allowed' }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Service Type"
                        size="small"
                        onKeyDown={allowOnlyText}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ p: 2 }}>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography variant="subtitle1" mb={2}>
                    Service Tag
                  </Typography>

                  <Grid container spacing={2}>
                    {[
                      'beneficiaryInformation',
                      'campaignsSupported',
                      'engagement',
                      'eventsAttended',
                      'fundingInterests',
                      'fundraisingActivities'
                    ].map((field) => (
                      <Grid item xs={12} key={field}>
                        <Controller
                          name={field}
                          control={control}
                          rules={{
                            required: `${field.replace(/([A-Z])/g, ' $1')} is required`,
                            minLength: { value: 2, message: 'Minimum 2 characters' },
                            pattern: { value: textOnlyRegex, message: 'Only letters allowed' }
                          }}
                          render={({ field: controllerField }) => (
                            <TextField
                              {...controllerField}
                              fullWidth
                              size="small"
                              onKeyDown={allowOnlyText}
                              label={field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                              error={!!errors[field]}
                              helperText={errors[field]?.message}
                            />
                          )}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                  <Controller
                    name="file"
                    control={control}
                    render={({ field }) => (
                      <Box mb={2} display="flex" justifyContent="space-between">
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={field.value ? field.value.name : ''}
                          placeholder="Attachments"
                          InputProps={{
                            readOnly: true,
                            startAdornment: (
                              <InputAdornment position="start">
                                <AttachFileIcon fontSize="small" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <Button component="label" sx={{ minWidth: 0, p: 0 }}>
                                  <Link component="span">Upload a file</Link>
                                  <input type="file" hidden onChange={(e) => field.onChange(e.target.files?.[0] || null)} />
                                </Button>
                              </InputAdornment>
                            )
                          }}
                        />
                      </Box>
                    )}
                  />

                  <Controller
                    name="notes"
                    control={control}
                    rules={{
                      maxLength: { value: 1000, message: 'Maximum 1000 characters allowed' }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Notes"
                        multiline
                        minRows={12}
                        fullWidth
                        variant="outlined"
                        sx={{ mb: 2 }}
                        error={!!errors.notes}
                        helperText={errors.notes?.message}
                      />
                    )}
                  />
                </Paper>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt: 1, pr: 2 }}>
              <Grid item>
                <Button type="submit" variant="contained" sx={{ background: '#053146' }}>
                  Save Changes
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="error" onClick={onCancel}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Card>
  );
};

export default AddCaseForm;
