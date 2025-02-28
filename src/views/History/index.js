import { useState } from 'react';
import { Stack, Typography, Box, Card, Chip, Tabs, Tab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const columns = [
  {
    field: 'title',
    headerName: 'NAME',
    flex: 2,
    renderCell: (params) => (
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        {params.value}
      </Typography>
    )
  },
  {
    field: 'date',
    headerName: 'DATE',
    flex: 1,
    renderCell: (params) => (
      <Typography variant="body2" color="textSecondary">
        {params.value}
      </Typography>
    )
  },
  { field: 'view', headerName: 'VIEW', flex: 1, renderCell: () => '00' },
  { 
    field: 'age', 
    headerName: 'AGE', 
    flex: 1,
    renderCell: (params) => (
      <Typography variant="body2">
        {params.value}
      </Typography>
    ) 
  },
  {
    field: 'status',
    headerName: 'STATUS',
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
  },
    {
    field: 'iconStatus',
    headerName: '', 
    flex: 0.5,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      params.row.status === 'Accepted' ? (
        <CheckCircleIcon sx={{ color: 'green', fontSize: 20 }} />
      ) : (
        <CancelIcon sx={{ color: 'red', fontSize: 20 }} />
      )
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

  const filteredRows = allRows.filter((row) =>
    tabValue === 0 ? row.status === 'Accepted' : row.status === 'Rejected'
  );

  return (
    <Box sx={{ width: '100%'}}>
 
      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} >
        <Tab label="Accepted" />
        <Tab label="Rejected" />
      </Tabs>

      <Card sx={{ mt: 2, height: '464px'}}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          rowHeight={65}
          getRowId={(row) => row.id}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row')}
          sx={{
            '& .even-row': { backgroundColor: '#ffffff' },
            '& .odd-row': { backgroundColor: '#f5f5f5' },
            '& .MuiDataGrid-row': {
              borderBottom: '1px solid #ccc'
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor:'#f5f5f5'
            },
          }}
        />
      </Card>
    </Box>
  );
}
