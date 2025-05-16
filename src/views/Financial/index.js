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
  const navigate = useNavigate();
  const [isFiltered, setIsFiltered] = useState(false);
  const [rows, setRows] = useState([]);
 
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
      flex: 1,
      renderCell: (params) => <Typography variant="body2">{params.value}</Typography>
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
 
  const handleFilter = async () => {
    try {
      const queryParams = new URLSearchParams();
 
      if (name && name !== '') {
        queryParams.append('name', name);
      }
      if (dateOpenedFilter && dateOpenedFilter !== '') {
        const formattedDate = new Date(dateOpenedFilter).toISOString().split('T')[0];
        queryParams.append('date', formattedDate);
      }
 
      const queryString = queryParams.toString();
      const url = `${urls.transaction.filterType}${queryString ? `?${queryString}` : ''}`;
      const response = await getApi(url);
 
      const filteredtransactions = response?.data || [];
 
      const formattedUsers = filteredtransactions.map((item, index) => {
        return {
          id: item._id || index,
          title: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '',
          type: item.assignedTo || '',
          code: item.campaign || '',
          status: item.amountPaid != null ? `₹${item.amountPaid}` : '',
          more: item.transactionId || ''
        };
      });
 
      setRows(formattedUsers);
      setIsFiltered(true);
    } catch (error) {
      console.error('Failed to fetch filtered cases:', error);
    }
  };
 
  const handleReset = () => {
    setNameFilter('');
    setDateOpenedFilter('');
    setIsFiltered(false);
  };
 
  useEffect(() => {
    if (name || dateOpenedFilter || isFiltered) {
      handleFilter();
    }
  }, [name, dateOpenedFilter]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getApi(urls.transaction.fetch);
        const allTransaction = res?.data?.allTransaction || [];
        const formattedTransactions = allTransaction?.map((item, index) => ({
          id: item._id || index,
          title: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '',
          type: item.assignedTo || '',
          code: item.campaign || '',
          status: item.amountPaid != null ? `₹${item.amountPaid}` : '',
          more: item.transactionId || ''
        }));
        setRows(formattedTransactions);
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
            nameFilter={name}
            setNameFilter={(value) => setNameFilter(value)}
            campaigns={campaignFilter}
            setCampaignFilter={setCampaignFilter}
            selectedFilters={['nameFilter', 'dateOpenedFilter', 'campaignFilter']}
            onReset={handleReset}
          />
          <Grid item xs={9}>
            <TableStyle>
              <Box width="100%">
                <Card style={{ height: 'auto' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    rowHeight={65}
                    getRowId={(row) => row.id}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
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