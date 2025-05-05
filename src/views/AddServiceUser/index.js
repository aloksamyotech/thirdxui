import React, { useState, useEffect } from 'react';
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
  Switch,
  Paper,
  TextField,
  InputAdornment,
  Typography,
  Button,
  FormControlLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from '@mui/material/Link';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AntSwitch from 'components/AntSwitch.js';

const AddCaseForm = ({ onCancel }) => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [countryList, setCountryList] = useState([]);
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

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        const countries = data.map((country) => ({
          code: country.cca2,
          name: country.name.common,
          flag: country.flags.png
        }));
        setCountryList(countries);
      });
  }, []);

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">Add New Service User</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/people')}>
            <ArrowBackIcon sx={{ color: 'grey' }} />
            <Typography variant="h6" sx={{ mr: 1 }}>
              Back
            </Typography>
          </Box>
        </Box>
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
              label="Emergency Contact"
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
              label="Contact Preferences"
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
          </Tabs>

          <Box mt={2}>
            {tabIndex === 0 && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ boxShadow: 1, borderRadius: 2, p: 0 }}>
                      <CardContent>
                        <Typography variant="h5" gutterBottom>
                          Personal Information
                        </Typography>
                        <Grid container rowSpacing={2} columnSpacing={1}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              select
                              fullWidth
                              label="Title"
                              name="title"
                              size="small"
                              value={caseData.title}
                              onChange={handleChange}
                            >
                              <MenuItem value="Mr">Mr.</MenuItem>
                              <MenuItem value="Ms">Ms.</MenuItem>
                              <MenuItem value="Mrs">Mrs.</MenuItem>
                              <MenuItem value="Dr">Dr.</MenuItem>
                            </TextField>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              select
                              fullWidth
                              label="Gender"
                              name="gender"
                              size="small"
                              value={caseData.gender}
                              onChange={handleChange}
                            >
                              <MenuItem value="Male">Male</MenuItem>
                              <MenuItem value="Female">Female</MenuItem>
                              <MenuItem value="Other">Other</MenuItem>
                            </TextField>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Forename"
                              name="forename"
                              size="small"
                              value={caseData.forename}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Surname"
                              name="surname"
                              size="small"
                              value={caseData.surname}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Preferred Known as"
                              name="preferredName"
                              size="small"
                              value={caseData.preferredName}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="DOB"
                                value={caseData.dob}
                                onChange={(newValue) => setCaseData({ ...caseData, dob: newValue })}
                                renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                              />
                            </LocalizationProvider>
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              select
                              fullWidth
                              label="Ethnicity"
                              size="small"
                              name="ethnicity"
                              value={caseData.ethnicity}
                              onChange={handleChange}
                            >
                              <MenuItem value="Asian">Asian</MenuItem>
                              <MenuItem value="Black">Black</MenuItem>
                              <MenuItem value="White">White</MenuItem>
                            </TextField>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <Card sx={{ boxShadow: 1, borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="h5" gutterBottom>
                          Contact Information
                        </Typography>
                        <Grid container rowSpacing={2} columnSpacing={1}>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              fullWidth
                              label="Home Phone No."
                              name="homePhone"
                              size="small"
                              value={caseData.homePhone}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              fullWidth
                              label="Phone No."
                              name="phone"
                              size="small"
                              value={caseData.phone}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField fullWidth label="Email" name="email" size="small" value={caseData.email} onChange={handleChange} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Address Line 1"
                              name="address1"
                              size="small"
                              value={caseData.address1}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Address Line 2"
                              name="address2"
                              size="small"
                              value={caseData.address2}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Town" name="town" size="small" value={caseData.town} onChange={handleChange} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              select
                              fullWidth
                              label="Borough/District"
                              name="borough"
                              size="small"
                              value={caseData.borough}
                              onChange={handleChange}
                            >
                              <MenuItem value="Arun District">Arun District</MenuItem>
                              <MenuItem value="Ashfield District">Ashfield District</MenuItem>
                            </TextField>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Postcode"
                              name="postcode"
                              size="small"
                              value={caseData.postcode}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              select
                              fullWidth
                              label="Country of origin"
                              name="countryOfOrigin"
                              size="small"
                              value={caseData.countryOfOrigin}
                              onChange={handleChange}
                            >
                              {countryList.map((country) => (
                                <MenuItem key={country.code} value={country.name}>
                                  <img src={country.flag} alt={country.code} style={{ width: 20, height: 14, marginRight: 8 }} />
                                  {country.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="First Language"
                              name="firstLanguage"
                              size="small"
                              value={caseData.firstLanguage}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Other ID"
                              name="otherId"
                              size="small"
                              value={caseData.otherId}
                              onChange={handleChange}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Box>
                    <Typography variant="h5" m={2}>
                      Other Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Paper elevation={2} sx={{ p: 2 }}>
                          <Typography variant="subtitle1" mb={2}>
                            Service User Tag
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
                          <TextField label="Notes" multiline minRows={11} fullWidth variant="outlined" sx={{ mb: 2 }} />
                          <FormControlLabel
                            control={<AntSwitch checked={restrictAccess} onChange={() => setRestrictAccess(!restrictAccess)} />}
                            label="Restrict Access?"
                            labelPlacement="start"
                            sx={{ gap: 1 }}
                          />
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </>
            )}

            {tabIndex === 1 && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Card sx={{ boxShadow: 1, borderRadius: 2, p: 0 }}>
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        Personal Information
                      </Typography>
                      <Grid container rowSpacing={2} columnSpacing={1}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            select
                            fullWidth
                            label="Title"
                            name="title"
                            size="small"
                            value={caseData.title}
                            onChange={handleChange}
                          >
                            <MenuItem value="Mr">Mr.</MenuItem>
                            <MenuItem value="Ms">Ms.</MenuItem>
                            <MenuItem value="Mrs">Mrs.</MenuItem>
                            <MenuItem value="Dr">Dr.</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            select
                            fullWidth
                            label="Gender"
                            name="gender"
                            size="small"
                            value={caseData.gender}
                            onChange={handleChange}
                          >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Forename"
                            name="forename"
                            size="small"
                            value={caseData.forename}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Surname"
                            name="surname"
                            size="small"
                            value={caseData.surname}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Relationship to Service User"
                            name="preferredName"
                            size="small"
                            value={caseData.preferredName}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Card sx={{ boxShadow: 1, borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        Contact Information
                      </Typography>
                      <Grid container rowSpacing={2} columnSpacing={1}>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Home Phone No."
                            name="homePhone"
                            size="small"
                            value={caseData.homePhone}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField fullWidth label="Phone No." name="phone" size="small" value={caseData.phone} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField fullWidth label="Email" name="email" size="small" value={caseData.email} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Address Line 1"
                            name="address1"
                            size="small"
                            value={caseData.address1}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Address Line 2"
                            name="address2"
                            size="small"
                            value={caseData.address2}
                            onChange={handleChange}
                          />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <TextField
                            select
                            fullWidth
                            label="Country"
                            name="countryOfOrigin"
                            size="small"
                            value={caseData.countryOfOrigin}
                            onChange={handleChange}
                          >
                            {countryList.map((country) => (
                              <MenuItem key={country.code} value={country.name}>
                                <img src={country.flag} alt={country.code} style={{ width: 20, height: 14, marginRight: 8 }} />
                                {country.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <TextField fullWidth label="Town" name="town" size="small" value={caseData.town} onChange={handleChange} />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Postcode"
                            name="postcode"
                            size="small"
                            value={caseData.postcode}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {tabIndex === 2 && (
              <Grid container spacing={4}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Preferred Method of Contact"
                    name="preferredContact"
                    value={caseData.preferredContact}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    size="small"
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
                      renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField fullWidth label="Reason" size="small" name="reason" value={caseData.reason} onChange={handleChange} />
                </Grid>

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
              </Grid>
            )}
          </Box>
        </Card>

        <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt: 1, pr: 2 }}>
          <Grid item>
            <Button variant="outlined" color="error" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" sx={{ background: '#053146' }} onClick={handleSubmit}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default AddCaseForm;
