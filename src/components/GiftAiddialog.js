import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  Divider
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { postApi } from 'common/apiClient';
import { urls } from 'common/urls';
const GiftAidDialog = ({ open, handleClose, fetchTimeLineData, onClose, userId }) => {
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
      fetchTimeLineData(), onClose(), handleClose();
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
        <DialogTitle sx={{ fontSize: '16px', fontWeight: 500 }}>Gift Aid Declarations</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Title"
                fullWidth
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                size="small"
                InputLabelProps={{
                  sx: { fontSize: '12px' }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="First Name"
                fullWidth
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                size="small"
                InputLabelProps={{
                  sx: { fontSize: '12px' }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Last Name"
                fullWidth
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                size="small"
                InputLabelProps={{
                  sx: { fontSize: '12px' }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Campaign"
                fullWidth
                value={formData.campaign}
                onChange={(e) => handleChange('campaign', e.target.value)}
                size="small"
                InputLabelProps={{
                  sx: { fontSize: '12px' }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DatePicker
                label="Declaration Date"
                value={formData.declarationDate}
                onChange={(newValue) => handleChange('declarationDate', newValue)}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    size="small"
                    {...params}
                    sx={{
                      '& .MuiInputLabel-root': {
                        fontSize: '12px'
                      }
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Declaration Method"
                fullWidth
                value={formData.declarationMethod}
                onChange={(e) => handleChange('declarationMethod', e.target.value)}
                size="small"
                InputLabelProps={{
                  sx: { fontSize: '12px' }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Declaration Start Date"
                value={formData.declarationStartDate}
                onChange={(newValue) => handleChange('declarationStartDate', newValue)}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    size="small"
                    {...params}
                    sx={{
                      '& .MuiInputLabel-root': {
                        fontSize: '12px'
                      }
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Declaration End Date"
                value={formData.declarationEndDate}
                onChange={(newValue) => handleChange('declarationEndDate', newValue)}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    size="small"
                    {...params}
                    sx={{
                      '& .MuiInputLabel-root': {
                        fontSize: '12px'
                      }
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Confirmed On"
                value={formData.confirmedOn}
                onChange={(newValue) => handleChange('confirmedOn', newValue)}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    size="small"
                    {...params}
                    sx={{
                      '& .MuiInputLabel-root': {
                        fontSize: '12px'
                      }
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Cancelled On"
                value={formData.cancelledOn}
                onChange={(newValue) => handleChange('cancelledOn', newValue)}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    size="small"
                    {...params}
                    sx={{
                      '& .MuiInputLabel-root': {
                        fontSize: '12px'
                      }
                    }}
                  />
                )}
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
                labelPlacement="start"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '14px'
                  }
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="error"
            sx={{
              width: '104px',
              height: '32px',
              borderRadius: '8px',
              borderWidth: '1px',
              fontWeight: 600,
              fontSize: '12px',
              textTransform: 'uppercase'
            }}
          >
            CANCEL
          </Button>

          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              width: '104px',
              height: '32px',
              borderRadius: '8px',
              borderWidth: '1px',
              fontWeight: 600,
              fontSize: '12px',
              textTransform: 'uppercase',
              backgroundColor: '#002b3f',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: '#001e2c'
              }
            }}
          >
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default GiftAidDialog;
