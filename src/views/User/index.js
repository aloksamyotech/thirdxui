/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Grid,
  Typography,
  Box,
  Card,
  Chip,
  Tooltip,
  IconButton,
  Modal,
  TextField,
  Button,
  InputBase,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { Close } from '@mui/icons-material';
import { IconTrash, IconPencil } from '@tabler/icons';
import FilterPanel from 'components/FilterPanel';
import CheckIcon from '@mui/icons-material/Check';
import LoopIcon from '@mui/icons-material/Loop';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { urls } from 'common/urls';
import { getApi, updateApi } from 'common/apiClient';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';
import toast from 'react-hot-toast';
import config from '../../config';

const User = () => {
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [status, setStatus] = useState('');
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [countryOfOriginFilter, setCountryOfOriginFilter] = useState('');
  const [countriesWithFlags, setCountriesWithFlags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [nameFilterOptions, setNameFilterOptions] = useState([]);
  const [selectedName, setSelectedName] = useState('');

  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 2,
      renderCell: (params) => (
        <Box>
          <Typography sx={{ fontWeight: '450' }} mb={1}>
            {params.row.name || '-'}
          </Typography>
          <Typography sx={{ fontSize: '12px', color: 'gray' }}>{params.row.email || '-'}</Typography>
        </Box>
      )
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1.2,
      valueGetter: (params) => params.value || '-'
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1.5,
      renderCell: (params) => (
        <Chip
          label={params.value}
          icon={params.value === 'Open' ? <CheckIcon sx={{ color: 'gray' }} /> : <LoopIcon sx={{ color: 'gray' }} />}
          variant="outlined"
          sx={{
            borderColor: params.value === 'Open' ? '#808080' : '#808080',
            backgroundColor: 'transparent',
            color: params.value === 'Open' ? '#808080' : '#808080'
          }}
        />
      )
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 1.5,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {params.row.countryFlag && (
            <img src={params.row.countryFlag} alt={params.row.country} width="24px" height="16px" style={{ border: '1px solid #ccc' }} />
          )}
          <Typography>{params.row.country || '-'}</Typography>
        </Box>
      )
    },
    {
      field: 'age',
      headerName: 'Age',
      flex: 1,
      valueGetter: (params) => (params.value != null ? params.value : '-')
    },
    {
      field: 'actions',
      headerName: 'Manage',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', width: '100%', gap: 1 }}>
          <IconButton color="error" size="small" onClick={() => handleDelete(params.row.id)}>
            <IconTrash color="orangered" size={18} />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => {
              const fullUser = allData.find((user) => user._id === params.row.id);
              navigate('/add-user', { state: fullUser });
            }}
          >
            <IconPencil color="orangered" size={18} />
          </IconButton>
        </Box>
      )
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
              fontSize: '14px',
              lineHeight: '36px'
            }}
          >
            Existing User List
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GridToolbarExport />
          </Box>
        </GridToolbarContainer>
      </Box>
    );
  };
  const statusFilter = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const dateAddedFilters = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'year', label: 'Last 1 Year' }
  ];

  useEffect(() => {
    fetch(config.filter_Country)
      .then((res) => res.json())
      .then((data) => {
        const countries = data.map((country) => ({
          value: country?.name?.common,
          label: country?.name?.common,
          flag: country?.flags?.png
        }));
        setCountriesWithFlags(countries);
      });
  }, []);
  const fetchUserName = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        archive: 'false',
        role: 'user'
      });

      const response = await getApi(`${urls.serviceuser.fetchWithPagination}?${queryParams.toString()}`);
      const allUser = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };

      const nameOptions = allUser
        .map((user) => ({
          value: user._id,
          label: `${user.personalInfo?.firstName || ''} ${user.personalInfo?.lastName || ''}`.trim()
        }))
        .filter((option) => option.value && option.label);

      const formattedUsers = allUser?.map((user, index) => ({
        ...user,
        serialNumber: `#C-${(index + 1).toString().padStart(3, '0')}`
      }));

      setNameFilterOptions(nameOptions);
      setRows(formattedUsers);
      setTotalRows(pagination?.total);
    } catch (error) {
      console.error('Error fetching user names:', error);
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  const fetchUser = async () => {
    if (countriesWithFlags.length === 0) return;

    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        archive: 'false',
        role: 'user'
      });

      if (searchQuery) {
        queryParams.append('search', searchQuery);
      }

      if (status) queryParams.append('status', status === 'active');
      if (dateOpenedFilter && dateOpenedFilter !== '') {
        const formattedDate = new Date(dateOpenedFilter).toISOString().split('T')[0];
        queryParams.append('createdAt', formattedDate);
      }
      if (countryOfOriginFilter) {
        const selectedCountry = countriesWithFlags.find((country) => country.value === countryOfOriginFilter);
        if (selectedCountry) {
          queryParams.append('country', selectedCountry.label);
        }
      }
      if (selectedName) {
        queryParams.append('name', selectedName);
      }

      const response = await getApi(`${urls.serviceuser.fetchWithPagination}?${queryParams.toString()}`);

      const allUser = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };

      setAllData(allUser);
      const formattedUsers = allUser?.map((user, index) => {
        const dob = new Date(user.personalInfo?.dateOfBirth);
        const today = new Date();

        let age = '';
        if (!isNaN(dob)) {
          age = today.getFullYear() - dob.getFullYear();
          const m = today.getMonth() - dob.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
          }
        }

        const countryName = user?.contactInfo?.country || '';
        const matchedCountry = countriesWithFlags.find((c) => c.label.toLowerCase() === countryName.toLowerCase());

        return {
          id: user?._id,
          serialNumber: `#C-${(index + 1).toString().padStart(3, '0')}`,
          name: `${user?.personalInfo?.firstName || ''} ${user?.personalInfo?.lastName || ''}`.trim(),
          date: user?.createdAt ? new Date(user?.createdAt).toLocaleDateString() : '',
          email: user?.contactInfo?.email || '',
          country: countryName,
          countryFlag: matchedCountry?.flag || '',
          age: age || '',
          status: user?.isActive === true ? 'Open' : 'Closed'
        };
      });

      setRows(formattedUsers);
      setTotalRows(pagination?.total);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [countriesWithFlags, paginationModel, status, dateOpenedFilter, selectedName, searchQuery, countryOfOriginFilter]);

  const handleDelete = async (id) => {
    setShowDeleteModal(true);
    setUserIdToDelete(id);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setUserIdToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (userIdToDelete) {
      try {
        await updateApi(urls.serviceuser.deleteUser.replace(':userId', userIdToDelete));
        toast.success('User deleted successfully!');
        fetchUser();
      } catch (error) {
        console.error('Error deleting user:', error);
      } finally {
        handleCloseDeleteModal();
      }
    }
  };

  const handleReset = () => {
    setStatus('');
    setDateOpenedFilter('');
    setNameFilter('');
    setSearchQuery('');
    setCountryOfOriginFilter('');
    fetchUser();
  };

  return (
    <>
      <Card sx={{ backgroundColor: '#eef2f6' }}>
        <Grid>
          <Stack direction="row" alignItems="center" justifyContent="space-between" m={1} marginBlock={3}>
            <Tooltip title="Add" arrow>
              <IconButton
                onClick={() => navigate('/add-user')}
                sx={{
                  backgroundColor: '#009fc7',
                  borderRadius: '4px',
                  width: '220px',
                  height: '35px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  gap: 1,
                  fontSize: '14px',
                  padding: '22px',
                  '&:hover': {
                    backgroundColor: '#009fc7'
                  }
                }}
              >
                Add New User
                <AddIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f8f9fa',
                borderRadius: '30px',
                paddingLeft: '16px',
                border: '1px solid #e0e0e0',
                width: '489px',
                height: '45px'
              }}
            >
              <InputBase
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  '& .MuiInputBase-input::placeholder': {
                    fontSize: '12 px',
                    opacity: 1
                  },
                  '& .MuiInputBase-input': {
                    fontSize: '14px'
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '13px'
                  },
                  '& .MuiInputBase-root.Mui-focused': {
                    backgroundColor: '#e0e0e0'
                  },
                  flex: 1,
                  color: 'text.primary'
                }}
              />
              <IconButton
                sx={{
                  marginRight: '8px',
                  width: 18,
                  height: 18,
                  cursor: 'pointer'
                }}
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </Stack>
          <Grid container spacing={2}>
            <FilterPanel
              showFilter={showFilter}
              statuses={statusFilter}
              statusFilter={status}
              setStatusFilter={(value) => setStatus(value)}
              dateAddedFilters={dateAddedFilters}
              dateOpenedFilter={dateOpenedFilter}
              setDateOpenedFilter={(value) => setDateOpenedFilter(value)}
              names={nameFilterOptions}
              nameFilter={selectedName}
              setNameFilter={setSelectedName}
              countriesWithFlags={countriesWithFlags}
              countryOfOriginFilter={countryOfOriginFilter}
              setCountryOfOriginFilter={(value) => setCountryOfOriginFilter(value)}
              selectedFilters={['nameFilter', 'countryOfOriginFilter', 'dateOpenedFilter', 'statusFilter']}
              onReset={handleReset}
              customDateLabel="By Date"
              onApply={fetchUser}
            />
            <Grid item xs={9}>
              <TableStyle>
                <Box width="100%">
                  <Card style={{ height: '100vh' }}>
                    <DataGrid
                      rows={
                        loading
                          ? []
                          : rows.map((row, index) => ({
                              ...row,
                              sNo: paginationModel.page * paginationModel.pageSize + index + 1
                            }))
                      }
                      columns={columns}
                      rowCount={totalRows}
                      loading={loading}
                      pagination
                      paginationMode="server"
                      paginationModel={paginationModel}
                      onPaginationModelChange={setPaginationModel}
                      pageSizeOptions={[5, 10, 25, 50]}
                      checkboxSelection
                      rowHeight={65}
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
                        noRowsOverlay: () => (loading ? null : <Box sx={{ padding: 2, textAlign: 'center' }}>No data available.</Box>)
                      }}
                      getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row')}
                      sx={{
                        '& .MuiDataGrid-row': {
                          borderBottom: '1px solid #ccc'
                        }
                      }}
                    />
                  </Card>
                </Box>
              </TableStyle>
            </Grid>
          </Grid>
        </Grid>
      </Card>
      <Dialog
        open={showDeleteModal}
        onClose={handleCloseDeleteModal}
        maxWidth={false}
        PaperProps={{
          sx: { width: 400, borderRadius: 2 }
        }}
      >
        <Box sx={{ textAlign: 'center', pt: 3 }}>
          <IconButton
            disableRipple
            sx={{
              backgroundColor: '#FFE8E6',
              color: '#FF5C5C',
              pointerEvents: 'none',
              '&:hover': { backgroundColor: '#FFE8E6' }
            }}
          >
            <IconTrash fontSize="small" />
          </IconButton>
        </Box>

        <DialogTitle sx={{ textAlign: 'center', fontWeight: 600, fontSize: 20, color: '#053046' }}>Are you sure?</DialogTitle>

        <DialogContent>
          <Typography align="center" sx={{ fontSize: 14, color: '#0a344a', mb: '-9px' }}>
            You want to delete this user. <br />
            This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            onClick={handleCloseDeleteModal}
            variant="outlined"
            sx={{
              color: '#FF5C5C',
              borderColor: '#FF5C5C',
              textTransform: 'uppercase',
              fontWeight: 480,
              width: 120
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              backgroundColor: '#053046',
              color: '#efeceb',
              textTransform: 'uppercase',
              fontWeight: 380,
              width: 120,
              '&:hover': { backgroundColor: '#053046' }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default User;
