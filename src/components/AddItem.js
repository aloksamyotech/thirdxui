import React from 'react';
import { Dialog, DialogTitle, Grid, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const items = [
  { label: 'Case Note', value: 'caseNote' },
  { label: 'Register Attendance', value: 'registerAttendance' },
  { label: 'Task', value: 'task' },
  { label: 'Donation', value: 'donation' },
  { label: 'Gift and Decorations', value: 'gift' },
  { label: 'Request for a Fundraising Pack', value: 'fundraisingPack' },
  { label: 'Email Inbound', value: 'emailInbound' },
  { label: 'Email Outbound', value: 'emailOutbound' },
  { label: 'Phone Call Inbound', value: 'phoneCallInbound' },
  { label: 'Phone Call Outbound', value: 'phoneCallOutbound' },
  { label: 'Letter Received', value: 'letterReceived' },
  { label: 'Letter Sent', value: 'letterSent' }
];

const AddItemDialog = ({ open, onClose, onSelect }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: '550px' }
      }}
    >
      <DialogTitle sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Add Item</DialogTitle>

      <Box p={2}>
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid item xs={6} key={item.value}>
              <Button
                variant="outlined"
                fullWidth
                size="small"
                onClick={() => onSelect(item.value)}
                sx={{
                  justifyContent: 'space-between',
                  color: '#808191',
                  borderColor: '#808191',
                  py: 1, 
                  px: 1.5, 
                  fontSize: '0.8rem',
                  '&:hover': {
                    borderColor: '#808191'
                  }
                }}
                endIcon={<AddIcon sx={{ color: 'black', fontSize: '1rem' }} />} 
              >
                {item.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Dialog>
  );
};

export default AddItemDialog;
