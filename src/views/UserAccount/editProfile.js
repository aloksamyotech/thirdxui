import { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Grid, Avatar, IconButton, MenuItem, Stack } from '@mui/material';
import ProfileLogo from 'assets/images/profile.png';
import { urls } from 'common/urls';
import { updateApi } from 'common/apiClient';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const EditProfileModal = ({ open, onClose, userData, getUserInfo }) => {
  const [formData, setFormData] = useState(userData);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const BASE_URL = process.env.REACT_APP_IMAGE_URL;
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      const file = files[0];
      setFormData({ ...formData, file });

      if (file) {
        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      email: '',
      organization: '',
      state: '',
      zipCode: '',
      country: '',
      language: '',
      status: '',
      currency: '',
      file: null
    });
    setImagePreview(null);
  };

  const onSubmit = async () => {
    const url = urls?.login?.updateUserById;
    const form = new FormData();
    for (const key in formData) {
      if (formData[key] !== undefined && formData[key] !== null) {
        form.append(key, formData[key]);
      }
    }
    setLoading(true);
    await updateApi(url, form);
    toast.success('Profile Updated Successfully');
    getUserInfo();
    onClose();
    setLoading(false);
  };

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

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
          <Avatar
            src={imagePreview ? imagePreview : formData?.file ? `${BASE_URL}${formData?.file}` : ProfileLogo}
            sx={{ width: 50, height: 50 }}
          />

          <Stack direction="row" spacing={1}>
            <Button variant="contained" component="label" sx={{ backgroundColor: '#053146' }}>
              UPLOAD A NEW PHOTO
              <input
                hidden
                accept="image/*"
                type="file"
                label="file"
                name="file"
                // value={formData?.file}
                onChange={handleChange}
              />
            </Button>
            <Button variant="outlined" color="error" onClick={handleReset}>
              RESET
            </Button>
          </Stack>
        </Box>

        <Grid container spacing={2}>
          {[
            { label: 'First Name', name: 'firstName' },
            { label: 'Last Name', name: 'lastName' },
            { label: 'Phone Number', name: 'phoneNumber' },
            { label: 'Address', name: 'address' },
            { label: 'Email', name: 'email' },
            { label: 'Organization', name: 'organization' },
            { label: 'State', name: 'state' },
            { label: 'Zip Code', name: 'zipCode' }
          ].map((field) => (
            <Grid item xs={12} sm={6} key={field?.name}>
              <TextField
                fullWidth
                label={field?.label}
                size="small"
                name={field?.name}
                value={formData[field?.name]}
                onChange={handleChange}
              />
            </Grid>
          ))}

          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Country" name="country" size="small" value={formData.country} onChange={handleChange}>
              {['USA', 'India', 'Canada', 'Germany', 'France', 'UK', 'Australia'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Language" name="language" size="small" value={formData.language} onChange={handleChange}>
              {['English', 'Hindi', 'French', 'Spanish', 'German'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Status" name="status" size="small" value={formData.status} onChange={handleChange}>
              {['Active', 'Inactive'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Currency" name="currency" size="small" value={formData.currency} onChange={handleChange}>
              {['USD', 'INR', 'EUR', 'GBP', 'AUD', 'CAD'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
          <Button variant="contained" sx={{ backgroundColor: '#053146' }} onClick={onSubmit} disabled={loading}>
            SAVE CHANGES
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
