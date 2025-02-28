import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, MenuItem, Button, Stack } from '@mui/material';

const AddFormModal = ({ open = false, onClose = () => {} }) => {  
  const [formData, setFormData] = useState({
    formType: '',
    description: '',
    campaign: ''
  });

  const handleChange = (e) => {
    if (!e || !e.target) return; // Prevents errors if event is undefined
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    console.log('Submitted Data:', formData);
    onClose(); // Ensure onClose is called safely
  };

  return (
    <Modal open={open} onClose={onClose}>  
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}
      >
        <Typography variant="h4" gutterBottom>
          Add Form
        </Typography>
        <Stack spacing={2}>
          <TextField
            select
            label="Form Type"
            name="formType"
            value={formData.formType}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Self Referral form">Self Referral form</MenuItem>
            <MenuItem value="Community Referral form">Community Referral form</MenuItem>
            <MenuItem value="Satisfaction survey">Satisfaction survey</MenuItem>
            <MenuItem value="Volunteer sign up form">Volunteer sign up form</MenuItem>
            <MenuItem value="Workshop sign up form">Workshop sign up form</MenuItem>
          </TextField>

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />

          <TextField
            label="Campaign"
            name="campaign"
            value={formData.campaign}
            onChange={handleChange}
            fullWidth
          />
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddFormModal;
