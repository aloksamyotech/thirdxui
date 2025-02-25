import React, { useState } from 'react';
import { Grid, TextField, MenuItem, Button, IconButton, Card, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AddCaseForm = ({ onCancel }) => {
  const [caseData, setCaseData] = useState({
    caseId: '',
    serviceUser: '',
    service: '',
    owner: '',
    status: '',
    startDate: null,
    endDate: null,
    caseTag: '',
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
      <Typography variant="h4">Add New Case</Typography>
      <IconButton onClick={onCancel} sx={{ position: 'absolute', top: 10, right: 10, fontSize: 32 }}>
        <CancelIcon sx={{ fontSize: 32, color: 'grey' }} />
      </IconButton>

     <Card sx={{ padding: 2, marginTop: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Case ID" name="caseId" value={caseData.caseId} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField select fullWidth label="Service User" name="serviceUser" value={caseData.serviceUser} onChange={handleChange}>
            <MenuItem value="User1">User 1</MenuItem>
            <MenuItem value="User2">User 2</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField select fullWidth label="Service" name="service" value={caseData.service} onChange={handleChange}>
            <MenuItem value="Service A">Service A</MenuItem>
            <MenuItem value="Service B">Service B</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField select fullWidth label="Owner" name="owner" value={caseData.owner} onChange={handleChange}>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField select fullWidth label="Status" name="status" value={caseData.status} onChange={handleChange}>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Case Tag" name="caseTag" value={caseData.caseTag} onChange={handleChange} />
        </Grid>

        <Grid item xs={12} sm={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={caseData.startDate}
              onChange={(newValue) => setCaseData({ ...caseData, startDate: newValue })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
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
      </Card>

      <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt:1 }}>
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
  );
};

export default AddCaseForm;
