import React, { useState } from 'react';
import {
  Grid,
  Box,
  Stack,
  TextField,
  IconButton,
  FormControlLabel,
  Card,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormLabel,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import { DataGrid } from '@mui/x-data-grid';
import AntSwitch from "components/AntSwitch.js";

const TagForm = ({ onCancel }) => {
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [toggle, setToggle] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tagData, setTagData] = useState({
    name: '',
    startDate: null,
    endDate: null,
    note: ''
  });

  const handleTagChange = (e) => {
    setTagData({ ...tagData, [e.target.name]: e.target.value });
  };

  const columns = [
    { field: 'name', headerName: 'DESCRIPTION', flex: 1 },
    {
      field: 'active',
      headerName: 'ACTIVE',
      flex: 1
    }
  ];

  const rows = [
    { id: 1, name: 'Adoption Enquirer', active: 'YES' },
    { id: 2, name: 'Adoption Gift Recipients', active: 'YES' },
    { id: 3, name: 'Past Adopters', active: 'YES' },
    { id: 4, name: 'Current Adopters', active: 'YES' }
  ];

  return (
    <Grid>
      <Card sx={{ position: 'relative', p: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
          Add Tag Category
        </Typography>
        <IconButton onClick={onCancel} sx={{ position: 'absolute', top: 1, right: 10 }}>
          <CancelIcon sx={{ fontSize: 32, color: 'grey' }} />
        </IconButton>
        <Grid container spacing={2} alignItems="center" mt={1}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} size="small" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControlLabel control={<AntSwitch checked={toggle} onChange={() => setToggle(!toggle)} color="primary" />} label="Active?" labelPlacement='start'/>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>Tags can be applied to</FormLabel>
            <TextField fullWidth value={tags} onChange={(e) => setTags(e.target.value)} size="small" />
          </Grid>
        </Grid>

        <Grid item xs={12} mt={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} spacing={2} sx={{ width: '100%' }}>
            <Typography sx={{ fontWeight: 'bold' }}>Tags in this Category</Typography>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography>Add Tags</Typography>
              <IconButton
                onClick={() => setIsModalOpen(true)}
                sx={{
                  backgroundColor: '#41C048',
                  borderRadius: '50%',
                  width: '25px',
                  height: '25px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: 3,
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#41C048',
                    color: '#ffffff'
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search Description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Box width="100%" sx={{ mt: 2 }}>
          <Card>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.id}
              sx={{
                '& .MuiDataGrid-columnHeader': {
                  backgroundColor: '#f5f5f5'
                },
                '& .MuiDataGrid-row:nth-of-type(2n)': {
                  backgroundColor: '#F9F9F9'
                },
                '& .MuiDataGrid-cell': {
                  textAlign: 'left',
                  fontSize: '14px'
                }
              }}
              disableSelectionOnClick
            />
          </Card>
        </Box>

        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <DialogTitle>
            <Typography variant="h4">Add Tags</Typography>
          </DialogTitle>

          <DialogContent>
            <Grid container spacing={2} mt={0.5}>
              <Grid item xs={12}>
                <TextField fullWidth label="Name" name="name" value={tagData.name} onChange={handleTagChange} />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={tagData.startDate}
                    onChange={(date) => setTagData({ ...tagData, startDate: date })}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="End Date"
                    value={tagData.endDate}
                    onChange={(date) => setTagData({ ...tagData, endDate: date })}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Note" name="note" multiline rows={3} value={tagData.note} onChange={handleTagChange} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary">
              Submit
            </Button>
            <Button onClick={() => setIsModalOpen(false)} variant="outlined" color="error">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Grid>
  );
};

export default TagForm;
