import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, InputAdornment,FormControlLabel, Button, Grid, Modal } from '@mui/material';
import AntSwitch from 'components/AntSwitch';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Link from '@mui/material/Link';

const CaseNoteDialog = ({ open, handleClose, onSubmit, title = 'Add Case Note', initialData = null }) => {
  const [formData, setFormData] = useState({
    date: '',
    notes: '',
    contactPurpose: '',
    subject: '',
    toggle: false,
    file: null
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleToggle = (e) => {
    setFormData((prev) => ({ ...prev, toggle: e.target.checked }));
  };

  const handleSubmit = () => {
    onSubmit?.(formData);
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="case-note-dialog">
      <Box sx={{ width: 600, bgcolor: 'background.paper', p: 3, mx: 'auto', mt: '10%', borderRadius: 2, boxShadow: 24 }}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={formData.date}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} fullWidth size="small" />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              size="small"
              label="Contact Purposes"
              name="contactPurpose"
              value={formData.contactPurpose}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Box mb={2} display="flex" justifyContent="space-between">
          <TextField
            placeholder="Attachments"
            variant="outlined"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachFileIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Link component="button">Upload a file</Link>
                </InputAdornment>
              )
            }}
          />
        </Box>

        <TextField
          fullWidth
          multiline
          size="small"
          rows={3}
          label="Case Notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          multiline
          rows={1}
          size="small"
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={<AntSwitch checked={formData.toggle} onChange={handleToggle} />}
          label="Restrict Access?"
          labelPlacement="start"
          sx={{ mb: 2 }}
        />

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" sx={{background:'#053146'}} onClick={handleSubmit}>
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

export default CaseNoteDialog;
