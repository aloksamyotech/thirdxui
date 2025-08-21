import { useState, useEffect } from 'react';
import { Stack, Grid, Typography, Box, Card, InputBase, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import ApartmentIcon from '@mui/icons-material/Apartment';
import FilterPanel from 'components/FilterPanel';
import DonorTypeDialog from './donorType.js';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader.js';
import CustomHeader from 'components/CustomHeader.js';
import { dateAddedFilters, statusFilter } from 'common/constants.js';
const donorTypes = [
  { value: 'donar_individual', label: 'Individual' },
  { value: 'donar_company', label: 'Company' },
  { value: 'donar_group', label: 'Group' }
];

const Donor = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [status, setStatus] = useState('');
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [donorType, setDonorType] = useState('');
  const [name, setNameFilter] = useState('');
  const [campaign, setCampaignFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);
  const [campaignTypeOptions, setCampaignTypeOptions] = useState([]);
  const [nameFilterOptions, setNameFilterOptions] = useState([]);
  const [rows, setRows] = useState([]);
  const [includeArchives, setIncludeArchives] = useState(false);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });

  const columns = [
    {
      field: 'person',
      headerName: 'Details',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={2} width="100%" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            {params.row.subRole === 'donar_individual' ? <PersonIcon /> : <ApartmentIcon />}

            <Box>
              <Typography variant="body1" sx={{ fontWeight: 450 }} mb={1}>
                {params.row.personalInfo?.firstName && params.row.personalInfo?.lastName
                  ? `${params.row.personalInfo.firstName} ${params.row.personalInfo.lastName}`
                  : params.row.companyInformation?.companyName
                  ? params.row.companyInformation.companyName
                  : ''}
                {params.row.serialNumber || 'No Serial Number'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {params.row.contactInfo?.email || ''}
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (!event.target.value.trim()) {
      fetchDonor();
    }
  };

  const handleFilter = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      if (status) queryParams.append('status', status === 'active');
      if (name) queryParams.append('name', name);
      if (donorType) queryParams.append('subRole', donorType);
      if (startDate) {
        queryParams.append('startDate', new Date(startDate).toISOString());
      }
      if (endDate) {
        queryParams.append('endDate', new Date(endDate).toISOString());
      }
      if (campaign) queryParams.append('campaigns', campaign);

      if (dateOpenedFilter) {
        const formattedDate = new Date(dateOpenedFilter).toISOString().split('T')[0];
        queryParams.append('createdAt', formattedDate);
      }

      if (searchQuery && searchQuery.trim() !== '') {
        queryParams.append('search', searchQuery.trim());
      }

      if (!includeArchives) {
        queryParams.append('archive', 'false');
      }
      queryParams.append('page', paginationModel.page + 1);
      queryParams.append('limit', paginationModel.pageSize);
      queryParams.append('role', 'donor');

      const url = `${urls.serviceuser.fetchWithPagination}?${queryParams.toString()}`;

      const response = await getApi(url);

      const allDonor = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };

      const formattedUsers = allDonor?.map((donor, index) => ({
        ...donor,
        serialNumber: `#${donor?.uniqueId}`
      }));

      setRows(formattedUsers);
      setTotalRows(pagination?.total);
      setIsFiltered(true);
    } catch (error) {
      console.error('Failed to fetch filtered donors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFilter();
  }, [includeArchives]);

  const handleReset = () => {
    setStatus('');
    setCampaignFilter('');
    setNameFilter('');
    setDateOpenedFilter('');
    setSearchQuery('');
    setStartDate(null);
    setDonorType('');
    setEndDate(null);
    setIsFiltered(false);
    setIncludeArchives(false);
    setPaginationModel({
      page: 0,
      pageSize: 10
    });
  };

  useEffect(() => {
    if (status || dateOpenedFilter || name || campaign || searchQuery || startDate || endDate||donorType) {
      handleFilter();
    } else {
      fetchDonor();
    }
  }, [status, dateOpenedFilter, name, campaign, searchQuery, paginationModel, isFiltered, startDate, endDate,donorType]);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await getApi(urls.configuration.fetch);

        const options = response?.data?.allConfiguration
          ?.filter((item) => item.configurationType === 'Campaign')
          ?.map((item) => ({
            value: item._id,
            label: item.name
          }));

        setCampaignTypeOptions(options);
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    };
    fetchCampaign();
  }, []);

  const fetchDonor = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        role: 'donor'
      });

      if (!includeArchives) {
        queryParams.append('archive', 'false');
      }
      const response = await getApi(`${urls.serviceuser.fetchWithPagination}?${queryParams.toString()}`);

      const allDonor = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };

      const nameOptions = allDonor
        .map((donor) => {
          if (donor.subRole === 'donar_individual') {
            return {
              value: donor?._id || '',
              label: `${donor.personalInfo?.firstName} ${donor.personalInfo?.lastName}`
            };
          } else {
            return {
              value: donor?._id || '',
              label: donor.companyInformation?.companyName || ''
            };
          }
        })
        .filter((option) => option.value && option.value.trim() !== '');

      setNameFilterOptions(nameOptions);

      const formattedUsers = allDonor?.map((donor, index) => ({
        ...donor,
        serialNumber: `#${donor?.uniqueId}`
      }));

      setRows(formattedUsers);
      setTotalRows(pagination?.total);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card sx={{ backgroundColor: '#eef2f6' }}>
        <Grid>
          <Stack direction="row" alignItems="center" justifyContent="space-between" m={1} marginBlock={3}>
            <Tooltip title="Add" arrow>
              <IconButton
                onClick={() => setOpenDialog(true)}
                sx={{
                  backgroundColor: '#009fc7',
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  paddingInline: '15px',
                  paddingBlock: '7px',
                  borderRadius: '10px',
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
                Add New Donor <AddIcon fontSize="small" />
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
              statuses={statusFilter}
              statusFilter={status}
              setStatusFilter={setStatus}
              dateAddedFilters={dateAddedFilters}
              dateOpenedFilter={dateOpenedFilter}
              setDateOpenedFilter={setDateOpenedFilter}
              names={nameFilterOptions}
              nameFilter={name}
              donorTypes={donorTypes}
              setDonorTypeFilter={setDonorType}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              setNameFilter={setNameFilter}
              campaigns={campaignTypeOptions}
              campaignFilter={campaign}
              setCampaignFilter={setCampaignFilter}
              includeArchives={includeArchives}
              setIncludeArchives={setIncludeArchives}
              selectedFilters={['donorTypeFilter', 'startDate', 'endDate', 'campaignFilter']}
              customDateLabel="By Date"
              onReset={handleReset}
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
                  pageSizeOptions={[5, 10, 25, 50]}
                  paginationMode="server"
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  onRowSelectionModelChange={(newSelection) => {
                    setSelectedIds(newSelection);
                  }}
                  rowHeight={70}
                  getRowId={(row) => row._id}
                  onRowClick={(params) => navigate('/view-donor', { state: params.row })}
                  slots={{
                    toolbar: () => (
                      <CustomHeader
                        entityType="donor"
                        title="Donor List"
                        selectedIds={selectedIds}
                        enableBulkActions={false}
                        exportEnabled={true}
                        extraActions={null}
                        refetchData={fetchDonor}
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
                  sx={{
                    '& .MuiDataGrid-columnHeaders': { display: 'none' },
                    '& .MuiDataGrid-cell': { textAlign: 'left', fontSize: '14px' },
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

      <DonorTypeDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  );
};

export default Donor;
