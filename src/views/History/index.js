import { useState } from 'react';
import { Stack, Typography, Box, Card, TextField, Chip, Tabs, Tab, Container, Grid, IconButton, InputBase } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import FilterPanel from 'components/FilterPanel';
import { urls } from 'common/urls';
import { getApi } from 'common/apiClient';
import { useEffect } from 'react';
import moment from 'moment';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';

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

const columns = [
  {
    field: 'title',
    headerName: 'Name',
    flex: 1.5,
    renderCell: (params) => <Typography variant="body1">{params.value || '-'}</Typography>
  },
  {
    field: 'date',
    headerName: 'Date',
    flex: 1,
    renderCell: (params) => (
      <Typography variant="body2" color="textSecondary">
        {params.value || '-'}
      </Typography>
    )
  },
  {
    field: 'age',
    headerName: 'Age',
    flex: 1,
    renderCell: (params) => <Typography variant="body2">{params.value || '-'}</Typography>
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (params) => (
      <Chip
        label={params.value || '-'}
        sx={{
          color: params.value === 'APPROVED' ? '#41c048' : 'red',
          backgroundColor: params.value === 'APPROVED' ? '#eefbe5' : '#ffeae9'
        }}
      />
    )
  }
];

export default function TabbedDataGrid() {
  const [tabValue, setTabValue] = useState(0);
  const [showFilter, setShowFilter] = useState(true);
  const [status, setStatus] = useState('');
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [namesFilter, setNamesFilter] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [allRows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [loading, setLoading] = useState(true);

  const filteredRows = allRows.filter((row) => (tabValue === 0 ? row.status === 'APPROVED' : row.status === 'REJECTED'));

  const getAllResponse = async () => {
    const queryParams = new URLSearchParams({
      page: paginationModel.page + 1,
      limit: paginationModel.pageSize
    });
    if (searchQuery) {
      queryParams.append('search', searchQuery);
    }
    if (nameFilter) {
      queryParams.append('search', nameFilter);
    }
    if (dateOpenedFilter) {
      const formattedDate = new Date(dateOpenedFilter).toISOString().split('T')[0];
      queryParams.append('date', formattedDate);
    }
    const fromUrl = `${urls?.responses?.submit}?${queryParams.toString()}`;
    const response = await getApi(fromUrl);
    const pagination = response?.data?.meta || { total: 0 };
    
    const formattedData = response?.data?.data
      ?.map((item, index) => {
        const submissionDate = moment(item?.submittedAt).format('L');
        let data = {
          id: index + 1,
          title: item?.formId?.title,
          status: item?.status,
          date: submissionDate,
          age: item?.data?.Age || '-'
        };
        return data;
      })
      ?.filter((item) => item?.status === 'APPROVED' || item?.status === 'REJECTED');
    setTotalRows(pagination?.total);
    setRows(formattedData);
    setLoading(false);
  };
  useEffect(() => {
    getAllResponse();
  }, [nameFilter, searchQuery, dateOpenedFilter, paginationModel, tabValue]);

  const getResponse = async () => {
    const url = `${urls?.responses?.submit}?limit=10000`;
    const response = await getApi(url);
    const options = response?.data?.data
      ?.map((item) => ({
        value: item?.formId?.title,
        label: item?.formId?.title,
        status: item?.status
      }))
      ?.filter((item) => item?.status === 'APPROVED' || item?.status === 'REJECTED');
    setNamesFilter(options);
  };
  useEffect(() => {
    getResponse();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const CustomHeader = ({ tabValue, setTabValue }) => {
    return (
      <Box sx={{ height: 'auto', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ borderBottom: '1px solid #4792d3' }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ gap: 2 }}>
            <Tab
              label="Accepted"
              value={0}
              sx={{
                marginRight: 2,
                borderRadius: 1,
                textTransform: 'none'
              }}
            />
            <Tab
              label="Rejected"
              value={1}
              sx={{
                marginRight: 2,
                borderRadius: 1,
                textTransform: 'none'
              }}
            />
          </Tabs>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
        <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">History</Typography>
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
            // onClick={handleFilter}
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
          setStatusFilter={setStatus}
          dateAddedFilters={dateAddedFilters}
          dateOpenedFilter={dateOpenedFilter}
          setDateOpenedFilter={(value) => setDateOpenedFilter(value)}
          names={namesFilter}
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          selectedFilters={['nameFilter', 'statusFilter', 'dateOpenedFilter']}
        />
        <Grid item xs={9}>
          <Box sx={{ width: '100%' }}>
            <Card sx={{ height: '100vh' }}>
              <DataGrid
                rows={
                  loading
                    ? []
                    : filteredRows.map((row, index) => ({
                      ...row,
                      sNo: paginationModel.page * paginationModel.pageSize + index + 1
                    }))
                }
                loading={loading}
                columns={columns}
                rowHeight={65}
                getRowId={(row) => row.id}
                // checkboxSelection
                slots={{
                  toolbar: () => <CustomHeader tabValue={tabValue} setTabValue={setTabValue} />,
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
                  },
                  '& .MuiDataGrid-columnHeader': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
                rowCount={totalRows}
                pagination
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10, 25, 50]}
              />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
