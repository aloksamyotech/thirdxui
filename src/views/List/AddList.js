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
  Checkbox,
  FormControl,
  InputLabel,
  FormHelperText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Delete, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigate } from 'react-router-dom';
import AntSwitch from 'components/AntSwitch.js';
import { useForm, Controller } from 'react-hook-form';
import { postApi, getApi } from 'common/apiClient';
import toast from 'react-hot-toast';
import { urls } from 'common/urls';
import { useEffect } from 'react';
import { Autocomplete } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { caseFieldOptions, channelOptions, fieldOptions, formFieldOptions, mailingListFieldOptions, serviceFieldOptions, transactionFieldOptions } from 'common/constants';

const AddListForm = () => {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const [tagOptions, setTagOptions] = useState([]);
  const [contactPurposeEntry, setContactPurposeEntry] = useState([]);
  const [filterFieldOptions, setFilterFieldOptions] = useState([]);
  const setFieldOption = () => {
    if (state?.type == 'service_user' || state?.type == 'donor' || state?.type == 'volunteer') {
      setFilterFieldOptions(fieldOptions);
    } else if (state?.type == 'donations') {
      setFilterFieldOptions(transactionFieldOptions);
    } else if (state?.type == 'Mailing List') {
      setFilterFieldOptions(mailingListFieldOptions);
    } else if (state?.type == 'Forms') {
      setFilterFieldOptions(formFieldOptions);
    } else if (state?.type == 'case') {
      setFilterFieldOptions(caseFieldOptions);
    } else if (state?.type == 'services') {
      setFilterFieldOptions(serviceFieldOptions);
    } else {
      setFilterFieldOptions([]);
    }
  };
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    mode: 'all',
    defaultValues: {
      listName: '',
      tags: [],
      channelSettings: [],
      purposeSettings: [],
      includeArchived: false
    }
  });

  const [filters, setFilters] = useState([
    {
      id: 1,
      logic: 'AND',
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
    setFilters([...filters, { id: Date.now(), logic: 'AND', field: '', comparison: '', value: '' }]);
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
    setFieldOption();
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
        tags: data.tags.map((tag) => tag._id) || '',
        channelSettings: data.channelSettings || '',
        purposeSettings: data.purposeSettings || '',
        listType: state?.type || '',
        filters: validatedFilters.map(({ errors, ...rest }) => rest)
      };
      const response = await postApi(urls.list.create, formData);
      toast.success('List added successfully');
      navigate('/list');
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

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center" gap={1}>
          <IconButton onClick={() => navigate(-1)} size="small">
            <ArrowBackIcon />
          </IconButton>
          {`Create list of ${state?.type}`}
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
                  label="List Name"
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
              rules={{ required: 'This field is required' }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  multiple
                  options={tagOptions || []}
                  getOptionLabel={(option) => option?.name || ''}
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  onChange={(_, value) => field.onChange(value)}
                  value={field.value || []}
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
              render={({ field }) => (
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  disablePortal={true}
                  options={channelOptions}
                  value={field.value || []}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(params) => (
                    <TextField {...params} label="List User with any of these channel settings" placeholder="Search" size="small" />
                  )}
                  renderOption={(props, option, { selected }) => (
                    <li {...props} style={{ padding: 0, marginBottom: 8 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          cursor: 'pointer',
                          gap: 1
                        }}
                      >
                        <Checkbox
                          checked={selected}
                          sx={{
                            color: selected ? '#009fc7' : 'rgba(0,0,0,0.26)',
                            '&.Mui-checked': {
                              color: '#009fc7'
                            }
                          }}
                        />
                        <Box
                          sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: selected ? '#67ae5a' : '#c95a51',
                            color: '#fff',
                            borderRadius: '20px',
                            px: 2,
                            py: '6px',
                            fontWeight: 500,
                            fontSize: 14,
                            userSelect: 'none'
                          }}
                        >
                          <Typography>{option}</Typography>
                          <Box
                            sx={{
                              ml: 1,
                              fontWeight: 'bold',
                              fontSize: 18,
                              userSelect: 'none',
                              lineHeight: 1
                            }}
                          >
                            {selected ? '✓' : '×'}
                          </Box>
                        </Box>
                      </Box>
                    </li>
                  )}
                  renderTags={(selected) => selected.join(', ')}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="purposeSettings"
              control={control}
              rules={{ required: 'This field is required' }}
              render={({ field, fieldState }) => {
                const selectedValues = contactPurposeEntry.filter((item) => field.value?.includes(item._id));

                return (
                  <Autocomplete
                    multiple
                    disablePortal
                    disableCloseOnSelect
                    options={contactPurposeEntry}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    value={selectedValues}
                    onChange={(_, selectedOptions) => field.onChange(selectedOptions.map((opt) => opt._id))}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="AND any of these purpose settings"
                        placeholder="Search"
                        size="small"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                    renderOption={(props, option, { selected }) => (
                      <li {...props} style={{ padding: 0, marginBottom: 8 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            cursor: 'pointer',
                            gap: 1
                          }}
                        >
                          <Checkbox
                            checked={selected}
                            sx={{
                              color: selected ? '#009fc7' : 'rgba(0,0,0,0.26)',
                              '&.Mui-checked': {
                                color: '#009fc7'
                              }
                            }}
                          />
                          <Box
                            sx={{
                              flexGrow: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              backgroundColor: selected ? '#67ae5a' : '#c95a51',
                              color: '#fff',
                              borderRadius: '20px',
                              px: 2,
                              py: '6px',
                              fontWeight: 500,
                              fontSize: 14,
                              userSelect: 'none'
                            }}
                          >
                            <Typography>{option.name}</Typography>
                            <Box
                              sx={{
                                ml: 1,
                                fontWeight: 'bold',
                                fontSize: 18,
                                userSelect: 'none',
                                lineHeight: 1
                              }}
                            >
                              {selected ? '✓' : '×'}
                            </Box>
                          </Box>
                        </Box>
                      </li>
                    )}
                    renderTags={(selected) => selected.map((opt) => opt.name).join(', ')}
                  />
                );
              }}
            />
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <Controller
              name="purposeSettings"
              control={control}
              render={({ field }) => <TextField {...field} fullWidth label="AND any of these purpose settings" size="small" />}
            />
          </Grid> */}
          <Grid item xs={12}>
            Include People where :
            <Button variant="contained" onClick={addFilter} sx={{ fontSize: '10px', borderRadius: '20px', background: '#009fc7', ml: 2 }}>
              Add Include Filter
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              {filters.map((filter) => (
                <Grid container spacing={1} alignItems="center" key={filter.id} sx={{ mb: 1 }}>
                  <Grid item xs={2}>
                    <Select
                      fullWidth
                      size="small"
                      value={filter.logic}
                      onChange={(e) => handleFilterChange(filter.id, 'logic', e.target.value)}
                    >
                      <MenuItem value="AND">AND</MenuItem>
                      <MenuItem value="OR">OR</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth size="small" error={filter.errors?.field}>
                      <InputLabel>Field</InputLabel>
                      <Select value={filter.field} onChange={(e) => handleFilterChange(filter.id, 'field', e.target.value)} label="Field">
                        {filterFieldOptions?.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                      {filter.errors?.field && <FormHelperText>Field is required</FormHelperText>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <Select
                      fullWidth
                      size="small"
                      value={filter.comparison}
                      onChange={(e) => handleFilterChange(filter.id, 'comparison', e.target.value)}
                      displayEmpty
                      error={filter.errors?.value}
                      helperText={filter.errors?.value ? 'Value is required' : ''}
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

export default AddListForm;
