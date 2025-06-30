import { useState } from 'react';
import { Stack, Grid, Typography, Box, Card, TextField, IconButton, Tooltip, InputBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import ApartmentIcon from '@mui/icons-material/Apartment';
import FilterPanel from 'components/FilterPanel';

const donorTypes = [
  { value: 'individual', label: 'Individual' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'ngo', label: 'NGO' }
];

const durationOptions = [
  { value: 'short_term', label: 'Short Term' },
  { value: 'long_term', label: 'Long Term' }
];

const amountRanges = [
  { value: '0-100', label: '$0 - $100' },
  { value: '101-500', label: '$101 - $500' },
  { value: '501+', label: '$501+' }
];

const recruitmentCampaigns = [
  { value: 'summer2024', label: 'Summer 2024' },
  { value: 'winter2025', label: 'Winter 2025' }
];

const tags = [
  { value: 'vip', label: 'VIP' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'inactive', label: 'Inactive' }
];

const Lead = () => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState('');
  const [donorType, setDonorType] = useState('');
  const [amountFilter, setAmountFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [recruitmentFilter, setrecruitmentFilter] = useState('');
  const [showFilter, setShowFilter] = useState(true);

  const rows = [
    {
      id: 'C-001',
      name: 'John Doe',
      address: '123 Main Street, New York, NY 10001',
      type: 'person',
      tags: ['vip', 'newsletter']
    },
    {
      id: 'C-002',
      name: 'Jane Smith',
      address: '456 Elm Street, Los Angeles, CA 90001',
      type: 'apartment',
      tags: ['inactive']
    },
    {
      id: 'C-003',
      name: 'Michael Johnson',
      address: '789 Oak Street, Chicago, IL 60601',
      type: 'person',
      tags: ['newsletter']
    }
  ];

  const CustomHeader = () => (
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
            fontWeight: '',
            color: '#333',
            fontSize: '14px',
            lineHeight: '36px'
          }}
        >
          Mailing List 
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GridToolbarExport />
        </Box>
      </GridToolbarContainer>
    </Box>
  );

  const columns = [
    {
      field: 'person',
      headerName: 'Details',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={2} width="100%" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            {params.row.type === 'person' ? <PersonIcon /> : <ApartmentIcon />}
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 450 }}>
                {params.row.name} #{params.row.id}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {params.row.address}
              </Typography>
            </Box>
          </Stack>

          <Tooltip title="Info" arrow>
            <IconButton>
              <InfoIcon sx={{ color: '#49494c' }}  />
            </IconButton>
          </Tooltip>
        </Stack>
      )
    }
  ];

  return (
    <Card sx={{ backgroundColor: '#eef2f6' }}>
      <Grid>
        <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
          <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">Mailing List </Typography>
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
              // value={searchQuery}
              // onChange={handleSearchChange}
              // onKeyPress={(e) => {
              //   if (e.key === 'Enter') {
              //     handleFilter();
              //   }
              // }}
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
            tags={tags}
            setTagFilter={setTagFilter}
            donorTypes={donorTypes}
            setDonorType={setDonorType}
            formType={formType}
            setFormType={setFormType}
            amountRanges={amountRanges}
            setAmountFilter={setAmountFilter}
            recruitmentCampaigns={recruitmentCampaigns}
            setrecruitmentFilter={setrecruitmentFilter}
            durationOptions={durationOptions}
            setDurationFilter={setDurationFilter}
            selectedFilters={['donorTypeFilter', 'durationFilter', 'amountRangeFilter', 'recruitmentCampaignFilter', 'tagFilter']}
          />

          <Grid item xs={9}>
            <Card style={{ height: 'auto' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                rowHeight={65}
                getRowId={(row) => row.id}
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
