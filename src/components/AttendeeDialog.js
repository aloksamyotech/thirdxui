import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  TextField
} from '@mui/material';
import { getApi, postApi } from 'common/apiClient';
import { urls } from 'common/urls';

const RegisterAttendance = ({ open, handleClose, userId }) => {
  const [services, setServices] = useState([]);
  const [searchQueryService, setSearchQueryService] = useState('');
  const [sessions, setSessions] = useState([]);
  const [formData, setFormData] = useState({
    serviceName: '',
    sessionName: ''
  });

  useEffect(() => {
    if (open) {
      fetchServices();
    }
  }, [open, searchQueryService]);
  const fetchServices = async () => {
    const queryParams = new URLSearchParams();
    if (searchQueryService) {
      queryParams.append('search', searchQueryService);
    }
    const response = await getApi(`${urls.service.fetchWithPagination}?${queryParams.toString()}`);
    setServices(response?.data?.data || []);
  };

  const fetchSessionOptions = async (serviceId) => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('serviceId', serviceId);

      const res = await getApi(`${urls.session.fetchWithPagination}?${queryParams.toString()}`);
      setSessions(res?.data?.data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      const body = {
        serviceId: formData.serviceId,
        sessionId: formData.sessionId
      };

      const response = await postApi(urls.timeline.attendeesCreate.replace(':id', userId), body);
      handleClose();
    } catch (error) {
      console.error('Error submitting attendance:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 2 } }}>
      <DialogTitle>Register Attendance</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <Autocomplete
                options={services}
                value={services.find((s) => s._id === formData.serviceId) || null}
                onChange={(_, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    serviceId: newValue ? newValue._id : '',
                    sessionName: ''
                  }));

                  if (newValue?._id) {
                    fetchSessionOptions(newValue._id);
                  } else {
                    setSessions([]);
                  }
                }}
                onInputChange={(_, newInputValue) => {
                  setSearchQueryService(newInputValue);
                }}
                getOptionLabel={(option) => option.name || ''}
                isOptionEqualToValue={(option, value) => option._id === value._id}
                renderInput={(params) => <TextField {...params} label="Service Name" variant="outlined" />}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <Autocomplete
                options={sessions}
                value={sessions.find((s) => s._id === formData.sessionId) || null}
                onChange={(_, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    sessionId: newValue ? newValue._id : '',
                    userId: newValue?.serviceuser?._id || '',
                    sessionUserName: newValue
                      ? `${newValue.serviceuser?.personalInfo?.firstName || '-'} ${newValue.serviceuser?.personalInfo?.lastName || '-'}`
                      : ''
                  }));
                }}
                getOptionLabel={(option) =>
                  option?.serviceuser?.personalInfo
                    ? `${option.serviceuser.personalInfo.firstName} ${option.serviceuser.personalInfo.lastName}`
                    : ''
                }
                isOptionEqualToValue={(option, value) => option._id === value._id}
                renderInput={(params) => <TextField {...params} label="Service User Name" variant="outlined" />}
              />
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" color="error" onClick={handleClose}>
          CANCEL
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          SAVE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterAttendance;
