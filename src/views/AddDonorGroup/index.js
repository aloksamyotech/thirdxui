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

const AddCaseForm = ({ onCancel }) => {
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
    defaultValues: {
      title: '',
      firstname: '',
      lastname: '',
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
      letter: true,
      preferredContact: '',
      reason: '',
      contactPurpose: '',
      confirmationDate: null
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

  const handleFileClick = () => {
    fileInputRef.current.click();
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
    const payload = {
      contactInfo: {
        Phone: data.mobilePhone,
        email: data.email
      },
      otherInfo: {
        description: data.riskNotes,
        benificiary: data.Beneficiary,
        campaigns: data.Campaigns,
        engagement: data.engagement,
        eventAttanded: data.eventsAttended,
        fundingInterest: data.fundingInterests,
        fundraisingActivities: data.fundraisingActivities,
        restrictAccess: restrictAccess
      },
      contactPreferences: {
        preferredMethod: data.preferredContact,
        contactPurposes: data.contactPurpose,
        dateOfConfirmation: data.confirmationDate,
        reason: data.reason,
        contactMethods: {
          donortag: data.donortag,
          email: data.emailConsent,
          sms: data.sms,
          letter: data.letter,
          whatsapp: data.whatsapp
        }
      },
      companyInformation: {
        companyName: data.companyname,
        mainContactName: data.contactname,
        otherId: data.otherId,
        socialMediaLinks: data.socialmedia,
        recruitmentCampaign: data.Recruitmentcampaign
      },
      role: 'donor',
      subRole: 'donar_group'
    };

    try {
      const response = await postApi(urls.serviceuser.create, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success('Successfully Add Service User ');
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
                    <Grid item xs={12} md={6}>
                      <Card sx={{ boxShadow: 1, borderRadius: 2, p: 0 }}>
                        <CardContent>
                          <Typography variant="h5" gutterBottom>
                            Personal Information
                          </Typography>
                          <Grid container rowSpacing={2} columnSpacing={1}>
                            <Grid item xs={12}>
                              <Controller
                                name="companyname"
                                control={control}
                                rules={{
                                  required: 'Company name is required',
                                  minLength: {
                                    value: 2,
                                    message: 'Company name must be at least 2 characters'
                                  },
                                  maxLength: {
                                    value: 50,
                                    message: 'Company name cannot exceed 50 characters'
                                  },
                                  pattern: {
                                    value: onlyLetters,
                                    message: 'Company name can only contain letters'
                                  }
                                }}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Name of the company"
                                    size="small"
                                    error={!!errors.companyname}
                                    helperText={errors.companyname?.message}
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
                                name="contactname"
                                control={control}
                                rules={{
                                  required: 'Contact name is required',
                                  minLength: {
                                    value: 2,
                                    message: 'Contact name must be at least 2 characters'
                                  },
                                  maxLength: {
                                    value: 50,
                                    message: 'Contact name cannot exceed 50 characters'
                                  },
                                  pattern: {
                                    value: onlyLetters,
                                    message: 'Contact name can only contain letters'
                                  }
                                }}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Main Contact (Persons Name)"
                                    size="small"
                                    error={!!errors.contactname}
                                    helperText={errors.contactname?.message}
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
                                name="socialmedia"
                                control={control}
                                render={({ field }) => <TextField fullWidth label="Social media links" size="small" {...field} />}
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Card sx={{ boxShadow: 1, borderRadius: 2 }}>
                        <CardContent>
                          <Typography variant="h5" gutterBottom>
                            Other Information
                          </Typography>
                          <Grid container rowSpacing={2} columnSpacing={1}>
                            <Grid item xs={12}>
                              <Controller
                                name="otherId"
                                control={control}
                                rules={{
                                  pattern: {
                                    value: onlyNumbers,
                                    message: 'Other Id must contain only numbers'
                                  },
                                  maxLength: {
                                    value: 10,
                                    message: 'Other Id must be at least 10 digits'
                                  }
                                }}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Other Id"
                                    size="small"
                                    error={!!errors.otherId}
                                    helperText={errors.otherId?.message}
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

                            <Grid item xs={12}>
                              <Controller
                                name="Recruitmentcampaign"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Recruitment Campaign"
                                    size="small"
                                    error={!!errors.campaign}
                                    helperText={errors.campaign?.message}
                                    {...field}
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <TextField
                                placeholder="Attachments"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={selectedFile ? selectedFile.name : ''}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <AttachFileIcon fontSize="small" />
                                    </InputAdornment>
                                  ),
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Link component="button" onClick={handleFileClick}>
                                        Upload a file
                                      </Link>
                                    </InputAdornment>
                                  )
                                }}
                              />
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Box>
                      <Typography variant="h5" m={2}></Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Grid item xs={12}>
                            <Box>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <Paper elevation={2} sx={{ p: 2 }}>
                                    <Typography variant="subtitle1" mb={2}>
                                      Donor Tag
                                    </Typography>

                                    <Grid container spacing={2}>
                                      <Grid item xs={12}>
                                        <Controller
                                          name="Beneficiary"
                                          rules={{
                                            required: 'Last name is required',
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
                                            required: 'Last name is required',
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
                                            required: 'Last name is required',
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
                                            required: 'Last name is required',
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
                                            required: 'Last name is required',
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
                                            required: 'Last name is required',
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
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
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
                            />{' '}
                            <FormControlLabel
                              control={<AntSwitch checked={restrictAccess} onChange={() => setRestrictAccess(!restrictAccess)} />}
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
              {isLoading ? 'Saving...' : 'Save Changes'}
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
