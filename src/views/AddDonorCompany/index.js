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
  FormControlLabel,
  Chip,
  Autocomplete
} from '@mui/material';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
import { stateStyles } from 'common/constants';

const contactMethodInitial = {
  // donerTag: 0,
  Whatsapp: 0,
  Email: 0,
  SMS: 0,
  Letter: 0
};

const AddCaseForm = ({ onCancel }) => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [countryList, setCountryList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [contactMethodStates, setContactMethodStates] = useState(contactMethodInitial);
  const [isLoading, setIsloading] = useState(false);
  const fileInputRef = React.useRef(null);
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
  const [allCategory, setAllCategory] = useState([]);

  const location = useLocation();

  const subRole = location?.state?.subRole;
  const editdata = location?.state || {};
  const initialPurposeStates = contactpurpose?.reduce((acc, curr) => {
    acc[curr._id] = 0;
    return acc;
  }, {});

  const [purposeStates, setPurposeStates] = useState(initialPurposeStates || {});

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
      file: editdata?.otherInfo?.file || '',
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
      // donerTag: editdata?.contactPreferences?.contactMethods?.donor ?? false,
      letter: editdata?.contactPreferences?.contactMethods?.letter ?? false,
      emailConsent: editdata?.contactPreferences?.contactMethods?.email ?? false,
      sms: editdata?.contactPreferences?.contactMethods?.sms ?? false,
      whatsapp: editdata?.contactPreferences?.contactMethods?.whatsapp ?? false,
      preferredContact: editdata?.contactPreferences?.preferredMethod?._id || '',
      reason: editdata?.contactPreferences?.reason?._id || '',
      contactPurpose: editdata?.contactPreferences?.contactPurposes?._id || '',
      confirmationDate: editdata?.contactPreferences?.dateOfConfirmation ? dayjs(editdata.contactPreferences.dateOfConfirmation) : null,
      companyname: editdata?.companyInformation?.companyName || '',
      contactname: editdata?.companyInformation?.mainContactName || '',
      otherId: editdata?.companyInformation?.otherId || '',
      socialmedia: editdata?.companyInformation?.socialMediaLinks || '',
      Recruitmentcampaign: editdata?.companyInformation?.recruitmentCampaign?._id || '',
      restrictAccess: editdata?.otherInfo?.restrictAccess || false,
      beneficiaryTags:
        editdata?.otherInfo?.tags?.map((tag) => ({
          categoryId: tag.tagCategoryId._id,
          tagId: tag._id
        })) || []
    }
  });

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
        const allCategory = await getApi(`${urls.comman.getAllTagData}`, {
          appliedTo: 'Donors'
        });
        setAllCategory(allCategory?.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, []);

  const handleContactMethodClick = (label) => {
    setContactMethodStates((prev) => {
      const nextState = (prev[label] + 1) % 3;
      setValue(label.toLowerCase(), nextState === 1);
      return { ...prev, [label]: nextState };
    });
  };

  const renderAutocomplete = (name, label, options, error, helperText, control, categoryId) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const prefilledTags = (watch('beneficiaryTags') || [])
          .filter((tag) => tag.categoryId === categoryId)
          .map((tag) => options.find((opt) => opt._id === tag.tagId))
          .filter(Boolean);

        return (
          <Autocomplete
            multiple
            options={options || []}
            getOptionLabel={(option) => option?.name || 'Unknown'}
            groupBy={(option) => option.categoryName ?? label}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            value={prefilledTags}
            onChange={(_, selectedOptions) => {
              const updatedTags = selectedOptions.map((opt) => ({
                categoryId: categoryId,
                tagId: opt._id
              }));

              setValue('beneficiaryTags', [
                ...(watch('beneficiaryTags') || []).filter((tag) => tag.categoryId !== categoryId),
                ...updatedTags
              ]);
              field.onChange(selectedOptions);
            }}
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
        );
      }}
    />
  );
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
    (data.beneficiaryTags || []).forEach((tag, index) => {
      fd.append(`otherInfo[tags][${index}]`, tag.tagId);
    });
    fd.append('otherInfo[restrictAccess]', data.restrictAccess ? 'true' : 'false');

    if (data.preferredContact) {
      fd.append('contactPreferences[preferredMethod]', data.preferredContact);
    }

    if (data.contactPurpose && Array.isArray(data.contactPurpose)) {
      data.contactPurpose.forEach((id) => {
        fd.append('contactPreferences[contactPurposes][]', id);
      });
    }
    if (data.reason) {
      fd.append('contactPreferences[reason]', data.reason);
    }
    fd.append('contactPreferences[dateOfConfirmation]', data.confirmationDate || '');

    fd.append('contactPreferences[contactMethods][email]', data.email ? 'true' : 'false');
    fd.append('contactPreferences[contactMethods][sms]', data.sms ? 'true' : 'false');
    // fd.append('contactPreferences[contactMethods][donor]', data.donertag ? 'true' : 'false');
    fd.append('contactPreferences[contactMethods][letter]', data.letter ? 'true' : 'false');
    fd.append('contactPreferences[contactMethods][whatsapp]', data.whatsapp ? 'true' : 'false');
    fd.append('companyInformation[companyName]', data.companyname || '');
    fd.append('companyInformation[mainContactName]', data.contactname || '');
    fd.append('companyInformation[otherId]', data.otherId || '');
    fd.append('companyInformation[socialMediaLinks]', data.socialmedia || '');
    if (data.Recruitmentcampaign) {
      fd.append('companyInformation[recruitmentCampaign]', data.Recruitmentcampaign);
    }
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

  const handleTabChange = (newIndex) => {
    setTabIndex(newIndex);
  };

  useEffect(() => {
    if (contactpurpose?.length) {
      const initStates = contactpurpose.reduce((acc, item) => {
        acc[item._id] = 0;
        return acc;
      }, {});
      setPurposeStates(initStates);
    }
  }, [contactpurpose]);
  const handlePurposeClick = (id) => {
    setPurposeStates((prev) => {
      const nextState = ((prev?.[id] || 0) + 1) % 3;
      const updated = { ...prev, [id]: nextState };

      const selected = Object.keys(updated).filter((key) => updated[key] === 1);

      setValue('contactPurpose', selected);
      setValue('contactPurposeStates', updated);
      return updated;
    });
  };
  const booleanToState = (value) => {
    if (value === true) return 1;
    if (value === false) return 0;
    return 2;
  };
  useEffect(() => {
    if (editdata) {
      const contactMethods = editdata?.contactPreferences?.contactMethods || {};

      setContactMethodStates({
        // donerTag: booleanToState(contactMethods?.donor),
        Email: booleanToState(contactMethods?.email),
        SMS: booleanToState(contactMethods?.sms),
        Whatsapp: booleanToState(contactMethods?.whatsapp),
        letter: booleanToState(contactMethods?.letter)
      });
    }
  }, [editdata, reset]);

  useEffect(() => {
    if (editdata?.contactPreferences?.contactPurposes && contactpurpose.length > 0) {
      const selected = Array.isArray(editdata.contactPreferences.contactPurposes)
        ? editdata.contactPreferences.contactPurposes.map((p) => p._id || p)
        : [editdata.contactPreferences.contactPurposes._id || editdata.contactPreferences.contactPurposes];

      const restoredStates = contactpurpose.reduce((acc, item) => {
        acc[item._id] = selected.includes(item._id) ? 1 : 0;
        return acc;
      }, {});

      setPurposeStates(restoredStates);
      setValue('contactPurposeStates', restoredStates);
      setValue('contactPurpose', selected);
    }
  }, [editdata, contactpurpose]);
  return (
    <Grid>
      <Card sx={{ position: 'relative', backgroundColor: '#eef2f6' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center" gap={1}>
            <IconButton onClick={() => navigate(-1)} size="small">
              <ArrowBackIcon />
            </IconButton>
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
            onClick={() => navigate(-1)}
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
                                    InputProps={{
                                      sx: {
                                        height: 57
                                      }
                                    }}
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
                                    {campaigns?.map((option) => (
                                      <MenuItem key={option._id} value={option._id}>
                                        {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                )}
                              />
                            </Grid>

                            <Grid item xs={12}>
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
                                  rules={{
                                    validate: (file) => validateFile(file)
                                  }}
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
                                  )}
                                />
                              </Box>
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
                                  <Paper elevation={2} sx={{ p: 2, height: '400px', overflow: 'auto' }}>
                                    <Typography variant="subtitle1" mb={2}>
                                      Donor Tags
                                    </Typography>
                                    <Grid container spacing={2}>
                                      {allCategory?.map((category, index) => (
                                        <Grid item xs={12} key={category._id}>
                                          {renderAutocomplete(
                                            `Beneficiary.${index}`,
                                            category.name,
                                            category.tags,
                                            errors?.Beneficiary?.[index],
                                            errors?.Beneficiary?.[index]?.message,
                                            control,
                                            category._id
                                          )}
                                        </Grid>
                                      ))}
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
                                  minRows={15}
                                  fullWidth
                                  variant="outlined"
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
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>

                  <Grid container spacing={2} alignItems="center" sx={{ mt: 1, pr: 2, pl: 2 }} justifyContent="space-between">
                    <Grid item>
                      <FormControlLabel
                        control={<AntSwitch checked={restrictAccess} onChange={handleToggle} />}
                        label="Restrict Access?"
                        labelPlacement="start"
                        sx={{ gap: 1 }}
                      />
                    </Grid>
                    <Grid item>
                      <Grid container spacing={2}>
                        <Grid item>
                          <Button variant="contained" sx={{ background: '#053146' }} onClick={() => handleTabChange(tabIndex + 1)}>
                            SAVE CHANGES
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button variant="outlined" color="error" onClick={() => navigate(-1)}>
                            CANCEL
                          </Button>
                        </Grid>
                      </Grid>
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

                      <Grid item xs={12} mb={2}>
                        <Box>
                          <Typography variant="subtitle2" mb={1}>
                            Purpose
                          </Typography>
                          <Box display="flex" gap={2} flexWrap="wrap">
                            {contactpurpose?.map((option) => {
                              const stateIndex = purposeStates[option._id] || 0;
                              const { color, icon } = stateStyles[stateIndex];

                              return (
                                <Button
                                  key={option._id}
                                  variant="contained"
                                  onClick={() => handlePurposeClick(option._id)}
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
                                  {option.name}
                                  <span>{icon}</span>
                                </Button>
                              );
                            })}
                          </Box>
                          {errors.contactPurpose && (
                            <Typography variant="caption" color="error">
                              {errors.contactPurpose.message}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" mb={1}>
                            Details associated with confirmation
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
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

                        <Grid item xs={12} sm={6}>
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
                      </Grid>
                    </Box>
                  </Grid>

                  <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 1, pr: 2 }}>
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
                    <Grid item>
                      <Button
                        variant="outlined"
                        onClick={() => navigate(-1)}
                        sx={{
                          borderColor: '#FF4D49',
                          color: '#FF4D49'
                        }}
                      >
                        CANCEL
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

export default AddCaseForm;
