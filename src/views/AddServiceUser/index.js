import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Grid,
  MenuItem,
  IconButton,
  Card,
  CardHeader,
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
  FormControlLabel,
  Autocomplete,
  FormHelperText
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from '@mui/material/Link';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AntSwitch from 'components/AntSwitch.js';
import dayjs from 'dayjs';
import { postApi } from 'common/apiClient';
import { urls } from 'common/urls';

const AddCaseForm = ({ onCancel }) => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [countryList, setCountryList] = useState([]);
  const [restrictAccess, setRestrictAccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      firstname: '',
      lastname: '',
      preferred: '',
      phone: '',
      email: '',
      gender: '',
      dob: null,
      address: '',
      town: '',
      country: '',
      pinCode: '',
      riskNotes: '',
      keyIndicators: '',
      service: '',
      fromDate: null,
      toDate: null,
      referDate: null,
      referrerName: '',
      referrerJob: '',
      referrerAddress: '',
      referrerEmail: '',
      referrerPhone: '',
      referralType: '',
      telephone: true,
      emailConsent: true,
      sms: true,
      whatsapp: true,
      letter: true,
      preferredContact: '',
      reason: '',
      contactPurpose: '',
      confirmationDate: null
    }
  });
  const ethnicityOptions = [
    'Arabic or North African',
    'Asian or Asian British',
    'Asian-Indian',
    'Asian-Pakistan',
    'Asian-Bangladeshi',
    'Asian–any other Asian background',
    'Black-Caribbean',
    'Black-African'
  ];
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
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
    }
  };
  const handleToggle = () => setRestrictAccess(!restrictAccess);
  const onSubmit = async (formData) => {
    const caseData = {
      personalInfo: {
        title: formData.personalInfo.title,
        firstName: formData.personalInfo.firstName,
        lastName: formData.personalInfo.lastName,
        gender: formData.personalInfo.gender,
        dateOfBirth: formData.personalInfo.dateOfBirth,
        nickName: formData.personalInfo.nickName,
        ethnicity: formData.personalInfo.ethnicity
      },
      contactInfo: {
        homePhone: formData.phone,
        phone: formData.mobilePhone,
        email: formData.email,
        addressLine1: formData.address,
        addressLine2: formData.address2,
        town: formData.town,
        district: formData.district,
        postcode: formData.pinCode,
        country: formData.country,
        firstLanguage: formData.language,
        otherId: formData.otherId
      },
      otherInfo: {
        file: formData.file || '',
        description: formData.riskNotes,
        benificiary: formData.Beneficiary,
        campaigns: formData.Campaigns,
        engagement: formData.engagement,
        eventAttanded: formData.eventsAttended,
        fundingInterest: formData.fundingInterests,
        fundraisingActivities: formData.fundraisingActivities,
        restrictAccess: restrictAccess
      },
      emergencyContact: {
        title: formData.title,
        gender: formData.gender,
        firstName: formData.firstname,
        lastName: formData.lastname,
        relationshipToUser: formData.preferred,
        homePhone: formData.emergencyhomePhone,
        phone: formData.emergencyphone,
        email: formData.email,
        addressLine1: formData.address,
        addressLine2: formData.address2,
        country: formData.country,
        town: formData.town,
        postcode: formData.pinCode
      },
      contactPreferences: {
        preferredMethod: formData.preferredContact,
        reason: formData.reason,
        contactPurposes: formData.contactPurpose,
        dateOfConfirmation: formData.confirmationDate,
        contactMethods: {
          telephone: formData.telephone,
          email: formData.emailConsent,
          sms: formData.sms,
          letter: formData.letter,
          whatsapp: formData.whatsapp
        }
      },
      role: 'service_user',
      isActive: true
    };

    try {
      const response = await postApi(urls.serviceuser.create, caseData);
      console.log('Response:', response);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleReset = () => {
    reset();
  };

  const onlyNumbers = /^[0-9]*$/;
  const onlyLetters = /^[A-Za-z\s]*$/;
  const onlyLettersAndNumbers = /^[A-Za-z0-9\s]*$/;
  const ukPostcode = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;

  return (
    <Grid>
      <Card sx={{ position: 'relative', backgroundColor: '#eef2f6' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">Add New Service User</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/people')}>
            <ArrowBackIcon sx={{ color: 'grey' }} />
            <Typography variant="h6" sx={{ mr: 1 }}>
              Back
            </Typography>
          </Box>
        </Box>
        <Card sx={{ padding: 2, marginTop: 2 }}>
          <form onSubmit={handleSubmit(onSubmit, (err) => console.log('Validation Errors:', err))}>
            <Tabs
              value={tabIndex}
              onChange={(e, newValue) => setTabIndex(newValue)}
              sx={{
                display: 'flex',
                gap: 2,
                borderBottom: '1px solid #4792d3'
              }}
            >
              <Tab
                label="Details"
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
                label="Emergency Contact"
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
              <Tab
                label="Contact Preferences"
                sx={(theme) => ({
                  backgroundColor: tabIndex === 2 ? '#e3f2fd' : 'transparent',
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
                                name="personalInfo.title"
                                control={control}
                                rules={{ required: 'Title is required' }}
                                render={({ field }) => (
                                  <TextField
                                    select
                                    fullWidth
                                    label="Title"
                                    size="small"
                                    error={!!errors?.personalInfo?.title}
                                    helperText={errors?.personalInfo?.title?.message}
                                    {...field}
                                  >
                                    <MenuItem value="Mr">Mr.</MenuItem>
                                    <MenuItem value="Ms">Ms.</MenuItem>
                                    <MenuItem value="Mrs">Mrs.</MenuItem>
                                    <MenuItem value="Prof">Prof.</MenuItem>
                                    <MenuItem value="Dr">Dr.</MenuItem>
                                    <MenuItem value="Lady">Lady</MenuItem>
                                  </TextField>
                                )}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="personalInfo.gender"
                                control={control}
                                rules={{ required: 'Gender is required' }}
                                render={({ field }) => (
                                  <TextField
                                    select
                                    fullWidth
                                    label="Gender"
                                    size="small"
                                    error={!!errors?.personalInfo?.gender}
                                    helperText={errors?.personalInfo?.gender?.message}
                                    {...field}
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
                                name="personalInfo.firstName"
                                control={control}
                                rules={{
                                  required: 'First name is required',
                                  minLength: { value: 2, message: 'First name must be at least 2 characters' },
                                  maxLength: { value: 50, message: 'First name cannot exceed 50 characters' },
                                  pattern: { value: onlyLetters, message: 'First name can only contain letters' }
                                }}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Forename"
                                    size="small"
                                    error={!!errors?.personalInfo?.firstName}
                                    helperText={errors?.personalInfo?.firstName?.message}
                                    inputProps={{
                                      pattern: onlyLetters.source,
                                      onKeyPress: (e) => {
                                        if (!onlyLetters.test(e.key)) e.preventDefault();
                                      }
                                    }}
                                    {...field}
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="personalInfo.lastName"
                                control={control}
                                rules={{
                                  minLength: { value: 2, message: 'Last name must be at least 2 characters' },
                                  maxLength: { value: 50, message: 'Last name cannot exceed 50 characters' },
                                  pattern: { value: onlyLetters, message: 'Last name can only contain letters' }
                                }}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Surname"
                                    size="small"
                                    error={!!errors?.personalInfo?.lastName}
                                    helperText={errors?.personalInfo?.lastName?.message}
                                    inputProps={{
                                      pattern: onlyLetters.source,
                                      onKeyPress: (e) => {
                                        if (!onlyLetters.test(e.key)) e.preventDefault();
                                      }
                                    }}
                                    {...field}
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <Controller
                                name="personalInfo.nickName"
                                control={control}
                                rules={{
                                  maxLength: { value: 30, message: 'Preferred known as cannot exceed 30 characters' },
                                  pattern: { value: onlyLetters, message: 'Preferred name can only contain letters' }
                                }}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Preferred Known as"
                                    size="small"
                                    error={!!errors?.personalInfo?.nickName}
                                    helperText={errors?.personalInfo?.nickName?.message}
                                    inputProps={{
                                      pattern: onlyLetters.source,
                                      onKeyPress: (e) => {
                                        if (!onlyLetters.test(e.key)) e.preventDefault();
                                      }
                                    }}
                                    {...field}
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <Controller
                                name="personalInfo.dateOfBirth"
                                control={control}
                                render={({ field }) => (
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      label="DOB"
                                      value={field.value}
                                      onChange={(newValue) => field.onChange(newValue)}
                                      maxDate={dayjs()}
                                      renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                                    />
                                  </LocalizationProvider>
                                )}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <Controller
                                name="personalInfo.ethnicity"
                                control={control}
                                rules={{ required: 'Ethnicity is required' }}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Ethnicity"
                                    size="small"
                                    error={!!errors?.personalInfo?.ethnicity}
                                    helperText={errors?.personalInfo?.ethnicity?.message}
                                  >
                                    {ethnicityOptions.map((option, index) => (
                                      <MenuItem key={index} value={option}>
                                        {option}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                )}
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
                                    value: /^[0-9]{10,12}$/,
                                    message: 'Phone number must be between 10 and 12 digits'
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
                                  required: 'Phone number is required',
                                  pattern: {
                                    value: /^[0-9]{10,12}$/,
                                    message: 'Phone number must be between 10 and 12 digits'
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
                                    value: onlyLettersAndNumbers,
                                    message: 'Address can only contain letters, numbers and spaces'
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
                                render={({ field }) => <TextField fullWidth label="Address Line 2" size="small" {...field} />}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="town"
                                control={control}
                                rules={{
                                  required: 'Town is required',
                                  pattern: {
                                    value: onlyLetters,
                                    message: 'Town can only contain letters'
                                  }
                                }}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Town"
                                    size="small"
                                    error={!!errors.town}
                                    helperText={errors.town?.message}
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
                                name="district"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Borough/District"
                                    size="small"
                                    error={!!errors.district}
                                    helperText={errors.district?.message}
                                    {...field}
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="country"
                                control={control}
                                render={({ field }) => (
                                  <TextField select fullWidth label="Country of origin" size="small" {...field}>
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

                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="pinCode"
                                control={control}
                                rules={{
                                  required: 'Postcode is required',
                                  pattern: {
                                    value: onlyNumbers,
                                    message: 'Please enter a valid UK postcode'
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
                                name="language"
                                control={control}
                                rules={{
                                  required: 'language is required',
                                  minLength: {
                                    value: 2,
                                    message: 'Last name must be at least 2 characters'
                                  },
                                  maxLength: {
                                    value: 20,
                                    message: 'language cannot exceed 50 characters'
                                  },
                                  pattern: {
                                    value: onlyLetters,
                                    message: 'Last name can only contain letters'
                                  }
                                }}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="First Language"
                                    size="small"
                                    error={!!errors.language}
                                    helperText={errors.language?.message}
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
                                name="otherId"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Other Id"
                                    size="small"
                                    error={!!errors.otherId}
                                    helperText={errors.otherId?.message}
                                    {...field}
                                  />
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
                                  rules={{
                                    required: 'Beneficiary is required',
                                    minLength: {
                                      value: 2,
                                      message: 'Beneficiary must be at least 2 characters'
                                    },
                                    maxLength: {
                                      value: 30,
                                      message: 'Beneficiary cannot exceed 50 characters'
                                    },
                                    pattern: {
                                      value: onlyLetters,
                                      message: 'Beneficiary can only contain letters'
                                    }
                                  }}
                                  control={control}
                                  render={({ field }) => (
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Beneficiary Information"
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
                                  name="Campaigns"
                                  rules={{
                                    required: 'Campaigns is required',
                                    minLength: {
                                      value: 2,
                                      message: 'Campaigns must be at least 2 characters'
                                    },
                                    maxLength: {
                                      value: 30,
                                      message: 'Campaigns cannot exceed 50 characters'
                                    },
                                    pattern: {
                                      value: onlyLetters,
                                      message: 'Campaigns can only contain letters'
                                    }
                                  }}
                                  control={control}
                                  render={({ field }) => (
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Campaigns Supported"
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
                                  rules={{
                                    required: 'engagement is required',
                                    minLength: {
                                      value: 2,
                                      message: 'Last name must be at least 2 characters'
                                    },
                                    maxLength: {
                                      value: 30,
                                      message: 'engagement cannot exceed 50 characters'
                                    },
                                    pattern: {
                                      value: onlyLetters,
                                      message: 'Last name can only contain letters'
                                    }
                                  }}
                                  control={control}
                                  render={({ field }) => (
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Engagement"
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
                                  rules={{
                                    required: 'eventsAttended is required',
                                    minLength: {
                                      value: 2,
                                      message: 'Last name must be at least 2 characters'
                                    },
                                    maxLength: {
                                      value: 30,
                                      message: 'Last name cannot exceed 50 characters'
                                    },
                                    pattern: {
                                      value: onlyLetters,
                                      message: 'Last name can only contain letters'
                                    }
                                  }}
                                  control={control}
                                  render={({ field }) => (
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Events Attended"
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
                                  rules={{
                                    required: 'fundingInterests is required',
                                    minLength: {
                                      value: 2,
                                      message: 'Last name must be at least 2 characters'
                                    },
                                    maxLength: {
                                      value: 30,
                                      message: 'Last name cannot exceed 50 characters'
                                    },
                                    pattern: {
                                      value: onlyLetters,
                                      message: 'Last name can only contain letters'
                                    }
                                  }}
                                  control={control}
                                  render={({ field }) => (
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Funding Interests"
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
                                  rules={{
                                    required: 'fundraisingActivities is required',
                                    minLength: {
                                      value: 2,
                                      message: 'Last name must be at least 2 characters'
                                    },
                                    maxLength: {
                                      value: 30,
                                      message: 'Last name cannot exceed 50 characters'
                                    },
                                    pattern: {
                                      value: onlyLetters,
                                      message: 'Last name can only contain letters'
                                    }
                                  }}
                                  control={control}
                                  render={({ field }) => (
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Fundraising Activities"
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
                            <Box mb={2} display="flex" justifyContent="space-between">
                              <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                              <TextField
                                placeholder="Attachments"
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <AttachFileIcon fontSize="small" />
                                    </InputAdornment>
                                  ),
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Link component="button" type="button" onClick={handleUploadClick}>
                                        Upload a file
                                      </Link>
                                    </InputAdornment>
                                  )
                                }}
                              />
                            </Box>
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
                                  message: 'riskNotes cannot exceed 500 characters'
                                },
                                pattern: {
                                  value: onlyLetters,
                                  message: 'riskNotes can only contain letters'
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
                </>
              )}

              {tabIndex === 1 && (
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
                                <TextField select fullWidth label="Gender" size="small" {...field}>
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
                                // required: 'Last name is required',
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
                              name="preferred"
                              control={control}
                              rules={{
                                maxLength: {
                                  value: 30,
                                  message: 'Preferred known as cannot exceed 30 characters'
                                }
                              }}
                              render={({ field }) => (
                                <TextField
                                  fullWidth
                                  label="Relationship to service user"
                                  size="small"
                                  error={!!errors.preferred}
                                  helperText={errors.preferred?.message}
                                  {...field}
                                />
                              )}
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
                              name="emergencyhomePhone"
                              control={control}
                              rules={{
                                required: 'Phone number is required',
                                pattern: {
                                  value: /^[0-9]{10,12}$/,
                                  message: 'Phone number must be between 10 and 12 digits'
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
                              name="emergencyphone"
                              control={control}
                              rules={{
                                required: 'Phone number is required',
                                pattern: {
                                  value: /^[0-9]{10,12}$/,
                                  message: 'Phone number must be between 10 and 12 digits'
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
                                  value: onlyLettersAndNumbers,
                                  message: 'Address can only contain letters, numbers and spaces'
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
                              rules={{
                                required: 'Address is required',
                                pattern: {
                                  value: onlyLettersAndNumbers,
                                  message: 'Address can only contain letters, numbers and spaces'
                                }
                              }}
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  fullWidth
                                  label="Address Line 2"
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

                          <Grid item xs={12} sm={4}>
                            <Controller
                              name="country"
                              control={control}
                              render={({ field }) => (
                                <TextField select fullWidth label="Country" size="small" {...field}>
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
                              name="town"
                              control={control}
                              rules={{
                                required: 'Town is required',
                                pattern: {
                                  value: onlyLetters,
                                  message: 'Town can only contain letters'
                                }
                              }}
                              render={({ field }) => (
                                <TextField
                                  fullWidth
                                  label="Town"
                                  size="small"
                                  error={!!errors.town}
                                  helperText={errors.town?.message}
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

                          <Grid item xs={12} sm={4}>
                            <Controller
                              name="pinCode"
                              control={control}
                              rules={{
                                required: 'Postcode is required',
                                pattern: {
                                  value: onlyNumbers,
                                  message: 'Please enter a valid UK postcode'
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
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}

              {tabIndex === 2 && (
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={3}>
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

                  <Grid item xs={12} sm={3}>
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

                  <Grid item xs={12} sm={3}>
                    <Controller
                      name="confirmationDate"
                      control={control}
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

                  <Grid item xs={12} sm={3}>
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
                      name="letter"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={<AntSwitch checked={field.value} onChange={field.onChange} />}
                          label="Letter"
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
              )}
            </Box>

            <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt: 1, pr: 2 }}>
              <Grid item>
                <Button variant="outlined" color="error" onClick={handleReset}>
                  Reset
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="error" onClick={onCancel}>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained" sx={{ background: '#053146' }}>
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Card>
    </Grid>
  );
};

export default AddCaseForm;
