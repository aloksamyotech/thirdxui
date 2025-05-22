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
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';

const BulkDelete = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(true);
  const [activityType, setActivityTypeFilter] = useState('');
  const [sessionName, setSessionNameFilter] = useState('');
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [confirmUnarchiveOpen, setConfirmUnarchiveOpen] = useState(false);
  const [includeArchives, setIncludeArchives] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rows, setRows] = useState([]);
  const [dateAddedFilter, setDateAddedFilter] = useState(dayjs());
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

  const handleConfirmUnarchive = async () => {
    try {
      await updateApi(`${urls.serviceuser.unarchive}/${selectedUser.id}`, { archive: false });
      toast.success('User unarchived successfully!');
      setConfirmUnarchiveOpen(false);
      fetchpeople();
    } catch (error) {
      console.error('Error unarchiving user:', error);
      toast.error('Failed to unarchive the user.');
    }
  };

  const handleUnarchiveClick = (user) => {
    setSelectedUser(user);
    setConfirmUnarchiveOpen(true);
  };

  const fetchpeople = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        archive: 'true',
        role: 'service_user'
      });

      const response = await getApi(`${urls.serviceuser.fetchWithPagination}?${queryParams.toString()}`);
      const allUser = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };
      const formattedUsers = allUser?.map((user, index) => ({
        id: user._id,
        serialNumber: `#C-${(index + 1).toString().padStart(3, '0')}`,
        name: `${user.personalInfo?.firstName || ''} ${user.personalInfo?.lastName || ''}`,
        firstName: user.personalInfo?.firstName || '',
        lastName: user.personalInfo?.lastName || '',
        address: user.contactInfo?.addressLine1 || '',
        country: user.contactInfo?.country || '',
        postcode: user.contactInfo?.postcode || '',
        type: 'person'
      }));

      setRows(formattedUsers);
      setTotalRows(pagination?.total);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      toast.error('Failed to fetch archived users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchpeople();
  }, [paginationModel]);

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
            People List
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GridToolbarExport />
          </Box>
        </GridToolbarContainer>
      </Box>
    );
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
                {params.row.address}, {params.row.postcode}, {params.row.country}
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
              <IconButton>
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
        <Typography variant="h5">Archives</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
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
        </Stack>
      </Stack>

      <Grid container spacing={2}>
        <FilterPanel
          showFilter={showFilter}
          activityTypes={activityTypes}
          setActivityTypeFilter={setActivityTypeFilter}
          sessionNames={sessionNames}
          setSessionNameFilter={setSessionNameFilter}
          dateAddedFilter={dateAddedFilter}
          setDateAddedFilter={setDateAddedFilter}
          includeArchives={includeArchives}
          setIncludeArchives={setIncludeArchives}
          selectedFilters={['activityTypeFilter', 'dateAddedFilter', 'sessionNameFilter', 'includeArchives']}
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
                slots={{
                  toolbar: () => <CustomHeader />,
                  loadingOverlay: () => (
                    <Box
                      sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'self-start',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      }}
                    >
                      <SingleRowLoader />
                    </Box>
                  ),
                  noRowsOverlay: () => (
                    loading ? null : (
                      <Box sx={{ padding: 2, textAlign: 'center' }}>
                        No data available.
                      </Box>
                    )
                  ),
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

export default BulkDelete;
