import React, { useState, useEffect } from 'react';
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
import { postApi } from 'common/apiClient';
import { urls } from 'common/urls';

const AddCaseForm = () => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [countryList, setCountryList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const fileInputRef = React.useRef(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm({
     mode:'all',
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
      // town: '',
      country: '',
      pinCode: '',
      riskNotes: '',
      keyIndicators: '',
      service: '',
      socialmedia: '',
      // fromDate: null,
      // toDate: null,
      // referDate: null,
      // referrerName: '',
      // referrerJob: '',
      // referrerAddress: '',
      // referrerEmail: '',
      // referrerPhone: '',
      // referralType: '',
      // telephone: true,
      emailConsent: true,
      sms: true,
      letter: true,
      preferredContact: '',
      reason: '',
      contactPurpose: '',
      confirmationDate: null,
      attachments: null,
      role: 'donor'
    }
  });

  const [restrictAccess, setRestrictAccess] = useState(false);
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
      console.log('Selected file:', file);
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
    fd.append('contactPreferences[contactMethods][email]', data.emailConsent);
    fd.append('contactPreferences[contactMethods][sms]', data.sms);
    fd.append('contactPreferences[contactMethods][letter]', data.letter);
    fd.append('contactPreferences[contactMethods][telephone]', data.telephone ?? false);

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
      console.error('Error while adding donor:', error);
      toast.error('Error in Submitting form');
      setIsloading(false);
    }
  };

  const onlyNumbers = /^[0-9]*$/;
  const onlyLetters = /^[A-Za-z\s]*$/;
  const onlyLettersAndNumbers = /^[A-Za-z0-9\s]*$/;
  const ukPostcode = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;

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
              onChange={(e, newValue) => setTabIndex(newValue)}
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
                              {/* <Controller
                                name="socialmedia"
                                control={control}
                                render={({ field }) => <TextField fullWidth label="Social media links" size="small" {...field} />}
                              /> */}
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
                                    value: onlyLetters,
                                    message: 'Social media link can only contain letters'
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
                                name="Recruitmentcampaign"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Recruitment Campaign"
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
                                  control={control}
                                  rules={{
                                    required: 'Beneficiary information is required',
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
                                    required: 'Key indicators are required',
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
                                    required: 'Engagement is required',
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
                                    required: 'Events attended information is required',
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
                                    required: 'Funding interests information is required',
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
                                    required: 'Fundraising activities information is required',
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
                </>
              )}

              {tabIndex === 1 && (
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
          </form>
        </Card>

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
              {isLoading ? 'Saving...' : 'Save Changes Individual'}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="error">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default AddCaseForm;
