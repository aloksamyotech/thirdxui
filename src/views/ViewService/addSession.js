import React, { useState } from 'react';
import { Grid, TextField, MenuItem, IconButton, Card, Typography, Stack, Box, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AddSession = ({ onCancel }) => {
  const [caseData, setCaseData] = useState({
    location: '',
    startTime: null,
    endTime: null,
    sessionLead: '',
    date: null,
    tag: '',
    notes: '',
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
    <Grid sx={{ position: 'relative', backgroundColor: '#eef2f6'}}>
      <Typography variant="h4">Create Session</Typography>
      <IconButton onClick={onCancel} sx={{ position: 'absolute', top: 1, right: 10, fontSize: 32 }}>
        <CancelIcon sx={{ fontSize: 32, color: 'grey' }} />
      </IconButton>

      <Card
        sx={{
          padding: 2,
          marginTop: 2,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
              <DatePicker
                label="Select Date"
                value={caseData.date}
                onChange={(newValue) => setCaseData({ ...caseData, date: newValue })}
                slotProps={{
                  textField: {
                    fullWidth: true
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField select fullWidth label="Select Location" name="location" value={caseData.location} onChange={handleChange}>
                <MenuItem value="Location A">Location A</MenuItem>
                <MenuItem value="Location B">Location B</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={3}>
              <TimePicker
                label="Start Time"
                value={caseData.startTime}
                onChange={(newValue) => setCaseData({ ...caseData, startTime: newValue })}
                slotProps={{
                  textField: {
                    fullWidth: true
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TimePicker
                label="End Time"
                value={caseData.endTime}
                onChange={(newValue) => setCaseData({ ...caseData, endTime: newValue })}
                slotProps={{
                  textField: {
                    fullWidth: true
                  }
                }}
              />
            </Grid>


            <Grid item xs={12} sm={3}>
              <TextField select fullWidth label="Session Lead" name="sessionLead" value={caseData.sessionLead} onChange={handleChange}>
                <MenuItem value="Lead 1">Lead 1</MenuItem>
                <MenuItem value="Lead 2">Lead 2</MenuItem>
              </TextField>
            </Grid>

            
         

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Tag" name="tag" value={caseData.tag} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={6}> 
              <TextField fullWidth  label="Notes" name="notes" value={caseData.notes} onChange={handleChange} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Attachments</Typography>
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
          </Grid>
        </LocalizationProvider>

        <Grid container spacing={2} sx={{ justifyContent: 'flex-end' }}>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="error" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default AddSession;
