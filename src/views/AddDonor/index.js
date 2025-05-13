import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Grid,
  MenuItem,
  Autocomplete,
  Card,
  CircularProgress,
  CardContent,
  Tabs,
  Tab,
  Box,
  Switch,
  Paper,
  TextField,
  InputAdornment,
  Typography,
  Button,
  FormControlLabel
} from '@mui/material';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from '@mui/material/Link';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AntSwitch from 'components/AntSwitch.js';
import dayjs from 'dayjs';
import { postApi, getApi } from 'common/apiClient';
import { urls } from 'common/urls';

const AddDonorForm = () => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [countryList, setCountryList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [loading, setLoading] = useState(false);

  const fileInputRef = React.useRef(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    trigger,
    formState: { errors }
  } = useForm({
    mode: 'all',
    defaultValues: {
      title: '',
      firstname: '',
      lastname: '',
      phone: '',
      mobilePhone: '',
      email: '',
      gender: '',
      dob: null,
      address: '',
      country: '',
      pinCode: '',
      riskNotes: '',
      keyIndicators: '',
      service: '',
      socialmedia: '',
      donortag: true,
      emailConsent: true,
      sms: true,
      telephone: true,
      whatsapp: true,
      preferredContact: '',
      reason: '',
      contactPurpose: '',
      confirmationDate: null,
      attachments: null,
      role: 'donor'
    }
  });

  const [restrictAccess, setRestrictAccess] = useState(true);
  const handleToggle = () => setRestrictAccess(!restrictAccess);

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

  useEffect(() => {
    const fetchDistricts = async () => {
      setLoading(true);
      try {
        const response = await getApi(urls.serviceuser.getDistrict);
        const fetchedDistricts = response?.data?.cities || [];
        setDistricts(fetchedDistricts);
      } catch (error) {
        console.error('Error fetching districts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, []);

  const handleChange = (e) => {
    setCaseData({ ...caseData, [e.target.name]: e.target.value });
  };

  const handleFileClick = (e) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setValue('attachments', file);
    }
  };

  const onSubmit = async (data) => {
    setIsloading(true);

    const fd = new FormData();

    if (data.file) {
      fd.append('file', data.file);
    }

    fd.append('personalInfo[title]', data.title);
    fd.append('personalInfo[firstName]', data.firstname);
    fd.append('personalInfo[lastName]', data.lastname);
    fd.append('personalInfo[gender]', data.gender);
    fd.append('personalInfo[dateOfBirth]', data.dob);

    fd.append('contactInfo[phone]', data.phone);
    fd.append('contactInfo[homePhone]', data.mobilePhone);
    fd.append('contactInfo[email]', data.email);
    fd.append('contactInfo[addressLine1]', data.address);
    fd.append('contactInfo[addressLine2]', data.address2);
    fd.append('contactInfo[district]', data.district);
    fd.append('contactInfo[postcode]', data.pinCode);
    fd.append('contactInfo[country]', data.country);

    fd.append('otherInfo[description]', data.riskNotes);
    fd.append('otherInfo[benificiary]', data.Beneficiary);
    fd.append('otherInfo[campaigns]', data.campaigns);
    fd.append('otherInfo[engagement]', data.engagement);
    fd.append('otherInfo[eventAttanded]', data.eventsAttended);
    fd.append('otherInfo[fundingInterest]', data.fundingInterests);
    fd.append('otherInfo[fundraisingActivities]', data.fundraisingActivities);
    fd.append('otherInfo[restrictAccess]', restrictAccess);

    fd.append('contactPreferences[preferredMethod]', data.preferredContact);
    fd.append('contactPreferences[contactPurposes]', data.contactPurpose);
    fd.append('contactPreferences[dateOfConfirmation]', data.confirmationDate);
    fd.append('contactPreferences[reason]', data.reason);
    fd.append('contactPreferences[email]', data.contactemail);
    fd.append('contactPreferences[contactMethods][email]', data.emailConsent);
    fd.append('contactPreferences[contactMethods][donor]', data.donortag);
    fd.append('contactPreferences[contactMethods][sms]', data.sms);
    fd.append('contactPreferences[contactMethods][whatsapp]', data.whatsapp);
    fd.append('contactPreferences[contactMethods][telephone]', data.telephone);

    fd.append('companyInformation[socialMediaLinks]', data.socialmedia);
    fd.append('companyInformation[recruitmentCampaign]', data.Recruitmentcampaign);

    fd.append('role', 'donor');
    fd.append('subRole', 'donar_individual');

    try {
      const response = await postApi(urls.serviceuser.create, fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Successfully Added Donor');
      setIsloading(false);
      navigate('/donor');
    } catch (error) {
      toast.error('Error in Submitting form');
      setIsloading(false);
    }
  };

  const onlyNumbers = /^[0-9]*$/;
  const onlyLetters = /^[A-Za-z\s]*$/;
  const onlyLettersAndNumbers = /^[A-Za-z0-9\s]*$/;
  const ukPostcode = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;

  const handleTabChange = async (newValue) => {
    if (newValue > tabIndex) {
      const firstTabFields = [
        'title',
        'firstname',
        'lastname',
        'phone',
        'email',
        'gender',
        'dob',
        'address',
        'country',
        'pinCode',
        'riskNotes',
        'socialmedia',
        'district'
      ];

      try {
        const isValid = await trigger(firstTabFields);
        if (isValid) {
          setTabIndex(newValue);
        } else {
          toast.error('Please fill all required fields before proceeding');
        }
      } catch (error) {
        toast.error('Error validating form fields');
      }
    } else {
      setTabIndex(newValue);
    }
  };

  return (
    <Grid>
      <Card sx={{ position: 'relative', backgroundColor: '#eef2f6' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">Add Donor</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/donor')}>
            <ArrowBackIcon sx={{ color: 'grey' }} />
            <Typography variant="h6" sx={{ mr: 1 }}>
              Back
            </Typography>
          </Box>
        </Box>
        <Card sx={{ padding: 2, marginTop: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Tabs
              value={tabIndex}
              onChange={(e, newValue) => handleTabChange(newValue)}
              sx={{
                display: 'flex',
                gap: 2,
                borderBottom: '1px solid #4792d3'
              }}
            >
              <Tab
                label="Personal Details"
                sx={(theme) => ({
                  backgroundColor: tabIndex === 0 ? '#e3f2fd' : 'transparent',
                  transition: 'background-color 0.3s ease',
                  marginRight: 2,
                  fontSize: '14px',
                  minWidth: 120,
                  fontWeight: 'bold',
                  textTransform: 'none'
                })}
              />
              <Tab
                label="Contact Preferences"
                sx={(theme) => ({
                  backgroundColor: tabIndex === 1 ? '#e3f2fd' : 'transparent',
                  transition: 'background-color 0.3s ease',
                  marginRight: 2,
                  fontSize: '14px',
                  minWidth: 120,
                  fontWeight: 'bold',
                  textTransform: 'none'
                })}
              />
            </Tabs>

            <Box mt={2}>
              {tabIndex === 0 && (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Card sx={{ boxShadow: 1, borderRadius: 2, p: 0 }}>
                        <CardContent>
                          <Typography variant="h5" gutterBottom>
                            Personal Information
                          </Typography>
                          <Grid container rowSpacing={2} columnSpacing={1}>
                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="title"
                                control={control}
                                rules={{ required: 'Title is required' }}
                                render={({ field }) => (
                                  <TextField
                                    select
                                    fullWidth
                                    label="Title"
                                    size="small"
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                    {...field}
                                  >
                                    <MenuItem value="Mr">Mr.</MenuItem>
                                    <MenuItem value="Ms">Ms.</MenuItem>
                                    <MenuItem value="Mrs">Mrs.</MenuItem>
                                    <MenuItem value="Prof">Prof.</MenuItem>
                                    <MenuItem value="Dr">Dr.</MenuItem>
                                    <MenuItem value="Dr">Lady</MenuItem>
                                  </TextField>
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="gender"
                                control={control}
                                rules={{ required: 'Gender is required' }}
                                render={({ field }) => (
                                  <TextField
                                    select
                                    fullWidth
                                    label="Gender"
                                    size="small"
                                    {...field}
                                    error={!!errors.gender}
                                    helperText={errors.gender?.message}
                                  >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Non-Binary">Non-Binary</MenuItem>
                                    <MenuItem value="Others">Prefer not to say</MenuItem>
                                  </TextField>
                                )}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="firstname"
                                control={control}
                                rules={{
                                  required: 'First name is required',
                                  minLength: {
                                    value: 2,
                                    message: 'First name must be at least 2 characters'
                                  },
                                  maxLength: {
                                    value: 50,
                                    message: 'First name cannot exceed 50 characters'
                                  },
                                  pattern: {
                                    value: onlyLetters,
                                    message: 'First name can only contain letters'
                                  }
                                }}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Forename"
                                    size="small"
                                    error={!!errors.firstname}
                                    helperText={errors.firstname?.message}
                                    inputProps={{
                                      pattern: onlyLetters.source,
                                      onKeyPress: (e) => {
                                        if (!onlyLetters.test(e.key)) {
                                          e.preventDefault();
                                        }
                                      }
                                    }}
                                    {...field}
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="lastname"
                                control={control}
                                rules={{
                                  required: 'Last name is required',
                                  minLength: {
                                    value: 2,
                                    message: 'Last name must be at least 2 characters'
                                  },
                                  maxLength: {
                                    value: 50,
                                    message: 'Last name cannot exceed 50 characters'
                                  },
                                  pattern: {
                                    value: onlyLetters,
                                    message: 'Last name can only contain letters'
                                  }
                                }}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Surname"
                                    size="small"
                                    error={!!errors.lastname}
                                    helperText={errors.lastname?.message}
                                    inputProps={{
                                      pattern: onlyLetters.source,
                                      onKeyPress: (e) => {
                                        if (!onlyLetters.test(e.key)) {
                                          e.preventDefault();
                                        }
                                      }
                                    }}
                                    {...field}
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <Controller
                                name="dob"
                                control={control}
                                rules={{
                                  required: 'Date of Birth is required'
                                }}
                                render={({ field }) => (
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      label="DOB"
                                      value={field.value}
                                      onChange={(newValue) => field.onChange(newValue)}
                                      maxDate={dayjs()}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          fullWidth
                                          error={!!errors.dob}
                                          helperText={errors.dob?.message}
                                          size="small"
                                        />
                                      )}
                                    />
                                  </LocalizationProvider>
                                )}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <Controller
                                name="socialmedia"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Social Media Links"
                                    size="small"
                                    error={!!errors.socialmedia}
                                    helperText={errors.socialmedia?.message}
                                    {...field}
                                  />
                                )}
                                rules={{
                                  required: 'Social media link is required',
                                  minLength: {
                                    value: 2,
                                    message: 'Social media link must be at least 2 characters'
                                  },
                                  maxLength: {
                                    value: 50,
                                    message: 'Social media link cannot exceed 50 characters'
                                  },
                                  pattern: {
                                    value: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9_-]+)(\.[a-zA-Z]{2,})+(\/[a-zA-Z0-9#]+\/?)*$/,
                                    message: 'Please enter a valid URL'
                                  }
                                }}
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Card sx={{ boxShadow: 1, borderRadius: 2 }}>
                        <CardContent>
                          <Typography variant="h5" gutterBottom>
                            Contact Information
                          </Typography>
                          <Grid container rowSpacing={2} columnSpacing={1}>
                            <Grid item xs={12} sm={4}>
                              <Controller
                                name="phone"
                                control={control}
                                rules={{
                                  required: 'Phone number is required',
                                  pattern: {
                                    value: onlyNumbers,
                                    message: 'Phone number must contain only numbers'
                                  },
                                  minLength: {
                                    value: 10,
                                    message: 'Phone number must be at least 10 digits'
                                  }
                                }}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Home Phone No."
                                    size="small"
                                    error={!!errors.phone}
                                    helperText={errors.phone?.message}
                                    type="tel"
                                    inputProps={{
                                      pattern: onlyNumbers.source,
                                      onKeyPress: (e) => {
                                        if (!onlyNumbers.test(e.key)) {
                                          e.preventDefault();
                                        }
                                      }
                                    }}
                                    {...field}
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                              <Controller
                                name="mobilePhone"
                                control={control}
                                rules={{
                                  pattern: {
                                    value: onlyNumbers,
                                    message: 'Phone number must contain only numbers'
                                  },
                                  minLength: {
                                    value: 10,
                                    message: 'Phone number must be at least 10 digits'
                                  }
                                }}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Mobile Phone No."
                                    size="small"
                                    error={!!errors.mobilePhone}
                                    helperText={errors.mobilePhone?.message}
                                    type="tel"
                                    inputProps={{
                                      pattern: onlyNumbers.source,
                                      onKeyPress: (e) => {
                                        if (!onlyNumbers.test(e.key)) {
                                          e.preventDefault();
                                        }
                                      }
                                    }}
                                    {...field}
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                              <Controller
                                name="email"
                                control={control}
                                rules={{
                                  required: 'Email is required',
                                  pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                  }
                                }}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Email"
                                    size="small"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    {...field}
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="address"
                                control={control}
                               rules={{
                                  required: 'Address is required',
                                  pattern: {
                                    value: /^[a-zA-Z0-9\s.,\-/#&()']+$/,
                                    message: 'Address can only contain letters, numbers, spaces, and valid special characters'
                                  }
                                }}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Address Line 1"
                                    size="small"
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
                                    inputProps={{
                                      pattern: onlyLettersAndNumbers.source
                                    }}
                                    {...field}
                                  />
                                )}
                              />
                              
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="address2"
                                control={control}
                                rules={{
                                  required: 'Address is required',
                                  pattern: {
                                    value: /^[a-zA-Z0-9\s.,\-/#&()']+$/,
                                    message: 'Address can only contain letters, numbers, spaces, and valid special characters'
                                  }
                                }}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Address Line 2"
                                    size="small"
                                    error={!!errors.address2}
                                    helperText={errors.address2?.message}
                                    inputProps={{
                                      pattern: onlyLettersAndNumbers.source
                                    }}
                                    {...field}
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="district"
                                control={control}
                                rules={{ required: 'District is required' }}
                                render={({ field }) => (
                                  <Autocomplete
                                    {...field}
                                    options={districts}
                                    loading={loading}
                                    onChange={(_, value) => field.onChange(value)}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select District"
                                        size="small"
                                        error={!!errors.district}
                                        helperText={errors.district?.message}
                                        InputProps={{
                                          ...params.InputProps,
                                          endAdornment: (
                                            <>
                                              {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                              {params.InputProps.endAdornment}
                                            </>
                                          )
                                        }}
                                      />
                                    )}
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="pinCode"
                                control={control}
                                rules={{
                                  required: 'Postcode is required',
                                  pattern: {
                                    value: onlyNumbers,
                                    message: 'Please enter a valid postcode'
                                  }
                                }}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Postcode"
                                    size="small"
                                    error={!!errors.pinCode}
                                    helperText={errors.pinCode?.message}
                                    inputProps={{
                                      pattern: onlyNumbers.source
                                    }}
                                    {...field}
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="country"
                                control={control}
                                rules={{ required: 'Country is required' }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                  <Autocomplete
                                    options={countryList}
                                    getOptionLabel={(option) => option.name}
                                    isOptionEqualToValue={(option, value) => option.name === value}
                                    value={countryList.find((c) => c.name === value) || null}
                                    onChange={(_, newValue) => onChange(newValue?.name || '')}
                                    renderOption={(props, option) => (
                                      <li {...props}>
                                        <img src={option.flag} alt={option.code} style={{ width: 20, height: 14, marginRight: 8 }} />
                                        {option.name}
                                      </li>
                                    )}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Country of origin"
                                        size="small"
                                        error={!!error}
                                        helperText={error?.message}
                                      />
                                    )}
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="Recruitmentcampaign"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    select
                                    fullWidth
                                    label="Recruitment Campaign"
                                    size="small"
                                    error={!!errors.Recruitmentcampaign}
                                    helperText={errors.Recruitmentcampaign?.message}
                                    {...field}
                                  >
                                    <MenuItem value="Campaign 1">Campaign 1</MenuItem>
                                    <MenuItem value="Campaign 2">Campaign 2</MenuItem>
                                  </TextField>
                                )}
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Box>
                      <Typography variant="h5" m={2}>
                        Other Information
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Paper elevation={2} sx={{ p: 2 }}>
                            <Typography variant="subtitle1" mb={2}>
                              Service User Tag
                            </Typography>

                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Controller
                                  name="Beneficiary"
                                  control={control}
                                  rules={{
                                    minLength: {
                                      value: 2,
                                      message: 'Beneficiary information must be at least 2 characters'
                                    },
                                    maxLength: {
                                      value: 50,
                                      message: 'Beneficiary information cannot exceed 50 characters'
                                    },
                                    pattern: {
                                      value: onlyLetters,
                                      message: 'Beneficiary information can only contain letters'
                                    }
                                  }}
                                  render={({ field }) => (
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Beneficiary Information"
                                      error={!!errors.Beneficiary}
                                      helperText={errors.Beneficiary?.message}
                                      inputProps={{
                                        pattern: onlyLetters.source,
                                        onKeyPress: (e) => {
                                          if (!onlyLetters.test(e.key)) {
                                            e.preventDefault();
                                          }
                                        }
                                      }}
                                      {...field}
                                    />
                                  )}
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <Controller
                                  name="keyIndicators"
                                  control={control}
                                  rules={{
                                    minLength: {
                                      value: 2,
                                      message: 'Key indicators must be at least 2 characters'
                                    },
                                    maxLength: {
                                      value: 50,
                                      message: 'Key indicators cannot exceed 50 characters'
                                    },
                                    pattern: {
                                      value: onlyLetters,
                                      message: 'Key indicators can only contain letters'
                                    }
                                  }}
                                  render={({ field }) => (
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Campaigns Supported"
                                      error={!!errors.keyIndicators}
                                      helperText={errors.keyIndicators?.message}
                                      inputProps={{
                                        pattern: onlyLetters.source,
                                        onKeyPress: (e) => {
                                          if (!onlyLetters.test(e.key)) {
                                            e.preventDefault();
                                          }
                                        }
                                      }}
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
                                    minLength: {
                                      value: 2,
                                      message: 'Engagement must be at least 2 characters'
                                    },
                                    maxLength: {
                                      value: 50,
                                      message: 'Engagement cannot exceed 50 characters'
                                    },
                                    pattern: {
                                      value: onlyLetters,
                                      message: 'Engagement can only contain letters'
                                    }
                                  }}
                                  render={({ field }) => (
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Engagement"
                                      error={!!errors.engagement}
                                      helperText={errors.engagement?.message}
                                      inputProps={{
                                        pattern: onlyLetters.source,
                                        onKeyPress: (e) => {
                                          if (!onlyLetters.test(e.key)) {
                                            e.preventDefault();
                                          }
                                        }
                                      }}
                                      {...field}
                                    />
                                  )}
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <Controller
                                  name="eventsAttended"
                                  control={control}
                                  rules={{
                                    minLength: {
                                      value: 2,
                                      message: 'Events attended must be at least 2 characters'
                                    },
                                    maxLength: {
                                      value: 50,
                                      message: 'Events attended cannot exceed 50 characters'
                                    },
                                    pattern: {
                                      value: onlyLetters,
                                      message: 'Events attended can only contain letters'
                                    }
                                  }}
                                  render={({ field }) => (
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Events Attended"
                                      error={!!errors.eventsAttended}
                                      helperText={errors.eventsAttended?.message}
                                      inputProps={{
                                        pattern: onlyLetters.source,
                                        onKeyPress: (e) => {
                                          if (!onlyLetters.test(e.key)) {
                                            e.preventDefault();
                                          }
                                        }
                                      }}
                                      {...field}
                                    />
                                  )}
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <Controller
                                  name="fundingInterests"
                                  control={control}
                                  rules={{
                                    minLength: {
                                      value: 2,
                                      message: 'Funding interests must be at least 2 characters'
                                    },
                                    maxLength: {
                                      value: 50,
                                      message: 'Funding interests cannot exceed 50 characters'
                                    },
                                    pattern: {
                                      value: onlyLetters,
                                      message: 'Funding interests can only contain letters'
                                    }
                                  }}
                                  render={({ field }) => (
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Funding Interests"
                                      error={!!errors.fundingInterests}
                                      helperText={errors.fundingInterests?.message}
                                      inputProps={{
                                        pattern: onlyLetters.source,
                                        onKeyPress: (e) => {
                                          if (!onlyLetters.test(e.key)) {
                                            e.preventDefault();
                                          }
                                        }
                                      }}
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
                                    minLength: {
                                      value: 2,
                                      message: 'Fundraising activities must be at least 2 characters'
                                    },
                                    maxLength: {
                                      value: 50,
                                      message: 'Fundraising activities cannot exceed 50 characters'
                                    },
                                    pattern: {
                                      value: onlyLetters,
                                      message: 'Fundraising activities can only contain letters'
                                    }
                                  }}
                                  render={({ field }) => (
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Fundraising Activities"
                                      error={!!errors.fundraisingActivities}
                                      helperText={errors.fundraisingActivities?.message}
                                      inputProps={{
                                        pattern: onlyLetters.source,
                                        onKeyPress: (e) => {
                                          if (!onlyLetters.test(e.key)) {
                                            e.preventDefault();
                                          }
                                        }
                                      }}
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
                              name="riskNotes"
                              control={control}
                              rules={{
                                required: 'Notes are required',
                                minLength: {
                                  value: 10,
                                  message: 'Notes must be at least 10 characters long'
                                },
                                maxLength: {
                                  value: 500,
                                  message: 'Last name cannot exceed 500 characters'
                                },
                                pattern: {
                                  value: onlyLetters,
                                  message: 'Last name can only contain letters'
                                }
                              }}
                              render={({ field }) => (
                                <TextField
                                  label="Notes"
                                  multiline
                                  minRows={11}
                                  fullWidth
                                  variant="outlined"
                                  sx={{ mb: 2 }}
                                  error={!!errors.riskNotes}
                                  helperText={errors.riskNotes?.message}
                                  inputProps={{
                                    pattern: onlyLetters.source,
                                    onKeyPress: (e) => {
                                      if (!onlyLetters.test(e.key)) {
                                        e.preventDefault();
                                      }
                                    }
                                  }}
                                  {...field}
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
                    </Box>
                  </Grid>

                  <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt: 1, pr: 2 }}>
                    <Grid item>
                      <Button variant="contained" sx={{ background: '#053146' }} onClick={() => handleTabChange(1)}>
                        Next
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}

              {tabIndex === 1 && (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        name="preferredContact"
                        control={control}
                        rules={{
                          required: 'Preferred method of contact is required'
                        }}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            size="small"
                            label="Preferred Method of Contact"
                            select
                            {...field}
                            error={!!errors.preferredContact}
                            helperText={errors.preferredContact?.message}
                          >
                            <MenuItem value="email">Email</MenuItem>
                            <MenuItem value="phone">Phone</MenuItem>
                            <MenuItem value="text">Text</MenuItem>
                            <MenuItem value="letter">Letter</MenuItem>
                            <MenuItem value="whatsapp">WhatsApp</MenuItem>
                            <MenuItem value="doNotContact">Do not contact</MenuItem>
                          </TextField>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Controller
                        name="contactPurpose"
                        control={control}
                        rules={{
                          required: 'Contact purpose is required'
                        }}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            size="small"
                            label="Contact Purposes"
                            select
                            {...field}
                            error={!!errors.contactPurpose}
                            helperText={errors.contactPurpose?.message}
                          >
                            <MenuItem value="newsletter">Newsletter</MenuItem>
                            <MenuItem value="upcomingEvents">Upcoming Events</MenuItem>
                          </TextField>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Controller
                        name="confirmationDate"
                        control={control}
                        rules={{
                          required: 'Date of Confirmation is required'
                        }}
                        render={({ field }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Date of Confirmation"
                              value={field.value}
                              onChange={(newValue) => field.onChange(newValue)}
                              renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                            />
                          </LocalizationProvider>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Controller
                        name="reason"
                        control={control}
                        rules={{
                          required: 'Reason is required'
                        }}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            label="Reason"
                            size="small"
                            select
                            {...field}
                            error={!!errors.reason}
                            helperText={errors.reason?.message}
                          >
                            <MenuItem value="byRequest">By Request</MenuItem>
                            <MenuItem value="deceased">Deceased</MenuItem>
                            <MenuItem value="goneAway">Gone Away</MenuItem>
                          </TextField>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Controller
                        name="mobilePhone"
                        control={control}
                        rules={{
                          pattern: {
                            value: onlyNumbers,
                            message: 'Phone number must contain only numbers'
                          },
                          minLength: {
                            value: 10,
                            message: 'Phone number must be at least 10 digits'
                          }
                        }}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            label="Mobile Phone No."
                            size="small"
                            error={!!errors.mobilePhone}
                            helperText={errors.mobilePhone?.message}
                            type="tel"
                            inputProps={{
                              pattern: onlyNumbers.source,
                              onKeyPress: (e) => {
                                if (!onlyNumbers.test(e.key)) {
                                  e.preventDefault();
                                }
                              }
                            }}
                            {...field}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Controller
                        name="contactemail"
                        control={control}
                        rules={{
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        }}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            label="Email"
                            size="small"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            {...field}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={2}>
                      <Controller
                        name="donortag"
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={<AntSwitch checked={field.value} onChange={field.onChange} />}
                            label="Donor Tag"
                            labelPlacement="start"
                            sx={{ display: 'flex', gap: '10px' }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Controller
                        name="emailConsent"
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={<AntSwitch checked={field.value} onChange={field.onChange} />}
                            label="Email"
                            labelPlacement="start"
                            sx={{ display: 'flex', gap: '10px' }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Controller
                        name="sms"
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={<AntSwitch checked={field.value} onChange={field.onChange} />}
                            label="SMS"
                            labelPlacement="start"
                            sx={{ display: 'flex', gap: '10px' }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Controller
                        name="telephone"
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={<AntSwitch checked={field.value} onChange={field.onChange} />}
                            label="Telephone"
                            labelPlacement="start"
                            sx={{ display: 'flex', gap: '10px' }}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={2}>
                      <Controller
                        name="whatsapp"
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={<AntSwitch checked={field.value} onChange={field.onChange} />}
                            label="Whatsapp"
                            labelPlacement="start"
                            sx={{ display: 'flex', gap: '10px' }}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item sm={4}></Grid>
                  </Grid>

                  <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt: 1, pr: 2 }}>
                    <Grid item>
                      <Button
                        variant="contained"
                        sx={{ background: '#053146' }}
                        disabled={isLoading}
                        onClick={handleSubmit((data) => {
                          onSubmit(data);
                        })}
                      >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" color="error" onClick={() => navigate('/donor')}>
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
            </Box>
          </form>
        </Card>
      </Card>
    </Grid>
  );
};

export default AddDonorForm;
