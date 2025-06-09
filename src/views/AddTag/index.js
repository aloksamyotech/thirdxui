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
import toast from 'react-hot-toast';
import { postApi, getApi, updateApi } from 'common/apiClient';
import { urls } from 'common/urls';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';
import { useEffect } from 'react';
import { GridToolbarQuickFilter } from '@mui/x-data-grid';

const TagForm = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsloading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [totalRows, setTotalRows] = useState(0);

  const [tagName, setTagName] = useState('');

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors }
  } = useForm({
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
    setTagName(selectedTagCategory);
  };
  const fetchTags = async () => {
    setIsloading(true);
    try {
      const response = await getApi(`${urls.tag.fetchWithPagination}?page=${paginationModel.page + 1}&limit=${paginationModel.pageSize}`);
      const allTags = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };
      setTags(allTags);
      setFilteredTags(allTags);
      setTotalRows(pagination?.total);
    } catch (error) {
      toast.error('Failed to fetch tags');
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, [paginationModel, isModalOpen]);

  const handleFilter = async () => {
    try {
      setIsloading(true);
      const queryParams = new URLSearchParams();

      if (searchQuery && searchQuery.trim() !== '') {
        queryParams.append('search', searchQuery.trim());
      }

      queryParams.append('page', paginationModel.page + 1);
      queryParams.append('limit', paginationModel.pageSize);
      queryParams.append('categoryName', tagName);

      const url = `${urls.tag.fetchWithPagination}?${queryParams.toString()}`;

      const response = await getApi(url);
      const allTags = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };

      setTags(allTags);
      setFilteredTags(allTags);
      setTotalRows(pagination?.total);
    } catch (error) {
      toast.error('Failed to fetch filtered tags');
    } finally {
      setIsloading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (searchQuery || tagName) {
      handleFilter();
    } else {
      fetchTags();
    }
  }, [searchQuery, tagName]);

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
    { field: 'name', headerName: 'Configuration', flex: 1 },
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f8f9fb',
              borderRadius: '30px',
              border: '1px solid #e0e0e0',
              paddingLeft: '16px',
              width: '350px',
              height: '40px',
              boxSizing: 'border-box'
            }}
          >
            <GridToolbarQuickFilter
              placeholder="Search..."
              quickFilterParser={(searchInput) =>
                searchInput
                  .split(',')
                  .map((value) => value.trim())
                  .filter((value) => value !== '')
              }
              sx={{
                flex: 1,
                '& .MuiInputBase-root': {
                  paddingLeft: 0
                },
                '& input': {
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none !important',
                  backgroundColor: 'transparent',
                  padding: '8px 8px 8px 0',
                  fontSize: '14px',
                  color: '#666'
                },
                '& .MuiSvgIcon-root': {
                  display: 'none'
                },
                '& .MuiInputBase-root:before, & .MuiInputBase-root:after': {
                  display: 'none'
                }
              }}
            />

            <SearchIcon sx={{ color: '#888', marginRight: '12px' }} />
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
            <Controller
              name="tagDescription"
              control={control}
              rules={{ required: 'Tag Description is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Description"
                  size="small"
                  error={!!errors.tagDescription}
                  helperText={errors.tagDescription?.message}
                />
              )}
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

          <Grid item xs={12} sm={6}>
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
                  error={!!errors.tagCategoryName}
                  helperText={errors.tagCategoryName?.message}
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
          <Card style={{ height: 'auto' }}>
            <DataGrid
              rows={
                isLoading
                  ? []
                  : filteredTags.map((row, index) => ({
                      ...row,
                      sNo: paginationModel.page * paginationModel.pageSize + index + 1
                    }))
              }
              columns={columns}
              rowCount={totalRows}
              loading={isLoading}
              pagination
              paginationMode="server"
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[5, 10, 25, 50]}
              getRowId={(row) => row._id}
              slots={{
                toolbar: () => <CustomHeader />,
                loadingOverlay: () => (
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'self-start',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)'
                    }}
                  >
                    <SingleRowLoader />
                  </Box>
                ),
                noRowsOverlay: () => (isLoading ? null : <Box sx={{ padding: 2, textAlign: 'center' }}>No data available.</Box>)
              }}
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
              <Button variant="contained" sx={{ background: '#053146' }} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'SAVE  CHANGES'}
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="error" onClick={() => navigate('/tags')}>
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
                  rules={{ required: 'Description is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Description"
                      size="small"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="startDate"
                    control={control}
                    rules={{ required: 'Start Date is required' }}
                    render={({ field }) => (
                      <DatePicker
                        label="Start Date"
                        {...field}
                        onChange={(date) => field.onChange(date)}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth size="small" error={!!errors.startDate} helperText={errors.startDate?.message} />
                        )}
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
                    rules={{
                      required: 'End Date is required',
                      validate: (value) => {
                        if (!value) return 'End Date is required';
                        if (getValues('startDate') && value.isBefore(getValues('startDate'))) {
                          return 'End Date must be same or after Start Date';
                        }
                        return true;
                      }
                    }}
                    render={({ field }) => (
                      <DatePicker
                        label="End Date"
                        {...field}
                        onChange={(date) => field.onChange(date)}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth size="small" error={!!errors.endDate} helperText={errors.endDate?.message} />
                        )}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="note"
                  control={control}
                  rules={{ required: 'Note is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Note"
                      size="small"
                      multiline
                      rows={3}
                      error={!!errors.note}
                      helperText={errors.note?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" sx={{ background: '#053146' }} onClick={handleSubmit(onSubmit)} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'SAVE CHANGES'}
            </Button>

            <Button onClick={() => setIsModalOpen(false)} variant="outlined" color="error">
              CANCEL
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Grid>
  );
};

export default TagForm;
