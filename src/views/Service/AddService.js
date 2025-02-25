import React, { useState } from 'react';
import { Grid, TextField, MenuItem, Button, IconButton, Card, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AddCaseForm = ({ onCancel }) => {
  const [caseData, setCaseData] = useState({
    code: '',
    name: '',
    service: '',
    startDate: null,
    endDate: null,
    description: '',
    file: null
  });

  const handleChange = (e) => {
    setCaseData({ ...caseData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCaseData({ ...caseData, file: e.target.files[0] });
  };

  const handleSubmit = () => {
    console.log('Submitted Data:', caseData);
    onCancel();
  };

  return (
    <Card sx={{ padding: 3, position: 'relative', backgroundColor: '#eef2f6' }}>
      <Typography variant="h4">Add Services</Typography>
      <IconButton onClick={onCancel} sx={{ position: 'absolute', top: 10, right: 10, fontSize: 32 }}>
        <CancelIcon sx={{ fontSize: 32, color: 'grey' }} />
      </IconButton>

      <Card sx={{ padding: 2, marginTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Service Name" name="name" value={caseData.name} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Service Code" name="code" value={caseData.code} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Service Description" name="description" value={caseData.description} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField select fullWidth label="Service Type" name="service" value={caseData.service} onChange={handleChange}>
              <MenuItem value="Service A">Service A</MenuItem>
              <MenuItem value="Service B">Service B</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From Date"
                value={caseData.startDate}
                onChange={(newValue) => setCaseData({ ...caseData, startDate: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="To Date"
                value={caseData.endDate}
                onChange={(newValue) => setCaseData({ ...caseData, endDate: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Attachments
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" component="label">
              Upload File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ justifyContent: 'flex-end' }}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Card>
  );
};

export default AddCaseForm;
