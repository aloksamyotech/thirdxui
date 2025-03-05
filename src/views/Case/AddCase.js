import React, { useState } from 'react';
import { Grid, TextField, MenuItem, IconButton, Card, Typography, Stack, Box, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';

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
  const [district, setDistrict] = useState('');
  const [owner, setOwner] = useState('');
  const [status, setStatus] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const handleFilterApply = () => {
    console.log('Filters Applied:', { district, owner, status, fromDate, toDate });
  };

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
    <Grid sx={{ position: 'relative', backgroundColor: '#eef2f6' }}>
      <Typography variant="h4">Add New Case</Typography>
      <IconButton onClick={onCancel} sx={{ position: 'absolute', top: 1, right: 10, fontSize: 32 }}>
        <CancelIcon sx={{ fontSize: 32, color: 'grey' }} />
      </IconButton>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction="row" alignItems="center" spacing={2} mt={3} sx={{ whiteSpace: 'nowrap' }}>
          <TextField
            select
            label="Select District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: 150 }}
          >
            <MenuItem value="District 1">District 1</MenuItem>
            <MenuItem value="District 2">District 2</MenuItem>
          </TextField>

          <TextField
            select
            label="Select Owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: 150 }}
          >
            <MenuItem value="Owner 1">Owner 1</MenuItem>
            <MenuItem value="Owner 2">Owner 2</MenuItem>
          </TextField>

          <TextField
            select
            label="Select Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: 150 }}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
          <Box sx={{ width: 150 }}>
            <DatePicker
              label="From"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
              slotProps={{
                textField: {
                  size: 'small',
                  InputLabelProps: { shrink: true },
                  sx: {
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: '12px',
                      padding: '6px 8px',
                      textAlign: 'center'
                    }
                  }
                }
              }}
            />
          </Box>

          <Box sx={{ width: 150 }}>
            <DatePicker
              label="To"
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
              slotProps={{
                textField: {
                  size: 'small',
                  InputLabelProps: { shrink: true },
                  sx: {
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: '12px',
                      padding: '6px 8px',
                      textAlign: 'center'
                    }
                  }
                }
              }}
            />
            </Box>
          <Button variant="contained" color="secondary" sx={{ height: 40, borderRadius: '12px' }}>
            Apply
          </Button>

          <FilterAltOffOutlinedIcon color="grey" />
        </Stack>
      </LocalizationProvider>

      <Card sx={{ padding: 2, marginTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth label="Service User" name="caseTag" value={caseData.caseTag} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField select fullWidth label="Service" name="service" value={caseData.service} onChange={handleChange}>
              <MenuItem value="Service A">Service A</MenuItem>
              <MenuItem value="Service B">Service B</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={caseData.startDate}
                onChange={(newValue) => setCaseData({ ...caseData, startDate: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                value={caseData.endDate}
                onChange={(newValue) => setCaseData({ ...caseData, endDate: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField select fullWidth label="Service" name="owner" value={caseData.owner} onChange={handleChange}>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField select fullWidth label="Status" name="status" value={caseData.status} onChange={handleChange}>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Case Tag" name="caseTag" value={caseData.caseTag} onChange={handleChange} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Attachments
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
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

        <Grid container spacing={2} sx={{ justifyContent: 'flex-end' }}>
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
