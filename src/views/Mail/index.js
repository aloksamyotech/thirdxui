import { useState } from 'react';
import { Stack, Button, Typography, Card, Switch, TextField, MenuItem, Grid, FormControlLabel } from '@mui/material';

const Emails = () => {
  const [caseData, setCaseData] = useState({
    gender: '',
    dob: null,
    address: '',
    town: '',
    country: '',
    pinCode: '',
    service: '',
    session: '',
    age: '',
    countryOfOrigin: '',
    district: '',
    keyIndicators: '',
    referralType: '',
    ethnicity: '',
    chooseChannelSettings: '',
    listName: '',
    tags: '',
    locked: true,
    includeArchived: true
  });

  const handleChange = (event) => {
    setCaseData({ ...caseData, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    console.log('Submitted Data:', caseData);
  };

  const handleToggle = (event) => {
    setCaseData({ ...caseData, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <Grid>
        <Card sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" mb={5} justifyContent="space-between">
            <Typography variant="h4">Create a List of Service Users</Typography>
          </Stack>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Personal Info
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="List Name" name="listName" value={caseData.listName} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Tags" name="tags" value={caseData.tags} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Age" name="age" value={caseData.age} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Gender" name="gender" value={caseData.gender} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Ethnicity" name="ethnicity" value={caseData.ethnicity} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Country of Origin"
                    name="countryOfOrigin"
                    value={caseData.countryOfOrigin}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel control={<Switch checked={caseData.locked} onChange={handleToggle} name="locked" />} label="Locked" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={<Switch checked={caseData.showInMenu} onChange={handleToggle} name="showInMenu" />}
                    label="Show in Menu"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch checked={caseData.includeArchived} onChange={handleToggle} name="includeArchived" />}
                    label="Include Archived Records"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Others
              </Typography>
              <Grid container spacing={3}>
                {[
                  { label: 'Service', name: 'service' },
                  { label: 'Session', name: 'session' },
                  { label: 'District', name: 'district' },
                  { label: 'Key Indicators', name: 'keyIndicators' },
                  { label: 'Referral Type', name: 'referralType' },
                  { label: 'Choose Channel Settings', name: 'chooseChannelSettings' },
                  { label: 'Choose Purpose Settings', name: 'choosePurposeSettings' }
                ].map((field) => (
                  <Grid item xs={12} sm={6} key={field.name}>
                    <TextField select fullWidth label={field.label} name={field.name} value={caseData[field.name]} onChange={handleChange}>
                      <MenuItem value="Option 1">Option 1</MenuItem>
                      <MenuItem value="Option 2">Option 2</MenuItem>
                      <MenuItem value="Option 3">Option 3</MenuItem>
                    </TextField>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ justifyContent: 'flex-end' }}>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={handleSubmit}>
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="error">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
};

export default Emails;
