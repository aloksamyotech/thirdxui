import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, InputAdornment, FormControlLabel, Button, Grid, Modal, MenuItem } from '@mui/material';
import AntSwitch from 'components/AntSwitch';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Link from '@mui/material/Link';
import { getApi, postApi } from 'common/apiClient.js';
import { urls } from 'common/urls';
import toast from 'react-hot-toast';

import dayjs from 'dayjs';

const CaseNoteDialog = ({ open, handleClose, onSubmit, title = 'Add Case Note', initialData = null, caseid }) => {
  const [formData, setFormData] = useState({
    date: dayjs(),
    time: '',
    notes: '',
    contactPurpose: '',
    subject: '',
    toggle: false,
    file: null,
    caseId: caseid
  });

  const [contactPurposeEntry, setContactPurposeEntry] = useState([]);
  const [errors, setErrors] = useState({ notes: '', subject: '' });

  const fileInputRef = useRef();
  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApi(urls.configuration.fetch);
        const contactPurposeOptions = response?.data?.allConfiguration?.filter((item) => item.configurationType === 'Contact Purpose');
        setContactPurposeEntry(contactPurposeOptions);
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
    }
  };

  const handleToggle = (e) => {
    setFormData((prev) => ({ ...prev, toggle: e.target.checked }));
  };

  const handleSubmit = async () => {
    try {
      const form = new FormData();

      form.append('date', formData.date?.toISOString?.() || '');
      form.append('time', formData.time);
      form.append('note', formData.notes);
      form.append('subject', formData.subject);
      form.append('isActive', formData.toggle);
      form.append('caseId', formData.caseId);
      form.append('configurationId', formData.contactPurpose);

      if (formData.file) {
        form.append('file', formData.file);
      }

      const response = await postApi(urls.casenote.create, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      onSubmit(response.data);
      toast.success('Successfully added caseNote');

      setFormData({
        date: dayjs(),
        time: '',
        notes: '',
        contactPurpose: '',
        subject: '',
        toggle: false,
        file: null,
        caseId: caseid
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      console.error('Error submitting case note:', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="case-note-dialog">
      <Box sx={{ width: 600, bgcolor: 'background.paper', p: 3, mx: 'auto', mt: '10%', borderRadius: 2, boxShadow: 24 }}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Grid container spacing={2} mt={1} mb={2}>
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={formData.date}
                onChange={(newValue) => setFormData((prev) => ({ ...prev, date: newValue }))}
                renderInput={(params) => <TextField {...params} fullWidth size="small" />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Select Time"
              type="time"
              variant="outlined"
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
              value={formData.time || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              fullWidth
              size="small"
              label="Contact Purposes"
              name="contactPurpose"
              value={formData.contactPurpose}
              onChange={handleChange}
            >
              {contactPurposeEntry.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Box mb={2} display="flex" justifyContent="space-between">
          <TextField
            placeholder="Attachments"
            variant="outlined"
            size="small"
            fullWidth
            value={formData.file?.name || ''}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <AttachFileIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Link component="button" onClick={handleUploadClick} underline="hover">
                    Upload a file
                  </Link>
                </InputAdornment>
              )
            }}
          />
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
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
          inputProps={{ maxLength: 100 }}
          error={formData.notes.length > 100}
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
          inputProps={{ maxLength: 50 }}
          error={formData.subject.length > 50}
        />

        <FormControlLabel
          control={<AntSwitch checked={formData.toggle} onChange={handleToggle} />}
          label="Restrict Access?"
          labelPlacement="start"
          sx={{ mb: 2 }}
        />

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" sx={{ background: '#053146' }} onClick={handleSubmit}>
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
