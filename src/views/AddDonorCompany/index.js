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
import { useNavigate, useLocation } from 'react-router-dom';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from '@mui/material/Link';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AntSwitch from 'components/AntSwitch.js';
import dayjs from 'dayjs';
import { postApi, updateApiPatch } from 'common/apiClient';
import { urls } from 'common/urls';

const AddCaseForm = ({ onCancel }) => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [countryList, setCountryList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const fileInputRef = React.useRef(null);
  const location = useLocation();
  const subRole = location.state?.subRole;
  console.log(subRole);
  const editdata = location.state || {};
  console.log(editdata);

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
      title: editdata?.personalInfo?.title || '',
      firstname: editdata?.personalInfo?.firstName || '',
      lastname: editdata?.personalInfo?.lastName || '',
      phone: editdata?.contactInfo?.phone || '',
      mobilePhone: editdata?.contactInfo?.homePhone || '',
      email: editdata?.contactInfo?.email || '',
      gender: editdata?.personalInfo?.gender || '',
      dob: editdata?.personalInfo?.dob ? dayjs(editdata.personalInfo.dob) : null,
      address: editdata?.contactInfo?.address || '',
      town: editdata?.contactInfo?.town || '',
      country: editdata?.contactInfo?.country || '',
      pinCode: editdata?.contactInfo?.pinCode || '',
      riskNotes: editdata?.otherInfo?.description || '',
      keyIndicators: editdata?.otherInfo?.keyIndicators || '',
      service: editdata?.otherInfo?.service || '',
      fromDate: editdata?.otherInfo?.fromDate ? dayjs(editdata.otherInfo.fromDate) : null,
      toDate: editdata?.otherInfo?.toDate ? dayjs(editdata.otherInfo.toDate) : null,
      referDate: editdata?.otherInfo?.referDate ? dayjs(editdata.otherInfo.referDate) : null,
      referrerName: editdata?.referrer?.name || '',
      referrerJob: editdata?.referrer?.job || '',
      referrerAddress: editdata?.referrer?.address || '',
      referrerEmail: editdata?.referrer?.email || '',
      referrerPhone: editdata?.referrer?.phone || '',
      referralType: editdata?.referrer?.referralType || '',
      telephone: editdata?.contactPreferences?.contactMethods?.telephone ?? true,
      emailConsent: editdata?.contactPreferences?.contactMethods?.email ?? true,
      sms: editdata?.contactPreferences?.contactMethods?.sms ?? true,
      donortag: editdata?.contactPreferences?.contactMethods?.donortag ?? true,
      whatsapp: editdata?.contactPreferences?.contactMethods?.whatsapp ?? true,
      preferredContact: editdata?.contactPreferences?.preferredMethod || '',
      reason: editdata?.contactPreferences?.reason || '',
      contactPurpose: editdata?.contactPreferences?.contactPurposes || '',
      confirmationDate: editdata?.contactPreferences?.dateOfConfirmation ? dayjs(editdata.contactPreferences.dateOfConfirmation) : null,
      companyname: editdata?.companyInformation?.companyName || '',
      contactname: editdata?.companyInformation?.mainContactName || '',
      otherId: editdata?.companyInformation?.otherId || '',
      socialmedia: editdata?.companyInformation?.socialMediaLinks || '',
      Recruitmentcampaign: editdata?.companyInformation?.recruitmentCampaign || '',
      Beneficiary: editdata?.otherInfo?.benificiary || '',
      Campaigns: editdata?.otherInfo?.campaigns || '',
      engagement: editdata?.otherInfo?.engagement || '',
      eventsAttended: editdata?.otherInfo?.eventAttanded || '',
      fundingInterests: editdata?.otherInfo?.fundingInterest || '',
      fundraisingActivities: editdata?.otherInfo?.fundraisingActivities || ''
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
    }
  };

  const onSubmit = async (data) => {
    setIsloading(true);
    const fd = new FormData();

    if (data.file) {
      fd.append('file', data.file);
    }

    fd.append('contactInfo[phone]', data.mobilePhone || '');
    fd.append('contactInfo[email]', data.email || '');

    fd.append('otherInfo[description]', data.riskNotes || '');
    fd.append('otherInfo[benificiary]', data.Beneficiary || '');
    fd.append('otherInfo[campaigns]', data.Campaigns || '');
    fd.append('otherInfo[engagement]', data.engagement || '');
    fd.append('otherInfo[eventAttanded]', data.eventsAttended || '');
    fd.append('otherInfo[fundingInterest]', data.fundingInterests || '');
    fd.append('otherInfo[fundraisingActivities]', data.fundraisingActivities || '');
    fd.append('otherInfo[restrictAccess]', restrictAccess || '');

    fd.append('contactPreferences[preferredMethod]', data.preferredContact || '');
    fd.append('contactPreferences[contactPurposes]', data.contactPurpose || '');
    fd.append('contactPreferences[dateOfConfirmation]', data.confirmationDate || '');
    fd.append('contactPreferences[reason]', data.reason || '');
    fd.append('contactPreferences[contactMethods][donortag]', data.donortag || '');
    fd.append('contactPreferences[contactMethods][email]', data.emailConsent || '');
    fd.append('contactPreferences[contactMethods][sms]', data.sms || '');
    fd.append('contactPreferences[contactMethods][telephone]', data.telephone || '');
    fd.append('contactPreferences[contactMethods][whatsapp]', data.whatsapp || '');

    fd.append('companyInformation[companyName]', data.companyname || '');
    fd.append('companyInformation[mainContactName]', data.contactname || '');
    fd.append('companyInformation[otherId]', data.otherId || '');
    fd.append('companyInformation[socialMediaLinks]', data.socialmedia || '');
    fd.append('companyInformation[recruitmentCampaign]', data.Recruitmentcampaign || '');

    fd.append('role', 'donor');
    fd.append('subRole', subRole);

    try {
      if (location.state?.isEdit) {
        await updateApiPatch(`${urls.serviceuser.editUser}/${editdata._id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success(
          subRole === 'donar_group'
            ? 'Donor group updated successfully!'
            : subRole === 'donar_company'
            ? 'Donor company updated successfully!'
            : 'Donor updated successfully!'
        );
      } else {
        await postApi(urls.serviceuser.create, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success(
          subRole === 'donar_group'
            ? 'Donor group added successfully!'
            : subRole === 'donar_company'
            ? 'Donor company added successfully!'
            : 'Donor added successfully!'
        );
      }

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

  // const handleTabChange = async (newValue) => {
  //   if (newValue > tabIndex) {
  //     const firstTabFields = [
  //       'companyname',
  //       'contactname',
  //       'socialmedia',
  //       'otherId',
  //       'Recruitmentcampaign',
  //       'Beneficiary',
  //       'Campaigns',
  //       'engagement',
  //       'eventsAttended',
  //       'fundingInterests',
  //       'fundraisingActivities',
  //       'riskNotes'
  //     ];
  //     const isValid = await trigger(firstTabFields);

  //     if (isValid) {
  //       setTabIndex(newValue);
  //     } else {
  //       toast.error('Please fill all required fields before proceeding');
  //     }
  //   } else {
  //     setTabIndex(newValue);
  //   }
  // };
  const handleTabChange = (newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Grid>
      <Card sx={{ position: 'relative', backgroundColor: '#eef2f6' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">
            {location.state?.isEdit
              ? subRole === 'donar_company'
                ? 'Edit Donor Company'
                : subRole === 'donar_group'
                ? 'Edit Donor Group'
                : 'Edit Donor'
              : subRole === 'donar_company'
              ? 'Add Donor Company'
              : subRole === 'donar_group'
              ? 'Add Donor Group'
              : 'Add Donor'}
          </Typography>

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
                                //   required: 'Other Id is required',
                                  minLength: {
                                    value: 3,
                                    message: 'Other Id must be at least 3 characters'
                                  },
                                  maxLength: {
                                    value: 12,
                                    message: 'Other Id cannot exceed 12 characters'
                                  },
                                  pattern: {
                                    value: /^[A-Za-z0-9_-]+$/,
                                    message: 'Only letters, numbers, underscores, and hyphens are allowed'
                                  }
                                }}
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

                            <Grid item xs={12}>
                              <Controller
                                name="Recruitmentcampaign"
                                control={control}
                                // rules={{ required: 'Recruitment Campaign is required' }}
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

                            <Grid item xs={12}>
                              <Controller
                                name="file"
                                control={control}
                                render={({ field }) => (
                                  <Box display="flex" justifyContent="space-between">
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
                                            minLength: {
                                              value: 2,
                                              message: 'Required at least 2 characters'
                                            },
                                            maxLength: {
                                              value: 50,
                                              message: 'Cannot exceed 50 characters'
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
                                            minLength: {
                                              value: 2,
                                              message: 'Required at least 2 characters'
                                            },
                                            maxLength: {
                                              value: 50,
                                              message: 'Cannot exceed 50 characters'
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
                                            minLength: {
                                              value: 2,
                                              message: 'Required at least 2 characters'
                                            },
                                            maxLength: {
                                              value: 50,
                                              message: 'Cannot exceed 50 characters'
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
                                            minLength: {
                                              value: 2,
                                              message: 'Required at least 2 characters'
                                            },
                                            maxLength: {
                                              value: 50,
                                              message: 'Cannot exceed 50 characters'
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
                                            minLength: {
                                              value: 2,
                                              message: 'Required at least 2 characters'
                                            },
                                            maxLength: {
                                              value: 50,
                                              message: 'Cannot exceed 50 characters'
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
                                            minLength: {
                                              value: 2,
                                              message: 'Required at least 2 characters'
                                            },
                                            maxLength: {
                                              value: 50,
                                              message: 'Cannot exceed 50 characters'
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
                                // required: 'Notes are required',
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
                        // rules={{
                        //   required: 'Preferred method of contact is required'
                        // }}
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
                        // rules={{
                        //   required: 'Contact purpose is required'
                        // }}
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
                        // rules={{
                        //   required: 'Date is required'
                        // }}
                        render={({ field }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Date of Confirmation"
                              value={field.value}
                              onChange={(newValue) => field.onChange(newValue)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  size="small"
                                  error={!!errors.confirmationDate}
                                  helperText={errors.confirmationDate?.message}
                                />
                              )}
                            />
                          </LocalizationProvider>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Controller
                        name="reason"
                        control={control}
                        // rules={{
                        //   required: 'Reason is required'
                        // }}
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
                            <MenuItem value="interest">Legitimate Interest</MenuItem>
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
                          // required: 'Phone number is required',
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
                          // required: 'Email is required',
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

export default AddCaseForm;
