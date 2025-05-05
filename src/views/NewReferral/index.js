import { useState } from 'react';
import { Stack, Grid, Card, Box, Typography, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import TableStyle from '../../ui-component/TableStyle';
import FilterPanel from 'components/FilterPanel';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

const referralData = [
  { id: 1, name: 'John Doe', formTitle: 'Medical Form', dateReceived: '08/01/2024', referredBy: 'Dr. Smith', type: 'person' },
  { id: 2, name: 'Acme Corp.', formTitle: 'Corporate Referral', dateReceived: '09/01/2024', referredBy: 'Jane Doe', type: 'apartment' },
  { id: 3, name: 'Emily Johnson', formTitle: 'Social Work', dateReceived: '10/01/2024', referredBy: 'Charity Org.', type: 'person' }
];

const columns = [
  {
    field: 'name',
    headerName: 'Name of Referral',
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={1}>
        <PersonIcon />
        {params.value}
      </Stack>
    )
  },
  {
    field: 'formTitle',
    headerName: 'Form Title',
    flex: 1
  },
  {
    field: 'dateReceived',
    headerName: 'Date Received',
    flex: 1
  },
  {
    field: 'referredBy',
    headerName: 'Referred By',
    flex: 1
  }
];

const formTypes = [
  { value: 'Self Referral form', label: 'Self Referral form' },
  { value: 'Community Referral form', label: 'Community Referral form' },
  { value: 'Satisfaction survey', label: 'Satisfaction survey' },
  { value: 'Volunteer sign up form', label: 'Volunteer sign up form' },
  { value: 'Workshop sign up form', label: 'Workshop sign up form' }
];

const dateAddedFilters = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Last 7 Days' },
  { value: 'month', label: 'Last 30 Days' },
  { value: 'year', label: 'Last 1 Year' }
];

const formNames = [
  { value: 'form-x', label: 'Form X' },
  { value: 'form-y', label: 'Form Y' }
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
          REFERRAL LIST
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GridToolbarExport />
        </Box>
      </GridToolbarContainer>
    </Box>
  );
};

const ReferralTable = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [formType, setFormType] = useState('');
  const [formName, setFormName] = useState('');
  const [dateAddedFilter, setDateAddedFilter] = useState('');

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
        <Typography variant="h4">New Referral</Typography>

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
          formTypes={formTypes}
          setFormType={setFormType}
          formNames={formNames}
          setFormNameFilter={setFormName}
          dateAddedFilters={dateAddedFilters}
          setDateAddedFilter={setDateAddedFilter}
          selectedFilters={['dateAddedFilter', 'formType','formNameFilter']}
        />
        <Grid item xs={9}>
          <TableStyle>
            <Box width="100%">
              <Card style={{ height: 'auto' }}>
                <DataGrid
                  rows={referralData}
                  columns={columns}
                  getRowId={(row) => row.id}
                  components={{
                    Toolbar: () => <CustomHeader />
                  }}
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
    </>
  );
};

export default ReferralTable;
