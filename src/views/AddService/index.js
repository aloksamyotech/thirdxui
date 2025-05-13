import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Grid, TextField, Box, Paper, Button, MenuItem, InputAdornment, FormControlLabel, Card, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { postApi } from 'common/apiClient';
import toast from 'react-hot-toast';
import { urls } from 'common/urls';
import AntSwitch from 'components/AntSwitch';

const AddCaseForm = ({ onCancel }) => {
  const navigate = useNavigate();
  const [restrictAccess, setRestrictAccess] = useState(true);
  const [isLoading, setIsloading] = useState(false);

  const textOnlyRegex = /^[A-Za-z\s]+$/;
  const numberOnlyRegex = /^[0-9]+$/;

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

  const onlyLettersAndNumbers = /^[A-Za-z0-9\s]*$/;

  const handleToggle = () => setRestrictAccess(!restrictAccess);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'all',
    defaultValues: {
      homePhone: '',
      code: '',
      serviceType: '',
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

  const onSubmit = async (data) => {
    setIsloading(true);

    try {
      const formData = new FormData();

      formData.append('name', data.homePhone);
      formData.append('code', data.code);
      formData.append('type', data.serviceType);
      formData.append('benificiary', data.beneficiaryInformation);
      formData.append('campaigns', data.campaignsSupported);
      formData.append('engagement', data.engagement);
      formData.append('eventAttanded', data.eventsAttended);
      formData.append('fundingInterest', data.fundingInterests);
      formData.append('fundraisingActivities', data.fundraisingActivities);
      formData.append('description', data.notes);
      formData.append('restrictAccess', restrictAccess);
      if (data.file) {
        formData.append('file', data.file);
      }

      const response = await postApi(urls.service.create, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Service added successfully');
      navigate('/services');
      setIsloading(false);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Error submitting service');
      setIsloading(false);
    }
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
                    name="code"
                    control={control}
                    rules={{
                      required: 'Service Code is required',
                      pattern: { value: onlyLettersAndNumbers, message: 'Only letters and numbers allowed' },
                      minLength: { value: 3, message: 'Minimum 3 char' },
                      maxLength: { value: 10, message: 'Maximum 10 char' }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Service Code"
                        size="small"
                        onKeyDown={onlyLettersAndNumbers}
                        error={!!errors.code}
                        helperText={errors.code?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name="serviceType"
                    control={control}
                    rules={{
                      required: 'Service Type is required'
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        fullWidth
                        label="Service Type"
                        size="small"
                        error={!!errors.serviceType}
                        helperText={errors.serviceType?.message}
                      >
                        <MenuItem value="Education">Education</MenuItem>
                        <MenuItem value="Health">Health</MenuItem>
                        <MenuItem value="Mentoring">Mentoring</MenuItem>
                        <MenuItem value="Group Work">Group Work</MenuItem>
                        <MenuItem value="Sports">Sports</MenuItem>
                        <MenuItem value="Social Programs">Social Programs</MenuItem>
                        <MenuItem value="Arts and Culture">Arts and Culture</MenuItem>
                      </TextField>
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
                            maxLength: { value: 50, message: 'Maximum 50 characters allowed' },
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
                      required: 'This field is required',
                      maxLength: { value: 500, message: 'Maximum 500 characters allowed' }
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
                  <FormControlLabel
                    control={<AntSwitch checked={restrictAccess} onChange={handleToggle} />}
                    label="Restrict Access?"
                    labelPlacement="start"
                    sx={{ gap: 1 }}
                  />
                </Paper>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt: 1, pr: 2 }}>
              <Grid item>
                <Button type="submit" variant="contained" sx={{ background: '#053146' }} disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Changes'}
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
