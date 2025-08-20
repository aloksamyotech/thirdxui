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
  Chip,
  MenuItem,
  Tooltip
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import AntSwitch from 'components/AntSwitch.js';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { postApi, getApi, updateApi } from 'common/apiClient';
import { urls } from 'common/urls';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';
import { useEffect } from 'react';
import { GridToolbarQuickFilter } from '@mui/x-data-grid';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { TagCategoryAppliedToOptions } from 'common/constants';

const TagForm = () => {
  const navigate = useNavigate();
  const [filteredTags, setFilteredTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsloading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [totalRows, setTotalRows] = useState(0);
  const [tagName, setTagName] = useState('');

  const [categoryData, setCategoryData] = useState({
    name: '',
    appliedTo: [],
    isActive: true
  });

  const location = useLocation();
  const { id } = location.state || {};

  const fetchTagCategoryData = async () => {
    try {
      const res = await getApi(`${urls.tagCategory.getById}/${id}`);
      const data = {
        name: res.data?.tagCategoryData?.name,
        appliedTo: res.data?.tagCategoryData?.appliedTo,
        isActive: res.data?.tagCategoryData?.isActive
      };
      setCategoryData(data);
    } catch (error) {
      console.log("Error===>", error);
    }
  }

  const handleEdit = async () => {
    try {
      const res = await updateApi(`${urls.tagCategory.editTagCategory}/${id}`, categoryData);
      if (res.success == true) {
        toast.success('Tags created successfully');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error('Internal server error');
    }
  }

  useEffect(() => {
    if (id) fetchTagCategoryData();
  }, [id]);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      tagCategoryId: id,
      startDate: null,
      endDate: null,
      note: ''
    }
  });
  const onSubmit = async (data) => {
    setIsloading(true);
    try {
      const response = await postApi(urls.tag.create, data);
      toast.success('Tags created successfully');
      setIsModalOpen(false);
      reset();
    } catch (error) {
      toast.error('Internal server error, Try again');
    } finally {
      setIsloading(false);
    }
  };

  const fetchTags = async () => {
    setIsloading(true);
    try {
      const response = await getApi(`${urls.tag.fetchWithPagination}?page=${paginationModel.page + 1}&limit=${paginationModel.pageSize}&categoryId=${id}`);
      const allTags = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };
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

      setFilteredTags(allTags);
      setTotalRows(pagination?.total);
    } catch (error) {
      toast.error('Failed to fetch filtered tags');
    } finally {
      setIsloading(false);
    }
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
      toast.success('Tags update successfully');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Tags Name', flex: 1 },
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
            Tags List
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
        <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">
          <IconButton onClick={() => navigate(-1)}>
            <KeyboardBackspaceIcon sx={{ fontSize: 20, color: 'black' }} />
          </IconButton>
          Edit Tags Category
        </Typography>
      </Box>

      <Card sx={{ position: 'relative', p: 2, mt: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Category Name"
              size="medium"
              value={categoryData.name}
              onChange={(e) =>
                setCategoryData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Tags can be applied to</InputLabel>
              <Select
                multiple
                value={categoryData.appliedTo}
                onChange={(e) =>
                  setCategoryData((prev) => ({ ...prev, appliedTo: e.target.value }))
                }
                input={<OutlinedInput label="Tags can be applied to" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {TagCategoryAppliedToOptions.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <AntSwitch
                  checked={categoryData.isActive}
                  onChange={(e) =>
                    setCategoryData((prev) => ({
                      ...prev,
                      isActive: e.target.checked
                    }))
                  }
                  color="primary"
                  size="medium"
                />
              }
              label="Active?"
              labelPlacement="start"
              sx={{
                '.MuiFormControlLabel-label': {
                  mr: 1
                }
              }}
            />
          </Grid>
        </Grid>


        <Grid item xs={12} mt={3}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} spacing={2} sx={{ width: '100%' }}>
            <Typography sx={{ fontWeight: '450' }}>Tags in this Category</Typography>

            <Stack direction="row" alignItems="center" spacing={1}>

              <Tooltip title="Add" arrow>
                <IconButton
                  onClick={() => setIsModalOpen(true)}
                  sx={{
                    backgroundColor: '#009fc7',
                    borderRadius: '8px',
                    width: '119px',
                    height: '36px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    gap: 1,
                    fontSize: '14px',
                    // padding: '22px',
                    '&:hover': {
                      backgroundColor: '#009fc7'
                    }
                  }}
                >
                  Add Tags
                  <AddIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Grid>

        <Box width="100%" sx={{ mt: 1 }}>

          <Card style={{ height: 'auto', maxHeight: '377px', overflow: 'auto' }}>
            <Box sx={{ height: '350px', minHeight: '350px' }}>
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
                  noRowsOverlay: () =>
                    isLoading ? null : (
                      <Box sx={{ padding: 2, textAlign: 'center' }}>
                        No data available.
                      </Box>
                    )
                }}
                sx={{
                  '& .MuiDataGrid-cell': {
                    textAlign: 'left',
                    fontSize: '14px'
                  }
                }}
                disableSelectionOnClick
              />
            </Box>
          </Card>


          <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt: 1, pr: 2 }}>
            <Grid item>
              <Button
                variant="contained" sx={{
                  background: '#053146', borderRadius: '8px',
                  // paddingInline: 4,
                  '&:hover': {
                    backgroundColor: '#053146'
                  },
                  px: 4,
                  py: 1,
                  fontWeight: 600,
                }}
                onClick={handleEdit}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'SAVE CHANGES'}
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => navigate(-1)}
                sx={{
                  border: '1px solid #c5c5ff',
                  borderRadius: '8px',
                  color: '#5c5cff',
                  textTransform: 'none',
                  px: 4,
                  py: 1,
                  fontWeight: 600,
                  backgroundColor: '#fff',
                  '&:hover': {
                    backgroundColor: '#f8f8ff'
                  }
                }}
              >
                CANCEL
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} >
          <DialogTitle>
            <Typography fontWeight="600" fontSize="16px">Add Tags</Typography>
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
                      label="Tags Name"
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
            <Button
              variant="contained" sx={{
                background: '#053146', borderRadius: '8px',
                paddingInline: 3,
                paddingBlock: 1,
                '&:hover': {
                  backgroundColor: '#053146'
                },
              }}
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'SAVE CHANGES'}
            </Button>

            <Button
              onClick={() => setIsModalOpen(false)}
              sx={{
                border: '1px solid #c5c5ff',
                borderRadius: '8px',
                color: '#5c5cff',
                textTransform: 'none',
                px: 4,
                py: 1,
                fontWeight: 600,
                backgroundColor: '#fff',
                '&:hover': {
                  backgroundColor: '#f8f8ff'
                }
              }}
            >
              CANCEL
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Grid>
  );
};

export default TagForm;
