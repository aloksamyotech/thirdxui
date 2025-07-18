// GiftAidDialog.jsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, Switch, FormControlLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { postApi } from 'common/apiClient';
import { urls } from 'common/urls';
const GiftAidDialog = ({ open, handleClose, userId }) => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    campaign: '',
    declarationDate: null,
    declarationMethod: '',
    declarationStartDate: null,
    declarationEndDate: null,
    confirmedOn: null,
    cancelledOn: null,
    confirmationRequired: true
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const handleSubmit = async () => {
    try {
      const response = await postApi(`${urls.timeline.giftaidCreate.replace(':id', userId)}`, formData);
      handleClose();
    } catch (error) {
      console.error('Error creating GiftAid:', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={false}
        PaperProps={{
          sx: {
            width: '600px',
            maxWidth: '90%',
            borderRadius: 2
          }
        }}
      >
        <DialogTitle sx={{ fontSize: '1.0rem', fontWeight: 400 }}>Gift Aid Declarations</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Title"
                fullWidth
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="First Name"
                fullWidth
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Last Name"
                fullWidth
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Campaign"
                fullWidth
                value={formData.campaign}
                onChange={(e) => handleChange('campaign', e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DatePicker
                label="Declaration Date"
                value={formData.declarationDate}
                onChange={(newValue) => handleChange('declarationDate', newValue)}
                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Declaration Method"
                fullWidth
                value={formData.declarationMethod}
                onChange={(e) => handleChange('declarationMethod', e.target.value)}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Declaration Start Date"
                value={formData.declarationStartDate}
                onChange={(newValue) => handleChange('declarationStartDate', newValue)}
                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Declaration End Date"
                value={formData.declarationEndDate}
                onChange={(newValue) => handleChange('declarationEndDate', newValue)}
                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Confirmed On"
                value={formData.confirmedOn}
                onChange={(newValue) => handleChange('confirmedOn', newValue)}
                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Cancelled On"
                value={formData.cancelledOn}
                onChange={(newValue) => handleChange('cancelledOn', newValue)}
                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
              />
            </Grid>

            <Grid item xs={12} sm={8} display="flex" alignItems="center">
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.confirmationRequired}
                    onChange={(e) => handleChange('confirmationRequired', e.target.checked)}
                  />
                }
                label="Confirmation Required"
              />
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
    </LocalizationProvider>
  );
};

export default GiftAidDialog;
