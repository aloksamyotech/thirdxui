import React from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Avatar, Button, Card, Grid, IconButton, MenuItem, Pagination, Select, TextField, Tooltip, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useState } from 'react';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import InfoIcon from '@mui/icons-material/Info';
import FilterPanel from 'components/FilterPanel';

const BulkDelete = () => {
  const [one, setOne] = useState('');
  const [two, setTwo] = useState('');
  const [three, setThree] = useState('');
  const [four, setFour] = useState('');
  const [filter, setFilter] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(true);
  const [formType, setFormType] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const formTypes = [
    { value: 'Self Referral form', label: 'Self Referral form' },
    { value: 'Community Referral form', label: 'Community Referral form' },
    { value: 'Satisfaction survey', label: 'Satisfaction survey' },
    { value: 'Volunteer sign up form', label: 'Volunteer sign up form' },
    { value: 'Workshop sign up form', label: 'Workshop sign up form' }
  ];

  const dateFilters = [
    { value: 'today', label: 'All Dates' },
    { value: 'week', label: 'Last 7 days' },
    { value: 'month', label: 'Last 30 days' },
    { value: 'year', label: 'Last 2 months' }
  ];
  const CustomHeader = ({ pageSize, setPageSize, page, setPage, totalPages }) => {
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
              fontWeight: 'bold',
              color: '#333',
              ml: 2,
              fontSize: '14px',
              lineHeight: '36px'
            }}
          >
            PEOPLE LIST
          </Typography>

          {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">Rows per page:</Typography>
            <Select value={pageSize} onChange={(e) => setPageSize(e.target.value)} size="small" sx={{ height: '30px' }}>
              {[5, 10, 20, 50].map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
            <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} size="small" />
          </Box> */}
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
            {/* Conditional Icon Rendering */}
            {params.row.type === 'person' ? <PersonIcon /> : <ApartmentIcon />}

            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {params.row.name} #{params.row.id}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {params.row.address}
              </Typography>
            </Box>
          </Stack>

          <Tooltip title="Info" arrow>
            <IconButton>
              <InfoIcon color="action" />
            </IconButton>
          </Tooltip>
        </Stack>
      )
    }
  ];

  const rows = [
    { id: 'C-001', name: 'John Doe', address: '123 Main Street, New York, NY 10001', type: 'person' },
    { id: 'C-002', name: 'Jane Smith', address: '456 Elm Street, Los Angeles, CA 90001', type: 'apartment' },
    { id: 'C-003', name: 'Michael Johnson', address: '789 Oak Street, Chicago, IL 60601', type: 'person' },
    { id: 'C-004', name: 'Emily Davis', address: '321 Pine Avenue, Houston, TX 77001', type: 'apartment' },
    { id: 'C-005', name: 'David Brown', address: '654 Maple Drive, Miami, FL 33101', type: 'person' },
    { id: 'C-006', name: 'Sophia Wilson', address: '987 Cedar Lane, San Francisco, CA 94101', type: 'apartment' }
  ];

  return (
    <Grid container spacing={2}>
      <FilterPanel
        showFilter={showFilter}
        formTypes={formTypes}
        setFormType={setFormType}
        dateFilters={dateFilters}
        setDateFilter={setDateFilter} />
      <Grid item xs={9}>
        <Box sx={{ width: '100%', typography: 'body1', bgcolor: '#fff', borderRadius: '10px', minHeight: '100vh' }}>
          {!filter && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '20px' }}>
              <Typography>Bulk Delete</Typography>
              <FilterAltIcon fontSize="small" sx={{ marginX: '4px', cursor: 'pointer' }} onClick={() => setFilter(true)} />
            </Box>
          )}
          {filter && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: '20px' }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <FilterAltIcon />
                <Typography variant="h6" fontWeight="bold">
                  Filter
                </Typography>
              </Stack>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  select
                  label="Service"
                  value={one}
                  onChange={(e) => setOne(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{ width: 200 }}
                >
                  <MenuItem value="District 1">District 1</MenuItem>
                  <MenuItem value="District 2">District 2</MenuItem>
                </TextField>

                <TextField
                  select
                  label="Service Date"
                  value={two}
                  onChange={(e) => setTwo(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{ width: 150 }}
                >
                  <MenuItem value="District 1">District 1</MenuItem>
                  <MenuItem value="District 2">District 2</MenuItem>
                </TextField>

                <TextField
                  select
                  label="Service User Tags"
                  value={three}
                  onChange={(e) => setThree(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{ width: 150 }}
                >
                  <MenuItem value="District 1">District 1</MenuItem>
                  <MenuItem value="District 2">District 2</MenuItem>
                </TextField>

                <TextField
                  select
                  label="Country Of Origin"
                  value={four}
                  onChange={(e) => setFour(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{ width: 180 }}
                >
                  <MenuItem value="District 1">District 1</MenuItem>
                  <MenuItem value="District 2">District 2</MenuItem>
                </TextField>

                <Button color="secondary" variant="contained">
                  Apply
                </Button>

                <Stack sx={{ p: '5px', boxShadow: '1px 1px 5px #d4d4d4', borderRadius: '100%' }}>
                  <FilterAltIcon fontSize="medium" sx={{ m: '4px', cursor: 'pointer' }} onClick={() => setFilter(false)} />
                </Stack>
              </Box>
            </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '20px' }}>
            <Button
              size="small"
              variant="contained"
              endIcon={<DeleteIcon />}
              sx={{ marginRight: '10px', bgcolor: '#ff4d49', border: '1px solid #ff918d', '&:hover': { bgcolor: '#ec3330' } }}
            >
              Bulk Delete
            </Button>
          </Box>
          <Box width="100%">
            <Card style={{ height: '600px', borderRadius: '0px' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                rowHeight={65}
                getRowId={(row) => row.id}
                pageSize={pageSize}
                onPageSizeChange={(newSize) => setPageSize(newSize)}
                pagination
                page={page - 1}
                onPageChange={(newPage) => setPage(newPage + 1)}
                rowCount={rows.length}
                paginationMode="client"
                components={{
                  Toolbar: () => (
                    <CustomHeader
                      pageSize={pageSize}
                      setPageSize={setPageSize}
                      page={page}
                      setPage={setPage}
                      totalPages={Math.ceil(rows.length / pageSize)}
                    />
                  )
                }}
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    display: 'none'
                  },
                  '& .MuiDataGrid-row:nth-of-type(2n)': {
                    backgroundColor: '#f9f9f9'
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
        </Box>
      </Grid>
    </Grid>
  );
};

export default BulkDelete;
