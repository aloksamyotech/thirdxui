import React from 'react';
import { Card, Grid, IconButton, Tooltip, Typography, InputBase } from '@mui/material';
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
import { ROLES } from 'common/constants';
import CustomHeader from 'components/CustomHeader';
const List = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(true);
  const [sessionName, setSessionNameFilter] = useState('');
  const [listType, setListType] = useState('Service user');
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmUnarchiveOpen, setConfirmUnarchiveOpen] = useState(false);
  const [includeServiceuser, setIncludeServiceuser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rows, setRows] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });

  const activityTypes = [
    { value: 'outreach', label: 'Outreach' },
    { value: 'training', label: 'Training' }
  ];
  const sessionNames = [
    { value: 'sessionA', label: 'Session A' },
    { value: 'sessionB', label: 'Session B' }
  ];
  const listTypeFilter = [
    { value: 'Service user', label: 'Service user' },
    { value: 'Volunteer', label: 'Volunteer ' },
    { value: 'Service', label: 'Service ' },
    { value: 'Case', label: 'Case' },
    { value: 'Donor', label: 'Donor' },
    { value: 'Mailing List', label: 'Mailing List' },
    { value: 'Donation', label: 'Donation' },
    { value: 'Form', label: 'Form' }
  ];
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

  const dateAddedFilters = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'year', label: 'Last 1 Year' }
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
            deleted: 'true'
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
            deleted: 'true'
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
            deleted: 'true'
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
            deleted: 'true'
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
            deleted: 'true'
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
            deleted: 'true'
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
            deleted: 'true'
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
          filtered = (res?.data?.data || []).filter((item) => item?.isDeleted === true);
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

  const columns = (listType) => [
    {
      field: 'person',
      headerName: 'Details',
      flex: 1,
      renderCell: (params) => {
        const row = params.row;

        switch (listType) {
          case 'Form':
            return (
              <Box>
                <Typography fontWeight={500}>{row.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {row.publicId} | Template: {row.template}
                </Typography>
              </Box>
            );

          case 'Mailing List':
            return (
              <Box>
                <Typography fontWeight={500}>{row.listName}</Typography>
              </Box>
            );

          case 'Service':
            return (
              <Box>
                <Typography fontWeight={500}>
                  {row.name} Code: {row.uniqueId}
                </Typography>
              </Box>
            );
          //   case 'Donation':
          //     return <Box></Box>;
          default:
            return (
              <Stack direction="row" alignItems="center" spacing={2} width="100%" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={2}>
                  <PersonIcon />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 450 }}>
                      {row.name} {row.lastName} {row.uniqueId}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {row.address}, {row.district}, {row.postcode}, {row.country}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Tooltip title="Info" arrow>
                    <IconButton onClick={() => handleViewInfo(row.id, row.role)}>
                      <InfoIcon sx={{ color: '#49494c' }} />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            );
        }
      }
    }
  ];

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
        <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">
          Bulk Delete
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
                columns={columns(listType)}
                loading={loading}
                rowHeight={65}
                getRowId={(row) => row.id}
                checkboxSelection
                onRowSelectionModelChange={(newSelection) => {
                  setSelectedIds(newSelection);
                }}
                slots={{
                  toolbar: () => (
                    <CustomHeader
                      entityType="service_user"
                      title={`${listType} List`}
                      selectedIds={selectedIds}
                      enableBulkActions={true}
                      exportEnabled={true}
                      extraActions={null}
                      refetchData={fetchListData}
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
    </>
  );
};

export default List;
