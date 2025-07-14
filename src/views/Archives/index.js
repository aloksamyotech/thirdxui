import React from 'react';
import {
  Card,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  InputBase,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import InfoIcon from '@mui/icons-material/Info';
import FilterPanel from 'components/FilterPanel';
import dayjs from 'dayjs';
import { getApi, updateApi } from 'common/apiClient';
import { urls } from 'common/urls';
import ArchiveIcon from '@mui/icons-material/Archive';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';
import CustomHeader from 'components/CustomHeader';
import { dateAddedFilters, entityTypeMap, listTypeFilter, ROLES, sessionNames } from 'common/constants';

const Archives = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(true);
  const [activityType, setActivityTypeFilter] = useState('');
  const [sessionName, setSessionNameFilter] = useState('');
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [listType, setListType] = useState('Service user');
  const [searchQuery, setSearchQuery] = useState('');
  const [includeServiceuser, setIncludeServiceuser] = useState(false);
  const [confirmUnarchiveOpen, setConfirmUnarchiveOpen] = useState(false);
  const [includeArchives, setIncludeArchives] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rows, setRows] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });

  const activityTypes = [
    { value: 'outreach', label: 'Outreach' },
    { value: 'training', label: 'Training' }
  ];

  const fetchListData = async () => {
    setLoading(true);
    try {
      let filtered = [];
      let formattedData = [];

      switch (listType) {
        case 'Service user': {
          const queryParams = new URLSearchParams({
            role: ROLES.SERVICE_USER,
            isArchive: 'true'
          });
          const response = await getApi(`${urls.serviceuser.fetchWithPagination}?${queryParams.toString()}`);
          const filtered = response?.data?.data || [];
          formattedData = filtered.map((item) => ({
            id: item._id,
            name: item?.personalInfo?.firstName || '-',
            lastName: item?.personalInfo?.lastName || '-',
            uniqueId: item.uniqueId || '-',
            address: item?.contactInfo?.addressLine1 || '-',
            district: item?.contactInfo?.district || '-',
            country: item?.contactInfo?.country || '-',
            postcode: item?.contactInfo?.postcode || '-'
          }));

          break;
        }

        case 'Volunteer': {
          const queryParams = new URLSearchParams({
            role: ROLES.VOLUNTEER,
            isArchive: 'true'
          });
          const response = await getApi(`${urls.serviceuser.fetchWithPagination}?${queryParams.toString()}`);
          const filtered = response?.data?.data || [];
          formattedData = filtered.map((item) => ({
            id: item._id,
            name: item?.personalInfo?.firstName || '-',
            lastName: item?.personalInfo?.lastName || '-',
            uniqueId: item.uniqueId || '-',
            address: item?.contactInfo?.addressLine1 || '-',
            district: item?.contactInfo?.district || '-',
            country: item?.contactInfo?.country || '-',
            postcode: item?.contactInfo?.postcode || '-'
          }));
          break;
        }

        case 'Donor': {
          const queryParams = new URLSearchParams({
            role: ROLES.DONOR,
            isArchive: 'true'
          });

          const response = await getApi(`${urls.serviceuser.fetchWithPagination}?${queryParams.toString()}`);
          const filtered = response?.data?.data || [];
          formattedData = filtered.map((item) => {
            const fullName =
              item?.personalInfo?.firstName || item?.personalInfo?.lastName
                ? `${item?.personalInfo?.firstName || ''} ${item?.personalInfo?.lastName || ''}`.trim()
                : item?.companyInformation?.companyName || '-';

            return {
              id: item._id,
              name: fullName,
              lastName: item?.personalInfo?.lastName || '-',
              uniqueId: item.uniqueId || '-',
              address: item?.contactInfo?.addressLine1 || '-',
              district: item?.contactInfo?.district || '-',
              country: item?.contactInfo?.country || '-',
              postcode: item?.contactInfo?.postcode || '-'
            };
          });

          break;
        }

        case 'Service': {
          const queryParams = new URLSearchParams({
            isArchive: 'true'
          });
          const response = await getApi(`${urls.service.fetchWithPagination}?${queryParams.toString()}`);
          const filtered = response?.data?.data || [];
          formattedData = filtered.map((item) => ({
            id: item._id,
            name: item.name || '-',
            uniqueId: item.code || '-'
          }));

          break;
        }

        case 'Case': {
          const queryParams = new URLSearchParams({
            isArchive: 'true'
          });

          if (dateOpenedFilter && dateOpenedFilter !== '') {
            const formattedDate = new Date(dateOpenedFilter).toISOString().split('T')[0];
            queryParams.append('createdAt', formattedDate);
          }

          const response = await getApi(`${urls.case.fetchWithPagination}?${queryParams.toString()}`);
          const filtered = response?.data?.data || [];

          formattedData = filtered.map((item) => ({
            id: item._id,
            name: item?.serviceUserId?.personalInfo?.firstName || '-',
            lastName: item?.serviceUserId?.personalInfo?.lastName || '-',
            uniqueId: item?.uniqueId || '-',
            address: item?.serviceUserId?.contactInfo?.addressLine1 || '-',
            district: item?.serviceUserId?.contactInfo?.district || '-',
            country: item?.serviceUserId?.contactInfo?.country || '-',
            postcode: item?.serviceUserId?.contactInfo?.postcode || '-'
          }));
          break;
        }

        case 'Mailing List': {
          const queryParams = new URLSearchParams({
            isArchive: 'true'
          });
          const response = await getApi(`${urls.mail.fetchWithPagination}?${queryParams.toString()}`);
          const filtered = response?.data?.data || [];
          formattedData = filtered.map((item) => ({
            id: item._id,
            listName: item.name || '-'
          }));
          break;
        }

        case 'Donation': {
          const queryParams = new URLSearchParams({
            isArchive: 'true'
          });
          const response = await getApi(`${urls.transaction.fetchWithPagination}?${queryParams.toString()}`);
          const filtered = response?.data?.data || [];
          formattedData = filtered.map((item) => {
            const fullName =
              item?.donorId?.personalInfo?.firstName || item?.donorId?.personalInfo?.lastName
                ? `${item?.donorId?.personalInfo?.firstName || ''} ${item?.donorId?.personalInfo?.lastName || ''}`.trim()
                : item?.donorId?.companyInformation?.companyName || '-';

            return {
              id: item._id,
              name: fullName,
              uniqueId: item?.donorId?.uniqueId || '-',
              address: item?.donorId?.contactInfo?.addressLine1 || '-',
              district: item?.donorId?.contactInfo?.district || '-',
              country: item?.donorId?.contactInfo?.country || '-',
              postcode: item?.donorId?.contactInfo?.postcode || '-'
            };
          });
          break;
        }

        case 'Form': {
          const res = await getApi(urls.forms.getAll);
          filtered = (res?.data?.data || []).filter((item) => item?.isArchive === true);
          formattedData = filtered.map((item) => ({
            id: item._id,
            title: item.title || '-',
            publicId: item.publicId || '-',
            template: item.template || '-'
          }));
          break;
        }

        default:
          console.error('⚠️ No matching listType');
          return;
      }

      setRows(formattedData);
      setLoading(false);
    } catch (error) {
      console.error('❌ API call error:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (listType) {
      fetchListData();
    }
  }, [listType]);

  const handleConfirmUnarchive = async () => {
    try {
      await updateApi(`${urls.serviceuser.unarchive}/${selectedUser.id}`, { archive: false });
      toast.success('User unarchived successfully!');
      setConfirmUnarchiveOpen(false);
      fetchpeople();
    } catch (error) {
      toast.error('Failed to unarchive the user.');
    }
  };

  const handleUnarchiveClick = (user) => {
    setSelectedUser(user);
    setConfirmUnarchiveOpen(true);
  };

  const handleViewInfo = (userId, role) => {
    if (role === ROLES.SERVICE_USER || role === ROLES.VOLUNTEER) {
      navigate('/view-people', { state: { id: userId, isArchive: true } });
    } else if (role === ROLES.DONOR) {
      const user = rows.find((row) => row.id === userId);
      navigate('/view-donor', {
        state: {
          id: userId,
          subRole: user?.subRole,
          isArchive: true
        }
      });
    }
  };

  const fetchpeople = async () => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams();

      if (dateOpenedFilter) {
        const formattedDate = new Date(dateOpenedFilter).toISOString().split('T')[0];
        queryParams.append('createdAt', formattedDate);
      }

      if (searchQuery && searchQuery.trim() !== '') {
        queryParams.append('search', searchQuery.trim());
      }

      queryParams.append('page', paginationModel.page + 1);
      queryParams.append('limit', paginationModel.pageSize);
      queryParams.append('isArchive', 'true');

      const response = await getApi(`${urls.serviceuser.fetchWithPagination}?${queryParams.toString()}`);
      const allUser = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };
      const formattedUsers = allUser?.map((user, index) => ({
        id: user._id,
        serialNumber: `#C-${(index + 1).toString().padStart(3, '0')}`,
        name: `${user.personalInfo?.firstName || ''} ${user.personalInfo?.lastName || ''} ${user.companyInformation?.companyName || ''}`,
        firstName: user.personalInfo?.firstName || '',
        lastName: user.personalInfo?.lastName || '',
        address: user.contactInfo?.addressLine1 || '',
        country: user.contactInfo?.country || '',
        postcode: user.contactInfo?.postcode || '',
        type: 'person',
        role: user.role || 'service_user',
        subRole: user.subRole || ''
      }));

      setRows(formattedUsers);
      setTotalRows(pagination?.total);
    } catch (error) {
      toast.error('Failed to fetch archived users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchpeople();
  }, [paginationModel, searchQuery, dateOpenedFilter]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (!event.target.value.trim()) {
      fetchpeople();
    }
  };

  const handleFilter = () => {
    setPaginationModel({
      page: 0,
      pageSize: paginationModel.pageSize
    });
    fetchpeople();
  };

  const handleReset = () => {
    setDateOpenedFilter('');
    setSearchQuery('');
    setIsFiltered(false);
    setPaginationModel({
      page: 0,
      pageSize: 10
    });
    setListType('Service user');
  };
  const columns = [
    {
      field: 'person',
      headerName: 'Details',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={2} width="100%" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            {params.row.type === 'person' ? <PersonIcon /> : <ApartmentIcon />}
            <Box>
              <Typography variant="body1" sx={{ fontWeight: '450' }}>
                {params.row.name} {params.row.serialNumber}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {params.row.address} {params.row.postcode} {params.row.country}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Tooltip title="Unarchive" arrow>
              <IconButton onClick={() => handleUnarchiveClick(params.row)}>
                <ArchiveIcon sx={{ color: '#49494c' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Info" arrow>
              <IconButton onClick={() => handleViewInfo(params.row.id, params.row.role)}>
                <InfoIcon sx={{ color: '#49494c' }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      )
    }
  ];

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
        <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">
          Archives
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f8f9fa',
              borderRadius: '30px',
              paddingLeft: '16px',
              border: '1px solid #e0e0e0',
              width: '489px',
              height: '40px'
            }}
          >
            <InputBase
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleFilter();
                }
              }}
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
              onClick={handleFilter}
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
      </Stack>

      <Grid container spacing={2}>
        <FilterPanel
          showFilter={showFilter}
          listType={listTypeFilter}
          setListType={setListType}
          sessionNames={sessionNames}
          setSessionNameFilter={setSessionNameFilter}
          dateAddedFilters={dateAddedFilters}
          dateOpenedFilter={dateOpenedFilter}
          setDateOpenedFilter={(value) => setDateOpenedFilter(value)}
          includeServiceuser={includeServiceuser}
          setIncludeServiceuser={setIncludeServiceuser}
          selectedFilters={['listTypeFilter', 'dateOpenedFilter']}
          customDateLabel="By Date"
          onReset={handleReset}
        />
        <Grid item xs={9}>
          <Box width="100%">
            <Card style={{ height: '100vh' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                rowHeight={65}
                getRowId={(row) => row.id}
                onRowSelectionModelChange={(newSelection) => {
                  setSelectedIds(newSelection);
                }}
                slots={{
                  toolbar: () => (
                    <CustomHeader
                      entityType={entityTypeMap[listType] || 'service_user'}
                      title={`${listType} List`}
                      selectedIds={selectedIds}
                      enableBulkActions={false}
                      exportEnabled={true}
                      extraActions={null}
                      refetchData={fetchListData}
                      isCompletlyDelete={true}
                    />
                  ),
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
                paginationMode="server"
                rowCount={totalRows}
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    display: 'none'
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
        </Grid>
      </Grid>

      <Dialog open={confirmUnarchiveOpen} onClose={() => setConfirmUnarchiveOpen(false)}>
        <DialogTitle sx={{ fontWeight: 'bold', color: 'orange' }}>📦 Unarchive User</DialogTitle>
        <DialogContent>Are you sure you want to unarchive {selectedUser?.name}?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmUnarchiveOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirmUnarchive} color="primary" variant="contained">
            Confirm Unarchive
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Archives;
