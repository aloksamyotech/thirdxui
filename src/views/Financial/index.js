import { useState, useEffect } from 'react';
import { Stack, Button, Grid, Typography, Box, Card, TextField, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import TableStyle from '../../ui-component/TableStyle';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import FilterPanel from 'components/FilterPanel.js';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';

const campaignFilter = [
  { value: 'campaign1', label: 'Campaign 1' },
  { value: 'campaign2', label: 'Campaign 2' }
];

const dateAddedFilters = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Last 7 Days' },
  { value: 'month', label: 'Last 30 Days' },
  { value: 'year', label: 'Last 1 Year' }
];

const nameFilter = [
  { value: 'name1', label: 'Name 1' },
  { value: 'name2', label: 'Name 2' }
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
            fontWeight: 'bold',
            color: '#333',
            fontSize: '14px',
            lineHeight: '36px'
          }}
        >
          DONATION TRANSACTIONS
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GridToolbarExport />
        </Box>
      </GridToolbarContainer>
    </Box>
  );
};

const Lead = () => {
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
  const [loading, setLoading] = useState(false);
  const [campaignTypeOptions, setCampaignTypeOptions] = useState([]);
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
      const queryParams = new URLSearchParams();

      if (assignedTo) queryParams.append('assignedTo', assignedTo);
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

      const formattedUsers = allTransaction.map((item, index) => ({
        id: item._id || index,
        title: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '',
        type: item.assignedTo || '',
        code: item.campaign.name || '',
        status: item.amountPaid != null ? `₹${item.amountPaid}` : '',
        more: item.transactionId || ''
      }));

      setTotalRows(pagination?.total);
      setRows(formattedUsers);
      setIsFiltered(true);
    } catch (error) {
      console.error('Failed to fetch filtered cases:', error);
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
        const response = await getApi(
          `${urls.transaction.fetchWithPagination}?page=${paginationModel.page + 1}&limit=${paginationModel.pageSize}`
        );
        const allTransaction = response?.data?.data || [];
        const pagination = response?.data?.meta || { total: 0 };

        const formattedTransactions = allTransaction?.map((item, index) => ({
          id: item._id || index,
          title: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '',
          type: item.assignedTo || '',
          code: item.campaign?.name || item.campaign || '',
          status: item.amountPaid != null ? `₹${item.amountPaid}` : '',
          more: item.transactionId || ''
        }));

        setRows(formattedTransactions);

        setTotalRows(pagination?.total);
        const uniqueList = [...new Set(allTransaction.map((item) => item.assignedTo).filter(Boolean))].map((value) => ({
          value,
          label: value
        }));

        setNameFilters(uniqueList);
      } catch (err) {
        console.error('Failed to fetch data:', err);
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
                width: 'auto',
                height: '35px',
                px: 2,
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

          <TextField
            size="small"
            placeholder="Search..."
            onChange={handleSearchChange}
            value={searchQuery}
            InputProps={{
              endAdornment: <SearchIcon />
            }}
            sx={{ width: '350px' }}
          />
        </Stack>

        <Grid container spacing={2}>
          <FilterPanel
            showFilter={showFilter}
            dateAddedFilters={dateAddedFilters}
            dateOpenedFilter={dateOpenedFilter}
            setDateOpenedFilter={(value) => setDateOpenedFilter(value)}
            names={nameFilters}
            nameFilter={assignedTo}
            setNameFilter={(value) => setAssignedTo(value)}
            campaigns={campaignTypeOptions}
            campaignFilter={campaignName}
            setCampaignFilter=
            {(value) => setCampaignName(value)}
            selectedFilters={['nameFilter', 'dateOpenedFilter', 'campaignFilter']}
            onReset={handleReset}
          />

          <Grid item xs={9}>
            <TableStyle>
              <Box width="100%">
                <Card style={{ height: 'auto' }}>
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
                    pageSizeOptions={[10]}
                    components={{
                      Toolbar: () => <CustomHeader />
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

export default Lead;
