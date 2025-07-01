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
  FormControlLabel,
  Chip
} from '@mui/material';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import Link from '@mui/material/Link';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AntSwitch from 'components/AntSwitch.js';
import dayjs from 'dayjs';
import { postApi, updateApiPatch, getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import config from '../../config';
const contactMethodInitial = {
  donerTag: 0,
  Email: 0,
  Letter: 0,
  SMS: 0,
  Whatsapp: 0
};

const stateStyles = [
  { color: '#E9B867', icon: '?' },
  { color: '#7CBD71', icon: '✓' },
  { color: '#CE655D', icon: '✕' }
];

const AddDonorForm = () => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [countryList, setCountryList] = useState([]);
  const [contactMethodStates, setContactMethodStates] = useState(contactMethodInitial);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [contactpurpose, setContactpurpose] = useState([]);
  const [reason, setReason] = useState([]);
  const [contactmethod, setContactmethod] = useState([]);
  const [benificiary, setBenificiary] = useState([]);
  const [Campaignstag, setCampaignstag] = useState([]);
  const [engagement, setengagement] = useState([]);
  const [eventsAttended, seteventsAttended] = useState([]);
  const [fundingInterests, setfundingInterests] = useState([]);
  const [fundraisingActivities, setfundraisingActivities] = useState([]);

  const location = useLocation();
  const editdata = location?.state;

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
      title: editdata?.personalInfo?.title || '',
      firstname: editdata?.personalInfo?.firstName || '',
      lastname: editdata?.personalInfo?.lastName || '',
      phone: editdata?.contactInfo?.phone || '',
      mobilePhone: editdata?.contactInfo?.homePhone || '',
      email: editdata?.contactInfo?.email || '',
      gender: editdata?.personalInfo?.gender || '',
      dob: editdata?.personalInfo?.dateOfBirth ? dayjs(editdata.personalInfo.dateOfBirth) : null,
      address: editdata?.contactInfo?.addressLine1 || '',
      address2: editdata?.contactInfo?.addressLine2 || '',
      district: editdata?.contactInfo?.district || '',
      pinCode: editdata?.contactInfo?.postcode || '',
      country: editdata?.contactInfo?.country || '',
      riskNotes: editdata?.otherInfo?.description || '',
      file: editdata?.otherInfo?.file || '',
      Beneficiary: editdata?.otherInfo?.benificiary?.map((item) => item._id) || [],
      Campaignstag: editdata?.otherInfo?.campaigns?.map((item) => item._id) || [],
      engagement: editdata?.otherInfo?.engagement?.map((item) => item._id) || [],
      eventsAttended: editdata?.otherInfo?.eventAttanded?.map((item) => item._id) || [],
      fundingInterests: editdata?.otherInfo?.fundingInterest?.map((item) => item._id) || [],
      fundraisingActivities: editdata?.otherInfo?.fundraisingActivities?.map((item) => item._id) || [],
      preferredContact: editdata?.contactPreferences?.preferredMethod?._id || '',
      contactPurpose: editdata?.contactPreferences?.contactPurposes._id || '',
      confirmationDate: editdata?.contactPreferences?.dateOfConfirmation ? dayjs(editdata.contactPreferences.dateOfConfirmation) : null,
      reason: editdata?.contactPreferences?.reason?._id || '',
      contactemail: editdata?.contactPreferences?.email || '',
      contactNo: editdata?.contactPreferences?.phone || '',
      emailConsent: editdata?.contactPreferences?.contactMethods?.email ?? true,
      donortag: editdata?.contactPreferences?.contactMethods?.donor ?? true,
      sms: editdata?.contactPreferences?.contactMethods?.sms ?? true,
      whatsapp: editdata?.contactPreferences?.contactMethods?.whatsapp ?? true,
      donerTag: editdata?.contactPreferences?.contactMethods?.donerTag ?? true,
      socialmedia: editdata?.companyInformation?.socialMediaLinks || '',
      Recruitmentcampaign: editdata?.companyInformation?.recruitmentCampaign?._id || '',
      role: 'donor'
    }
  });

  const handleContactMethodClick = (label) => {
    setContactMethodStates((prev) => {
      const nextState = (prev[label] + 1) % 3;
      setValue(label.toLowerCase(), nextState === 1);
      return { ...prev, [label]: nextState };
    });
  };
  const [restrictAccess, setRestrictAccess] = useState(true);
  const handleToggle = () => setRestrictAccess(!restrictAccess);

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApi(urls.configuration.fetch);
        const filtercampaigns = response?.data?.allConfiguration?.filter((item) => item.configurationType === 'Campaign');
        setCampaigns(filtercampaigns);
        const filterreason = response?.data?.allConfiguration?.filter((item) => item.configurationType === 'Reason');
        setReason(filterreason);
        const filtercontactpurpose = response?.data?.allConfiguration?.filter((item) => item.configurationType === 'Contact Purpose');
        setContactpurpose(filtercontactpurpose);
        const filtercontactmethod = response?.data?.allConfiguration?.filter((item) => item.configurationType === 'Contact Types');
        setContactmethod(filtercontactmethod);
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getApi(urls.tag.getAllTags);

        const benificiarydata = response?.data?.allTags?.filter((item) => item.tagCategoryName === 'Beneficiary Information');
        setBenificiary(benificiarydata);
        const Campaignsdata = response?.data?.allTags?.filter((item) => item.tagCategoryName === 'Campaigns Supported');
        setCampaignstag(Campaignsdata);
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

    const fd = new FormData();

    if (data.file) {
      fd.append('file', data.file);
    }

    fd.append('personalInfo[title]', data.title || '');
    fd.append('personalInfo[firstName]', data.firstname || '');
    fd.append('personalInfo[lastName]', data.lastname || '');
    fd.append('personalInfo[gender]', data.gender || '');
    fd.append('personalInfo[dateOfBirth]', data.dob ? new Date(data.dob).toISOString() : '');
    fd.append('contactInfo[phone]', data.phone || '');
    fd.append('contactInfo[homePhone]', data.mobilePhone || '');
    fd.append('contactInfo[email]', data.email || '');
    fd.append('contactInfo[addressLine1]', data.address || '');
    fd.append('contactInfo[addressLine2]', data.address2 || '');
    fd.append('contactInfo[district]', data.district || '');
    fd.append('contactInfo[postcode]', data.pinCode || '');
    fd.append('contactInfo[country]', data.country || '');
    fd.append('otherInfo[description]', data.riskNotes || '');
    (data.Beneficiary || []).forEach((id) => {
      fd.append('otherInfo[benificiary][]', id);
    });

    (data.Campaignstag || []).forEach((id) => {
      fd.append('otherInfo[campaigns][]', id);
    });

    (data.engagement || []).forEach((id) => {
      fd.append('otherInfo[engagement][]', id);
    });

    (data.eventsAttended || []).forEach((id) => {
      fd.append('otherInfo[eventAttanded][]', id);
    });

    (data.fundingInterests || []).forEach((id) => {
      fd.append('otherInfo[fundingInterest][]', id);
    });

    (data.fundraisingActivities || []).forEach((id) => {
      fd.append('otherInfo[fundraisingActivities][]', id);
    });
    fd.append('otherInfo[restrictAccess]', data.restrictAccess ? 'true' : 'false');
    if (data.preferredContact) {
      fd.append('contactPreferences[preferredMethod]', data.preferredContact);
    }

    if (data.contactPurpose) {
      fd.append('contactPreferences[contactPurposes]', data.contactPurpose);
    }

    if (data.reason) {
      fd.append('contactPreferences[reason]', data.reason);
    }

    fd.append('contactPreferences[dateOfConfirmation]', data.confirmationDate || '');
    fd.append('contactPreferences[email]', data.contactemail || '');
    fd.append('contactPreferences[phone]', data.contactNo || '');
    fd.append('contactPreferences[contactMethods][email]', data.emailConsent ? 'true' : 'false');
    fd.append('contactPreferences[contactMethods][donor]', data.donortag ? 'true' : 'false');
    fd.append('contactPreferences[contactMethods][sms]', data.sms ? 'true' : 'false');
    fd.append('contactPreferences[contactMethods][whatsapp]', data.whatsapp ? 'true' : 'false');
    fd.append('contactPreferences[contactMethods][donor]', data.donerTag ? 'true' : 'false');

    fd.append('companyInformation[socialMediaLinks]', data.socialmedia || '');
    if (data.Recruitmentcampaign) {
      fd.append('companyInformation[recruitmentCampaign]', data.Recruitmentcampaign);
    }

    fd.append('role', 'donor');
    fd.append('subRole', 'donar_individual');

    try {
      if (location.state?.isEdit) {
        await updateApiPatch(`${urls.serviceuser.editUser}/${editdata._id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Donor updated successfully!');
      } else {
        await postApi(urls.serviceuser.create, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Donor added successfully!');
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
  const onlyLetterNumberSpace = /^[a-zA-Z0-9 ]+$/;
  const onlyLettersAndNumbers = /^[A-Za-z0-9\s]*$/;

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

  const handleTabChange = (newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Grid>
      <Card sx={{ position: 'relative', backgroundColor: '#eef2f6' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">
            {location.state?.isEdit ? 'Edit Donor' : 'Add Donor'}
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
            onClick={() => navigate('/donor')}
          >
            <CloseIcon sx={{ color: 'white', fontSize: 20 }} />
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
                                render={({ field, fieldState: { error } }) => (
                                  <Autocomplete
                                    options={districts}
                                    getOptionLabel={(option) => option?.label || ''}
                                    isOptionEqualToValue={(option, value) => option.value === value}
                                    value={districts.find((d) => d.value === field.value) || null}
                                    onChange={(_, selectedOption) => field.onChange(selectedOption?.value || '')}
                                    loading={loading}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select District"
                                        size="small"
                                        error={!!error}
                                        helperText={error?.message}
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
                                name="country"
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
                                    {campaigns?.map((option) => (
                                      <MenuItem key={option._id} value={option._id}>
                                        {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
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
                              Donor Tag
                            </Typography>

                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                {renderAutocomplete(
                                  'Beneficiary',
                                  'Beneficiary Information',
                                  benificiary,
                                  errors.Beneficiary,
                                  errors.Beneficiary?.message,
                                  control
                                )}
                              </Grid>

                              <Grid item xs={12}>
                                {renderAutocomplete(
                                  'Campaignstag',
                                  'Campaigns Supported',
                                  Campaignstag,
                                  errors.Campaignstag,
                                  errors.Campaignstag?.message,
                                  control
                                )}
                              </Grid>

                              <Grid item xs={12}>
                                {renderAutocomplete(
                                  'engagement',
                                  'Engagement',
                                  engagement,
                                  errors.engagement,
                                  errors.engagement?.message,
                                  control
                                )}
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
                            <Box mb={2} display="flex" justifyContent="space-between">
                              <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleFileChange}
                              />
                              <Controller
                                name="file"
                                control={control}
                                render={({ field }) => (
                                  <TextField
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={
                                      field.value
                                        ? typeof field.value === 'object' && field.value.name
                                          ? field.value.name
                                          : typeof field.value === 'string'
                                          ? field.value.split('/').pop()
                                          : ''
                                        : ''
                                    }
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
                                            <Link component="span">{editdata?.otherInfo?.file ? 'Change file' : 'Upload a file'}</Link>
                                            <input
                                              type="file"
                                              hidden
                                              accept="image/jpeg,image/png,image/jpg"
                                              onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                                                const maxSizeInBytes = 25 * 1024 * 1024;

                                                if (file) {
                                                  if (!allowedTypes.includes(file.type)) {
                                                    toast.error('Only JPG, JPEG, or PNG image files are allowed.');
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
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        border: '1px solid #ccc',
                        borderRadius: 3,
                        p: 2
                      }}
                    >
                      <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
                        {Object.keys(contactMethodStates).map((label) => {
                          const stateIndex = contactMethodStates[label];
                          const { color, icon } = stateStyles[stateIndex];

                          return (
                            <Button
                              key={label}
                              variant="contained"
                              onClick={() => handleContactMethodClick(label)}
                              sx={{
                                backgroundColor: color,
                                '&:hover': {
                                  backgroundColor: color
                                },
                                color: '#000',
                                borderRadius: '8px',
                                px: 2,
                                minWidth: 165,
                                display: 'flex',
                                justifyContent: 'space-between'
                              }}
                            >
                              {label}
                              <span>{icon}</span>
                            </Button>
                          );
                        })}
                      </Box>

                      <Grid container spacing={2}>
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
                            rules={{ required: 'This field is required' }}
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                size="small"
                                label="Reason"
                                select
                                {...field}
                                error={!!errors.reason}
                                helperText={errors.reason?.message}
                              >
                                {reason?.map((option) => (
                                  <MenuItem key={option._id} value={option._id}>
                                    {option.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <Controller
                            name="contactPurpose"
                            control={control}
                            rules={{ required: 'This field is required' }}
                            render={({ field }) => (
                              <TextField
                                fullWidth
                                size="small"
                                label="Purpose"
                                select
                                {...field}
                                error={!!errors.contactPurpose}
                                helperText={errors.contactPurpose?.message}
                              >
                                {contactpurpose?.map((option) => (
                                  <MenuItem key={option._id} value={option._id}>
                                    {option.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                            )}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>

                  <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 1, pr: 2 }}>
                    <Grid item>
                      <Button
                        variant="outlined"
                        onClick={() => navigate('/people')}
                        sx={{
                          borderColor: '#FF4D49',
                          color: '#FF4D49'
                        }}
                      >
                        CANCEL
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          background: '#053146',
                          color: '#fff',
                          px: 3
                        }}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Saving...' : 'SAVE CHANGES'}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Box>
          </form>
        </Card>
      </Card>
    </Grid>
  );
};

export default AddDonorForm;
