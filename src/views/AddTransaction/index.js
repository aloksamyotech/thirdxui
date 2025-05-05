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
          <Typography variant="h4">Add Transaction</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/financial')}>
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
              label="Payment"
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
              label="Allocation"
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
          </Tabs>

          <Box mt={2}>
            {tabIndex === 0 && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 1, borderRadius: 2, p: 0 }}>
                      <CardContent>
                        <Grid container rowSpacing={2} columnSpacing={1}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Assigned To"
                              name="title"
                              size="small"
                              value={caseData.title}
                              onChange={handleChange}
                            ></TextField>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              select
                              fullWidth
                              label="Campaign"
                              name="gender"
                              size="small"
                              value={caseData.gender}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Processing Cost"
                              name="forename"
                              size="small"
                              value={caseData.forename}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              select
                              fullWidth
                              label="Currency"
                              name="surname"
                              size="small"
                              value={caseData.surname}
                              onChange={handleChange}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 1, borderRadius: 2 }}>
                      <CardContent>
                        <Grid container rowSpacing={2} columnSpacing={1}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Amount Paid"
                              name="homePhone"
                              size="small"
                              value={caseData.homePhone}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              select
                              fullWidth
                              label="Payment Method"
                              name="phone"
                              size="small"
                              value={caseData.phone}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Receipt No."
                              name="email"
                              size="small"
                              value={caseData.email}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Transaction ID"
                              name="address1"
                              size="small"
                              value={caseData.address1}
                              onChange={handleChange}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </>
            )}

            {tabIndex === 1 && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Product"
                    name="preferredContact"
                    value={caseData.preferredContact}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Quantity"
                    name="contactPurpose"
                    value={caseData.contactPurpose}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Amount Due" size="small" name="reason" value={caseData.reason} onChange={handleChange} />
                </Grid>
              </Grid>
            )}
          </Box>

          <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt: 1, pr: 2 }}>
            <Grid item>
              <Button variant="contained" sx={{ background: '#053146' }}>
                Save Changes
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="error">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Card>
    </Grid>
  );
};

export default AddCaseForm;
