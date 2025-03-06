import { useState } from 'react';
import { Stack, Grid, Card, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import TableStyle from '../../ui-component/TableStyle';
import FilterPanel from 'components/FilterPanel';

const referralData = [
  { id: 1, name: 'John Doe', formTitle: 'Medical Form', dateReceived: '08/01/2024', referredBy: 'Dr. Smith', type: 'person' },
  { id: 2, name: 'Acme Corp.', formTitle: 'Corporate Referral', dateReceived: '09/01/2024', referredBy: 'Jane Doe', type: 'apartment' },
  { id: 3, name: 'Emily Johnson', formTitle: 'Social Work', dateReceived: '10/01/2024', referredBy: 'Charity Org.', type: 'person' }
];

const columns = [
  {
    field: 'name',
    headerName: 'NAME OF REFERRAL',
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={1}>
        {params.row.type === 'person' ? <PersonIcon /> : <ApartmentIcon />}
        {params.value}
      </Stack>
    )
  },
  {
    field: 'formTitle',
    headerName: 'FORM TITLE',
    flex: 1
  },
  {
    field: 'dateReceived',
    headerName: 'DATE RECEIVED',
    flex: 1
  },
  {
    field: 'referredBy',
    headerName: 'REFERRED BY',
    flex: 1
  },
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

const ReferralTable = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [formType, setFormType] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  return (
    <Grid container spacing={4}>
      <FilterPanel
        showFilter={showFilter}
        formTypes={formTypes}
        setFormType={setFormType}
        dateFilters={dateFilters}
        setDateFilter={setDateFilter} />
      <Grid item xs={9}>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '400px' }}>
              <DataGrid
                rows={referralData}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row.id}
                sx={{
                  '& .MuiDataGrid-row': {
                    borderBottom: '1px solid #ccc'
                  },
                }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Grid>
    </Grid>
  );
};

export default ReferralTable;
