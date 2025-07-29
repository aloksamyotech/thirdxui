import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Divider } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { postApi } from 'common/apiClient';
import { urls } from 'common/urls';

const EmailDialog = ({ open, handleClose, onClose, fetchTimeLineData, userId, type, dialogTitle, dateLabel }) => {
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
      fetchTimeLineData();
      handleClose();
      onClose();
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
        <Typography fontWeight="500" fontSize="16px">
          {dialogTitle}
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={dateLabel}
            value={dateReceived}
            onChange={(newValue) => setDateReceived(newValue)}
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
        </LocalizationProvider>
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
  );
};

export default EmailDialog;
