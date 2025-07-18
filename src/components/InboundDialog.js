import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { postApi } from 'common/apiClient';
import { urls } from 'common/urls';

const EmailDialog = ({ open, handleClose, userId, type, dialogTitle, dateLabel }) => {
  const [dateReceived, setDateReceived] = useState(null);

  const handleSubmit = async () => {
    const formData = {
      dateReceived: dateReceived ? dateReceived.format('YYYY-MM-DD') : null
    };
    try {
      let endpoint = '';

      if (type === 'inbound') {
        endpoint = urls.timeline.emailinboundCreate.replace(':id', userId);
      } else if (type === 'outbound') {
        endpoint = urls.timeline.emailOutboundCreate.replace(':id', userId);
      } else if (type === 'phoneCallInbound') {
        endpoint = urls.timeline.phoneinboundCreate.replace(':id', userId);
      } else if (type === 'phoneCallOutbound') {
        endpoint = urls.timeline.phoneoutboundCreate.replace(':id', userId);
      } else if (type === 'letterReceived') {
        endpoint = urls.timeline.letterRecivedCreate.replace(':id', userId);
      } else if (type === 'letterSent') {
        endpoint = urls.timeline.lettersendCreate.replace(':id', userId);
      } else {
        console.error('Unknown type:', type);
        return;
      }

      const response = await postApi(endpoint, formData);
      handleClose();
    } catch (error) {
      console.error(`Error creating ${type}:`, error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: '320px',
          borderRadius: 2
        }
      }}
    >
      <DialogTitle>
        <Typography fontWeight="bold" fontSize="18px">
          {dialogTitle}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={dateLabel}
            value={dateReceived}
            onChange={(newValue) => setDateReceived(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth variant="outlined" margin="dense" />}
          />
        </LocalizationProvider>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="error" sx={{ fontWeight: 'bold' }}>
          CANCEL
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ fontWeight: 'bold', backgroundColor: '#002b3f' }}>
          SAVE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmailDialog;
