import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, InputAdornment, FormControlLabel, Button, Grid, Modal, MenuItem, Link } from '@mui/material';
import AntSwitch from 'components/AntSwitch';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { getApi, postApi, updateApi } from 'common/apiClient';
import { urls } from 'common/urls';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { decodedToken } from 'utils/adminData';

const CaseNoteDialog = ({ open, fetchdata, handleClose, onSubmit, title = 'Add Case Note', initialData = null, caseid }) => {
  const navigate = useNavigate();

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
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [caseNoteData, setCaseNoteData] = useState();

  const fileInputRef = useRef();

  useEffect(() => {
    const fetchCaseNoteData = async () => {
      try {
        const res = await getApi(urls.casenote.getById.replace(':id', caseid));
        setCaseNoteData(res?.data?.caseNoteData);
      } catch (err) {
        console.error('Error fetching case note data:', err);
      }
    };

    if (caseid) {
      fetchCaseNoteData();
    }
  }, [caseid]);

  useEffect(() => {
    if (caseNoteData) {
      setFormData((prev) => ({
        ...prev,
        date: caseNoteData.date ? dayjs(caseNoteData.date) : dayjs(),
        time: caseNoteData.time || '',
        notes: caseNoteData.notes || caseNoteData.note || '',
        subject: caseNoteData.subject || '',
        contactPurpose: caseNoteData.configurationId?._id || '',
        toggle: caseNoteData.isActive ?? false,
        caseId: caseNoteData.caseId?._id || caseNoteData.caseId || caseid?._id || caseid || '',
        file: null // don't prefill file
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        date: dayjs(),
        time: '',
        notes: '',
        subject: '',
        contactPurpose: '',
        toggle: false,
        file: null,
        caseId: caseid
      }));
    }
  }, [caseNoteData, caseid]);

  useEffect(() => {
    const fetchContactPurposes = async () => {
      try {
        const res = await getApi(urls.configuration.fetch);
        const options = res?.data?.allConfiguration?.filter((item) => item.configurationType === 'Contact Purpose');
        setContactPurposeEntry(options || []);
      } catch (err) {
        console.error('Error fetching contact purposes:', err);
      }
    };
    fetchContactPurposes();
  }, []);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
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
    const newErrors = {};
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.notes?.trim()) newErrors.notes = 'Case Notes are required';
    if (!formData.subject?.trim()) newErrors.subject = 'Subject is required';
    if (!formData.contactPurpose) newErrors.contactPurpose = 'Contact Purpose is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    try {
      const userId = decodedToken?.id;
      const form = new FormData();

      form.append('date', formData.date?.toISOString?.() || '');
      form.append('time', formData.time);
      form.append('note', formData.notes);
      form.append('subject', formData.subject);
      form.append('isActive', formData.toggle);
      form.append('caseId', formData.caseId);
      form.append('configurationId', formData.contactPurpose);
      form.append('createdBy', userId);

      if (formData.file) form.append('file', formData.file);

      let response;

      if (caseNoteData?._id) {
        response = await updateApi(`${urls.casenote.update}${caseNoteData._id}`, form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Case note updated successfully!');
        navigate(-1);
      } else {
        response = await postApi(urls.casenote.create, form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Case note added successfully!');
      }

      onSubmit(response.data);
      fetchdata?.();

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

      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (err) {
      console.error('Error submitting case note:', err);
      toast.error('Failed to save case note.');
    } finally {
      setIsLoading(false);
    }
  };

  const existingFileName = caseNoteData?.file ? caseNoteData.file.split('\\').pop() : '';
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="case-note-dialog">
      <Box sx={{  bgcolor: 'background.paper', p: 3, mx: 'auto', mt: '10%', borderRadius: 2, boxShadow: 24, width:"60%"}}>
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
              value={formData.time}
              name="time"
              onChange={handleChange}
              error={Boolean(errors.time)}
              helperText={errors.time}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              fullWidth
              size="small"
              label="Contact Type"
              name="contactPurpose"
              value={formData.contactPurpose}
              onChange={handleChange}
              error={Boolean(errors.contactPurpose)}
              helperText={errors.contactPurpose}
            >
              {contactPurposeEntry.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* <Box mb={2} display="flex" justifyContent="space-between">
          <TextField
            placeholder="Attachments"
            variant="outlined"
            size="small"
            fullWidth
            value={formData.file?.name || existingFileName || ''}
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
        </Box> */}


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
          error={Boolean(errors.subject) || formData.subject.length > 50}
          helperText={errors.subject || (formData.subject.length > 50 ? 'Max 50 characters allowed' : '')}
        />
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
          inputProps={{ maxLength: 1000 }}
          error={Boolean(errors.notes) || formData.notes.length > 1000}
          helperText={errors.notes || (formData.notes.length > 1000 ? 'Max 1000 characters allowed' : '')}
        />

        <Box mt={1} display="flex" justifyContent="space-between" alignItems="center">
          <FormControlLabel
            control={<AntSwitch checked={formData.toggle} onChange={handleToggle} />}
            label="Restrict Access?"
            labelPlacement="start"
            sx={{ '.MuiFormControlLabel-label': { mr: 1 } }}
          />
          <Box display="flex" gap={2}>
            <Button variant="outlined" color="error" onClick={handleClose} disabled={isLoading}>
              CANCEL
            </Button>
            <Button variant="contained" sx={{ background: '#053146' }} onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Saving...' : caseNoteData?._id ? 'UPDATE CASE' : 'SAVE CASE'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CaseNoteDialog;
