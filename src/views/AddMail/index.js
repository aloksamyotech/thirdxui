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
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Delete, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AntSwitch from 'components/AntSwitch.js';
import { useForm, Controller } from 'react-hook-form';
import { postApi } from 'common/apiClient';
import toast from 'react-hot-toast';
import { urls } from 'common/urls';

const MailingListForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);

  const { handleSubmit, control, setValue } = useForm({
    mode: 'all',
    defaultValues: {
      listName: '',
      tags: '',
      channelSettings: '',
      purposeSettings: '',
      includeArchived: false
    }
  });

  const [filters, setFilters] = useState([{ id: 1, logic: 'AND', field: '', comparison: '', value: '' }]);

  const handleFilterChange = (id, field, value) => {
    setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
  };

  const addFilter = () => {
    setFilters([...filters, { id: Date.now(), logic: 'AND', field: '', comparison: '', value: '' }]);
  };

  const removeFilter = (id) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  const onSubmit = async (data) => {
    setIsloading(true);
    try {
      const formData = {
        ...data,
        name: data.listName || '',
        tags: data.tags || '',
        channelSettings: data.channelSettings || '',
        purposeSettings: data.purposeSettings || '',
        filters
      };
      const response = await postApi(urls.mail.create, formData);
      toast.success('Mail added successfully');
      navigate('/mail');
      setIsloading(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error Adding Mail');
      setIsloading(false);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Create list of Service User</Typography>

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
          onClick={() => navigate('/mail')}
        >
          <CloseIcon sx={{ color: 'white', fontSize: 20 }} />
        </Box>
      </Box>

      <Card sx={{ p: 3, mt: 3 }} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="listName"
              control={control}
              render={({ field }) => <TextField {...field} fullWidth label="Mailing List Name" size="small" />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => <TextField {...field} fullWidth label="Include People with these Tags" size="small" />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="channelSettings"
              control={control}
              render={({ field }) => <TextField {...field} fullWidth label="List People with any of these channel settings" size="small" />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="purposeSettings"
              control={control}
              render={({ field }) => <TextField {...field} fullWidth label="AND any of these purpose settings" size="small" />}
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
                    <TextField
                      fullWidth
                      label="Field"
                      size="small"
                      value={filter.field}
                      onChange={(e) => handleFilterChange(filter.id, 'field', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Select
                      fullWidth
                      size="small"
                      value={filter.comparison}
                      onChange={(e) => handleFilterChange(filter.id, 'comparison', e.target.value)}
                      displayEmpty
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
                  </Grid>

                  <Grid item xs={2}>
                    <TextField
                      fullWidth
                      label="Value"
                      size="small"
                      value={filter.value}
                      onChange={(e) => handleFilterChange(filter.id, 'value', e.target.value)}
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
              <Button variant="outlined" color="error" onClick={() => navigate('/mail')}>
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
