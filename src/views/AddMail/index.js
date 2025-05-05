import React, { useState } from 'react';
import {
  Card,
  Grid,
  TextField,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  IconButton,
  Box,
  Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AntSwitch from 'components/AntSwitch.js';
import {  Delete, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const MailingListForm = () => {
    const navigate = useNavigate();
  const [includeArchived, setIncludeArchived] = useState(false);
  const [filters, setFilters] = useState([{ id: 1, logic: 'AND', field: '', comparison: '', value: '' }]);

  const handleFilterChange = (id, field, value) => {
    setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
  };

  const addFilter = () => {
    setFilters([...filters, { id: Date.now(), logic: 'AND', field: '', comparison: '', value: '' }]);
  };

  const removeFilter = (id) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Create list of Service User</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/mail')}>
          <ArrowBackIcon sx={{ color: 'grey' }} />
          <Typography variant="h6" sx={{ mr: 1 }}>
            Back
          </Typography>
        </Box>
      </Box>
      <Card sx={{ p: 3, mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Mailing List Name" size="small" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Include People with these Tags" size="small" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="List People with any of these channel settings" size="small" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="AND any of these purpose settings" size="small" />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={<AntSwitch checked={includeArchived} onChange={(e) => setIncludeArchived(e.target.checked)} />}
              label="List Should Include Archived People?"
              labelPlacement="start"
            />
          </Grid>

          <Grid item xs={12}>
            Include People where :
            <Button variant="contained" onClick={addFilter} sx={{fontSize:'10px',borderRadius:'20px',background: '#009fc7'}}>
              Add Include Filter
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              {filters.map((filter, index) => (
                <Grid container spacing={1} alignItems="center" key={filter.id} sx={{ mb: 1 }}>
                  <Grid item xs={2}>
                    <Select
                      fullWidth
                      size="small"
                      value={filter.logic}
                      onChange={(e) => handleFilterChange(filter.id, 'logic', e.target.value)}
                    >
                      <MenuItem value="AND">AND</MenuItem>
                      <MenuItem value="OR">OR</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Field"
                      size="small"
                      value={filter.field}
                      onChange={(e) => handleFilterChange(filter.id, 'field', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Comparison"
                      size="small"
                      value={filter.comparison}
                      onChange={(e) => handleFilterChange(filter.id, 'comparison', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      fullWidth
                      label="Value"
                      size="small"
                      value={filter.value}
                      onChange={(e) => handleFilterChange(filter.id, 'value', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Box display="flex" alignItems="center">
                      <IconButton size="small" onClick={() => removeFilter(filter.id)}>
                        <Delete />
                      </IconButton>
                      <IconButton size="small">
                        <ArrowUpward fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <ArrowDownward fontSize="small" />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </Paper>
          </Grid>

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
        </Grid>
      </Card>
    </>
  );
};

export default MailingListForm;
