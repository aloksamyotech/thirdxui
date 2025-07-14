import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';

const SubmissionDialog = ({ open, onClose, onAccept, onDecline, id }) => {
  const [formData, setFormData] = useState({});

  const fetchUserById = async () => {
    try {
      const fromUrl = `${urls?.responses?.response}/${id}`;
      const response = await getApi(fromUrl);
      console.log(response);
      setFormData(response?.data.data || {});
    } catch (error) {
      console.error('Error fetching user by ID:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserById();
    }
  }, [id]);
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
          color="#053146"
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
        {Object.entries(formData).map(([key, value], index) => {
          const isRenderable = (val) =>
            typeof val === 'string' || typeof val === 'number' || (Array.isArray(val) && val.every((item) => typeof item === 'string'));

          const displayValue = isRenderable(value) ? (Array.isArray(value) ? value.join(', ') : value) : null;

          if (!displayValue) return null;

          return (
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
                justifyContent: 'center'
              }}
            >
              <Typography fontSize={12} fontWeight={500} mb={0.5}>
                {key}
              </Typography>
              <Typography fontSize={12} fontWeight={400} color="#4B5563" mb={1}>
                {displayValue}
              </Typography>
              <Box
                sx={{
                  borderBottom: '1px dotted #ccc',
                  width: '40%'
                }}
              />
            </Box>
          );
        })}
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
        <Button
          variant="contained"
          onClick={onDecline}
          sx={{
            backgroundColor: '#E44E4E',
            px: 4,
            '&:hover': {
              backgroundColor: '#E44E4E'
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
              backgroundColor: '#009FC7'
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
