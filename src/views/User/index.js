import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Grid, Typography, Box, Card, Chip, Tooltip, IconButton, Modal, TextField, Button } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { Edit, Delete, Add, Close } from '@mui/icons-material';
import FilterPanel from 'components/FilterPanel';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { urls } from 'common/urls';
import { getApi } from 'common/apiClient';

// const getCountryFlag = (countryCode) => `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;

const User = () => {
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [status, setStatus] = useState('');
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [name, setNameFilter] = useState('');
  const [countriesWithFlags, setCountriesWithFlags] = useState([]);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1.5,
      renderCell: (params) => (
        <Box>
          <Typography sx={{ fontWeight: 'bold' }}>{params.row.name}</Typography>
          <Typography sx={{ fontSize: '12px', color: 'gray' }}>{params.row.email}</Typography>
        </Box>
      )
    },
    { field: 'date', headerName: 'Date', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            color: params.value === 'Active' ? '#79dbfb' : '#ff6a67',
            backgroundColor: params.value === 'Active' ? '#e5f8fe' : '#ffeae9'
          }}
        />
      )
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 1.5,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* <img src={getCountryFlag(params.row.countryCode)} alt={params.value} width="24px" height="16px" /> */}
          <Typography>{params.value}</Typography>
        </Box>
      )
    },
    { field: 'age', headerName: 'Age', flex: 1 },

    {
      field: 'actions',
      headerName: 'Manage',
      renderCell: () => (
        <Box sx={{ display: 'flex', width: '100%' }}>
          <IconButton color="error" size="small">
            <Delete sx={{ fontSize: '16px' }} />
          </IconButton>
          <IconButton color="error" size="small">
            <Edit sx={{ fontSize: '16px' }} />
          </IconButton>
        </Box>
      ),
      flex: 1
    }
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
            USER LIST
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GridToolbarExport />
          </Box>
        </GridToolbarContainer>
      </Box>
    );
  };
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

  // useEffect(() => {
  //   fetch('https://restcountries.com/v3.1/all')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const countries = data.map((country) => ({
  //         value: country.cca2,
  //         label: country.name.common,
  //         flag: country.flags.png
  //       }));
  //       setCountriesWithFlags(countries);
  //     });
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getApi(urls?.serviceuser?.getAllUser);
       

        const allUser = response?.data?.allVolunteer || [];
       

       
        const formattedUsers = allUser.map((user, index) => {
          const dob = new Date(user.personalInfo?.dateOfBirth);
          const today = new Date();

          let age = '';
          if (!isNaN(dob)) {
            age = today.getFullYear() - dob.getFullYear();
            const m = today.getMonth() - dob.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
              age--;
            }
          }

          return {
            id: user._id,
            serialNumber: `#C-${(index + 1).toString().padStart(3, '0')}`,
            name: `${user.personalInfo?.firstName || ''} ${user.personalInfo?.lastName || ''}`.trim(),
            date: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '',
            
            country: user.contactInfo?.country || '',
            status: user.isActive ? 'Active' : 'Deactive',
            age: age
          };
        });

        setRows(formattedUsers);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Card sx={{ backgroundColor: '#eef2f6' }}>
        <Grid>
          <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
            <Tooltip title="Add" arrow>
              <IconButton
                onClick={() => navigate('/add-user')}
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
                Add New User
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
              statuses={statusFilter}
              setStatusFilter={setStatus}
              dateAddedFilters={dateAddedFilters}
              setDateAddedFilter={setDateOpenedFilter}
              names={nameFilter}
              setNameFilter={setNameFilter}
              countriesWithFlags={countriesWithFlags}
              selectedFilters={['countryOfOriginFilter', 'dateOpenedFilter', 'nameFilter', 'statusFilter']}
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
      <Modal open={showForm} onClose={() => setShowForm(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            minWidth: 400
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4">Invite User</Typography>
            <IconButton onClick={() => setShowForm(false)}>
              <Close />
            </IconButton>
          </Stack>

          <TextField fullWidth label="Invite user via their email" variant="outlined" sx={{ mb: 2 }} />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="contained" sx={{ backgroundColor: '#053146' }}>
              Invite
            </Button>
            <Button variant="outlined" color="error" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default User;
