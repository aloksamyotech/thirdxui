import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Box,
  Paper,
  Autocomplete,
  Button,
  MenuItem,
  FormControl,
  InputAdornment,
  Card,
  Typography,
  Chip,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useForm, Controller } from 'react-hook-form';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { postApi, updateApi, getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import config from '../../config';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { validateFile } from 'utils/filevalidator';

const AddCaseForm = ({ onCancel }) => {
  const navigate = useNavigate();
  const [countryList, setCountryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceid, setServiceid] = useState();
  const [benificiary, setBenificiary] = useState([]);
  const [sessionLocation, setsessionLocation] = useState([]);
  const [Campaigns, setCampaigns] = useState([]);
  const [engagement, setengagement] = useState([]);
  const [eventsAttended, seteventsAttended] = useState([]);
  const [fundingInterests, setfundingInterests] = useState([]);
  const [fundraisingActivities, setfundraisingActivities] = useState([]);
  const [serviceUser, setServiceUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const session = location?.state?.session;
  const serviceId = session?.serviceId || location?.state?.serviceId;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    mode: 'all',
    defaultValues: {
      date: dayjs(),
      countryOfOrigin: '',
      type: '',
      beneficiary: [],
      campaigns: [],
      engagement: [],
      eventsAttended: [],
      fundingInterests: [],
      fundraisingActivities: [],
      time: dayjs().format('HH:mm'),
      description: '',
      file: '',
      serviceUserId: ''
    }
  });

  useEffect(() => {
    if (session && Object.keys(session).length > 0) {
      const formData = {
        countryOfOrigin: session?.country || '',
        date: session?.date ? dayjs(session.date) : dayjs(),
        time: session?.time || dayjs().format('HH:mm'),
        description: session?.description || '',
        beneficiary: session?.benificiary || [],
        campaigns: session?.campaigns || [],
        engagement: session?.engagement || [],
        eventsAttended: session?.eventAttanded || [],
        fundingInterests: session?.fundingInterest || [],
        fundraisingActivities: session?.fundraisingActivities || [],
        serviceId: serviceId || '',
        file: session?.file || '',
        serviceUserId: session?.serviceuser?._id || ''
      };

      Object.entries(formData).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [session, setValue]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getApi(urls.tag.getAllTags);

        const benificiarydata = response?.data?.allTags?.filter((item) => item.tagCategoryName === 'Beneficiary Information');
        setBenificiary(benificiarydata);
        const Campaignsdata = response?.data?.allTags?.filter((item) => item.tagCategoryName === 'Campaigns Supported');
        setCampaigns(Campaignsdata);
        const engagementdata = response?.data?.allTags?.filter((item) => item.tagCategoryName === 'Engagement');
        setengagement(engagementdata);
        const eventsAttendeddata = response?.data?.allTags?.filter((item) => item.tagCategoryName === 'Event Attended');
        seteventsAttended(eventsAttendeddata);
        const fundingInterestsdata = response?.data?.allTags?.filter((item) => item.tagCategoryName === 'Funding Interests');
        setfundingInterests(fundingInterestsdata);
        const fundraisingActivitiesdata = response?.data?.allTags?.filter((item) => item.tagCategoryName === 'Fundraising Activities');
        setfundraisingActivities(fundraisingActivitiesdata);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApi(urls.configuration.fetch);
        const filterreason = response?.data?.allConfiguration?.filter((item) => item.configurationType === 'Location');
        setsessionLocation(filterreason);
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const fetchserviceUser = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (searchQuery && searchQuery !== '') {
          queryParams.append('search', searchQuery);
        }
        queryParams.append('role', 'user');

        const response = await getApi(`${urls.serviceuser.fetchWithPagination}?${queryParams.toString()}`);
        const allUser = response?.data?.data || [];
        const formattedUsers = allUser.map((user) => ({
          id: user._id,
          name: `${user.personalInfo?.firstName || ''} ${user.personalInfo?.lastName || ''}`
          // name: user.personalInfo?.firstName || ''
        }));
        setServiceUser(formattedUsers);
      } catch (error) {
        console.error('Error fetching service user:', error);
      }
    };
    fetchserviceUser();
  }, [searchQuery]);

  const renderAutocomplete = (name, label, options, error, helperText, control) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          multiple
          options={options || []}
          getOptionLabel={(option) => option?.name || ''}
          isOptionEqualToValue={(option, value) => option?._id === value?._id}
          value={options?.filter((opt) => field.value?.includes(opt?._id)) || []}
          onChange={(_, selectedOptions) => field.onChange(selectedOptions?.map((opt) => opt?._id) || [])}
          renderTags={(value, getTagProps) =>
            value?.map((option, index) => (
              <Chip
                label={option?.name || ''}
                {...getTagProps({ index })}
                key={option?._id}
                deleteIcon={
                  <span
                    style={{
                      backgroundColor: '#4C4E6442',
                      borderRadius: '50%',
                      width: 20,
                      height: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <CloseIcon style={{ color: 'white', fontSize: 16 }} />
                  </span>
                }
              />
            ))
          }
          renderInput={(params) => <TextField {...params} label={label} size="small" error={!!error} helperText={helperText} fullWidth />}
        />
      )}
    />
  );
  const onSubmit = async (data) => {
    setIsLoading(true);
    let response;

    try {
      const formData = new FormData();

      formData.append('country', data.countryOfOrigin || '');
      formData.append('serviceuser', data.serviceUserId || '');
      formData.append('date', data.date ? dayjs(data.date).format('YYYY-MM-DD') : '');
      formData.append('time', data.time || '');
      formData.append('description', data.description || '');

      (data.beneficiary || []).forEach((id) => {
        formData.append('benificiary[]', id);
      });

      (data.campaigns || []).forEach((id) => {
        formData.append('campaigns[]', id);
      });

      (data.engagement || []).forEach((id) => {
        formData.append('engagement[]', id);
      });

      (data.eventsAttended || []).forEach((id) => {
        formData.append('eventAttanded[]', id);
      });

      (data.fundingInterests || []).forEach((id) => {
        formData.append('fundingInterest[]', id);
      });

      (data.fundraisingActivities || []).forEach((id) => {
        formData.append('fundraisingActivities[]', id);
      });

      if (session?._id) {
        const sessionServiceId = session.serviceId?._id || session.serviceId;
        if (!sessionServiceId) {
          throw new Error('Service ID is required for updating session');
        }
        formData.append('serviceId', sessionServiceId);
      } else if (serviceId) {
        const idToSend = typeof serviceId === 'string' ? serviceId : serviceId._id;
        if (!idToSend) {
          throw new Error('Service ID is required for creating session');
        }
        formData.append('serviceId', idToSend);
      } else {
        throw new Error('Service ID is required');
      }

      if (data.file && data.file instanceof File) {
        formData.append('file', data.file);
      }

      if (session?._id) {
        if (!session._id) {
          throw new Error('Session ID is required for update');
        }
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

      const serviceIdToPass = session?.serviceId?._id || session?.serviceId || serviceId;
      navigate(`/view-service`, {
        state: {
          row: serviceIdToPass,
          serviceId: serviceIdToPass
        }
      });
    } catch (error) {
      toast.error(error.message || error.response?.data?.message || 'Error submitting session');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch(config.filter_Country)
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
        <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">
          <IconButton onClick={() => navigate(-1)}>
            <KeyboardBackspaceIcon sx={{ fontSize: 20, color: 'black' }} />
          </IconButton>
          {session ? 'Edit Session' : 'Add New Session'}
        </Typography>

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
          onClick={() => navigate(-1, { state: { row: serviceId } })}
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
                    rules={{ required: 'Location is required' }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        select
                        label="Select Location"
                        fullWidth
                        size="small"
                        {...field}
                        error={!!error}
                        helperText={error ? error.message : ''}
                      >
                        {sessionLocation?.map((loc) => (
                          <MenuItem key={loc._id} value={loc._id}>
                            {loc.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name="serviceUserId"
                    control={control}
                    rules={{ required: 'Service user is required' }}
                    render={({ field }) => {
                      const selectedUser = serviceUser?.find((user) => user.id === field.value);

                      return (
                        <FormControl fullWidth size="small" error={!!errors.serviceUserId}>
                          <Autocomplete
                            value={selectedUser}
                            onChange={(_, value) => field.onChange(value ? value.id : '')}
                            onInputChange={(_, newInputValue) => setSearchQuery(newInputValue)}
                            options={serviceUser || []}
                            getOptionLabel={(option) => option.name || ''}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => (
                              <TextField {...params} label="Session Lead" variant="outlined" size="small" error={!!errors.serviceUserId} />
                            )}
                          />
                          {errors.serviceUserId && (
                            <Typography color="error" variant="caption">
                              {errors.serviceUserId.message}
                            </Typography>
                          )}
                        </FormControl>
                      );
                    }}
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
                      {renderAutocomplete(
                        'beneficiary',
                        'Beneficiary Information',
                        benificiary,
                        errors.beneficiary,
                        errors.beneficiary?.message,
                        control
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      {renderAutocomplete(
                        'campaigns',
                        'Campaigns Supported',
                        Campaigns,
                        errors.campaigns,
                        errors.campaigns?.message,
                        control
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      {renderAutocomplete('engagement', 'Engagement', engagement, errors.engagement, errors.engagement?.message, control)}
                    </Grid>

                    <Grid item xs={12}>
                      {renderAutocomplete(
                        'eventsAttended',
                        'Events Attended',
                        eventsAttended,
                        errors.eventsAttended,
                        errors.eventsAttended?.message,
                        control
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      {renderAutocomplete(
                        'fundingInterests',
                        'Funding Interests',
                        fundingInterests,
                        errors.fundingInterests,
                        errors.fundingInterests?.message,
                        control
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      {renderAutocomplete(
                        'fundraisingActivities',
                        'Fundraising Activities',
                        fundraisingActivities,
                        errors.fundraisingActivities,
                        errors.fundraisingActivities?.message,
                        control
                      )}
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
                         rules={{
                          validate: (file) => validateFile(file)
                        }}
                        render={({ field }) => (
                          <Box mb={2} display="flex" justifyContent="space-between">
                            <TextField
                              variant="outlined"
                              size="small"
                              fullWidth
                              value={typeof field.value === 'string' ? field.value : field.value?.name || ''}
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
                                      <input
                                        type="file"
                                        hidden
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                           field.onChange(file);
                                        }}
                                      />
                                    </Button>
                                  </InputAdornment>
                                )
                              }}
                               error={!!errors.file}
                            helperText={errors.file?.message}
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
            <Button variant="outlined" color="error" onClick={() => navigate(-1, { state: { row: serviceId } })} disabled={isLoading}>
              CANCEL
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default AddCaseForm;
