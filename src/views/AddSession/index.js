import React, { useState, useEffect } from 'react';
import { Grid, TextField, Box, Paper, Autocomplete, Button, MenuItem, InputAdornment, Card, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useForm, Controller } from 'react-hook-form';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { postApi, updateApi } from 'common/apiClient';
import { urls } from 'common/urls';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';

const AddCaseForm = ({ onCancel }) => {
  const navigate = useNavigate();
  const [countryList, setCountryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceid, setServiceid] = useState();
  const location = useLocation();
  const session = location.state.session;
  const serviceId = session?.serviceId || location.state?.serviceId;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
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

  useEffect(() => {
    if (session && Object.keys(session).length > 0) {
      const formData = {
        countryOfOrigin: session.country || '',
        type: session.name || '',
        date: session.date ? dayjs(session.date) : dayjs(),
        time: session.time || dayjs().format('HH:mm'),
        description: session.description || '',
        benificiary: session.benificiary || '',
        campaigns: session.campaigns || '',
        engagement: session.engagement || '',
        eventAttanded: session.eventAttanded || '',
        fundingInterest: session.fundingInterest || '',
        fundraisingActivities: session.fundraisingActivities || '',
        serviceId: session.serviceId,
        file: null
      };

      reset(formData);
    }
  }, [session, reset, serviceId]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    let response;
    try {
      const formData = new FormData();

      formData.append('country', data.countryOfOrigin || '');
      formData.append('name', data.type || '');
      formData.append('date', data.date || '');
      formData.append('time', data.time || '');
      formData.append('description', data.description || '');
      formData.append('benificiary', data.benificiary || '');
      formData.append('campaigns', data.campaigns || '');
      formData.append('engagement', data.engagement || '');
      formData.append('eventAttanded', data.eventAttanded || '');
      formData.append('fundingInterest', data.fundingInterest || '');
      formData.append('fundraisingActivities', data.fundraisingActivities || '');
      formData.append('serviceId', serviceId || '');

      if (data.file) {
        formData.append('file', data.file || '');
      }
      if (session?._id) {
        response = await updateApi(urls.session.update.replace(':id', session._id), formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Session updated successfully');
      } else {
        response = await postApi(urls.session.create, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Session added successfully');
      }

      navigate('/services');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.response?.data?.message || 'Error submitting session');
    } finally {
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

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey',
            borderRadius: '50%',
            width: 32,
            height: 32,
            cursor: 'pointer'
          }}
          onClick={() => navigate('/services')}
        >
          <CloseIcon sx={{ color: 'white', fontSize: 20 }} />
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
                    render={({ field, fieldState: { error } }) => (
                      <Autocomplete
                        options={countryList}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => option.code === value.code}
                        onChange={(_, value) => field.onChange(value?.name || '')}
                        value={countryList.find((c) => c.name === field.value) || null}
                        renderOption={(props, option) => (
                          <Box component="li" {...props} key={option.code} sx={{ display: 'flex', alignItems: 'center' }}>
                            <img src={option.flag} alt={option.code} style={{ width: 20, height: 14, marginRight: 8 }} />
                            {option.name}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Location"
                            size="small"
                            error={!!error}
                            helperText={error ? error.message : ''}
                          />
                        )}
                        PopperProps={{
                          modifiers: [
                            {
                              name: 'preventOverflow',
                              options: {
                                altBoundary: true,
                                rootBoundary: 'viewport',
                                tether: false
                              }
                            },
                            {
                              name: 'flip',
                              options: {
                                fallbackPlacements: ['bottom-start']
                              }
                            }
                          ],
                          placement: 'bottom-start'
                        }}
                        ListboxProps={{
                          style: {
                            maxHeight: 200,
                            overflowY: 'auto'
                          }
                        }}
                      />
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
                    Session Tag
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
              {isLoading ? 'Saving...' : 'SAVE CHANGES'}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="error" onClick={() => navigate('/services')} disabled={isLoading}>
              CANCEL
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default AddCaseForm;
