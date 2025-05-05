import React, { useState } from 'react';
import { Grid, TextField, Box, Paper, Button, InputAdornment, Card, Typography } from '@mui/material';
import { MenuItem, Select, Chip, FormControl, InputLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AddCaseForm = ({ onCancel }) => {
  const navigate = useNavigate();
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
    <Card sx={{ position: 'relative', backgroundColor: '#eef2f6' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Add New Case</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/case')}>
          <ArrowBackIcon sx={{ color: 'grey' }} />
          <Typography variant="h6" sx={{ mr: 1 }}>
            Back
          </Typography>
        </Box>
      </Box>

      <Card sx={{ padding: 2, marginTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Service Name"
                  name="homePhone"
                  size="small"
                  value={caseData.homePhone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Service Code" name="phone" size="small" value={caseData.phone} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Service Type" name="email" size="small" value={caseData.email} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date Case Opened"
                    value={caseData.dob}
                    onChange={(newValue) => setCaseData({ ...caseData, dob: newValue })}
                  
                    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date Case Closed"
                    value={caseData.dob}
                    onChange={(newValue) => setCaseData({ ...caseData, dob: newValue })}
                    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="status-label">Service Status</InputLabel>
                  <Select labelId="status-label" name="email" value={caseData.email} onChange={handleChange} label="Service Status">
                    {['Active', 'Inactive'].map((status) => (
                      <MenuItem key={status} value={status}>
                        <Chip
                          label={status}
                          sx={{
                            color: status === 'Active' ? '#79dbfb' : '#ff6a67',
                            backgroundColor: status === 'Active' ? '#e5f8fe' : '#ffeae9',
                            fontWeight: 500
                          }}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="subtitle1" mb={2}>
                  Service Tag
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Beneficiary Information"
                      name="beneficiaryInformation"
                      value={caseData.beneficiaryInformation}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Campaigns Supported"
                      name="campaignsSupported"
                      value={caseData.campaignsSupported}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Engagement"
                      name="engagement"
                      value={caseData.engagement}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Events Attended"
                      name="eventsAttended"
                      value={caseData.eventsAttended}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Funding Interests"
                      name="fundingInterests"
                      value={caseData.fundingInterests}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Fundraising Activities"
                      name="fundraisingActivities"
                      value={caseData.fundraisingActivities}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
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
                <TextField label="Notes" multiline minRows={12} fullWidth variant="outlined" sx={{ mb: 2 }} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Card>

      <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt: 1, pr: 2 }}>
        <Grid item>
          <Button variant="contained" sx={{ background: '#053146' }}>
            Save Changes
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="error" onClick={onCancel}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AddCaseForm;
