import { useState } from 'react';
import { Stack, Grid, Typography, Box, Card, TextField, Tooltip, IconButton,InputBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AntSwitch from 'components/AntSwitch.js';
import FilterPanel from 'components/FilterPanel.js';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';

import { useNavigate } from 'react-router-dom';

const Tag = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(true);
  const [status, setStatus] = useState('');

  const statusFilter = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
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
            Tag List
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GridToolbarExport />
          </Box>
        </GridToolbarContainer>
      </Box>
    );
  };

  const columns = [
    { field: 'name', headerName: 'CONFIGURATION', flex: 1 },
    {
      field: 'status',
      headerName: 'STATUS',
      renderCell: (params) => <AntSwitch defaultChecked={params.value} color="primary" />,
      flex: 1
    }
  ];

  const rows = [
    { id: 1, name: 'Adoption Enquirer', status: true },
    { id: 2, name: 'Adoption Gift Recipients', status: true },
    { id: 3, name: 'Past Adopters', status: true },
    { id: 4, name: 'Current Adopters', status: true },
    { id: 5, name: 'Self Referral', status: true }
  ];
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

  return (
    <Card sx={{ backgroundColor: '#eef2f6' }}>
      <Grid>
        <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
          <Tooltip title="Add" arrow>
            <IconButton
              onClick={() => navigate('/add-tag')}
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
              Add New Tag
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

        <Grid container spacing={2}>
          <FilterPanel
            showFilter={showFilter}
            statuses={statusFilter}
            setStatusFilter={setStatus}
            selectedFilters={['configurationNameFilter', 'statusFilter']}
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
                    // onRowClick={(params) => navigate(`/dashboard/view-service/${params.id}`)}
                    onRowClick={() => navigate('/dashboard/view-service')}
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

export default Tag;
