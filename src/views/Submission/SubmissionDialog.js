import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, Stack, TextField, DialogActions } from '@mui/material';

const Data = [
  { title: 'Name', content: 'Answerr' },
  { title: 'Education', content: 'Answerr' },
  { title: 'School Name', content: 'Answerr' },
  { title: 'Contact', content: 'Answerr' },
  { title: 'Email', content: 'Answerr' },
  { title: 'Contact', content: 'Answerr' },
  { title: 'Contact', content: 'Answerr' },
  { title: 'Contact', content: 'Answerr' },
  { title: 'Name', content: 'Answerr' },
  { title: 'Name', content: 'Answerr' },
  { title: 'Name', content: 'Answerr' },
  { title: 'Name', content: 'Answerr' },
  { title: 'Name', content: 'Answerr' },

]

const SubmissionDialog = ({ open, onClose, onAccept, onDecline }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      PaperProps={{
        sx: {
          width: '48vw',
          maxWidth: 'none',
          borderRadius: 4,
          height: '88vh',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center' }}>
        <Typography
          fontSize={18}
          fontWeight={500}
          color='#053146'
          textAlign="center"
          sx={{
            display: 'inline-block',
            borderBottom: '3px solid #053146',
            pb: 1
          }}
        >
          Volunteer Sign up form
        </Typography>
      </DialogTitle>
      <DialogContent>
        {Data.map((item, index) => (
          <Box
            key={index}
            sx={{
              border: '0.5px solid #E0E0E0',
              borderRadius: 2,
              backgroundColor: '#FFFFFF',
              width: '100%',
              maxHeight: '90px',
              padding: '16px',
              marginBottom: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography fontSize={12} fontWeight={500} mb={0.5}>
              {item?.title}
            </Typography>
            <Typography fontSize={12} fontWeight={400} color="#4B5563" mb={1}>
              {item.content ?? 'Answer not available'}
            </Typography>
            <Box
              sx={{
                borderBottom: '1px dotted #ccc',
                width: '40%',
              }}
            />
          </Box>
        ))}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: '#E44E4E',
            px: 4,
            '&:hover': {
              backgroundColor: '#E44E4E',
            },
            maxWidth: '107px'
          }}
        >
          DECLINE
        </Button>
        <Button
          variant="contained"
          onClick={onAccept}
          sx={{
            backgroundColor: '#009FC7',
            px: 4,
            '&:hover': {
              backgroundColor: '#009FC7',
            },
            maxWidth: '107px'
          }}
        >
          ACCEPT
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubmissionDialog;
