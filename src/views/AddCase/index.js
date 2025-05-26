import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Grid, TextField, Box, Paper, Button, InputAdornment, Card, Typography } from '@mui/material';
import { MenuItem, Select, Chip, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getApi, postApi } from 'common/apiClient';
import { urls } from 'common/urls';
import AntSwitch from 'components/AntSwitch';
import toast from 'react-hot-toast';

const AddCaseForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = React.useRef(null);
  const [rows, setRows] = useState([]);
  const [services, setServices] = useState([]);

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
      serviceType: '',
      caseOpened: null,
      caseClosed: null,
      benificiary: '',
      campaigns: '',
      engagement: '',
      eventAttanded: '',
      fundingInterest: '',
      fundraisingActivities: '',
      description: '',
      files: null
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
      setValue('attachments', file);
    }
  };

  const onSubmit = async (data) => {
    setIsloading(true);

    try {
      const formData = new FormData();

      formData.append('serviceUserId', data.serviceUserId || '');
      formData.append('serviceId', data.serviceId || '');
      formData.append('serviceType', data.serviceType || '');
      formData.append('caseOpened', data.caseOpened || '');
      formData.append('caseClosed', data.caseClosed || '');
      formData.append('benificiary', data.benificiary || '');
      formData.append('campaigns', data.campaigns || '');
      formData.append('engagement', data.engagement || '');
      formData.append('fundingInterest', data.fundingInterests || '');
      formData.append('fundraisingActivities', data.fundraisingActivities || '');
      formData.append('description', data.description || '');
      formData.append('isActive', data.serviceStatus);
      if (data.file) {
        formData.append('file', data.file || '');
      }

      const response = await postApi(urls.case.create, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Cases added successfully');
      navigate('/case');
      setIsloading(false);
    } catch (error) {
      toast.error('Error submitting case');
      setIsloading(false);
    }
  };

  useEffect(() => {
    const fetchpeople = async () => {
      const response = await getApi(urls.serviceuser.fetch);
      const allUser = response?.data?.allUser || [];
      const formattedUsers = allUser.map((user) => ({
        id: user._id,
        name: `${user.personalInfo?.firstName || ''} ${user.personalInfo?.lastName || ''}`
      }));
      setRows(formattedUsers);
    };
    fetchpeople();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await getApi(urls.service.fetch);

      setServices(response?.data);
    };
    fetchServices();
  }, []);

  const onlyLetters = /^[A-Za-z\s]*$/;

  return (
    <Card sx={{ position: 'relative', backgroundColor: '#eef2f6' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Adding New Case</Typography>

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
          onClick={() => navigate('/case')}
        >
          <CloseIcon sx={{ color: 'white', fontSize: 20 }} />
        </Box>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ padding: 2, marginTop: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Controller
                    name="serviceUserId"
                    control={control}
                    rules={{ required: 'Service user is required' }}
                    render={({ field }) => (
                      <FormControl fullWidth size="small" error={!!errors.serviceUserId}>
                        <InputLabel id="service-user-label">Service User</InputLabel>
                        <Select {...field} labelId="service-user-label" label="Service User">
                          {rows?.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                              {user.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.serviceUserId && (
                          <Typography color="error" variant="caption">
                            {errors.serviceUserId.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name="serviceId"
                    control={control}
                    rules={{ required: 'Service is required' }}
                    render={({ field }) => (
                      <FormControl fullWidth size="small" error={!!errors.serviceId}>
                        <InputLabel id="service-label">Service</InputLabel>
                        <Select {...field} labelId="service-label" label="Service">
                          {services?.map((service) => (
                            <MenuItem key={service._id} value={service._id}>
                              {service.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.serviceId && (
                          <Typography color="error" variant="caption">
                            {errors.serviceId.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name="serviceType"
                    control={control}
                    rules={{ required: 'Service owner is required' }}
                    render={({ field }) => (
                      <FormControl fullWidth size="small" error={!!errors.serviceType}>
                        <InputLabel id="service-type-label">Service Owner</InputLabel>
                        <Select {...field} labelId="service-type-label" label="Service Owner">
                          <MenuItem value="owner1">Owner 1</MenuItem>
                          <MenuItem value="owner2">Owner 2</MenuItem>
                          <MenuItem value="owner3">Owner 3</MenuItem>
                        </Select>
                        {errors.serviceType && (
                          <Typography color="error" variant="caption">
                            {errors.serviceType.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
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

                <Grid item xs={12} sm={4}>
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
                          minDate={getValues('caseOpened') || undefined} // restrict selection
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

                <Grid item xs={12} sm={4}>
                  <Controller
                    name="serviceStatus"
                    control={control}
                    rules={{ required: 'Service status is required' }}
                    render={({ field }) => (
                      <FormControl fullWidth size="small" error={!!errors.serviceStatus}>
                        <InputLabel id="status-label">Service Status</InputLabel>
                        <Select {...field} labelId="status-label" label="Service Status">
                          <MenuItem value="true">
                            <Chip
                              label="Active"
                              sx={{
                                color: '#79dbfb',
                                backgroundColor: '#e5f8fe',
                                fontWeight: 500
                              }}
                            />
                          </MenuItem>
                          <MenuItem value="false">
                            <Chip
                              label="Inactive"
                              sx={{
                                color: '#ff6a67',
                                backgroundColor: '#ffeae9',
                                fontWeight: 500
                              }}
                            />
                          </MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ p: 2 }}>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography variant="subtitle1" mb={2}>
                    Case Tag
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Controller
                        name="benificiary"
                        control={control}
                        rules={{
                          minLength: { value: 2, message: 'Minimum 2 characters' },
                          maxLength: { value: 50, message: 'Maximum 50 characters allowed' },
                          pattern: {
                            value: onlyLetters,
                            message: 'Only letters are allowed'
                          }
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            size="small"
                            label="Beneficiary Information"
                            error={!!errors.benificiary}
                            helperText={errors.benificiary?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="campaigns"
                        control={control}
                        rules={{
                          minLength: { value: 2, message: 'Minimum 2 characters' },
                          maxLength: { value: 50, message: 'Maximum 50 characters allowed' },
                          pattern: {
                            value: onlyLetters,
                            message: 'Only letters are allowed'
                          }
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            size="small"
                            label="Campaigns Supported"
                            error={!!errors.campaigns}
                            helperText={errors.campaigns?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="engagement"
                        control={control}
                        rules={{
                          minLength: { value: 2, message: 'Minimum 2 characters' },
                          maxLength: { value: 50, message: 'Maximum 50 characters allowed' },
                          pattern: {
                            value: onlyLetters,
                            message: 'Only letters are allowed'
                          }
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            size="small"
                            label="Engagement"
                            error={!!errors.engagement}
                            helperText={errors.engagement?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="eventAttanded"
                        control={control}
                        rules={{
                          minLength: { value: 2, message: 'Minimum 2 characters' },
                          maxLength: { value: 50, message: 'Maximum 50 characters allowed' },
                          pattern: {
                            value: onlyLetters,
                            message: 'Only letters are allowed'
                          }
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            size="small"
                            label="Events Attended"
                            error={!!errors.eventAttanded}
                            helperText={errors.eventAttanded?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="fundingInterest"
                        control={control}
                        rules={{
                          minLength: { value: 2, message: 'Minimum 2 characters' },
                          maxLength: { value: 50, message: 'Maximum 50 characters allowed' },
                          pattern: {
                            value: onlyLetters,
                            message: 'Only letters are allowed'
                          }
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            size="small"
                            label="Funding Interests"
                            error={!!errors.fundingInterest}
                            helperText={errors.fundingInterest?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="fundraisingActivities"
                        control={control}
                        rules={{
                          minLength: { value: 2, message: 'Minimum 2 characters' },
                          maxLength: { value: 50, message: 'Maximum 50 characters allowed' },
                          pattern: {
                            value: onlyLetters,
                            message: 'Only letters are allowed'
                          }
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            size="small"
                            label="Fundraising Activities"
                            error={!!errors.fundraisingActivities}
                            helperText={errors.fundraisingActivities?.message}
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
                                <Button component="label" sx={{ minWidth: 0, p: 0 }}>
                                  <Link component="span">Upload a file</Link>
                                  <input
                                    type="file"
                                    hidden
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      const allowedTypes = [
                                        'application/pdf',
                                        'application/msword',
                                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                      ];
                                      const maxSizeInBytes = 25 * 1024 * 1024;

                                      if (file) {
                                        if (!allowedTypes.includes(file.type)) {
                                          toast.error('Only PDF, DOC, and DOCX files are allowed.');
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
                    name="description"
                    control={control}
                    notes
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Notes"
                        multiline
                        minRows={13}
                        fullWidth
                        variant="outlined"
                        error={!!errors.description}
                        helperText={errors.description?.message}
                      />
                    )}
                  />
                  {/* <Controller
                    name="isActive"
                    control={control}
                    defaultValue={true}
                    render={({ field }) => (
                      <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <Typography variant="subtitle1">Restrict Access</Typography>
                        <AntSwitch {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)} color="primary" />
                      </Box>
                    )}
                  /> */}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Card>

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
                navigate('/case');
              }}
            >
              CANCEL
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default AddCaseForm;
