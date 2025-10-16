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
  Chip,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { postApi, getApi, updateApi } from 'common/apiClient';
import toast from 'react-hot-toast';
import { urls } from 'common/urls';
import AntSwitch from 'components/AntSwitch';
import { useLocation } from 'react-router-dom';
import { validateFile } from 'utils/filevalidator';

const AddCaseForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceToEdit = location.state?.serviceId;
  const [restrictAccess, setRestrictAccess] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const [servicetype, setServiceType] = useState([]);
  const [serviceTypeOptions, setServiceTypeOptions] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [benificiary, setBenificiary] = useState([]);
  const [Campaigns, setCampaigns] = useState([]);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [engagement, setengagement] = useState([]);
  const [eventsAttended, seteventsAttended] = useState([]);
  const [fundingInterests, setfundingInterests] = useState([]);
  const [fundraisingActivities, setfundraisingActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [allCategory, setAllCategory] = useState([]);

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
        const queryParams = new URLSearchParams();
        if (searchQuery && searchQuery !== '') {
          queryParams.append('search', searchQuery);
        }
        queryParams.append('configurationType', 'Service Types');

        const response = await getApi(`${urls.configuration.fetchWithPagination}?${queryParams.toString()}`);

        const servicetypeoption = response?.data?.data?.filter((item) => item.configurationType === 'Service Types');
        setServiceTypeOptions(servicetypeoption);
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    };
    fetchData();
  }, [searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!serviceToEdit) return;
        const response = await getApi(urls.service.getById.replace(':id', serviceToEdit));
        setServiceData(response?.data?.userData);
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };
    fetchData();
  }, [serviceToEdit]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'all',
    defaultValues: {
      name: '',
      code: '',
      serviceType: '',
      tags: [],
      notes: '',
      attachment: null,
      file: null,
      restrictAccess: false
    }
  });

  useEffect(() => {
    if (serviceToEdit && serviceData && allCategory.length > 0) {
      setValue('name', serviceData?.name || '');
      setValue('code', serviceData?.code || '');
      setValue('serviceType', serviceData?.serviceType || '');

      if (Array.isArray(serviceData.tags)) {
        const selectedTagIds = serviceData.tags.map((t) => t._id); // 👈 Extract IDs
        const beneficiaryTags = [];

        allCategory.forEach((category) => {
          category.tags.forEach((tag) => {
            if (selectedTagIds.includes(tag._id)) {
              beneficiaryTags.push({
                categoryId: category._id,
                tagId: tag._id
              });
            }
          });
        });

        setValue('beneficiaryTags', beneficiaryTags);
      }

      setValue('notes', serviceData?.description || '');
      setValue('attachment', serviceData?.attachment || null);
      setValue('file', serviceData?.file || null);
      setRestrictAccess(serviceData?.isActive || false);
    }
  }, [serviceData, serviceToEdit, allCategory, setValue]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const allCategory = await getApi(`${urls.comman.getAllTagData}`, {
          appliedTo: 'Services'
        });
        setAllCategory(allCategory?.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, []);
  const renderAutocomplete = (label, options, categoryId) => {
    const selectedOptions = (watch('beneficiaryTags') || [])
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
        value={selectedOptions}
        onChange={(_, selectedOptions) => {
          const updatedTags = selectedOptions.map((opt) => ({
            categoryId: categoryId,
            tagId: opt._id
          }));

          setValue('beneficiaryTags', [...(watch('beneficiaryTags') || []).filter((tag) => tag.categoryId !== categoryId), ...updatedTags]);
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
        renderInput={(params) => <TextField {...params} label={label} size="small" fullWidth />}
      />
    );
  };

  const onSubmit = async (data) => {
    setIsloading(true);

    try {
      const formData = new FormData();
      formData.append('name', data.name || '');
      formData.append('code', data.code || '');
      formData.append('serviceType', data.serviceType || '');
      (data.beneficiaryTags || []).forEach((tagId) => {
        formData.append('tags[]', tagId.tagId);
      });
      formData.append('description', data.notes || '');
      formData.append('isActive', restrictAccess || false);

      if (data.attachment) {
        formData.append('attachment', data.attachment);
      }
      if (data.file) {
        formData.append('file', data.file);
      }

      if (serviceToEdit) {
        await updateApi(`${urls.service.editServices}${serviceToEdit}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Service updated successfully');
      } else {
        await postApi(urls.service.create, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        toast.success('Service added successfully');
      }

      navigate('/services');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form');
    } finally {
      setIsloading(false);
    }
  };

  const selectList = serviceTypeOptions?.map((item, index) => ({
    id: item?._id,
    title: item?.name
  }));

  return (
    <Card sx={{ position: 'relative', backgroundColor: '#eef2f6', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center" gap={1}>
          <IconButton onClick={() => navigate(-1)} size="small">
            <ArrowBackIcon />
          </IconButton>
          {serviceToEdit ? 'Edit Service' : 'Adding New Service'}
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={3}>
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

                <Grid item xs={12} sm={3}>
                  <Controller
                    name="serviceType"
                    control={control}
                    rules={{
                      required: 'Service Type is required'
                    }}
                    render={({ field }) => {
                      const selectedUser = selectList?.find((user) => user.id === field.value) || null;
                      return (
                        <Autocomplete
                          value={selectedUser}
                          size="small"
                          disablePortal
                          options={selectList}
                          getOptionLabel={(options) => options?.title}
                          onChange={(_, value) => field.onChange(value ? value.id : '')}
                          onInputChange={(_, newInputValue) => setSearchQuery(newInputValue)}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          renderInput={(params) => <TextField {...params} label="Service Type" />}
                        />
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
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
                        value={field.value ? (typeof field.value === 'string' ? field.value : field.value.name) : ''}
                        placeholder="Upload Image"
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <InsertPhotoOutlinedIcon fontSize="small" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Button component="label" sx={{ minWidth: 0, p: 0 }}>
                                <Link component="span">Upload</Link>
                                <input
                                  type="file"
                                  hidden
                                  accept="image/*"
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
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ p: 2 }}>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                  <Grid container spacing={2}>
                    {/* Notes */}
                    <Grid item xs={12}>
                      <Controller
                        name="notes"
                        control={control}
                        rules={{
                          validate: (value) => {
                            if (!value) return true;

                            if (value.length < 12) return 'Notes must be at least 10 characters long';
                            const wordCount = value.trim().split(/\s+/).length;
                            if (wordCount > 500) return 'Notes cannot exceed 500 words';
                            if (!/^[A-Za-z0-9\s.,'"\-():!@#$%^&*]+$/.test(value))
                              return 'Notes can only contain letters, numbers, and common punctuation';

                            return true;
                          }
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Notes"
                            multiline
                            minRows={13}
                            fullWidth
                            variant="outlined"
                            error={!!errors.notes}
                            helperText={errors.notes?.message}
                          />
                        )}
                      />
                    </Grid>

                    {/* Attachments Field */}
                    <Grid item xs={12} md={12}>
                      <Controller
                        name="attachment"
                        control={control}
                        rules={{
                          validate: (file) => validateFile(file)
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={field.value ? (typeof field.value === 'string' ? field.value : field.value.name) : ''}
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
                                    <Link component="span">Upload</Link>
                                    <input
                                      type="file"
                                      hidden
                                      accept="image/*"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        field.onChange(file);
                                      }}
                                    />
                                  </Button>
                                </InputAdornment>
                              )
                            }}
                            error={!!errors.attachment}
                            helperText={errors.attachment?.message}
                          />
                        )}
                      />
                    </Grid>

                    {/* Restrict Access Switch */}
                    {/* <Grid item xs={12}>
                      <FormControlLabel
                        control={<AntSwitch checked={restrictAccess} onChange={handleToggle} />}
                        label="Restrict Access?"
                        labelPlacement="start"
                        sx={{ gap: 1 }}
                      />
                    </Grid> */}
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 2, height: '400px', overflow: 'auto' }}>
                  <Typography variant="subtitle1" mb={4}>
                    Service Tags
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid container spacing={2}>
                      {allCategory?.map((category) => (
                        <Grid item xs={12} key={category._id} sx={{ ml: 2 }}>
                          {renderAutocomplete(category.name, category.tags, category._id)}
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
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
                <Button variant="outlined" color="error" onClick={() => navigate(-1)}>
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
