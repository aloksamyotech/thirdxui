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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="List Name" name="listName" value={caseData.listName} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Tags" name="tags" value={caseData.tags} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={2}>
              <FormControlLabel control={<Switch checked={caseData.locked} onChange={handleToggle} name="locked" />} label="Locked" />
            </Grid>

            {[
              { label: 'Service', name: 'service' },
              { label: 'Session', name: 'session' },
              { label: 'Age', name: 'age' },
              { label: 'Gender', name: 'gender' },
              { label: 'Country of Origin', name: 'countryOfOrigin' },
              { label: 'District', name: 'district' },
              { label: 'Key Indicators', name: 'keyIndicators' },
              { label: 'Referral Type', name: 'referralType' },
              { label: 'Ethnicity', name: 'ethnicity' },
              { label: 'Choose Channel Settings', name: 'chooseChannelSettings' }
            ].map((field) => (
              <Grid item xs={12} sm={3} key={field.name}>
                <TextField select fullWidth label={field.label} name={field.name} value={caseData[field.name]} onChange={handleChange}>
                  <MenuItem value="Option 1">Option 1</MenuItem>
                  <MenuItem value="Option 2">Option 2</MenuItem>
                  <MenuItem value="Option 3">Option 3</MenuItem>
                </TextField>
              </Grid>
            ))}

            <Grid item sm={6}></Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch checked={caseData.includeArchived} onChange={handleToggle} name="includeArchived" />}
                label="Include Archived Records"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ justifyContent: 'flex-end'}}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary">
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
