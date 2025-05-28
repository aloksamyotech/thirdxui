import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  Grid,
  TextField,
  Box,
  Paper,
  Button,
  MenuItem,
  InputAdornment,
  FormControlLabel,
  Card,
  Typography,
  Autocomplete,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { postApi, getApi } from 'common/apiClient';
import toast from 'react-hot-toast';
import { urls } from 'common/urls';
import AntSwitch from 'components/AntSwitch';

const AddCaseForm = () => {
  const navigate = useNavigate();
  const [restrictAccess, setRestrictAccess] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const [servicetype, setServiceType] = useState([]);
  const [serviceTypeOptions, setServiceTypeOptions] = useState([]);
  const [benificiary, setBenificiary] = useState([]);
  const [Campaigns, setCampaigns] = useState([]);
  const [engagement, setengagement] = useState([]);
  const [eventsAttended, seteventsAttended] = useState([]);
  const [fundingInterests, setfundingInterests] = useState([]);
  const [fundraisingActivities, setfundraisingActivities] = useState([]);

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
  const onlyLetters = /^[A-Za-z\s]*$/;

  const handleToggle = () => setRestrictAccess(!restrictAccess);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApi(urls.configuration.fetch);

        const servicetypeoption = response?.data?.allConfiguration?.filter((item) => item.configurationType === 'Service Types');
        setServiceType(servicetypeoption);
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    };
    fetchData();
  }, []);
  
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'all',
    defaultValues: {
      name: '',
      code: '',
      serviceType: '',
      benificiary: [],
      Campaigns: [],
      engagement: [],
      eventsAttended: [],
      fundingInterests: [],
      fundraisingActivities: [],
      notes: '',
      file: null,
      restrictAccess: false
    }
  });
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
  const renderAutocomplete = (name, label, options, error, helperText, control) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          multiple
          options={options}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          value={options.filter((opt) => field.value?.includes(opt._id)) || []}
          onChange={(_, selectedOptions) => field.onChange(selectedOptions.map((opt) => opt._id))}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option.name}
                {...getTagProps({ index })}
                key={option._id}
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
    setIsloading(true);

    try {
      const formData = new FormData();
      formData.append('name', data.name || '');
      formData.append('code', data.code || '');
      formData.append('serviceType', data.serviceType || '');
      (data.benificiary || []).forEach((id) => {
        formData.append('benificiary[]', id);
      });

      (data.Campaigns || []).forEach((id) => {
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
      formData.append('description', data.notes || '');
      formData.append('isActive', restrictAccess || false);
      if (data.file) {
        formData.append('file', data.file || '');
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
      toast.error('Error submitting service');
      setIsloading(false);
    }
  };

  return (
    <Card sx={{ position: 'relative', backgroundColor: '#eef2f6', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Adding New Service</Typography>
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

      <Card sx={{ padding: 2, marginTop: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Controller
                    name="name"
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
                        error={!!errors.name}
                        helperText={errors.name?.message}
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
                      maxLength: { value: 20, message: 'Maximum 20 char' }
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
                        {servicetype?.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                          </MenuItem>
                        ))}
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
                      {renderAutocomplete(
                        'benificiary',
                        'Beneficiary Information',
                        benificiary,
                        errors.benificiary,
                        errors.benificiary?.message,
                        control
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      {renderAutocomplete(
                        'Campaigns',
                        'Campaigns Supported',
                        Campaigns,
                        errors.Campaigns,
                        errors.Campaigns?.message,
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
                                  <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                                      const maxSizeInBytes = 25 * 1024 * 1024;

                                      if (file) {
                                        if (!allowedTypes.includes(file.type)) {
                                          toast.error('Only image files (JPG, JPEG, PNG) are allowed.');
                                          e.target.value = null;
                                          field.onChange(null);
                                          return;
                                        }

                                        if (file.size > maxSizeInBytes) {
                                          toast.error('File size must be less than or equal to 25MB.');
                                          e.target.value = null;
                                          field.onChange(null);
                                          return;
                                        }

                                        field.onChange(file);
                                      } else {
                                        field.onChange(null);
                                      }
                                    }}
                                  />
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
                      required: 'Notes are required',
                      minLength: {
                        value: 12,
                        message: 'Notes must be at least 10 characters long'
                      },
                      validate: {
                        maxWords: (value) => {
                          const wordCount = value.trim().split(/\s+/).length;
                          return wordCount <= 500 || 'Notes cannot exceed 500 words';
                        },
                        validCharacters: (value) =>
                          /^[A-Za-z0-9\s.,'"\-():!@#$%^&*]+$/.test(value) ||
                          'Notes can only contain letters, numbers, and common punctuation'
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Notes"
                        multiline
                        minRows={11}
                        fullWidth
                        variant="outlined"
                        error={!!errors.notes}
                        helperText={errors.notes?.message}
                      />
                    )}
                  />

                  <FormControlLabel
                    control={<AntSwitch checked={restrictAccess} onChange={handleToggle} />}
                    label="Restrict Access?"
                    labelPlacement="start"
                    sx={{ gap: 1, mt:1}}
                  />
                </Paper>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt: 1, pr: 2 }}>
              <Grid item>
                <Button type="submit" variant="contained" sx={{ background: '#053146' }} disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'SAVE CHANGES'}
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="error" onClick={() => navigate('/services')}>
                  CANCEL
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
