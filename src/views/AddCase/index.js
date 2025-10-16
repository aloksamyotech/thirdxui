import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Grid,
  TextField,
  Box,
  Paper,
  Button,
  InputAdornment,
  Card,
  Typography,
  FormControlLabel,
  Autocomplete,
  IconButton
} from '@mui/material';
import { MenuItem, Select, Chip, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getApi, postApi, updateApi } from 'common/apiClient';
import { urls } from 'common/urls';
import AntSwitch from 'components/AntSwitch';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import { validateFile } from 'utils/filevalidator';

const AddCaseForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sessionData = location.state?.sessionData;
  const [isLoading, setIsloading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = React.useRef(null);
  const [rows, setRows] = useState([]);
  const [services, setServices] = useState([]);
  const [caseOwner, setCaseOwner] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [allCategory, setAllCategory] = useState([]);

  const [searchQueryService, setSearchQueryService] = useState('');
  const [searchQueryCaseOwner, setSearchQueryCaseOwner] = useState('');

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      serviceUserId: '',
      serviceId: '',
      caseOwner: '',
      caseOpened: dayjs(),
      caseClosed: null,
      tags: [],
      description: '',
      file: null
    },
    mode: 'all'
  });

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setValue('file', file);
    }
  };
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const allCategory = await getApi(`${urls.comman.getAllTagData}`, {
          appliedTo: 'Cases'
        });
        setAllCategory(allCategory?.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, []);
  useEffect(() => {
    if (sessionData && allCategory.length > 0) {
      const beneficiaryTags = [];

      const selectedTagIds = sessionData.tags?.map((t) => t._id) || [];

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

      reset({
        serviceUserId: sessionData?.serviceUserId || '',
        serviceId: sessionData?.serviceId || '',
        caseOwner: sessionData?.caseOwner || '',
        caseOpened: dayjs(sessionData?.caseOpened) || dayjs(),
        caseClosed: sessionData?.caseClosed ? dayjs(sessionData.caseClosed) : null,
        description: sessionData?.description || '',
        serviceStatus: sessionData?.status || 'pending',
        file: sessionData?.file,
        beneficiaryTags
      });
    }
  }, [sessionData, allCategory, reset]);

  useEffect(() => {
    if (sessionData?.serviceUserId && rows.length > 0) {
      const match = rows.find((user) => user.id === sessionData.serviceUserId);
      if (match) setValue('serviceUserId', match.id);
    }
  }, [sessionData, rows, setValue]);

  useEffect(() => {
    if (sessionData?.caseOwner && caseOwner.length > 0) {
      const match = caseOwner.find((owner) => owner.id === sessionData.caseOwner);
      if (match) setValue('caseOwner', match.id);
    }
  }, [sessionData, caseOwner, setValue]);

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
  const onSubmit = async (data) => {
    setIsloading(true);

    try {
      const formData = new FormData();

      formData.append('serviceUserId', data.serviceUserId || '');
      formData.append('serviceId', data.serviceId || '');
      formData.append('caseOwner', data.caseOwner || '');
      formData.append('caseOpened', data.caseOpened || '');
      formData.append('caseClosed', data.caseClosed || '');
      (data.beneficiaryTags || []).forEach((tagId) => {
        formData.append('tags[]', tagId.tagId);
      });
      formData.append('description', data.description || '');
      formData.append('status', sessionData?.serviceStatus || data.serviceStatus);
      if (data.file) {
        formData.append('file', data.file);
      }
      if (sessionData) {
        await updateApi(`${urls.case.update.replace(':id', sessionData?._id)}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        toast.success('Case updated successfully');
      } else {
        await postApi(urls.case.create, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        toast.success('Case added successfully');
      }
      navigate('/case');
      setIsloading(false);
    } catch (error) {
      toast.error('Error submitting case');
      setIsloading(false);
    }
  };

  useEffect(() => {
    const fetchpeople = async () => {
      const queryParams = new URLSearchParams();
      if (searchQuery && searchQuery !== '') {
        queryParams.append('search', searchQuery);
      }
      queryParams.append('role', 'service_user');

      const response = await getApi(`${urls.serviceuser.fetchWithPagination}?${queryParams.toString()}`);
      const allUser = response?.data?.data || [];
      const formattedUsers = allUser.map((user) => ({
        id: user._id,
        name: `${user.personalInfo?.firstName || ''} ${user.personalInfo?.lastName || ''}`
      }));
      setRows(formattedUsers);
    };
    fetchpeople();
  }, [searchQuery]);
  useEffect(() => {
    const fetchpeople = async () => {
      const response = await getApi(`${urls.login.getAllAdmin}`);
      const allUser = response?.data?.allAdmins || [];
      const formattedUsers = allUser.map((user) => ({
        id: user._id,
        name: user.name
      }));
      setCaseOwner(formattedUsers);
    };
    fetchpeople();
  }, [searchQueryCaseOwner]);

  useEffect(() => {
    const fetchServices = async () => {
      const queryParams = new URLSearchParams();
      if (searchQueryService && searchQueryService !== '') {
        queryParams.append('search', searchQueryService);
      }
      const response = await getApi(`${urls.service.fetchWithPagination}?${queryParams.toString()}`);
      setServices(response?.data?.data);
    };
    fetchServices();
  }, [searchQueryService]);

  const onlyLetters = /^[A-Za-z\s]*$/;
  const openedDate = watch('caseOpened');
  const closedDate = watch('caseClosed');

  useEffect(() => {
    if (closedDate && dayjs(closedDate).isBefore(dayjs(), 'day')) {
      setValue('serviceStatus', 'closed');
    } else if (openedDate && dayjs(openedDate).isAfter(dayjs(), 'day')) {
      setValue('serviceStatus', 'pending');
    } else {
      setValue('serviceStatus', 'open');
    }
  }, [openedDate, closedDate, setValue]);

  return (
    <Card sx={{ position: 'relative', backgroundColor: '#eef2f6' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center" gap={1}>
          <IconButton onClick={() => navigate(-1)} size="small">
            <ArrowBackIcon />
          </IconButton>
          Add New Case
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ padding: 2, marginTop: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper elevation={2} sx={{ p: 2, height: '400px', overflow: 'auto' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="serviceUserId"
                      control={control}
                      rules={{ required: 'Service user is required' }}
                      render={({ field }) => {
                        const selectedUser = rows.find((user) => user.id === field.value);

                        return (
                          <FormControl fullWidth size="small" error={!!errors.serviceUserId}>
                            <Autocomplete
                              value={selectedUser || null}
                              onChange={(_, value) => field.onChange(value?.id || '')}
                              // onInputChange={(_, newInputValue) => setSearchQuery(newInputValue)}
                              options={rows}
                              getOptionLabel={(option) => option.name || ''}
                              isOptionEqualToValue={(option, value) => option.id === value.id}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Service User"
                                  variant="outlined"
                                  size="small"
                                  error={!!errors.serviceUserId}
                                />
                              )}
                            />
                            {errors.serviceUserId && (
                              <Typography color="error" variant="caption">
                                {errors.serviceUserId.message}
                              </Typography>
                            )}
                          </FormControl>
                        );
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="serviceId"
                      control={control}
                      rules={{ required: 'Service is required' }}
                      render={({ field }) => {
                        const selectedService = services?.find((service) => service._id === field.value) || null;

                        return (
                          <FormControl fullWidth size="small" error={!!errors.serviceId}>
                            <Autocomplete
                              value={selectedService}
                              onChange={(_, value) => field.onChange(value ? value._id : '')}
                              onInputChange={(_, newInputValue) => setSearchQueryService(newInputValue)}
                              options={services || []}
                              getOptionLabel={(option) => option.name || ''}
                              isOptionEqualToValue={(option, value) => option._id === value._id}
                              renderInput={(params) => (
                                <TextField {...params} label="Service" variant="outlined" size="small" error={!!errors.serviceId} />
                              )}
                            />
                            {errors.serviceId && (
                              <Typography color="error" variant="caption">
                                {errors.serviceId.message}
                              </Typography>
                            )}
                          </FormControl>
                        );
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="caseOwner"
                      control={control}
                      rules={{ required: 'Case owner is required' }}
                      render={({ field }) => {
                        const selectedOwner = caseOwner.find((owner) => owner.id === field.value);

                        return (
                          <FormControl fullWidth size="small" error={!!errors.caseOwner}>
                            <Autocomplete
                              value={selectedOwner || null}
                              onChange={(_, value) => field.onChange(value?.id || '')}
                              // onInputChange={(_, newInputValue) => setSearchQueryCaseOwner(newInputValue)}
                              options={caseOwner}
                              getOptionLabel={(option) => option.name || ''}
                              isOptionEqualToValue={(option, value) => option.id === value.id}
                              renderInput={(params) => (
                                <TextField {...params} label="Case Owner" variant="outlined" size="small" error={!!errors.caseOwner} />
                              )}
                            />
                            {errors.caseOwner && (
                              <Typography color="error" variant="caption">
                                {errors.caseOwner.message}
                              </Typography>
                            )}
                          </FormControl>
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="serviceStatus"
                      control={control}
                      defaultValue="pending"
                      render={({ field }) => (
                        <FormControl fullWidth size="small">
                          <InputLabel>Status</InputLabel>
                          <Select
                            {...field}
                            label="Status"
                            value={field.value || 'pending'}
                            disabled // 🔹 ye line add karo
                            renderValue={(selected) => {
                              if (selected === 'open') return 'Open';
                              if (selected === 'closed') return 'Closed';
                              return 'Pending';
                            }}
                          >
                            <MenuItem value="open">
                              <Chip
                                label="Open"
                                sx={{
                                  backgroundColor: '#E0F4FF',
                                  color: '#26C6F9',
                                  borderRadius: '16px',
                                  fontWeight: 500,
                                  px: 1.5,
                                  fontSize: '12px'
                                }}
                              />
                            </MenuItem>

                            <MenuItem value="closed">
                              <Chip
                                label="Closed"
                                sx={{
                                  backgroundColor: '#FFE0E0',
                                  color: '#F44336',
                                  borderRadius: '16px',
                                  fontWeight: 500,
                                  px: 1.5,
                                  fontSize: '12px'
                                }}
                              />
                            </MenuItem>

                            <MenuItem value="pending">
                              <Chip
                                label="Pending"
                                sx={{
                                  backgroundColor: '#FFF4E0',
                                  color: '#FF9800',
                                  borderRadius: '16px',
                                  fontWeight: 500,
                                  px: 1.5,
                                  fontSize: '12px'
                                }}
                              />
                            </MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="caseOpened"
                      control={control}
                      rules={{ required: 'Start date is required' }}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Date Case Opened"
                            value={field.value}
                            onChange={(newValue) => field.onChange(newValue)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                size="small"
                                error={!!errors.caseOpened}
                                helperText={errors.caseOpened?.message}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="caseClosed"
                      control={control}
                      rules={{
                        required: 'End date is required',

                        validate: (value) =>
                          !value || !getValues('caseOpened') || value.isAfter(getValues('caseOpened'))
                            ? true
                            : 'End date must be after start date'
                      }}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Date Case Closed"
                            value={field.value}
                            minDate={getValues('caseOpened') || undefined}
                            onChange={(newValue) => field.onChange(newValue)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                size="small"
                                error={!!errors.caseClosed}
                                helperText={errors.caseClosed?.message}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Box mb={2} display="flex" justifyContent="space-between">
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
                                      accept=".pdf,.doc,.docx"
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
              </Paper>
            </Grid>

            {/* <Grid container spacing={2} sx={{ p: 2 }}> */}
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 2, height: '400px', overflow: 'auto' }}>
                <Typography variant="subtitle1" mb={4}>
                  Case Tags
                </Typography>

                <Grid container spacing={2}>
                  <Grid container spacing={2}>
                    {allCategory?.map((category, index) => (
                      <Grid item xs={12} key={category._id} sx={{ ml: 2 }}>
                        {renderAutocomplete(`Beneficiary.${index}`, category.name, category.tags, null, null, control, category._id)}
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                  <Controller
                    name="description"
                    control={control}
                    notes
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Notes"
                        multiline
                        minRows={15}
                        fullWidth
                        variant="outlined"
                        error={!!errors.description}
                        helperText={errors.description?.message}
                      />
                    )}
                  />
                </Paper>
              </Grid> */}
            {/* </Grid> */}
          </Grid>
          <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt: 1, pr: 2 }}>
            <Grid item>
              <Button type="submit" variant="contained" sx={{ background: '#053146' }} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'SAVE CHANGES'}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  reset();
                  navigate(-1);
                }}
              >
                CANCEL
              </Button>
            </Grid>
          </Grid>
        </Card>
      </form>
    </Card>
  );
};

export default AddCaseForm;
