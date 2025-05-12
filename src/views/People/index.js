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
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';

const districts = [
  { value: 'district1', label: 'District 1' },
  { value: 'district2', label: 'District 2' },
  { value: 'district3', label: 'District 3' }
];

const dateAddedFilters = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Last 7 Days' },
  { value: 'month', label: 'Last 30 Days' },
  { value: 'year', label: 'Last 1 Year' }
];

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
];

const Lead = () => {
  const navigate = useNavigate();
  const [districtFilter, setDistrictFilter] = useState('');
  const [dateAddedFilter, setDateAddedFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [showFilter, setShowFilter] = useState(true);
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
            PEOPLE LIST
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
      field: 'details',
      headerName: 'Details',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={2} width="100%" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* {params.row.type === 'person' ? <PersonIcon /> : <ApartmentIcon />} */}
            <PersonIcon />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {params.row.firstName} {params.row.lastName} {params.row.serialNumber}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {params.row.address} {params.row.country} {params.row.postcode}
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
    const fetchpeople = async () => {
      try {
        const response = await getApi(urls.serviceuser.fetch);

        const allUser = response?.data?.allUser || [];

        const formattedUsers = allUser.map((user, index) => ({
          id: user._id,
          serialNumber: `#C-${(index + 1).toString().padStart(3, '0')}`,
          firstName: user.personalInfo?.firstName || '',
          lastName: user.personalInfo?.lastName || '',
          address: user.contactInfo?.addressLine1 || '',
          country: user.contactInfo?.country || '',
          postcode: user.contactInfo?.postcode || ''
        }));

        setRows(formattedUsers);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    fetchpeople();
  }, []);

  return (
    <Card sx={{ backgroundColor: '#eef2f6' }}>
      <Grid>
        <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
          <Tooltip title="Add" arrow>
            <IconButton
              onClick={() => navigate('/add-serviceuser')}
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
              Add New Service User <AddIcon fontSize="small" />
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
            districts={districts}
            setDistrictFilter={setDistrictFilter}
            genders={genders}
            setGenderFilter={setGenderFilter}
            dateAddedFilters={dateAddedFilters}
            setDateAddedFilter={setDateAddedFilter}
            selectedFilters={['districtFilter', 'dateAddedFilter', 'genderFilter']}
          />

          <Grid item xs={9}>
            <Card style={{ height: 'auto' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                rowHeight={65}
                getRowId={(row) => row.id}
                onRowClick={(params) => navigate('/view-people', { state: params.row })}
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
  );
};

export default Lead;
