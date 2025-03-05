import React, { useState } from 'react';
import {
  Grid,
  MenuItem,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Tabs,
  Tab,
  Box,
  TextField,
  Typography,
  Button,
  FormControlLabel
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AntSwitch from 'components/AntSwitch.js';

const AddCaseForm = ({ onCancel }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [caseData, setCaseData] = useState({
    title: '',
    firstname: '',
    lastname: '',
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
  const [restrictAccess, setRestrictAccess] = useState(false);
  const handleToggle = () => setRestrictAccess(!restrictAccess);

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
        <Typography variant="h4">Add New Volunteer</Typography>
        <IconButton onClick={onCancel} sx={{ position: 'absolute', top: 1, right: 10 }}>
          <CancelIcon sx={{ fontSize: 32, color: 'grey' }} />
        </IconButton>
        <Card sx={{ padding: 2, marginTop: 2 }}>
          <Tabs
            value={tabIndex}
            onChange={(e, newValue) => setTabIndex(newValue)}
            sx={{
              display: 'flex',
              gap: 2,
              borderBottom: '1px solid #4792d3'
            }}
          >
            <Tab
              label="Details"
              sx={(theme) => ({
                backgroundColor: tabIndex === 0 ? '#e3f2fd' : 'transparent',
                transition: 'background-color 0.3s ease',
                marginRight: 2,
                fontSize: '14px',
                minWidth: 120,
                fontWeight: 'bold',
                textTransform: 'none'
              })}
            />
            <Tab
              label="Next of Kin Contact"
              sx={(theme) => ({
                backgroundColor: tabIndex === 1 ? '#e3f2fd' : 'transparent',
                transition: 'background-color 0.3s ease',
                marginRight: 2,
                fontSize: '14px',
                minWidth: 120,
                fontWeight: 'bold',
                textTransform: 'none'
              })}
            />
            <Tab
              label="Risk Assessment"
              sx={(theme) => ({
                backgroundColor: tabIndex === 2 ? '#e3f2fd' : 'transparent',
                transition: 'background-color 0.3s ease',
                marginRight: 2,
                fontSize: '14px',
                minWidth: 120,
                fontWeight: 'bold',
                textTransform: 'none'
              })}
            />
            <Tab
              label="Service"
              sx={(theme) => ({
                backgroundColor: tabIndex === 3 ? '#e3f2fd' : 'transparent',
                transition: 'background-color 0.3s ease',
                marginRight: 2,
                fontSize: '14px',
                minWidth: 120,
                fontWeight: 'bold',
                textTransform: 'none'
              })}
            />
            <Tab
              label="GDPR"
              sx={(theme) => ({
                backgroundColor: tabIndex === 4 ? '#e3f2fd' : 'transparent',
                transition: 'background-color 0.3s ease',
                marginRight: 2,
                fontSize: '14px',
                minWidth: 120,
                fontWeight: 'bold',
                textTransform: 'none'
              })}
            />
          </Tabs>
          <Box mt={2}>
            {tabIndex === 0 && (
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Personal Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField select fullWidth label="Title" name="title" value={caseData.title} onChange={handleChange}>
                        <MenuItem value="Mr">Mr.</MenuItem>
                        <MenuItem value="Ms">Ms.</MenuItem>
                        <MenuItem value="Mrs">Mrs.</MenuItem>
                        <MenuItem value="Dr">Dr.</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="First Name" name="firstname" value={caseData.firstname} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Last Name" name="lastname" value={caseData.lastname} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField select fullWidth label="Gender" name="gender" value={caseData.gender} onChange={handleChange}>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date of Birth"
                          value={caseData.dob}
                          onChange={(newValue) => setCaseData({ ...caseData, dob: newValue })}
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Contact Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Phone" name="phone" type="tel" value={caseData.phone} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Email" name="email" type="email" value={caseData.email} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth multiline label="Address" name="address" value={caseData.address} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Town" name="town" value={caseData.town} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Country" name="country" value={caseData.country} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Pin Code" name="pinCode" value={caseData.pinCode} onChange={handleChange} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Others
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Frist Language" name="language" value={caseData.language} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Ethnicity" name="language" value={caseData.language} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Country of origin" name="language" value={caseData.language} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField select fullWidth label="Borough/District" name="gender" value={caseData.gender} onChange={handleChange}>
                        <MenuItem value="Male">Arun District</MenuItem>
                        <MenuItem value="Female">Ashfield District</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Notes" name="language" value={caseData.language} onChange={handleChange} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Card sx={{ boxShadow: 1, borderRadius: 2 }}>
                    <CardHeader title="Tags" />
                    <CardContent>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label="Membership" name="membership" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label="P2P Fundraising Interest" name="p2p_fundraising" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label="Religion" name="religion" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label="Volunteer Roles" name="volunteer_roles" variant="outlined" />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControlLabel
                            control={<AntSwitch checked={restrictAccess} onChange={handleToggle} />}
                            label="Restrict Access?"
                            labelPlacement="start"
                          />
                        </Grid>
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
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {tabIndex === 1 && (
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" gutterBottom>
                    Personal Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField fullWidth label="First Name" name="firstname" value={caseData.firstname} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Last Name" name="lastname" value={caseData.lastname} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Relationship to Service User"
                        name="relationship"
                        value={caseData.relationship}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" gutterBottom>
                    Contact Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Phone" name="phone" type="tel" value={caseData.phone} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Email" name="email" type="email" value={caseData.email} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Address" name="email" type="email" value={caseData.email} onChange={handleChange} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" gutterBottom>
                    Address Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Town" name="town" value={caseData.town} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Country" name="country" value={caseData.country} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Post Code" name="pinCode" value={caseData.pinCode} onChange={handleChange} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {tabIndex === 2 && (
              <Grid container spacing={4}>
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
              <Grid container spacing={4}>
                <Grid item xs={12} sm={2}>
                  <Typography variant="h6" gutterBottom>
                    Date Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Referred Date"
                          value={caseData.referredDate}
                          onChange={(newValue) => setCaseData({ ...caseData, referredDate: newValue })}
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="From Date"
                          value={caseData.fromDate}
                          onChange={(newValue) => setCaseData({ ...caseData, fromDate: newValue })}
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="To Date"
                          value={caseData.toDate}
                          onChange={(newValue) => setCaseData({ ...caseData, toDate: newValue })}
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={5}>
                  <Typography variant="h6" gutterBottom>
                    Referral Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField select fullWidth label="Service" name="service" value={caseData.service} onChange={handleChange}>
                        <MenuItem value="Service 1">Service 1</MenuItem>
                        <MenuItem value="Service 2">Service 2</MenuItem>
                        <MenuItem value="Service 3">Service 3</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Referrer Name" name="name" value={caseData.name} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Referrer Job Title" name="name" value={caseData.name} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        select
                        fullWidth
                        label="Referrer Type"
                        name="referrerType"
                        value={caseData.referrerType}
                        onChange={handleChange}
                      >
                        <MenuItem value="Referrer 1">Referrer 1</MenuItem>
                        <MenuItem value="Referrer 2">Referrer 2</MenuItem>
                        <MenuItem value="Referrer 3">Referrer 3</MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={5}>
                  <Typography variant="h6" gutterBottom>
                    Contact Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Referrer Phone" name="phone" type="tel" value={caseData.phone} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Referrer Email"
                        name="email"
                        type="email"
                        value={caseData.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Referrer Address" name="address" value={caseData.address} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Pin Code" name="pinCode" value={caseData.pinCode} onChange={handleChange} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {tabIndex === 4 && (
              <Grid container spacing={4}>
                <Grid item xs={12} sm={2}>
                  <FormControlLabel
                    control={<AntSwitch checked={caseData.telephone} />}
                    label="Telephone"
                    labelPlacement="start"
                    sx={{ display: 'flex', gap: '10px' }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <FormControlLabel
                    control={<AntSwitch checked={caseData.emailConsent} />}
                    label="Email"
                    labelPlacement="start"
                    sx={{ display: 'flex', gap: '10px' }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <FormControlLabel
                    control={<AntSwitch checked={caseData.sms} />}
                    label="SMS"
                    labelPlacement="start"
                    sx={{ display: 'flex', gap: '10px' }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <FormControlLabel
                    control={<AntSwitch checked={caseData.letter} />}
                    label="Letter"
                    labelPlacement="start"
                    sx={{ display: 'flex', gap: '10px' }}
                  />
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
            <Button variant="contained" color="secondary" onClick={handleSubmit}>
              Save
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

export default AddCaseForm;
