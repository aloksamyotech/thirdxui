import { useState, useEffect, useMemo } from 'react';
import { Stack, Grid, Typography, Box, Card, TextField, IconButton, Tooltip, InputBase, Menu, MenuItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import FilterPanel from 'components/FilterPanel';
import { getApi } from 'common/apiClient';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';
import { IconTrash } from '@tabler/icons';
import { urls } from 'common/urls';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';
import CustomHeader from 'components/CustomHeader';

const districts = [
  { label: 'Adur and Worthing Borough', value: 'adur_worthing_borough' },
  { label: 'Adur District', value: 'adur_district' },
  { label: 'Amber Valley Borough', value: 'amber_valley_borough' },
  { label: 'Arun District', value: 'arun_district' },
  { label: 'Ashford Borough', value: 'ashford_borough' },
  { label: 'Babergh District', value: 'babergh_district' },
  { label: 'Ashfield District', value: 'ashfield_district' },
  { label: 'Basildon Borough', value: 'basildon_borough' }
];

const dateAddedFilters = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Last 7 Days' },
  { value: 'month', label: 'Last 30 Days' },
  { value: 'year', label: 'Last 1 Year' }
];

const genders = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Non-Binary', label: 'Non-Binary' },
  { value: 'Others', label: 'Prefer not to say' }
];

