import { useState, useEffect } from 'react';
import { Stack, Grid, Typography, Box, Card, TextField, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import ApartmentIcon from '@mui/icons-material/Apartment';
import FilterPanel from 'components/FilterPanel';
import DonorTypeDialog from './donorType.js';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
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

const receiptIdFilter = [
  { value: '#675', label: '#675' },
  { value: '#775', label: '#775' }
];

const campaignFilter = [
  { value: 'campaign1', label: 'Campaign 1' },
  { value: 'campaign2', label: 'Campaign 2' }
];

const Lead = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [status, setStatus] = useState('');
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [name, setNameFilter] = useState('');
  const [receiptId, setReceiptIdFilter] = useState('');
  const [campaign, setCampaignFilter] = useState('');
  const [rows, setRows] = useState([]);

  const CustomHeader = () => {
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
              fontSize: '14px',
              lineHeight: '36px'
            }}
          >
            DONOR LIST
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GridToolbarExport />
          </Box>
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
            {params.row.subRole === 'donar_individual' ? <PersonIcon /> : <ApartmentIcon />}

            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {params.row.personalInfo?.firstName && params.row.personalInfo?.lastName
                  ? `${params.row.personalInfo.firstName} ${params.row.personalInfo.lastName}`
                  : params.row.companyInformation?.companyName
                  ? params.row.companyInformation.companyName
                  : 'No Name Available'}
                {params.row.serialNumber || 'No Serial Number'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {params.row.contactInfo?.email || 'No Email'}
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
  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const response = await getApi(urls.serviceuser.getalldonor);

        if (response?.data) {
          const donorsWithSerialNumber = response.data.allDonor.map((donor, index) => ({
            ...donor,
            serialNumber: `#C-${(index + 1).toString().padStart(3, '0')}`
          }));

          setRows(donorsWithSerialNumber);
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    fetchDonor();
  }, []);

  return (
    <>
      <Card sx={{ backgroundColor: '#eef2f6' }}>
        <Grid>
          <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
            <Tooltip title="Add" arrow>
              <IconButton
                onClick={() => setOpenDialog(true)}
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
                Add New Donor <AddIcon fontSize="small" />
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
              statuses={statusFilter}
              setStatusFilter={setStatus}
              dateAddedFilters={dateAddedFilters}
              setDateAddedFilter={setDateOpenedFilter}
              names={nameFilter}
              setNameFilter={setNameFilter}
              receipts={receiptIdFilter}
              setReceiptIdFilter={setReceiptIdFilter}
              campaigns={campaignFilter}
              setCampaignFilter={setCampaignFilter}
              selectedFilters={['nameFilter', 'statusFilter', 'dateOpenedFilter', 'receiptIdFilter', 'campaignFilter']}
            />
            <Grid item xs={9}>
              <Card style={{ height: 'auto' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  rowHeight={65}
                  getRowId={(row) => row._id}
                  onRowClick={() => navigate('/view-donor')}
                  components={{
                    Toolbar: () => <CustomHeader />
                  }}
                  sx={{
                    '& .MuiDataGrid-columnHeaders': {
                      display: 'none'
                    },
                    '& .MuiDataGrid-cell': {
                      textAlign: 'left',
                      fontSize: '14px'
                    }
                  }}
                  disableSelectionOnClick
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Card>

      <DonorTypeDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  );
};

export default Lead;
