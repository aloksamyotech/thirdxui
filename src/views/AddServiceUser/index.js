/* eslint-disable prettier/prettier */
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
import { CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';
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

const AddCaseForm = ({ onCancel, data }) => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [countryList, setCountryList] = useState([]);
  const [restrictAccess, setRestrictAccess] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const editdata = location.state;

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
    personalInfo: {
      title: editdata?.personalInfo?.title || '',
      firstName: editdata?.personalInfo?.firstName || '',
      lastName: editdata?.personalInfo?.lastName || '',
      nickName: editdata?.personalInfo?.nickName || '',
      gender: editdata?.personalInfo?.gender || '',
      dateOfBirth: editdata?.personalInfo?.dateOfBirth || null,
      ethnicity: editdata?.personalInfo?.ethnicity || ''
    },
    phone: editdata?.contactInfo?.homePhone || '',
    mobilePhone: editdata?.contactInfo?.phone || '',
    email: editdata?.contactInfo?.email || '',
    address: editdata?.contactInfo?.addressLine1 || '',
    address2: editdata?.contactInfo?.addressLine2 || '',
    town: editdata?.contactInfo?.town || '',
    district: editdata?.contactInfo?.district || '',
    pinCode: editdata?.contactInfo?.postcode || '',
    country: editdata?.contactInfo?.country || '',
    language: editdata?.contactInfo?.firstLanguage || '',
    otherId: editdata?.contactInfo?.otherId || '',
    riskNotes: editdata?.otherInfo?.description || '',
    Beneficiary: editdata?.otherInfo?.benificiary || '',
    Campaigns: editdata?.otherInfo?.campaigns || '',
    engagement: editdata?.otherInfo?.engagement || '',
    eventsAttended: editdata?.otherInfo?.eventAttanded || '',
    fundingInterests: editdata?.otherInfo?.fundingInterest || '',
    fundraisingActivities: editdata?.otherInfo?.fundraisingActivities || '',
    restrictAccess: editdata?.otherInfo?.restrictAccess || false,
      title: editdata?.emergencyContact?.title || '', 
      gender:editdata?.emergencyContact?.gender || '', 
    firstname: editdata?.emergencyContact?.firstName || '',
    lastname: editdata?.emergencyContact?.lastName || '',
    preferred: editdata?.emergencyContact?.relationshipToUser || '',
    emergencyhomePhone: editdata?.emergencyContact?.homePhone || '',
    emergencyphone: editdata?.emergencyContact?.phone || '',
    emergencyemail: editdata?.emergencyContact?.email || '',
    emergencyaddress: editdata?.emergencyContact?.addressLine1 || '',
    emergencyaddress2: editdata?.emergencyContact?.addressLine2 || '',
    emergencytown: editdata?.emergencyContact?.town || '',
    emergencypinCode: editdata?.emergencyContact?.postcode || '',
    emergencycountry: editdata?.emergencyContact?.country || '',
    preferredContact: editdata?.contactPreferences?.preferredMethod || '',
    reason: editdata?.contactPreferences?.reason || '',
    contactPurpose: editdata?.contactPreferences?.contactPurposes || '',
    confirmationDate: editdata?.contactPreferences?.dateOfConfirmation || null,
    telephone: editdata?.contactPreferences?.contactMethods?.telephone || true,
    emailConsent: editdata?.contactPreferences?.contactMethods?.email || true,
    sms: editdata?.contactPreferences?.contactMethods?.sms || true,
    whatsapp: editdata?.contactPreferences?.contactMethods?.whatsapp || true
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

  const districts = [
    { label: 'Adur and Worthing Borough', value: 'adur_worthing_borough' },
    { label: 'Adur District', value: 'adur_district' },
    { label: 'Amber Valley Borough', value: 'amber_valley_borough' },
    { label: 'Arun District', value: 'arun_district' },
    { label: 'Ashford Borough', value: 'ashford_borough' },
    { label: 'Babergh District', value: 'babergh_district' },
    { label: 'Ashfield District', value: 'ashfield_district' },
    { label: 'Basildon Borough', value: 'basildon_borough' }
  ];

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
  };

  const handleToggle = () => setRestrictAccess(!restrictAccess);
  const onSubmit = async (formData) => {
    const isValid = await trigger();

    if (!isValid) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setIsloading(true);
    const fd = new FormData();
    fd.append('personalInfo[firstName]', formData.personalInfo.firstName);
    fd.append('personalInfo[lastName]', formData.personalInfo.lastName);
    fd.append('personalInfo[title]', formData.personalInfo.title);
    fd.append('personalInfo[gender]', formData.personalInfo.gender);
    const dob = formData.personalInfo.dateOfBirth;
    fd.append('personalInfo[dateOfBirth]', dob ? new Date(dob).toISOString() : '');
    fd.append('personalInfo[nickName]', formData.personalInfo.nickName);
    fd.append('personalInfo[ethnicity]', formData.personalInfo.ethnicity);

    fd.append('contactInfo[homePhone]', formData.phone);
    fd.append('contactInfo[phone]', formData.mobilePhone);
    fd.append('contactInfo[email]', formData.email);
    fd.append('contactInfo[addressLine1]', formData.address);
    fd.append('contactInfo[addressLine2]', formData.address2);
    fd.append('contactInfo[town]', formData.town);
    fd.append('contactInfo[district]', formData.district);
    fd.append('contactInfo[postcode]', formData.pinCode);
    fd.append('contactInfo[country]', formData.country);
    fd.append('contactInfo[firstLanguage]', formData.language);
    fd.append('contactInfo[otherId]', formData.otherId);

    fd.append('otherInfo[description]', formData.riskNotes);
    fd.append('otherInfo[benificiary]', formData.Beneficiary);
    fd.append('otherInfo[campaigns]', formData.Campaigns);
    fd.append('otherInfo[engagement]', formData.engagement);
    fd.append('otherInfo[eventAttanded]', formData.eventsAttended);
    fd.append('otherInfo[fundingInterest]', formData.fundingInterests);
    fd.append('otherInfo[fundraisingActivities]', formData.fundraisingActivities);
    fd.append('otherInfo[restrictAccess]', restrictAccess);

    fd.append('emergencyContact[firstName]', formData.firstname);
    fd.append('emergencyContact[lastName]', formData.lastname);
    fd.append('emergencyContact[title]', formData.title);
    fd.append('emergencyContact[gender]', formData.gender);
    fd.append('emergencyContact[relationshipToUser]', formData.preferred);
    fd.append('emergencyContact[homePhone]', formData.emergencyhomePhone);
    fd.append('emergencyContact[phone]', formData.emergencyphone);
    fd.append('emergencyContact[email]', formData.emergencyemail);
    fd.append('emergencyContact[addressLine1]', formData.emergencyaddress);
    fd.append('emergencyContact[addressLine2]', formData.emergencyaddress2);
    fd.append('emergencyContact[country]', formData.emergencycountry);
    fd.append('emergencyContact[town]', formData.emergencytown);
    fd.append('emergencyContact[postcode]', formData.emergencypinCode);

    fd.append('contactPreferences[preferredMethod]', formData.preferredContact);
    fd.append('contactPreferences[reason]', formData.reason);
    fd.append('contactPreferences[contactPurposes]', formData.contactPurpose);
    const confirmDate = formData.confirmationDate;
    fd.append('contactPreferences[dateOfConfirmation]', confirmDate ? new Date(confirmDate).toISOString() : '');

    fd.append('contactPreferences[contactMethods][telephone]', formData.telephone);
    fd.append('contactPreferences[contactMethods][email]', formData.emailConsent);
    fd.append('contactPreferences[contactMethods][sms]', formData.sms);
    fd.append('contactPreferences[contactMethods][whatsapp]', formData.whatsapp);

    fd.append('role', 'service_user');
    fd.append('isActive', true);

    if (formData.file) {
      fd.append('file', formData.file);
    }

    try {
       if (editdata) {
      // ✅ EDIT user
      await postApi(`${urls.serviceuser.editUser}/${editdata._id}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Service user updated successfully!');
    } else {
      // ✅ CREATE user
      await postApi(urls.serviceuser.create, fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Service user added successfully!');
    }
  
      setIsloading(false);
      navigate('/people');
    } catch (error) {
      console.error('Error creating user:', error);
      setIsloading(false);
    }
  };

  const handleReset = () => {
    reset();
  };

  const onlyNumbers = /^[0-9]*$/;
  const onlyLetters = /^[A-Za-z\s]*$/;
  const onlyLetterNumberSpace= /^[a-zA-Z0-9 ]+$/;
  const onlyLettersAndNumbers = /^[A-Za-z0-9\s]*$/;

  const tabFieldMap = {
    0: [
      'personalInfo.firstName',
      'personalInfo.lastName',
      'personalInfo.dateOfBirth',
      'personalInfo.title',
      'personalInfo.gender',
      'personalInfo.ethnicity',
      'personalInfo.nickName',
      'homePhone',
      'phone',
      'email',
      'addressLine1',
      'town',
      'district',
      'postcode',
      'country',
      'firstLanguage',
      'otherId',

      'Beneficiary',
      'Campaigns',
      'riskNotes',
      'engagement',
      'eventsAttended',
      'fundingInterests',
      'fundraisingActivities',
      'restrictAccess'
    ],
    1: [
      'firstName',
      'lastName',
      'phone',
      'title',
      'gender',
      'preferred',
      'emergencyhomePhone',
      'emergencyphone',
      'emergencyemail',
      'emergencyaddress',
      'emergencycountry',
      'emergencytown',
      'emergencypinCode'
    ],
    2: ['preferredContact', 'reason', 'contactPurpose', 'confirmDate', 'telephone', 'emailConsent', 'sms', 'letter', 'whatsapp']
  };

  const handleTabChange = async (newIndex) => {
    if (newIndex < tabIndex) {
      setTabIndex(newIndex);
      return;
    }

    const currentFields = tabFieldMap[tabIndex];
    const isValid = await trigger(currentFields);

    if (isValid) {
      setTabIndex(newIndex);
    } else {
      toast.error('Please fix validation errors before continuing.');
    }
  };

  return (
    <Grid>
      <Card sx={{ position: 'relative', backgroundColor: '#eef2f6' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <Typography variant="h4">
  {editdata ? 'Edit Service User' : 'Add New Service User'}
</Typography>


          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/people')}>
            <ArrowBackIcon sx={{ color: 'grey' }} />
            <Typography variant="h6" sx={{ mr: 1 }}>
              Back
            </Typography>
          </Box>
        </Box>
        <Card sx={{ padding: 2, marginTop: 2 }}>
          <form onSubmit={handleSubmit(onSubmit, (err) => console.error('Validation Errors:', err))}>
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
                                  required: 'Last name is required',
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
                                rules={{
                                  required: 'Date of Birth is required'
                                }}
                                render={({ field, fieldState: { error } }) => (
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      label="DOB"
                                      value={field.value || null}
                                      onChange={(newValue) => field.onChange(newValue)}
                                      maxDate={dayjs()}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          fullWidth
                                          size="small"
                                          error={!!error}
                                          helperText={error ? error.message : ''}
                                        />
                                      )}
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
                                  minLength: {
                                    value: 5,
                                    message: 'Address must be at least 5 characters'
                                  },
                                  maxLength: {
                                    value: 100,
                                    message: 'Address cannot exceed 100 characters'
                                  },
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
                                  minLength: {
                                    value: 5,
                                    message: 'Address must be at least 5 characters'
                                  },
                                  maxLength: {
                                    value: 100,
                                    message: 'Address cannot exceed 100 characters'
                                  },
                                  pattern: {
                                    value: /^[a-zA-Z0-9\s.,\-/#&()']+$/,
                                    message: 'Address can only contain letters, numbers, spaces, and valid special characters'
                                  }
                                }}
                                render={({ field }) => <TextField fullWidth label="Address Line 2" size="small" {...field} />}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="town"
                                control={control}
                                rules={{
                                  required: 'Town is required',
                                  minLength: {
                                    value: 2,
                                    message: 'Town must be at least 2 characters'
                                  },
                                  maxLength: {
                                    value: 50,
                                    message: 'Town cannot exceed 50 characters'
                                  },
                                  pattern: {
                                    value: /^[A-Za-z\s'-]+$/,
                                    message: 'Town can only contain letters, spaces, apostrophes, and hyphens'
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
                                rules={{ required: 'District is required' }}
                                render={({ field }) => (
                                  <Autocomplete
                                    {...field}
                                    options={districts}
                                    getOptionLabel={(option) => option.label || ''}
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
                                name="country"
                                control={control}
                                rules={{ required: 'Country is required' }}
                                render={({ field, fieldState: { error } }) => (
                                  <Autocomplete
                                    options={countryList}
                                    getOptionLabel={(option) => option.name}
                                    isOptionEqualToValue={(option, value) => option.code === value.code}
                                    onChange={(_, value) => field.onChange(value)}
                                    value={field.value || null}
                                    renderOption={(props, option) => (
                                      <Box component="li" {...props} key={option.code} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={option.flag} alt={option.code} style={{ width: 20, height: 14, marginRight: 8 }} />
                                        {option.name}
                                      </Box>
                                    )}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Country of origin"
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

                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="pinCode"
                                control={control}
                                rules={{
                                  required: 'Postcode is required',
                                  minLength: {
                                    value: 5,
                                    message: 'Postcode must be at least 5 characters'
                                  },
                                  maxLength: {
                                    value: 10,
                                    message: 'Postcode cannot exceed 10 characters'
                                  },
                                  pattern: {
                                    value: onlyLetterNumberSpace,
                                    message: 'Postcode can only contain letters, numbers, and spaces'
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
                                      pattern: onlyLetterNumberSpace.source
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
                                  required: 'This is required',
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
                                rules={{
                                  required: 'Other Id is required',
                                  minLength: {
                                    value: 3,
                                    message: 'Other Id must be at least 3 characters'
                                  },
                                  maxLength: {
                                    value: 20,
                                    message: 'Other Id cannot exceed 20 characters'
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
                                  name="Campaigns"
                                  control={control}
                                  rules={{
                                    minLength: {
                                      value: 2,
                                      message: 'Must be at least 2 characters'
                                    },
                                    maxLength: {
                                      value: 50,
                                      message: 'Cannot exceed 50 characters'
                                    },
                                    pattern: {
                                      value: onlyLetters,
                                      message: 'Only contain letters'
                                    }
                                  }}
                                  render={({ field }) => (
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Campaigns Supported"
                                      error={!!errors.Campaigns}
                                      helperText={errors.Campaigns?.message}
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
                            <Box mb={2} display="flex" justifyContent="space-between">
                              <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                              <Controller
                                name="file"
                                control={control}
                                render={({ field }) => (
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
                                          <Button component="label" sx={{ minWidth: 0, p: 0, whiteSpace: 'nowrap' }}>
                                            <Link component="span" underline="none">
                                              Upload a file
                                            </Link>
                                            <input type="file" hidden onChange={(e) => field.onChange(e.target.files?.[0] || null)} />
                                          </Button>
                                        </InputAdornment>
                                      )
                                    }}
                                  />
                                )}
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

                            <Controller
                              name="restrictAccess"
                              control={control}
                              defaultValue={true}
                              render={({ field }) => (
                                <FormControlLabel
                                  control={
                                    <AntSwitch {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                                  }
                                  label="Restrict Access"
                                  labelPlacement="start"
                                  sx={{ gap: 1 }}
                                />
                              )}
                            />
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>

                  <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt: 1, pr: 2 }}>
                    <Grid item>
                      <Button variant="contained" onClick={() => handleTabChange(tabIndex + 1)}>
                        Next
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}

              {tabIndex === 1 && (
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
                                    error={!!errors?.gender}
                                    helperText={errors?.gender?.message}
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
                                name="preferred"
                                control={control}
                                rules={{
                                  required: 'Relationship to service user is required',
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
                                    error={!!errors.emergencyhomePhone}
                                    helperText={errors.emergencyhomePhone?.message}
                                    type="tel"
                                    inputProps={{
                                      pattern: /^[0-9]*$/.source,
                                      onKeyPress: (e) => {
                                        if (!/^[0-9]$/.test(e.key)) {
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
                                    error={!!errors.emergencyphone}
                                    helperText={errors.emergencyphone?.message}
                                    type="tel"
                                    inputProps={{
                                      pattern: /^[0-9]*$/.source,
                                      onKeyPress: (e) => {
                                        if (!/^[0-9]$/.test(e.key)) {
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
                                name="emergencyemail"
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
                                    error={!!errors.emergencyemail}
                                    helperText={errors.emergencyemail?.message}
                                    {...field}
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="emergencyaddress"
                                control={control}
                                rules={{
                                  required: 'Address is required',
                                  minLength: {
                                    value: 5,
                                    message: 'Address must be at least 5 characters'
                                  },
                                  maxLength: {
                                    value: 100,
                                    message: 'Address cannot exceed 100 characters'
                                  },
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
                                    error={!!errors.emergencyaddress}
                                    helperText={errors.emergencyaddress?.message}
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
                                name="emergencyaddress2"
                                control={control}
                                rules={{
                                  minLength: {
                                    value: 5,
                                    message: 'Address must be at least 5 characters'
                                  },
                                  maxLength: {
                                    value: 100,
                                    message: 'Address cannot exceed 100 characters'
                                  },
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
                                    error={!!errors.emergencyaddress2}
                                    helperText={errors.emergencyaddress2?.message}
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
                                name="emergencycountry"
                                control={control}
                                rules={{
                                  required: 'Country is required'
                                }}
                                render={({ field }) => (
                                  <TextField
                                    select
                                    fullWidth
                                    label="Country"
                                    size="small"
                                    error={!!errors.emergencycountry}
                                    helperText={errors.emergencycountry?.message}
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
                                name="emergencytown"
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
                                    error={!!errors.emergencytown}
                                    helperText={errors.emergencytown?.message}
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
                                name="emergencypinCode"
                                control={control}
                                rules={{
                                  required: 'Postcode is required',
                                  minLength: {
                                    value: 5,
                                    message: 'Postcode must be at least 5 characters'
                                  },
                                  maxLength: {
                                    value: 10,
                                    message: 'Postcode cannot exceed 10 characters'
                                  },
                                  pattern: {
                                    value: onlyLetterNumberSpace,
                                    message: 'Postcode can only contain letters, numbers, and spaces'
                                  }
                                }}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    label="Postcode"
                                    size="small"
                                    error={!!errors.emergencypinCode}
                                    helperText={errors.emergencypinCode?.message}
                                    inputProps={{
                                      pattern: onlyLetterNumberSpace.source
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

                  <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt: 1, pr: 2 }}>
                    <Grid item>
                      <Button variant="contained" onClick={() => handleTabChange(tabIndex + 1)}>
                        Next
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}

              {tabIndex === 2 && (
                <Grid container spacing={2}>
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
                      rules={{
                        required: 'Confirmation Date is required'
                      }}
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
                          <MenuItem value="interest">Legitimate Interest</MenuItem>
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
                  <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt: 1, pr: 2 }}>
                    <Grid item>
                      <Button variant="outlined" color="error" onClick={onCancel}>
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button type="submit" variant="contained" sx={{ background: '#053146' }} disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </Grid>
                  </Grid>{' '}
                </Grid>
              )}
            </Box>
          </form>
        </Card>
      </Card>
    </Grid>
  );
};

export default AddCaseForm;
