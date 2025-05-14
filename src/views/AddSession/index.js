import React, { useState, useEffect } from 'react';
import { Grid, TextField, Box, Paper, Button, MenuItem, InputAdornment, Card, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useForm, Controller } from 'react-hook-form';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { postApi } from 'common/apiClient';
import { urls } from 'common/urls';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

const AddCaseForm = ({ onCancel }) => {
  const navigate = useNavigate();
  const [countryList, setCountryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    defaultValues: {
      date: dayjs(),
      countryOfOrigin: '',
      type: '',
      benificiary: '',
      campaigns: '',
      engagement: '',
      eventAttanded: '',
      fundingInterest: '',
      fundraisingActivities: '',
      time: dayjs().format('HH:mm'), 
      description: '',
      file: null
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append('country', data.countryOfOrigin);
      formData.append('name', data.type);
      formData.append('date', data.date);
      formData.append('time', data.time);
      formData.append('description', data.description);
      formData.append('benificiary', data.benificiary);
      formData.append('campaigns', data.campaigns);
      formData.append('engagement', data.engagement);
      formData.append('eventAttanded', data.eventAttanded);
      formData.append('fundingInterest', data.fundingInterest);
      formData.append('fundraisingActivities', data.fundraisingActivities);

      if (data.file) {
        formData.append('file', data.file);
      }

      const response = await postApi(urls.session.create, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Session added successfully');
      navigate('/services');
      setIsLoading(false);
    } catch (error) {
      toast.error('Error submitting session');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        const countries = data.map((country) => ({
          code: country.cca2,
          name: country.name.common,
          flag: country.flags.png
        }));
        setCountryList(countries);
      });
  }, []);

  const textOnlyRegex = /^[A-Za-z\s]+$/;

  return (
    <Card sx={{ position: 'relative', backgroundColor: '#eef2f6' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Add New Session</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/services')}>
          <ArrowBackIcon sx={{ color: 'grey' }} />
          <Typography variant="h6" sx={{ mr: 1 }}>
            Back
          </Typography>
        </Box>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ padding: 2, marginTop: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Controller
                    name="date"
                    control={control}
                    rules={{
                      required: 'This field is required'
                    }}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date"
                          {...field}
                          renderInput={(params) => (
                            <TextField {...params} fullWidth size="small" error={!!errors.date} helperText={errors.date?.message} />
                          )}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name="countryOfOrigin"
                    control={control}
                    rules={{ required: 'Country is required' }}
                    render={({ field }) => (
                      <TextField
                        select
                        fullWidth
                        label="Select a location"
                        size="small"
                        error={!!errors.countryOfOrigin}
                        helperText={errors.countryOfOrigin?.message}
                        {...field}
                      >
                        {countryList.map((country) => (
                          <MenuItem key={country.code} value={country.name}>
                            <img src={country.flag} alt={country.code} style={{ width: 20, height: 14, marginRight: 8 }} />
                            {country.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name="type"
                    control={control}
                    rules={{ required: 'Session Lead is required' }}
                    render={({ field }) => (
                      <TextField
                        select
                        fullWidth
                        label="Session Lead"
                        size="small"
                        error={!!errors.type}
                        helperText={errors.type?.message}
                        {...field}
                      >
                        <MenuItem value="Lead 1">Lead 1</MenuItem>
                        <MenuItem value="Lead 2">Lead 2</MenuItem>
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
                    <Grid item xs={12}>
                      <Controller
                        name="benificiary"
                        control={control}
                        rules={{
                          minLength: { value: 2, message: 'Minimum 2 characters' },
                          maxLength: { value: 50, message: 'Maximum 50 characters allowed' },
                          pattern: { value: textOnlyRegex, message: 'Only letters allowed' }
                        }}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            size="small"
                            label="Beneficiary Information"
                            error={!!errors.benificiary}
                            helperText={errors.benificiary?.message}
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="campaigns"
                        control={control}
                        rules={{
                          minLength: { value: 2, message: 'Minimum 2 characters' },
                          maxLength: { value: 50, message: 'Maximum 50 characters allowed' },
                          pattern: { value: textOnlyRegex, message: 'Only letters allowed' }
                        }}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            size="small"
                            label="Campaigns Supported"
                            error={!!errors.campaigns}
                            helperText={errors.campaigns?.message}
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="engagement"
                        control={control}
                        rules={{
                          minLength: { value: 2, message: 'Minimum 2 characters' },
                          maxLength: { value: 50, message: 'Maximum 50 characters allowed' },
                          pattern: { value: textOnlyRegex, message: 'Only letters allowed' }
                        }}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            size="small"
                            label="Engagement"
                            error={!!errors.engagement}
                            helperText={errors.engagement?.message}
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="eventAttanded"
                        control={control}
                        rules={{
                          minLength: { value: 2, message: 'Minimum 2 characters' },
                          maxLength: { value: 50, message: 'Maximum 50 characters allowed' },
                          pattern: { value: textOnlyRegex, message: 'Only letters allowed' }
                        }}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            size="small"
                            label="Events Attended"
                            error={!!errors.eventAttanded}
                            helperText={errors.eventAttanded?.message}
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="fundingInterest"
                        control={control}
                        rules={{
                          minLength: { value: 2, message: 'Minimum 2 characters' },
                          maxLength: { value: 50, message: 'Maximum 50 characters allowed' },
                          pattern: { value: textOnlyRegex, message: 'Only letters allowed' }
                        }}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            size="small"
                            label="Funding Interests"
                            error={!!errors.fundingInterest}
                            helperText={errors.fundingInterest?.message}
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="fundraisingActivities"
                        control={control}
                        rules={{
                          minLength: { value: 2, message: 'Minimum 2 characters' },
                          maxLength: { value: 50, message: 'Maximum 50 characters allowed' },
                          pattern: { value: textOnlyRegex, message: 'Only letters allowed' }
                        }}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            size="small"
                            label="Fundraising Activities"
                            error={!!errors.fundraisingActivities}
                            helperText={errors.fundraisingActivities?.message}
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                  <Grid container spacing={2} mb={2}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="time"
                        control={control}
                         rules={{ required: 'Time is required' }}
                        render={({ field }) => (
                          <TextField
                            label="Time"
                            type="time"
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ step: 300 }}
                            error={!!errors.time}
                            helperText={errors.time?.message}
                            {...field}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
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
                    </Grid>
                  </Grid>

                  <Controller
                    name="description"
                    control={control}
                    rules={{
                      required: 'This field is required',
                      minLength: { value: 2, message: 'Minimum 2 characters' },
                      maxLength: { value: 500, message: 'Maximum 500 characters allowed' },
                      pattern: { value: textOnlyRegex, message: 'Only letters allowed' }
                    }}
                    render={({ field }) => (
                      <TextField
                        label="Session Notes"
                        multiline
                        minRows={11}
                        fullWidth
                        variant="outlined"
                        sx={{ mb: 2 }}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        {...field}
                      />
                    )}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Card>

        <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt: 1, pr: 2 }}>
          <Grid item>
            <Button type="submit" variant="contained" sx={{ background: '#053146' }} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="error" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default AddCaseForm;
