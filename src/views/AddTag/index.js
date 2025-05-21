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
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  InputBase,
  Chip,
  MenuItem
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AntSwitch from 'components/AntSwitch.js';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { postApi, getApi, updateApi } from 'common/apiClient';
import { urls } from 'common/urls';
import moment from 'moment';

const TagForm = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      tagDescription: '',
      tagCategoryName: '',
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
      reset();
    } catch (error) {
      console.error('Error creating tag:', error);
    } finally {
      setIsloading(false);
    }
  };

  const handleTagChange = async (selectedTagCategory) => {
    try {
      setIsloading(true);
      const response = await getApi(urls.tag.getAllTags);

      const filteredTags = response?.data?.allTags?.filter((item) => item.tagCategoryName === selectedTagCategory);

      setTags(filteredTags);
    } catch (error) {
      console.error('Error fetching tags for selected category:', error);
    } finally {
      setIsloading(false);
    }
  };

  const handleStatusChange = async (tagId, newStatus) => {
    try {
      await updateApi(`${urls.tag.updateStatus}/${tagId}`, {
        isActive: newStatus
      });
      toast.success('Tag update successfully');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const columns = [
    { field: 'tagCategoryName', headerName: 'Tag Category Name', flex: 1 },
    { field: 'name', headerName: 'Tag Name', flex: 1 },
    { field: 'tagDescription', headerName: 'Tag Description', flex: 1 },
    {
      field: 'startDate',
      headerName: 'Start Date',
      flex: 1,
      valueFormatter: (params) => (params.value ? moment(params.value).format('DD-MM-YYYY') : '')
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      flex: 1,
      valueFormatter: (params) => (params.value ? moment(params.value).format('DD-MM-YYYY') : '')
    },

    {
      field: 'isActive',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => {
        const handleToggle = (event) => {
          const newStatus = event.target.checked;
          handleStatusChange(params.row._id, newStatus);
        };

        return <AntSwitch defaultChecked={params.value} color="primary" onChange={handleToggle} />;
      }
    }
  ];

  const categoryOptions = [
    'Beneficiary Information',
    'Campaigns Supported',
    'Engagement',
    'Event Attended',
    'Funding Interests',
    'Fundraising Activities'
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
              fontWeight: '450',
              color: '#333',
              ml: 2,
              fontSize: '14px',
              lineHeight: '36px'
            }}
          >
            Tag List
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f8f9fa',
                borderRadius: '30px',
                paddingLeft: '16px',
                border: '1px solid #e0e0e0',
                width: '350px',
                height: '40px'
              }}
            >
              <InputBase
                placeholder="Search..."
                // value={searchQuery}
                // onChange={handleSearchChange}
                // onKeyPress={(e) => {
                //   if (e.key === 'Enter') {
                //     handleFilter();
                //   }
                // }}
                sx={{
                  flex: 1,
                  color: 'text.primary'
                }}
              />
              <IconButton
                // onClick={handleFilter}
                sx={{
                  marginRight: '8px',
                  width: 32,
                  height: 32,
                  cursor: 'pointer'
                }}
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </Box>
        </GridToolbarContainer>
      </Box>
    );
  };

  return (
    <Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: '450', color: '#333' }}>
          Add Tag Category
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey',
            borderRadius: '50%',
            width: 32,
            height: 32,
            cursor: 'pointer'
          }}
          onClick={() => navigate('/tags')}
        >
          <CloseIcon sx={{ color: 'white', fontSize: 20 }} />
        </Box>
      </Box>

      <Card sx={{ position: 'relative', p: 2, mt: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            {/* <TextField fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} size="small" /> */}
            <Controller
              name="tagDescription"
              control={control}
              render={({ field }) => <TextField {...field} fullWidth label="Description" size="small" />}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControlLabel
              control={<AntSwitch checked={toggle} onChange={() => setToggle(!toggle)} color="primary" />}
              label="Active?"
              labelPlacement="start"
              sx={{
                '.MuiFormControlLabel-label': {
                  mr: 1
                }
              }}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Tags can be applied to" value={tags} onChange={(e) => setTags(e.target.value)} size="small" />
          </Grid> */}

          <Grid item xs={12} sm={6}>
            {/* <Controller
              name="tagCategoryName"
              control={control}
              rules={{
                required: 'Tag Category is required'
              }}
              render={({ field }) => (
                <TextField {...field} select fullWidth label="Tags can be applied to" size="small">
                  {categoryOptions?.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            /> */}

            <Controller
              name="tagCategoryName"
              control={control}
              rules={{ required: 'Tag Category is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Tags can be applied to"
                  size="small"
                  onChange={(e) => {
                    field.onChange(e);
                    handleTagChange(e.target.value);
                  }}
                >
                  {categoryOptions?.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} mt={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} spacing={2} sx={{ width: '100%' }}>
            <Typography sx={{ fontWeight: '450' }}>Tags in this Category</Typography>

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

        <Box width="100%" sx={{ mt: 1 }}>
          <Card>
            <DataGrid
              rows={tags}
              columns={columns}
              getRowId={(row) => row._id}
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
                SAVE CHANGES
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="error">
                CANCEL
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
