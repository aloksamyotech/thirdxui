import React, { useState } from 'react';
import { Grid, MenuItem, IconButton, Card, Tabs, Tab, Box, TextField, Typography, Button, Switch, FormControlLabel } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AddCaseForm = ({ onCancel }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [caseData, setCaseData] = useState({
    title: '',
    name: '',
    phone: '',
    email: '',
    gender: '',
    dob: null,
    address: '',
    town: '',
    country: '',
    pinCode: '',
    riskNotes: '',
    keyIndicators: '',
    service: '',
    fromDate: null,
    toDate: null,
    referDate: null,
    referrerName: '',
    referrerJob: '',
    referrerAddress: '',
    referrerEmail: '',
    referrerPhone: '',
    referralType: '',
    telephone: true,
    emailConsent: true,
    sms: true,
    letter: true,
    preferredContact: '',
    reason: '',
    contactPurpose: '',
    confirmationDate: null
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
    <Grid>
    <Card sx={{ position: 'relative', backgroundColor: '#eef2f6' }}>
      <Typography variant="h4">Add New Service User</Typography>
      <IconButton onClick={onCancel} sx={{ position: 'absolute', top: 1, right: 10 }}>
        <CancelIcon sx={{ fontSize: 32, color: 'grey' }} />
      </IconButton>
      <Card sx={{ padding: 2, marginTop: 2 }}>
        <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
          <Tab
            label="Details"
            sx={{
              fontSize: '14px',
              minWidth: 120,
              fontWeight: 'bold',
              textTransform: 'none',
            }}
          />
          <Tab
            label="Next of Kin Contact"
            sx={{
              fontSize: '14px',
              minWidth: 120,
              fontWeight: 'bold',
              textTransform: 'none',
            }}
          />
          <Tab
            label="Risk Assessment"
            sx={{
              fontSize: '14px',
              minWidth: 120,
              fontWeight: 'bold',
              textTransform: 'none',
            }}
          />
          <Tab
            label="Service"
            sx={{
              fontSize: '14px',
              minWidth: 120,
              fontWeight: 'bold',
              textTransform: 'none',
            }}
          />
          <Tab
            label="GDPR"
            sx={{
              fontSize: '14px',
              minWidth: 120,
              fontWeight: 'bold',
              textTransform: 'none',
            }}
          />
        </Tabs>
        <Box mt={2}>
          {tabIndex === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={2}>
                <TextField select fullWidth label="Title" name="title" value={caseData.title} onChange={handleChange}>
                  <MenuItem value="Mr">Mr.</MenuItem>
                  <MenuItem value="Ms">Ms.</MenuItem>
                  <MenuItem value="Mrs">Mrs.</MenuItem>
                  <MenuItem value="Dr">Dr.</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Name" name="name" value={caseData.name} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Phone" name="phone" type="tel" value={caseData.phone} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Email" name="email" type="email" value={caseData.email} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={2}>
                <TextField select fullWidth label="Gender" name="gender" value={caseData.gender} onChange={handleChange}>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    value={caseData.dob}
                    onChange={(newValue) => setCaseData({ ...caseData, dob: newValue })}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={6}>
                <TextField fullWidth multiline label="Address" name="address" value={caseData.address} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Town" name="town" value={caseData.town} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Country" name="country" value={caseData.country} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Pin Code" name="pinCode" value={caseData.pinCode} onChange={handleChange} />
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
          )}
          {tabIndex === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Name" name="name" value={caseData.name} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Phone" name="phone" type="tel" value={caseData.phone} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Email" name="email" type="email" value={caseData.email} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Relationship to Service User"
                  name="email"
                  type="email"
                  value={caseData.email}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Address" name="address" value={caseData.address} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Town" name="town" value={caseData.town} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Country" name="country" value={caseData.country} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Pin Code" name="pinCode" value={caseData.pinCode} onChange={handleChange} />
              </Grid>
            </Grid>
          )}
          {tabIndex === 2 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Risk Assessment Notes"
                  name="riskNotes"
                  value={caseData.riskNotes}
                  onChange={handleChange}
                  multiline
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Key Indicators of Concern"
                  name="keyIndicators"
                  value={caseData.keyIndicators}
                  onChange={handleChange}
                >
                  <MenuItem value="Indicator 1">Indicator 1</MenuItem>
                  <MenuItem value="Indicator 2">Indicator 2</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          )}
          {tabIndex === 3 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField select fullWidth label="Service" name="gender" value={caseData.gender} onChange={handleChange}>
                  <MenuItem value="Service">Service 1</MenuItem>
                  <MenuItem value="Service">Service 2</MenuItem>
                  <MenuItem value="Service">Service 3</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Referrer Name" name="name" value={caseData.name} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Referrer Phone" name="phone" type="tel" value={caseData.phone} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Referrer Email" name="email" type="email" value={caseData.email} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField select fullWidth label="Referrer Type" name="gender" value={caseData.gender} onChange={handleChange}>
                  <MenuItem value="Referrer">Referrer 1</MenuItem>
                  <MenuItem value="Referrer">Referrer 2</MenuItem>
                  <MenuItem value="Referrer">Referrer 3</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="From Date"
                    value={caseData.dob}
                    onChange={(newValue) => setCaseData({ ...caseData, dob: newValue })}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="To Date"
                    value={caseData.dob}
                    onChange={(newValue) => setCaseData({ ...caseData, dob: newValue })}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Referred Date"
                    value={caseData.dob}
                    onChange={(newValue) => setCaseData({ ...caseData, dob: newValue })}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Referrer Address" name="address" value={caseData.address} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Town" name="town" value={caseData.town} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Country" name="country" value={caseData.country} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Pin Code" name="pinCode" value={caseData.pinCode} onChange={handleChange} />
              </Grid>
            </Grid>
          )}
          {tabIndex === 4 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={2}>
                <FormControlLabel control={<Switch checked={caseData.telephone} />} label="Telephone" />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControlLabel control={<Switch checked={caseData.emailConsent} />} label="Email" />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControlLabel control={<Switch checked={caseData.sms} />} label="SMS" />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControlLabel control={<Switch checked={caseData.letter} />} label="Letter" />
              </Grid>

              <Grid item sm={4}></Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Preferred Method of Contact"
                  name="preferredContact"
                  value={caseData.preferredContact}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField fullWidth label="Reason" name="reason" value={caseData.reason} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Contact Purposes"
                  name="contactPurpose"
                  value={caseData.contactPurpose}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Confirmation"
                    value={caseData.dob}
                    onChange={(newValue) => setCaseData({ ...caseData, dob: newValue })}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          )}
        </Box>
      </Card>

      <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt: 2 }}>
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
    </Grid>
  );
};

export default AddCaseForm;
