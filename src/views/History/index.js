import { useState } from 'react';
import { Stack, Typography, Box, Card, TextField, Chip, Tabs, Tab, Container, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import FilterPanel from 'components/FilterPanel';

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

const nameFilter = [
  { value: 'name1', label: 'Name 1' },
  { value: 'name2', label: 'Name 2' }
];

const columns = [
  {
    field: 'title',
    headerName: 'Name',
    flex: 1.5,
    renderCell: (params) => <Typography variant="body1">{params.value}</Typography>
  },
  {
    field: 'date',
    headerName: 'Date',
    flex: 1,
    renderCell: (params) => (
      <Typography variant="body2" color="textSecondary">
        {params.value}
      </Typography>
    )
  },
  {
    field: 'age',
    headerName: 'Age',
    flex: 1,
    renderCell: (params) => <Typography variant="body2">{params.value}</Typography>
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (params) => (
      <Chip
        label={params.value}
        sx={{
          color: params.value === 'Accepted' ? '#41c048' : 'red',
          backgroundColor: params.value === 'Accepted' ? '#eefbe5' : '#ffeae9'
        }}
      />
    )
  }
];

const allRows = [
  { id: '1', title: 'John Doe', age: 28, date: '25/02/2024', status: 'Accepted' },
  { id: '2', title: 'Alice Smith', age: 34, date: '10/03/2024', status: 'Rejected' },
  { id: '3', title: 'Michael Johnson', age: 40, date: '08/04/2024', status: 'Accepted' },
  { id: '4', title: 'Emily Brown', age: 26, date: '12/01/2024', status: 'Rejected' },
  { id: '5', title: 'David Wilson', age: 30, date: '10/02/2024', status: 'Accepted' },
  { id: '6', title: 'Sophia Martinez', age: 29, date: '15/02/2024', status: 'Rejected' },
  { id: '7', title: 'James Anderson', age: 35, date: '20/03/2024', status: 'Accepted' },
  { id: '8', title: 'Olivia Taylor', age: 31, date: '05/04/2024', status: 'Rejected' },
  { id: '9', title: 'Daniel White', age: 27, date: '18/02/2024', status: 'Accepted' },
  { id: '10', title: 'Emma Harris', age: 32, date: '22/03/2024', status: 'Rejected' }
];

export default function TabbedDataGrid() {
  const [tabValue, setTabValue] = useState(0);
  const [showFilter, setShowFilter] = useState(true);
  const [status, setStatus] = useState('');
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [name, setNameFilter] = useState('');

  const filteredRows = allRows.filter((row) => (tabValue === 0 ? row.status === 'Accepted' : row.status === 'Rejected'));

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
        <Typography variant="h4">History</Typography>

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
          statuses={statusFilter}
          setStatusFilter={setStatus}
          dateAddedFilters={dateAddedFilters}
          setDateAddedFilter={setDateOpenedFilter}
          names={nameFilter}
          setNameFilter={setNameFilter}
          selectedFilters={['nameFilter', 'statusFilter', 'dateOpenedFilter']}
        />
        <Grid item xs={9}>
          <Box sx={{ width: '100%' }}>
            <Card sx={{ height: 'auto' }}>
              <DataGrid
                rows={filteredRows}
                columns={columns}
                rowHeight={65}
                getRowId={(row) => row.id}
                pageSize={5}
                checkboxSelection
                components={{
                  Toolbar: () => <CustomHeader tabValue={tabValue} setTabValue={setTabValue} />
                }}
                rowsPerPageOptions={[5, 10]}
                getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row')}
                sx={{
                  '& .MuiDataGrid-row': {
                    borderBottom: '1px solid #ccc'
                  },
                  '& .MuiDataGrid-columnHeader': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
