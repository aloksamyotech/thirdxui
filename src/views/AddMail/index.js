import React, { useState } from 'react';
import {
  Card,
  Grid,
  TextField,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  IconButton,
  Box,
  Paper,
  FormControl,
  InputLabel,
  FormHelperText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Delete, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useLocation, useNavigate } from 'react-router-dom';
import AntSwitch from 'components/AntSwitch.js';
import { useForm, Controller } from 'react-hook-form';
import { postApi, getApi } from 'common/apiClient';
import toast from 'react-hot-toast';
import { urls } from 'common/urls';
import { useEffect } from 'react';
import { Autocomplete } from '@mui/material';
import { channelOptions, fieldOptions } from 'common/constants';

const MailingListForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const [tagOptions, setTagOptions] = useState([]);
  const [contactPurposeEntry, setContactPurposeEntry] = useState([]);

  const location = useLocation();
  const userType = location?.state?.subRole;

  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'all',
    defaultValues: {
      userType,
      tags: [],
      channelSettings: '',
      purposeSettings: '',
      includeArchived: false
    }
  });

  const [filters, setFilters] = useState([
    {
      id: 1,
      operator_to_next: 'AND',
      field: '',
      comparison: '',
      value: '',
      errors: {
        field: false,
        comparison: false,
        value: false
      }
    }
  ]);

  const handleFilterChange = (id, field, value) => {
    setFilters((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              [field]: value,
              errors: {
                ...f.errors,
                [field]: false
              }
            }
          : f
      )
    );
  };

  const addFilter = () => {
    setFilters([...filters, { id: Date.now(), operator_to_next: 'AND', field: '', comparison: '', value: '' }]);
  };

  const removeFilter = (id) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  const fetchtTagData = async () => {
    try {
      const response = await getApi(urls.tag.getAllTags);

      setTagOptions(response?.data?.allTags);
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  };

  const fetchContactPurposes = async () => {
    try {
      const res = await getApi(urls.configuration.fetch);
      const options = res?.data?.allConfiguration?.filter((item) => item.configurationType === 'Contact Purpose');
      setContactPurposeEntry(options || []);
    } catch (err) {
      console.error('Error fetching contact purposes:', err);
    }
  };

  useEffect(() => {
    fetchtTagData();
    fetchContactPurposes();
  }, []);

  const onSubmit = async (data) => {
    setIsloading(true);
    let hasError = false;

    const validatedFilters = filters.map((filter) => {
      const newErrors = {
        field: !filter.field?.trim(),
        comparison: !filter.comparison?.trim(),
        value: !filter.value?.trim()
      };

      if (newErrors?.field || newErrors?.comparison || newErrors?.value) {
        hasError = true;
      }

      return {
        ...filter,
        errors: newErrors
      };
    });

    if (hasError) {
      setFilters(validatedFilters);
      const firstErrorIndex = validatedFilters.findIndex(
        (filter) => filter.errors.field || filter.errors.comparison || filter.errors.value
      );

      setIsloading(false);
      return;
    }

    try {
      const formData = {
        ...data,
        name: data.listName || '',
        tags: data.tags || '',
        channelSettings: data.channelSettings || '',
        purposeSettings: data.purposeSettings || '',
        filters: validatedFilters.map(({ errors, ...rest }) => rest)
      };

      const response = await postApi(urls.mail.create, formData);
      toast.success('Mail added successfully');
      navigate('/mail');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error Adding Mail');
    } finally {
      setIsloading(false);
    }
  };
  const onError = () => {
    const validatedFilters = filters.map((filter) => {
      const newErrors = {
        field: !filter.field?.trim(),
        comparison: !filter.comparison?.trim(),
        value: !filter.value?.trim()
      };

      return {
        ...filter,
        errors: newErrors
      };
    });

    setFilters(validatedFilters);
  };

  const getLabel = (field) => field?.replace('personalInfo.', '')?.replace('contactInfo.', '')?.replace('emergencyContact.', '');
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center" gap={1}>
          <IconButton onClick={() => navigate(-1)} size="small">
            <ArrowBackIcon />
          </IconButton>
          Create list of Service User
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

      <Card sx={{ p: 3, mt: 3 }} component="form" onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="listName"
              control={control}
              rules={{ required: 'This field is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Mailing List Name"
                  size="small"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="tags"
              control={control}
              // rules={{ required: 'This field is required' }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  multiple
                  options={tagOptions || []}
                  getOptionLabel={(option) => option?.name || ''}
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  value={tagOptions.filter((opt) => field.value?.includes(opt._id)) || []}
                  onChange={(_, selectedOptions) => field.onChange(selectedOptions.map((opt) => opt._id))}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Include People with these Tags"
                      size="small"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="channelSettings"
              control={control}
              rules={{ required: 'Please select at least one channel' }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  multiple
                  options={channelOptions}
                  value={field.value || []}
                  onChange={(_, value) => field.onChange(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="List People with any of these channel settings"
                      size="small"
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="purposeSettings"
              control={control}
              rules={{ required: 'Please select at least one purpose' }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  multiple
                  options={contactPurposeEntry}
                  getOptionLabel={(option) => option?.name}
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  value={contactPurposeEntry.filter((opt) => field.value?.includes(opt._id)) || []}
                  onChange={(_, selectedOptions) => field.onChange(selectedOptions.map((opt) => opt._id))}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="AND any of these purpose settings"
                      size="small"
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="includeArchived"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<AntSwitch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                  label="List Should Include Archived People?"
                  labelPlacement="start"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            Include People where :
            <Button variant="contained" onClick={addFilter} sx={{ fontSize: '10px', borderRadius: '20px', background: '#009fc7', ml: 2 }}>
              Add Include Filter
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              {filters.map((filter, index) => (
                <Grid container spacing={1} alignItems="center" key={filter.id} sx={{ mb: 1 }}>
                  {index !== 0 && (
                    <Grid item xs={2}>
                      <Select
                        fullWidth
                        size="small"
                        value={filter.operator_to_next}
                        onChange={(e) => handleFilterChange(filter.id, 'operator_to_next', e.target.value)}
                      >
                        <MenuItem value="AND">AND</MenuItem>
                        <MenuItem value="OR">OR</MenuItem>
                      </Select>
                    </Grid>
                  )}

                  <Grid item xs={index !== 0 ? 3 : 5}>
                    {' '}
                    <Autocomplete
                      size="small"
                      options={fieldOptions}
                      value={filter.field || null}
                      onChange={(event, newValue) => handleFilterChange(filter.id, 'field', newValue)}
                      disableClearable
                      getOptionLabel={(option) => getLabel(option)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Field"
                          error={filter.errors?.field}
                          helperText={filter.errors?.field ? 'Field is required' : ''}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Select
                      fullWidth
                      size="small"
                      value={filter.comparison}
                      onChange={(e) => handleFilterChange(filter.id, 'comparison', e.target.value)}
                      displayEmpty
                      error={filter.errors?.value}
                    >
                      <MenuItem value="" disabled>
                        Select Comparison
                      </MenuItem>
                      <MenuItem value="equals">Equals</MenuItem>
                      <MenuItem value="not_equals">Not Equals</MenuItem>
                      <MenuItem value="contains">Contains</MenuItem>
                      <MenuItem value="not_contains">Not Contains</MenuItem>
                      <MenuItem value="greater_than">Greater Than</MenuItem>
                      <MenuItem value="less_than">Less Than</MenuItem>
                    </Select>
                    {filter.errors?.comparison && (
                      <Typography variant="caption" color="error">
                        Comparison is required
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={2}>
                    <TextField
                      fullWidth
                      label="Value"
                      size="small"
                      value={filter.value}
                      onChange={(e) => handleFilterChange(filter.id, 'value', e.target.value)}
                      error={filter.errors?.value}
                      helperText={filter.errors?.value ? 'Value is required' : ''}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Box display="flex" alignItems="center">
                      <IconButton size="small" onClick={() => removeFilter(filter.id)}>
                        <Delete />
                      </IconButton>
                      <IconButton size="small">
                        <ArrowUpward fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <ArrowDownward fontSize="small" />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </Paper>
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
      </Card>
    </>
  );
};

export default MailingListForm;
