import React, { useState } from 'react';
import { Box, Typography, TextField, FormControlLabel, Button, Grid, Modal } from '@mui/material';
import AntSwitch from 'components/AntSwitch.js';

const AddCaseNoteForm = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    date: '',
    notes: '',
    contactPurpose: '',
    subject: '',
    toggle: false,
    file: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  // Handle Toggle Switch
  const handleToggle = (e) => {
    setFormData({ ...formData, toggle: e.target.checked });
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="add-case-note-modal">
      <Box sx={{ width: 600, bgcolor: 'background.paper', p: 3, mx: 'auto', mt: '10%', borderRadius: 2, boxShadow: 24 }}>
        <Typography variant="h4" gutterBottom>
          Add Case Note
        </Typography>

        <Grid container xs={12} spacing={2} mt={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact Type"
              name="contactPurpose"
              value={formData.contactPurpose}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <TextField
          fullWidth
          multiline
          rows={1}
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField fullWidth multiline rows={2} label="Notes" name="notes" value={formData.notes} onChange={handleChange} sx={{ mb: 2 }} />

        <FormControlLabel
          control={<AntSwitch checked={formData.toggle} onChange={handleToggle} />}
          label="Restrict Access?"
          labelPlacement="start"
          sx={{ mb: 2 }}
        />

        <Grid item xs={12} sm={6}>
          <Typography
            component="label"
            htmlFor="upload-file"
            sx={{
              color: '#714dba',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            Upload File
          </Typography>
          <input id="upload-file" type="file" hidden onChange={handleFileChange} />
        </Grid>

        <Box mt={1} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="secondary">
            Save Case
          </Button>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddCaseNoteForm;
