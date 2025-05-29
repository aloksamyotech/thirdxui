import { useState, useEffect } from 'react';
import { Stack, Button, Grid, Typography, Box, Card, TextField, InputBase, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import TableStyle from '../../ui-component/TableStyle';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import FilterPanel from 'components/FilterPanel.js';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';

const dateAddedFilters = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Last 7 Days' },
  { value: 'month', label: 'Last 30 Days' },
  { value: 'year', label: 'Last 1 Year' }
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
            fontWeight: '',
            color: '#333',
            fontSize: '14px',
            lineHeight: '36px'
          }}
        >
          Donation Transactions
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GridToolbarExport />
        </Box>
      </GridToolbarContainer>
    </Box>
  );
};

const Financial = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [name, setNameFilter] = useState('');
  const [nameFilters, setNameFilters] = useState([]);
  const [campaign, setCampaignFilter] = useState('');
  const [user, setUser] = useState([]);
  const [assignedTo, setAssignedTo] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const navigate = useNavigate();
  const [isFiltered, setIsFiltered] = useState(false);
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [loading, setLoading] = useState(true);
  const [campaignTypeOptions, setCampaignTypeOptions] = useState([]);
  const [donorOptions, setDonorOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    {
      field: 'title',
      headerName: 'Date',
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="500">
          {params.value}
        </Typography>
      )
    },
    {
      field: 'type',
      headerName: 'Name',
      flex: 1.5,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 'normal',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
        >
          {params.value}
        </Typography>
      )
    },
    {
      field: 'code',
      headerName: 'Campaign',
      flex: 1,
      renderCell: (params) => <Typography variant="body2">{params.value}</Typography>
    },
    {
      field: 'status',
      headerName: 'Amount',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="600" sx={{ color: 'green' }}>
          {params.value}
        </Typography>
      )
    },
    {
      field: 'more',
      headerName: 'Transaction Id',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <Typography variant="body2">{params.value}</Typography>
    }
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilter = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      if (assignedTo) queryParams.append('donorId', assignedTo);
      if (campaignName) queryParams.append('campaign', campaignName);

      if (dateOpenedFilter && dateOpenedFilter !== '') {
        const formattedDate = new Date(dateOpenedFilter).toISOString().split('T')[0];
        queryParams.append('createdAt', formattedDate);
      }

      if (searchQuery && searchQuery.trim() !== '') {
        queryParams.append('search', searchQuery.trim());
      }

      queryParams.append('page', paginationModel.page + 1);
      queryParams.append('limit', paginationModel.pageSize);

      const url = `${urls.transaction.fetchWithPagination}?${queryParams.toString()}`;
      const response = await getApi(url);

      const allTransaction = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };

      const formattedUsers = allTransaction.map((item, index) => {
        const donor = item?.donorId;
        const donorName =
          donor?.subRole === 'donar_individual'
            ? `${donor?.personalInfo?.firstName || ''} ${donor?.personalInfo?.lastName || ''}`.trim()
            : donor?.companyInformation?.companyName || '';

        return {
          id: item._id || index,
          title: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '',
          type: donorName || 'N/A',
          code: item.campaign?.name || '',
          status: item.amountPaid != null ? `₹${item.amountPaid}` : '',
          more: item.transactionId || ''
        };
      });

      setTotalRows(pagination?.total);
      setRows(formattedUsers);
      setIsFiltered(true);
    } catch (error) {
      console.error('Failed to fetch filtered cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCampaignName('');
    setCampaignFilter('');
    setNameFilter('');
    setDateOpenedFilter('');
    setIsFiltered(false);
    fetchData();
  };

  useEffect(() => {
    if (assignedTo || dateOpenedFilter || isFiltered || searchQuery || campaignName) {
      handleFilter();
    }
  }, [assignedTo, dateOpenedFilter, searchQuery, campaignName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getApi(
          `${urls.transaction.fetchWithPagination}?page=${paginationModel.page + 1}&limit=${paginationModel.pageSize}`
        );
        const allTransaction = response?.data?.data || [];

        const pagination = response?.data?.meta || { total: 0 };

        const formattedTransactions = allTransaction?.map((item, index) => ({
          id: item._id || index,
          title: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '',
          type:
            [
              item?.donorId?.personalInfo?.firstName,
              item?.donorId?.personalInfo?.lastName,
              item?.donorId?.companyInformation?.companyName
            ] || '',

          code: item.campaign?.name || item.campaign || '',
          status: item.amountPaid != null ? `₹${item.amountPaid}` : '',
          more: item.transactionId || ''
        }));

        setRows(formattedTransactions);

        setTotalRows(pagination?.total);
        const nameOptions = allTransaction
          .filter((item) => item?.donorId)
          .map((item) => {
            const donor = item.donorId;
            const hasPersonalInfo = donor?.personalInfo?.firstName || donor?.personalInfo?.lastName;
            const label = hasPersonalInfo
              ? `${donor.personalInfo?.firstName || ''} ${donor.personalInfo?.lastName || ''}`.trim()
              : donor.companyInformation?.companyName || '';

            return {
              value: donor._id || '',
              label
            };
          })
          .filter((option) => option.value && option.label);

        setNameFilters(nameOptions);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [paginationModel]);

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
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await getApi(urls.serviceuser.getalldonor);
        const options = response?.data?.allDonor?.map((donor) => ({
          value: donor._id,
          label:
            donor.companyInformation?.companyName || `${donor.personalInfo?.firstName || ''} ${donor.personalInfo?.lastName || ''}`.trim()
        }));

        setDonorOptions(options);
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };

    fetchDonors();
  }, []);

  return (
    <Card sx={{ backgroundColor: '#eef2f6' }}>
      <Grid>
        <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
          <Tooltip title="Add" arrow>
            <IconButton
              onClick={() => navigate('/add-transaction')}
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
                '&:hover': {
                  backgroundColor: '#1565c0',
                  color: '#ffffff'
                }
              }}
            >
              Add Transaction
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
              width: '350px',
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
                flex: 1,
                color: 'text.primary'
              }}
            />
            <IconButton
              onClick={handleFilter}
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

        <Grid container spacing={2}>
          <FilterPanel
            showFilter={showFilter}
            dateAddedFilters={dateAddedFilters}
            dateOpenedFilter={dateOpenedFilter}
            setDateOpenedFilter={(value) => setDateOpenedFilter(value)}
            names={donorOptions}
            nameFilter={assignedTo}
            setNameFilter={(value) => setAssignedTo(value)}
            campaigns={campaignTypeOptions}
            campaignFilter={campaignName}
            setCampaignFilter={(value) => setCampaignName(value)}
            selectedFilters={['nameFilter', 'dateOpenedFilter', 'campaignFilter']}
            onReset={handleReset}
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
                    rowHeight={65}
                    loading={loading}
                    getRowId={(row) => row.id}
                    pagination
                    paginationMode="server"
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10, 25, 50]}
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
  );
};

export default Financial;
