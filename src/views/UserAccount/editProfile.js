import { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  IconButton,
  MenuItem,
  Stack
} from '@mui/material';
import ProfileLogo from 'assets/images/profile.png';

const EditProfileModal = ({ open, onClose, userData }) => {
  const [formData, setFormData] = useState(userData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          width: 800,
          maxHeight: 500, 
          overflowY: 'auto'
        }}
      >
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar src={ProfileLogo} sx={{ width: 50, height: 50 }} />
          <Stack direction="row" spacing={1}>
            <Button variant="contained" component="label" color="secondary">
              UPLOAD A NEW PHOTO
              <input hidden accept="image/*" type="file" />
            </Button>
            <Button variant="outlined" color="error">
              RESET
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={2}>
          {[
            { label: 'First Name', name: 'firstName' },
            { label: 'Last Name', name: 'lastName' },
            { label: 'Phone Number', name: 'phone' },
            { label: 'Address', name: 'address' },
            { label: 'Email', name: 'email' },
            { label: 'Organization', name: 'organization' },
            { label: 'State', name: 'state' },
            { label: 'Zip Code', name: 'zip' }
          ].map((field) => (
            <Grid item xs={12} sm={6} key={field.name}>
              <TextField
                fullWidth
                label={field.label}
                size='small'
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
              />
            </Grid>
          ))}

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Country"
              name="country"
              size='small'
              value={formData.country}
              onChange={handleChange}
            >
              {['USA', 'India', 'Canada', 'Germany', 'France', 'UK', 'Australia'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Language"
              name="language"
              size='small'
              value={formData.language}
              onChange={handleChange}
            >
              {['English', 'Hindi', 'French', 'Spanish', 'German'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              size='small'
              value={formData.status}
              onChange={handleChange}
            >
              {['Active', 'Inactive'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Currency"
              name="currency"
              size='small'
              value={formData.currency}
              onChange={handleChange}
            >
              {['USD', 'INR', 'EUR', 'GBP', 'AUD', 'CAD'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
          <Button variant="contained" color="secondary" onClick={onClose}>
            SAVE CHNAGES
          </Button>
          <Button onClick={onClose} variant="outlined" color="error">
            CANCEL
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProfileModal;
