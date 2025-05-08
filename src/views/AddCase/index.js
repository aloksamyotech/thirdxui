import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Grid, TextField, Box, Paper, Button, InputAdornment, Card, Typography } from '@mui/material';
import { MenuItem, Select, Chip, FormControl, InputLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AddCaseForm = ({ onCancel }) => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = React.useRef(null);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      serviceName: '',
      serviceCode: '',
      serviceType: '',
      startDate: null,
      endDate: null,
      serviceStatus: '',
      beneficiaryInfo: '',
      campaignsSupported: '',
      engagement: '',
      eventsAttended: '',
      fundingInterests: '',
      fundraisingActivities: '',
      notes: '',
      attachments: null
    }
  });

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

  const onSubmit = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === 'attachments' && data[key]) {
        formData.append('file', data[key]);
      } else {
        formData.append(key, data[key]);
      }
    });

    console.log('Form Data:', Object.fromEntries(formData));
    console.log('File:', data.attachments);

    // Here you can add your API call to upload the form data
    // Example:
    // fetch('/api/upload', {
    //   method: 'POST',
    //   body: formData
    // });

    reset();
  };

  const onlyLetters = /^[A-Za-z\s]*$/;
  const onlyNumbers = /^[0-9]*$/;

  return (
    <Card sx={{ position: 'relative', backgroundColor: '#eef2f6' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Add New Case</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/case')}>
          <ArrowBackIcon sx={{ color: 'grey' }} />
          <Typography variant="h6" sx={{ mr: 1 }}>
            Back
          </Typography>
        </Box>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ padding: 2, marginTop: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Controller
                    name="serviceName"
                    control={control}
                    rules={{
                      required: 'Service name is required',
                      minLength: {
                        value: 2,
                        message: 'Service name must be at least 2 characters'
                      },
                      maxLength: {
                        value: 50,
                        message: 'Service name cannot exceed 50 characters'
                      },
                      pattern: {
                        value: onlyLetters,
                        message: 'Service name can only contain letters'
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Service Name"
                        size="small"
                        error={!!errors.serviceName}
                        helperText={errors.serviceName?.message}
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
                    name="serviceCode"
                    control={control}
                    rules={{
                      required: 'Service code is required',
                      pattern: {
                        value: onlyNumbers,
                        message: 'Service code must contain only numbers'
                      },
                      maxLength: {
                        value: 10,
                        message: 'Service code  cannot exceed 10 digits'
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Service Code"
                        size="small"
                        error={!!errors.serviceCode}
                        helperText={errors.serviceCode?.message}
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
                    name="serviceType"
                    control={control}
                    rules={{ required: 'Service type is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Service Type"
                        size="small"
                        error={!!errors.serviceType}
                        helperText={errors.serviceType?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controller
                    name="startDate"
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
                              error={!!errors.startDate}
                              helperText={errors.startDate?.message}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controller
                    name="endDate"
                    control={control}
                    rules={{ required: 'End date is required' }}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date Case Closed"
                          value={field.value}
                          onChange={(newValue) => field.onChange(newValue)}
                          renderInput={(params) => (
                            <TextField {...params} fullWidth size="small" error={!!errors.endDate} helperText={errors.endDate?.message} />
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
                          {['Active', 'Inactive'].map((status) => (
                            <MenuItem key={status} value={status}>
                              <Chip
                                label={status}
                                sx={{
                                  color: status === 'Active' ? '#79dbfb' : '#ff6a67',
                                  backgroundColor: status === 'Active' ? '#e5f8fe' : '#ffeae9',
                                  fontWeight: 500
                                }}
                              />
                            </MenuItem>
                          ))}
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
                    Service Tag
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Controller
                        name="beneficiaryInfo"
                        control={control}
                        rules={{
                          required: 'Beneficiary information is required',
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
                            error={!!errors.beneficiaryInfo}
                            helperText={errors.beneficiaryInfo?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="campaignsSupported"
                        control={control}
                        rules={{
                          required: 'Campaigns supported is required',
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
                            error={!!errors.campaignsSupported}
                            helperText={errors.campaignsSupported?.message}
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
                        name="eventsAttended"
                        control={control}
                        rules={{
                          required: 'Events attended is required',
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
                            error={!!errors.eventsAttended}
                            helperText={errors.eventsAttended?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="fundingInterests"
                        control={control}
                        rules={{
                          required: 'Funding interests is required',
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
                            error={!!errors.fundingInterests}
                            helperText={errors.fundingInterests?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="fundraisingActivities"
                        control={control}
                        rules={{
                          required: 'Fundraising activities is required',
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
                      name="attachments"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
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
                      )}
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                    />
                  </Box>
                  <Controller
                    name="notes"
                    control={control}
                    rules={{
                      required: 'Notes are required',
                      minLength: {
                        value: 10,
                        message: 'Notes must be at least 10 characters long'
                      },
                      maxLength: {
                        value: 500,
                        message: 'Notes cannot exceed 500 characters'
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Notes"
                        multiline
                        minRows={12}
                        fullWidth
                        variant="outlined"
                        sx={{ mb: 2 }}
                        error={!!errors.notes}
                        helperText={errors.notes?.message}
                      />
                    )}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Card>

        <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt: 1, pr: 2 }}>
          <Grid item>
            <Button type="submit" variant="contained" sx={{ background: '#053146' }}>
              Save Changes
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                reset();
                onCancel();
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default AddCaseForm;