const Volunteer = () => {
  const navigate = useNavigate();
  const [districtFilter, setDistrictFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [showFilter, setShowFilter] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);

  const [isFiltered, setIsFiltered] = useState(false);
  const [dateOpenedFilter, setDateOpenedFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [includeArchives, setIncludeArchives] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });

  const district = useMemo(() => {
    return districts.map((type) => ({
      value: type.value,
      label: type.label
    }));
  }, []);

  const gender = useMemo(() => {
    return genders.map((type) => ({
      value: type.value,
      label: type.label
    }));
  }, []);

  const columns = [
    {
      field: 'details',
      headerName: 'Details',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={2} width="100%" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <PersonIcon />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 450 }}>
                {params.row.firstName} {params.row.lastName} {params.row.serialNumber}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {params.row.address} {params.row.country} {params.row.postcode}
              </Typography>
            </Box>
          </Stack>

          <Tooltip title="Info" arrow>
            <IconButton>
              <InfoIcon sx={{ color: '#49494c' }} />
            </IconButton>
          </Tooltip>
        </Stack>
      )
    }
  ];

  const handleFilter = async () => {
    try {
      const queryParams = new URLSearchParams();

      if (districtFilter) queryParams.append('district', districtFilter);
      if (genderFilter) queryParams.append('gender', genderFilter);
      if (dateOpenedFilter) {
        const formattedDate = new Date(dateOpenedFilter).toISOString().split('T')[0];
        queryParams.append('createdAt', formattedDate);
      }
      if (searchQuery && searchQuery.trim() !== '') {
        queryParams.append('search', searchQuery.trim());
      }

      queryParams.append('page', paginationModel.page + 1);
      queryParams.append('limit', paginationModel.pageSize);
      if (!includeArchives) {
        queryParams.append('archive', 'false');
      }
      queryParams.append('role', 'volunteer');

      const url = `${urls.serviceuser.fetchWithPagination}?${queryParams.toString()}`;
      const response = await getApi(url);

      const allUser = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };
      const formattedUsers = allUser?.map((user, index) => ({
        id: user._id,
        serialNumber: `#${user?.uniqueId}`,
        firstName: user.personalInfo?.firstName || '',
        lastName: user.personalInfo?.lastName || '',
        address: user.contactInfo?.addressLine1 || '',
        country: user.contactInfo?.country || '',
        postcode: user.contactInfo?.postcode || '',
        role: user?.role || ''
      }));

      setRows(formattedUsers);
      setTotalRows(pagination?.total);
      setIsFiltered(true);
    } catch (error) {
      console.error('Failed to fetch filtered services:', error);
    }
  };

  useEffect(() => {
    if (districtFilter || genderFilter || dateOpenedFilter || searchQuery || isFiltered) {
      handleFilter();
    }
  }, [districtFilter, genderFilter, dateOpenedFilter, searchQuery, paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    handleFilter();
  }, [includeArchives]);

  const handleReset = () => {
    setDistrictFilter('');
    setGenderFilter('');
    setDateOpenedFilter(null);
    setSearchQuery('');
    setIncludeArchives(false);
    setIsFiltered(false);
    handleFilter();
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchpeople = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        role: 'volunteer'
      });

      if (!includeArchives) {
        queryParams.append('archive', 'false');
      }

      const response = await getApi(`${urls.serviceuser.fetchWithPagination}?${queryParams.toString()}`);
      const allUser = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };
      const formattedUsers = allUser?.map((user, index) => ({
        id: user._id,
        serialNumber: `#${user?.uniqueId}`,
        firstName: user.personalInfo?.firstName || '',
        lastName: user.personalInfo?.lastName || '',
        address: user.contactInfo?.addressLine1 || '',
        country: user.contactInfo?.country || '',
        postcode: user.contactInfo?.postcode || '',
        role: user?.role || ''
      }));

      setRows(formattedUsers);
      setTotalRows(pagination?.total);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchpeople();
  }, [paginationModel]);

  return (
    <Card sx={{ backgroundColor: '#eef2f6' }}>
      <Grid>
        <Stack direction="row" alignItems="center" justifyContent="space-between" m={1} marginBlock={3}>
          <Tooltip title="Add" arrow>
            <IconButton
              onClick={() => navigate('/add-volunteer')}
              sx={{
                textTransform: 'none',
                whiteSpace: 'nowrap',
                paddingInline: '15px',
                paddingBlock: '7px',
                borderRadius: '10px',
                backgroundColor: '#009fc7',
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
              Add New Volunteer <AddIcon fontSize="small" />
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
        <Grid container spacing={2}>
          <FilterPanel
            showFilter={showFilter}
            districts={district}
            districtFilter={districtFilter}
            setDistrictFilter={(val) => {
              setDistrictFilter(val);
            }}
            genders={gender}
            genderFilter={genderFilter}
            setGenderFilter={setGenderFilter}
            dateOpenedFilter={dateOpenedFilter}
            setDateOpenedFilter={(value) => setDateOpenedFilter(value)}
            includeArchives={includeArchives}
            setIncludeArchives={setIncludeArchives}
            selectedFilters={['districtFilter', 'dateOpenedFilter', 'genderFilter', 'includeArchives']}
            onReset={handleReset}
            customDateLabel="By Date Added"
          />

          <Grid item xs={9}>
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
                onRowSelectionModelChange={(newSelection) => {
                  setSelectedIds(newSelection);
                }}
                pageSizeOptions={[5, 10, 25, 50]}
                rowHeight={65}
                getRowId={(row) => row.id}
                onRowClick={(params) => navigate('/view-people', { state: params.row })}
                slots={{
                  toolbar: () => (
                    <CustomHeader
                      entityType="volunteer"
                      title="Volunteer List"
                      selectedIds={selectedIds}
                      enableBulkActions={false}
                      exportEnabled={true}
                      extraActions={null}
                      refetchData={fetchpeople}
                    />
                  ),
                  loadingOverlay: () => (
                    <Box
                      sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'self-start',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)'
                      }}
                    >
                      <SingleRowLoader />
                    </Box>
                  ),
                  noRowsOverlay: () => (loading ? null : <Box sx={{ padding: 2, textAlign: 'center' }}>No data available.</Box>)
                }}
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    display: 'none'
                  },
                  '& .MuiDataGrid-cell': {
                    textAlign: 'left',
                    fontSize: '14px'
                  },
                  '& .MuiDataGrid-row': {
                    cursor: 'pointer'
                  }
                }}
                disableSelectionOnClick
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Volunteer;
