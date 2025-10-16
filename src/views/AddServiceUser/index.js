import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import {
  Grid,
  MenuItem,
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
  FormHelperText,
  IconButton,
  Chip,
  FormControl
} from '@mui/material';
import { CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
import { contactMethodInitial, districts, ethnicityOptions, stateStyles } from 'common/constants';
import { validateFile } from 'utils/filevalidator';

const AddCaseForm = ({ onCancel }) => {
  const navigate = useNavigate();
  const [contactMethodStates, setContactMethodStates] = useState(contactMethodInitial);
  const [tabIndex, setTabIndex] = useState(0);
  const [countryList, setCountryList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactpurpose, setContactpurpose] = useState([]);
  const [reason, setReason] = useState([]);
  const [contactmethod, setContactmethod] = useState([]);
  const [allTags, setAllTages] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [serviceNames, setServiceNames] = useState([]);
  const [serviceNameSearchQuery, setServiceNameSearchQuery] = useState('');
  const [keyIndicator, setKeyIndicator] = useState([]);

  const initialPurposeStates = contactpurpose?.reduce((acc, curr) => {
    acc[curr._id] = 0;
    return acc;
  }, {});

  const [purposeStates, setPurposeStates] = useState(initialPurposeStates || {});

  const location = useLocation();
  const editdata = location?.state?.editdata;
  const sessionId = location?.state?.sessionId;
  const handleContactMethodClick = (label) => {
    setContactMethodStates((prev) => {
      const nextState = (prev[label] + 1) % 3;
      setValue(`contactMethods.${label.toLowerCase()}`, nextState === 1);
      return { ...prev, [label]: nextState };
    });
  };

  const defaultFormValues = {
    personalInfo: {
      title: editdata?.personalInfo?.title || '',
      firstName: editdata?.personalInfo?.firstName || '',
      lastName: editdata?.personalInfo?.lastName || '',
      nickName: editdata?.personalInfo?.nickName || '',
      gender: editdata?.personalInfo?.gender || '',
      dateOfBirth: editdata?.personalInfo?.dateOfBirth || null,
      ethnicity: editdata?.personalInfo?.ethnicity || '',
      profileImage: editdata?.personalInfo?.profileImage || ''
    },
    phone: editdata?.contactInfo?.homePhone || '',
    mobilePhone: editdata?.contactInfo?.phone || '',
    contactInfo: {
      email: editdata?.contactInfo?.email || ''
    },
    address: editdata?.contactInfo?.addressLine1 || '',
    address2: editdata?.contactInfo?.addressLine2 || '',
    town: editdata?.contactInfo?.town || '',
    district: editdata?.contactInfo?.district || '',
    pinCode: editdata?.contactInfo?.postcode || '',
    country: editdata?.contactInfo?.country || '',
    language: editdata?.contactInfo?.firstLanguage || '',
    otherId: editdata?.contactInfo?.otherId || '',
    riskNotes: editdata?.otherInfo?.description || '',
    file: editdata?.otherInfo?.file || '',
    restrictAccess: editdata?.otherInfo?.restrictAccess || false,
    title: editdata?.emergencyContact?.title || '',
    gender: editdata?.emergencyContact?.gender || '',
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
    preferredContact: editdata?.contactPreferences?.preferredMethod?._id || '',
    reason: editdata?.contactPreferences?.reason?._id || '',
    contactPurpose: editdata?.contactPreferences?.contactPurposes?._id || '',
    confirmationDate: editdata?.contactPreferences?.dateOfConfirmation || null,
    telephone: editdata?.contactPreferences?.contactMethods?.telephone ?? false,
    emailConsent: editdata?.contactPreferences?.contactMethods?.email ?? false,
    sms: editdata?.contactPreferences?.contactMethods?.sms ?? false,
    whatsapp: editdata?.contactPreferences?.contactMethods?.whatsapp ?? false,
    letter: editdata?.contactPreferences?.contactMethods?.letter ?? false,
    riskAssessmentNotes: editdata?.riskAssessment?.riskAssessmentNotes || '',
    keyIndicators: editdata?.riskAssessment?.keyIndicators?.map((val) => (typeof val === 'object' ? val._id || val.id : val)) || [],

    beneficiaryTags:
      editdata?.otherInfo?.tags?.map((tag) => ({
        categoryId: tag.tagCategoryId._id,
        tagId: tag._id
      })) || [],
    serviceSections: editdata?.Service?.length
      ? editdata.Service.map((item) => ({
          serviceName: item.serviceName?._id || '',
          startDate: item.startDate || null,
          lastDate: item.lastDate || null,
          referrerName: item.referrerName || '',
          referrerJob: item.referrerJob || '',
          referrerPhone: item.referrerPhone || '',
          referrerEmail: item.referrerEmail || '',
          emergencyPhone: item.emergencyPhone || '',
          emergencyEmail: item.emergencyEmail || '',
          referralType: item.referralType || '',
          referredDate: item.referredDate || null
        }))
      : [
          {
            serviceName: '',
            startDate: null,
            lastDate: null,
            referrerName: '',
            referrerJob: '',
            referrerPhone: '',
            referrerEmail: '',
            emergencyPhone: '',
            emergencyEmail: '',
            referralType: '',
            referredDate: null
          }
        ]
  };
  console.log('defaultFormValues------------------', defaultFormValues);
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
    defaultValues: defaultFormValues
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'serviceSections'
  });
  useEffect(() => {
    if (editdata) {
      if (editdata.contactPreferences) {
        if (editdata.contactPreferences.preferredMethod && editdata.contactPreferences.preferredMethod._id) {
          setValue('preferredContact', editdata.contactPreferences.preferredMethod._id);
        }

        if (editdata.contactPreferences.reason && editdata.contactPreferences.reason._id) {
          setValue('reason', editdata.contactPreferences.reason._id);
        }

        if (editdata.contactPreferences.contactPurposes && editdata.contactPreferences.contactPurposes._id) {
          setValue('contactPurpose', editdata.contactPreferences.contactPurposes._id);
        }

        if (editdata.contactPreferences.dateOfConfirmation) {
          setValue('confirmationDate', editdata.contactPreferences.dateOfConfirmation);
        }

        if (editdata.contactPreferences.contactMethods) {
          setValue('telephone', editdata.contactPreferences.contactMethods.telephone ?? false);
          setValue('emailConsent', editdata.contactPreferences.contactMethods.email ?? false);
          setValue('sms', editdata.contactPreferences.contactMethods.sms ?? false);
          setValue('whatsapp', editdata.contactPreferences.contactMethods.whatsapp ?? false);
          setValue('letter', editdata.contactPreferences.contactMethods.letter ?? false);
        }
      }
    }
  }, [editdata, setValue]);

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

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApi(urls.configuration.fetch);
        const filterreason = response?.data?.allConfiguration?.filter((item) => item.configurationType === 'Reason');
        setReason(filterreason);
        const filtercontactpurpose = response?.data?.allConfiguration?.filter((item) => item.configurationType === 'Contact Purpose');
        setContactpurpose(filtercontactpurpose);
        const filtercontactmethod = response?.data?.allConfiguration?.filter((item) => item.configurationType === 'Contact Types');
        setContactmethod(filtercontactmethod);
        const filterKeyIndicator = response?.data?.allConfiguration?.filter((item) => item.configurationType === 'Key Indicators');
        setKeyIndicator(filterKeyIndicator);
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
          appliedTo: 'Service Users'
        });
        setAllCategory(allCategory?.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (serviceNameSearchQuery && serviceNameSearchQuery !== '') {
          queryParams.append('search', serviceNameSearchQuery);
        }

        const response = await getApi(`${urls.service.fetchWithPagination}?${queryParams.toString()}`);
        const services = response?.data?.data || [];
        const formattedServices = services.map((service) => ({
          id: service._id,
          name: service.name || service.title || ''
        }));
        setServiceNames(formattedServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [serviceNameSearchQuery]);

  useEffect(() => {
    if (editdata?.otherInfo?.tags && allCategory?.length) {
      allCategory.forEach((category) => {
        const categoryTags = editdata.otherInfo.tags
          .filter((tag) => tag.tagCategoryId?._id === category._id || tag.tagCategoryId === category._id)
          .map((tag) => category.tags.find((t) => t._id === tag._id))
          .filter(Boolean);
        setValue(`Beneficiary.${category._id}`, categoryTags);
      });
    }
  }, [editdata, allCategory, setValue]);
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
  const renderAutocomplete2 = (name, label, options, errorObject, errorMessage, control) => (
    <Controller
      name={name}
      control={control}
      rules={{ required: 'This field is required' }}
      render={({ field }) => (
        <Autocomplete
          multiple
          options={options}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          value={field.value || []}
          onChange={(_, newValue) => field.onChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!errorObject}
              helperText={errorMessage}
              sx={{
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                minWidth: '300px'
              }}
            />
          )}
        />
      )}
    />
  );

  useEffect(() => {
    Object.entries(contactMethodStates).forEach(([label, state]) => {
      const isSelected = state === 1;
      setValue(label.toLowerCase(), isSelected);
    });
  }, [contactMethodStates, setValue]);
  useEffect(() => {
    if (editdata?.contactPreferences?.contactMethods) {
      const methods = editdata.contactPreferences.contactMethods;

      const updatedStates = {
        Telephone: methods.telephone ? 1 : 0,
        Email: methods.email ? 1 : 0,
        Letter: methods.letter ? 1 : 0,
        SMS: methods.sms ? 1 : 0,
        Whatsapp: methods.whatsapp ? 1 : 0
      };

      setContactMethodStates(updatedStates);
    }
  }, [editdata]);

  useEffect(() => {
    ['telephone', 'emailConsent', 'sms', 'whatsapp', 'letter'].forEach((field) => {
      register(field);
    });
  }, [register]);

  const onSubmit = async (formData) => {
    console.log('formData00000000000000000', formData);
    const isValid = await trigger();
    if (!isValid) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setIsloading(true);
    const fd = new FormData();
    fd.append('personalInfo[firstName]', formData.personalInfo.firstName || '');
    fd.append('personalInfo[lastName]', formData.personalInfo.lastName || '');
    fd.append('personalInfo[title]', formData.personalInfo.title || '');
    fd.append('personalInfo[gender]', formData.personalInfo.gender || '');
    const dob = formData.personalInfo.dateOfBirth;
    fd.append('personalInfo[dateOfBirth]', dob ? new Date(dob).toISOString() : '');
    fd.append('personalInfo[nickName]', formData.personalInfo.nickName || '');
    fd.append('personalInfo[ethnicity]', formData.personalInfo.ethnicity || '');
    if (formData.personalInfo?.profileImage instanceof File) {
      fd.append('profileImage', formData.personalInfo.profileImage);
    }
    fd.append('contactInfo[homePhone]', formData.phone || '');
    fd.append('contactInfo[phone]', formData.mobilePhone || '');
    fd.append('contactInfo[email]', formData.contactInfo.email || '');
    fd.append('contactInfo[addressLine1]', formData.address || '');
    fd.append('contactInfo[addressLine2]', formData.address2 || '');
    fd.append('contactInfo[town]', formData.town || '');
    fd.append('contactInfo[district]', formData.district || '');
    fd.append('contactInfo[postcode]', formData.pinCode || '');
    fd.append('contactInfo[country]', formData.country || '');
    fd.append('contactInfo[firstLanguage]', formData.language || '');
    fd.append('contactInfo[otherId]', formData.otherId || '');

    fd.append('otherInfo[description]', formData.riskNotes || '');

    fd.append('otherInfo[restrictAccess]', formData.restrictAccess ? 'true' : 'false');

    fd.append('emergencyContact[firstName]', formData.firstname || '');
    fd.append('emergencyContact[lastName]', formData.lastname || '');
    fd.append('emergencyContact[title]', formData.title || '');
    fd.append('emergencyContact[gender]', formData.gender || '');
    fd.append('emergencyContact[relationshipToUser]', formData.preferred || '');
    fd.append('emergencyContact[homePhone]', formData.emergencyhomePhone || '');
    fd.append('emergencyContact[phone]', formData.emergencyphone || '');
    fd.append('emergencyContact[email]', formData.emergencyemail || '');
    fd.append('emergencyContact[addressLine1]', formData.emergencyaddress || '');
    fd.append('emergencyContact[addressLine2]', formData.emergencyaddress2 || '');
    fd.append('emergencyContact[country]', formData.emergencycountry || '');
    fd.append('emergencyContact[town]', formData.emergencytown || '');
    fd.append('emergencyContact[postcode]', formData.emergencypinCode || '');
    fd.append('riskAssessment[riskAssessmentNotes]', formData.riskAssessmentNotes || '');
    (formData?.keyIndicators || []).forEach((item) => {
      fd.append('riskAssessment[keyIndicators][]', item.value || item);
    });
    formData.serviceSections.forEach((section, index) => {
      fd.append(`Service[${index}][serviceName]`, section.serviceName || '');
      fd.append(`Service[${index}][startDate]`, section.startDate || '');
      fd.append(`Service[${index}][lastDate]`, section.lastDate || '');
      fd.append(`Service[${index}][referrerName]`, section.referrerName || '');
      fd.append(`Service[${index}][referrerJob]`, section.referrerJob || '');
      fd.append(`Service[${index}][referrerPhone]`, section.referrerPhone || '');
      fd.append(`Service[${index}][referrerEmail]`, section.referrerEmail || '');
      fd.append(`Service[${index}][emergencyPhone]`, section.emergencyPhone || '');
      fd.append(`Service[${index}][emergencyEmail]`, section.emergencyEmail || '');
      fd.append(`Service[${index}][referralType]`, section.referralType || '');
      fd.append(`Service[${index}][referredDate]`, section.referredDate || '');
    });

    fd.append('contactPreferences[contactMethods][telephone]', formData.telephone ? 'true' : 'false');
    fd.append('contactPreferences[contactMethods][email]', formData.email ? 'true' : 'false');
    fd.append('contactPreferences[contactMethods][sms]', formData.sms ? 'true' : 'false');
    fd.append('contactPreferences[contactMethods][whatsapp]', formData.whatsapp ? 'true' : 'false');
    fd.append('contactPreferences[contactMethods][letter]', formData.letter ? 'true' : 'false');

    if (formData.preferredContact) {
      fd.append('contactPreferences[preferredMethod]', formData.preferredContact);
    }
    if (formData.contactPurpose && Array.isArray(formData.contactPurpose)) {
      formData.contactPurpose.forEach((id) => {
        fd.append('contactPreferences[contactPurposes][]', id);
      });
    }

    if (formData.reason) {
      fd.append('contactPreferences[reason]', formData.reason);
    }
    const confirmDate = formData.confirmationDate;
    fd.append('contactPreferences[dateOfConfirmation]', confirmDate ? new Date(confirmDate).toISOString() : '');
    fd.append('role', 'service_user');
    fd.append('isActive', true);

    (formData.beneficiaryTags || []).forEach((tag, index) => {
      fd.append(`otherInfo[tags][${index}]`, tag.tagId);
    });

    if (formData.file) {
      fd.append('file', formData.file || '');
    }

    try {
      if (editdata) {
        await updateApiPatch(`${urls.serviceuser.editUser}/${editdata._id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Service user updated successfully!');
      } else {
        await postApi(urls.serviceuser.create, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Service user added successfully!');
      }

      setIsloading(false);
      if (sessionId) {
        navigate('/attendees', { state: { sessionId: sessionId } });
      } else {
        navigate('/people');
      }
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
  const onlyLetterNumberSpace = /^[a-zA-Z0-9 ]+$/;
  const onlyLettersAndNumbers = /^[A-Za-z0-9\s]*$/;

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
    if (value === false) return 2;
    return 0;
  };

  useEffect(() => {
    if (contactpurpose?.length && editdata?.contactPreferences?.contactPurposes) {
      const selectedIds = editdata.contactPreferences.contactPurposes.map((item) => item._id);

      const initStates = contactpurpose.reduce((acc, item) => {
        acc[item._id] = selectedIds.includes(item._id) ? 1 : 0;
        return acc;
      }, {});

      setPurposeStates(initStates);
      setValue('contactPurposeStates', initStates);
      setValue('contactPurpose', selectedIds);
    }
  }, [contactpurpose, editdata]);
  return (
    <Grid>
      <Card sx={{ position: 'relative', backgroundColor: '#eef2f6' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center" gap={1}>
            <IconButton onClick={() => navigate(-1)} size="small">
              <ArrowBackIcon />
            </IconButton>
            {editdata ? 'Edit Service' : 'Add New Service User'}
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
            onClick={() => navigate('/people')}
          >
            <CloseIcon sx={{ color: 'white', fontSize: 20 }} />
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
                label="Risk Assessment"
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
              <Tab
                label="Service"
                sx={(theme) => ({
                  backgroundColor: tabIndex === 3 ? '#e3f2fd' : 'transparent',
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
                  backgroundColor: tabIndex === 4 ? '#e3f2fd' : 'transparent',
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
                                    <MenuItem value="Mrs">Mrs.</MenuItem>
                                    <MenuItem value="Miss">Miss</MenuItem>
                                    <MenuItem value="Dr">Dr.</MenuItem>
                                    <MenuItem value="Prof">Prof.</MenuItem>
                                    <MenuItem value="Rev">Rev.</MenuItem>
                                    <MenuItem value="Lady">Lady.</MenuItem>
                                    <MenuItem value="Sir">Sir.</MenuItem>
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

                            <Grid item xs={12} sm={6}>
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
                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="personalInfo.profileImage"
                                control={control}
                                rules={{
                                  validate: (file) => validateFile(file)
                                }}
                                render={({ field }) => (
                                  <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={
                                      field.value
                                        ? typeof field.value === 'object'
                                          ? field.value.name || ''
                                          : typeof field.value === 'string'
                                          ? field.value.split('/').pop() // extract file name from string
                                          : ''
                                        : ''
                                    }
                                    placeholder="Profile image"
                                    inputProps={{
                                      readOnly: true,
                                      sx: {
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        '&::placeholder': {
                                          fontSize: '12px',
                                          color: '#7a7b7c',
                                          opacity: 1,
                                          whiteSpace: 'nowrap',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          '&::placeholder': {
                                            fontSize: '12px',
                                            color: '#7a7b7c',
                                            opacity: 1
                                          }
                                        }
                                      }
                                    }}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <IconButton component="label" sx={{ p: 0, mr: '-10px' }}>
                                            <AttachFileIcon sx={{ fontSize: 18, color: '#7a7b7c' }} />
                                            <input
                                              type="file"
                                              hidden
                                              accept="image/jpeg,image/png,image/jpg"
                                              onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                field.onChange(file);
                                              }}
                                            />
                                          </IconButton>
                                        </InputAdornment>
                                      )
                                    }}
                                    error={!!errors?.personalInfo?.profileImage}
                                    helperText={errors.personalInfo?.profileImage?.message}
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
                                render={({ field, fieldState: { error } }) => (
                                  <Autocomplete
                                    options={ethnicityOptions}
                                    getOptionLabel={(option) => option}
                                    onChange={(_, value) => field.onChange(value)}
                                    value={field.value || null}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Ethnicity"
                                        size="small"
                                        error={!!error}
                                        helperText={error ? error.message : ''}
                                        fullWidth
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
                                        maxHeight: 215,
                                        overflowY: 'auto'
                                      }
                                    }}
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
                                name="contactInfo.email"
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
                                        label="Borough/District"
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
                                        label="Country"
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
                          <Paper elevation={2} sx={{ p: 2, height: '400px', overflow: 'auto' }}>
                            <Typography variant="subtitle1" mb={4}>
                              Service User Tags
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid container spacing={2}>
                                {allCategory?.map((category, index) => (
                                  <Grid item xs={12} key={category._id} sx={{ ml: 2 }}>
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
                      <Button variant="outlined" color="error" onClick={() => navigate(-1)}>
                        CANCEL
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" sx={{ background: '#053146' }} onClick={() => handleTabChange(tabIndex + 1)}>
                        SAVE CHANGES
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
                                    <MenuItem value="Mrs">Mrs.</MenuItem>
                                    <MenuItem value="Miss">Miss</MenuItem>
                                    <MenuItem value="Dr">Dr.</MenuItem>
                                    <MenuItem value="Prof">Prof.</MenuItem>
                                    <MenuItem value="Rev">Rev.</MenuItem>
                                    <MenuItem value="Lady">Lady.</MenuItem>
                                    <MenuItem value="Sir">Sir.</MenuItem>
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
                                        label="Country"
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
                      <Button variant="outlined" color="error" onClick={() => navigate(-1)}>
                        CANCEL
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" sx={{ background: '#053146' }} onClick={() => handleTabChange(tabIndex + 1)}>
                        SAVE CHANGES
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}

              {tabIndex === 2 && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: '12px',
                      padding: 2,
                      mt: 2
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="riskAssessmentNotes"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <TextField
                              {...field}
                              multiline
                              minRows={5}
                              label="Risk Assessment Notes"
                              variant="outlined"
                              fullWidth
                              sx={{
                                backgroundColor: '#f9f9f9',
                                borderRadius: '8px'
                              }}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="keyIndicators"
                          control={control}
                          render={({ field }) => {
                            const options = keyIndicator.map((item) => ({
                              label: item.name,
                              value: item._id
                            }));

                            // Normalize value: if it's array of IDs → convert to objects from options
                            const selected = Array.isArray(field.value)
                              ? field.value
                                  .map((val) => {
                                    if (typeof val === 'string' || typeof val === 'number') {
                                      return options.find((opt) => opt.value === val);
                                    }
                                    return {
                                      label: val?.name,
                                      value: val?._id
                                    };
                                  })
                                  .filter(Boolean)
                              : [];

                            return (
                              <Autocomplete
                                multiple
                                options={options}
                                value={selected}
                                onChange={(e, newValue) => {
                                  field.onChange(newValue.map((item) => item.value));
                                }}
                                getOptionLabel={(option) => option.label || ''}
                                renderInput={(params) => <TextField {...params} label="Key Indicators of Concern" variant="outlined" />}
                              />
                            );
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt: 1, pr: 2 }}>
                    <Grid item>
                      <Button variant="outlined" color="error" onClick={() => navigate(-1)}>
                        CANCEL
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" sx={{ background: '#053146' }} onClick={() => handleTabChange(tabIndex + 1)}>
                        SAVE CHANGES
                      </Button>
                    </Grid>
                  </Grid>{' '}
                </Grid>
              )}

              {tabIndex === 3 && (
                <>
                  <Box sx={{ px: 1, py: 1, maxWidth: '1200px', mx: 'auto' }}>
                    {fields.map((item, index) => (
                      <Grid
                        container
                        spacing={2}
                        key={item.id}
                        sx={{
                          borderRadius: 2,
                          mb: 5
                        }}
                      >
                        <Grid item xs={12} md={4} sx={{ p: 0 }}>
                          <Box
                            sx={{
                              border: '1px solid #e0e0e0',
                              borderRadius: 2,
                              p: 2,
                              backgroundColor: 'white',
                              height: '100%'
                            }}
                          >
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Controller
                                  name={`serviceSections[${index}].serviceName`}
                                  control={control}
                                  rules={{ required: 'Service Name is required' }}
                                  render={({ field }) => (
                                    <Autocomplete
                                      fullWidth
                                      size="small"
                                      options={serviceNames}
                                      getOptionLabel={(option) => option?.name || ''}
                                      isOptionEqualToValue={(option, value) => option?.id === value}
                                      value={serviceNames.find((s) => s.id === field.value) || null}
                                      onChange={(_, selected) => {
                                        field.onChange(selected?.id || '');
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Service Name"
                                          variant="outlined"
                                          size="small"
                                          error={!!errors?.serviceSections?.[index]?.serviceName}
                                          helperText={errors?.serviceSections?.[index]?.serviceName?.message}
                                        />
                                      )}
                                    />
                                  )}
                                />
                              </Grid>

                              <Grid item xs={6}>
                                <Controller
                                  name={`serviceSections[${index}].startDate`}
                                  control={control}
                                  rules={{
                                    required: 'Start Date is required',
                                    validate: (value) => (dayjs(value).isBefore(dayjs(), 'day') ? 'Start Date cannot be in the past' : true)
                                  }}
                                  render={({ field, fieldState: { error } }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DatePicker
                                        label="Start Date"
                                        value={field.value || null}
                                        onChange={(newValue) => field.onChange(newValue)}
                                        disablePast
                                        renderInput={(params) => (
                                          <TextField {...params} fullWidth size="small" error={!!error} helperText={error?.message} />
                                        )}
                                      />
                                    </LocalizationProvider>
                                  )}
                                />
                              </Grid>

                              <Grid item xs={6}>
                                <Controller
                                  name={`serviceSections[${index}].lastDate`}
                                  control={control}
                                  rules={{
                                    required: 'Last Date is required',
                                    validate: (value) => {
                                      const startDate = watch(`serviceSections[${index}].startDate`);
                                      if (!startDate) return true;
                                      return dayjs(value).isBefore(dayjs(startDate), 'day')
                                        ? 'Last Date cannot be before Start Date'
                                        : true;
                                    }
                                  }}
                                  render={({ field, fieldState: { error } }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DatePicker
                                        label="Last Date"
                                        value={field.value || null}
                                        onChange={(newValue) => field.onChange(newValue)}
                                        minDate={watch(`serviceSections[${index}].startDate`) || undefined}
                                        renderInput={(params) => (
                                          <TextField {...params} fullWidth size="small" error={!!error} helperText={error?.message} />
                                        )}
                                      />
                                    </LocalizationProvider>
                                  )}
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={8}>
                          <Box
                            sx={{
                              border: '1px solid #e0e0e0',
                              borderRadius: 2,
                              p: 2,
                              backgroundColor: 'white',
                              height: '100%'
                            }}
                          >
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  label="Referrer Name"
                                  {...register(`serviceSections[${index}].referrerName`)}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  label="Referrer Job Title"
                                  {...register(`serviceSections[${index}].referrerJob`)}
                                />
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  label="Referrer Phone No."
                                  {...register(`serviceSections[${index}].referrerPhone`)}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  label="Referrer Email"
                                  {...register(`serviceSections[${index}].referrerEmail`)}
                                />
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  label="Emergency Phone No."
                                  {...register(`serviceSections[${index}].emergencyPhone`)}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  label="Emergency Email"
                                  {...register(`serviceSections[${index}].emergencyEmail`)}
                                />
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <Controller
                                  name={`serviceSections[${index}].referralType`}
                                  control={control}
                                  render={({ field }) => (
                                    <TextField select fullWidth size="small" label="Referral Type" {...field}>
                                      <MenuItem value="Family Member">Family Member</MenuItem>
                                      <MenuItem value="Community Member">Community Member</MenuItem>
                                      <MenuItem value="Parent">Parent</MenuItem>
                                      <MenuItem value="School">School</MenuItem>
                                      <MenuItem value="Self Referral">Self Referral</MenuItem>
                                      <MenuItem value="Other">Other</MenuItem>
                                    </TextField>
                                  )}
                                />
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <Controller
                                  name={`serviceSections[${index}].referredDate`}
                                  control={control}
                                  render={({ field, fieldState: { error } }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DatePicker
                                        label="Referred Date"
                                        value={field.value || null}
                                        onChange={(newValue) => field.onChange(newValue)}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            fullWidth
                                            size="small"
                                            InputLabelProps={{ shrink: true }}
                                            error={!!error}
                                            helperText={error?.message}
                                          />
                                        )}
                                      />
                                    </LocalizationProvider>
                                  )}
                                />
                              </Grid>
                            </Grid>

                            <Box display="flex" justifyContent="flex-end" mt={2}>
                              <Button
                                onClick={() => remove(index)}
                                endIcon={
                                  <CloseIcon
                                    sx={{
                                      width: '18.33px',
                                      height: '18.33px',
                                      opacity: 1,
                                      backgroundColor: '#4C4E6442',
                                      borderRadius: '50%',
                                      padding: '2px'
                                    }}
                                  />
                                }
                                sx={{
                                  borderRadius: '999px',
                                  border: '1px solid #ccc',
                                  backgroundColor: '#f9f9f9',
                                  color: '#5c5f71',
                                  textTransform: 'none',
                                  fontWeight: 400,
                                  fontSize: '13px',
                                  px: 1.5,
                                  py: 0.5,
                                  '&:hover': {
                                    backgroundColor: '#f0f0f0',
                                    borderColor: '#bbb'
                                  }
                                }}
                              >
                                Remove this Service
                              </Button>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    ))}
                  </Box>

                  <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 2, px: 2 }}>
                    <Grid item>
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={
                          <AddIcon
                            sx={{
                              width: '18.33px',
                              height: '18.33px',
                              opacity: 1,
                              backgroundColor: '#4C4E6442',
                              borderRadius: '50%',
                              padding: '2px'
                            }}
                          />
                        }
                        sx={{
                          borderRadius: '999px',
                          border: '1px solid #ccc',
                          backgroundColor: '#f9f9f9',
                          color: '#5c5f71',
                          textTransform: 'none',
                          fontWeight: 400,
                          fontSize: '13px',
                          px: 1.5,
                          py: 0.5,
                          '&:hover': {
                            backgroundColor: '#f0f0f0',
                            borderColor: '#bbb'
                          }
                        }}
                        onClick={() =>
                          append({
                            serviceName: '',
                            startDate: null,
                            lastDate: null,
                            referrerName: '',
                            referrerJob: '',
                            referrerPhone: '',
                            referrerEmail: '',
                            emergencyPhone: '',
                            emergencyEmail: '',
                            referralType: '',
                            referredDate: null
                          })
                        }
                      >
                        Add Another Service
                      </Button>
                    </Grid>

                    <Grid item>
                      <Grid container spacing={2}>
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
                        <Grid item>
                          <Button variant="contained" sx={{ background: '#053146' }} onClick={() => handleTabChange(tabIndex + 1)}>
                            SAVE CHANGES
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}

              {tabIndex === 4 && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        border: '1px solid #ccc',
                        borderRadius: 3,
                        p: 2
                      }}
                    >
                      <Typography variant="subtitle2" mb={1}>
                        Channels
                      </Typography>

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
                        {isLoading ? 'Saving...' : 'CONFIRM PREFERENCE'}
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
