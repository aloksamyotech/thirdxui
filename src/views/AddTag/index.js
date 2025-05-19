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
  DialogActions
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AntSwitch from 'components/AntSwitch.js';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { postApi } from 'common/apiClient';
import { urls } from 'common/urls';

const TagForm = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [toggle, setToggle] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsloading] = useState(false);


  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: '',
      startDate: null,
      endDate: null,
      note: ''
    }
  });
  const onSubmit = async (data) => {
    setIsloading(true);
    try {
      const response = await postApi(urls.tag.create, data);
      toast.success('Tag created successfully');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating tag:', error);
    } finally {
      setIsloading(false);
    }
  };

  const handleTagChange = (e) => {
    setTagData({ ...tagData, [e.target.name]: e.target.value });
  };

  const columns = [
    { field: 'name', headerName: 'Configuration', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: (params) => <AntSwitch defaultChecked={params.value} color="primary" />,
      flex: 1
    }
  ];

  const rows = [
    { id: 1, name: 'Adoption Enquirer', status: true },
    { id: 2, name: 'Adoption Gift Recipients', status: true },
    { id: 3, name: 'Past Adopters', status: true },
    { id: 4, name: 'Current Adopters', status: true }
  ];

  const CustomHeader = () => {
    return (
      <Box sx={{ height: '50px', display: 'flex', alignItems: 'center' }}>
        <GridToolbarContainer
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #ddd',
            width: '100%',
            height: '100%',
            padding: '0 12px'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#333',
              ml: 2,
              fontSize: '14px',
              lineHeight: '36px'
            }}
          >
            TAG LIST
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              size="small"
              placeholder="Search..."
              InputProps={{
                endAdornment: <SearchIcon />
              }}
              sx={{ width: '250px' }}
            />
          </Box>
        </GridToolbarContainer>
      </Box>
    );
  };

  return (
    <Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
          Add Tag Category
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/tags')}>
          <ArrowBackIcon sx={{ color: 'grey' }} />
          <Typography variant="h6" sx={{ mr: 1 }}>
            Back
          </Typography>
        </Box>
      </Box>

      <Card sx={{ position: 'relative', p: 2, mt: 2 }}>
        <Grid container spacing={2} alignItems="center" mt={1}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} size="small" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControlLabel
              control={<AntSwitch checked={toggle} onChange={() => setToggle(!toggle)} color="primary" />}
              label="Active?"
              labelPlacement="start"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Tags can be applied to" value={tags} onChange={(e) => setTags(e.target.value)} size="small" />
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

        <Box width="100%" sx={{ mt: 2 }}>
          <Card>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.id}
              components={{ Toolbar: CustomHeader }}
              pagination={false}
              hideFooter
              sx={{
                '& .MuiDataGrid-cell': {
                  textAlign: 'left',
                  fontSize: '14px'
                }
              }}
              disableSelectionOnClick
            />
          </Card>

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
        </Box>
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <DialogTitle>
            <Typography variant="h4">Add Tags</Typography>
          </DialogTitle>

          <DialogContent>
            <Grid container spacing={2} mt={0.5}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => <TextField {...field} fullWidth label="Description" size="small" />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Start Date"
                        {...field}
                        onChange={(date) => setValue('startDate', date)}
                        renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="End Date"
                        {...field}
                        onChange={(date) => setValue('endDate', date)}
                        renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="note"
                  control={control}
                  render={({ field }) => <TextField {...field} fullWidth label="Note" size="small" multiline rows={3} />}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" sx={{ background: '#053146' }} onClick={handleSubmit(onSubmit)}>
              Save Changes
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
