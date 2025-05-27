import { Stack, Grid, TextField, Card, Box, Typography, IconButton, Chip, Tooltip, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import React, { useState } from 'react';
import FilterPanel from 'components/FilterPanel';
import { urls } from 'common/urls';
import { useEffect } from 'react';
import { getApi } from 'common/apiClient';
import moment from 'moment';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useNavigate } from 'react-router';

const formTypes = [
  { value: 'Self Referral form', label: 'Self Referral form' },
  { value: 'Community Referral form', label: 'Community Referral form' },
  { value: 'Satisfaction survey', label: 'Satisfaction survey' },
  { value: 'Volunteer sign up form', label: 'Volunteer sign up form' },
  { value: 'Workshop sign up form', label: 'Workshop sign up form' }
];

const campaignFilter = [
  { value: 'campaign1', label: 'Campaign 1' },
  { value: 'campaign2', label: 'Campaign 2' }
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
          SUBMITTED FORM LIST
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GridToolbarExport />
        </Box>
      </GridToolbarContainer>
    </Box>
  );
};

// const initialRows = [
//   {
//     id: 1,
//     description: 'Self Referral form',
//     date: '08/05/2017',
//     campaign: 'Beach Cleaning -Corporate volunteer project 2019',
//     title: 'Satisfaction Survey'
//   },
//   { id: 2, description: 'Community Referral form', date: '08/05/2017', campaign: 'Form Campaign', title: 'Community Referral' },
//   {
//     id: 3,
//     description: 'Satisfaction survey',
//     date: '08/05/2017',
//     campaign: 'Beach Cleaning -Corporate volunteer project 2019',
//     title: 'Volunteer Signup'
//   },
//   { id: 4, description: 'Volunteer sign up form', date: '08/05/2017', campaign: 'Form Campaign' },
//   { id: 5, description: 'Workshop sign up form', date: '08/05/2017', campaign: 'Beach Cleaning -Corporate volunteer project 2019' }
// ];

const Lead = () => {
  const [campaign, setCampaignFilter] = useState('');
  const [formType, setFormType] = useState('');
  const [showFilter, setShowFilter] = useState(true);
  const [rows, setRows] = useState([]);

  const navigate = useNavigate()
  const handleNavigate = (id) => {
    navigate(`${id}`)
  }

  const getAllResponse = async () => {
    const fromUrl = urls?.responses?.submit
    const response = await getApi(fromUrl)
    const formattedData = response?.data?.map((item, index) => {
      const submissionDate = moment(item?.submittedAt).format('L')
      let data = {
        id: item?._id,
        index: index + 1,
        description: item?.formId?.title,
        campaign: item?.template,
        title: "help",
        submissionDate
      }
      return data
    })
    setRows(formattedData)
  }
  useEffect(() => {
    getAllResponse()
  }, [])

  const columns = [
    {
      field: 'description',
      headerName: 'Form Type',
      flex: 0.8,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ whiteSpace: 'normal' }}>
          {params.value}
        </Typography>
      )
    },
    {
      field: 'submissionDate',
      headerName: 'Date Submitted',
      flex: 0.8,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ whiteSpace: 'normal' }}>
          {params.value}
        </Typography>
      )
    },
    {
      field: 'campaign',
      headerName: 'Form Campaign',
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {/* {params.value} */}
          -
        </Typography>
      )
    },
    {
      field: 'title',
      headerName: 'Form Display Title',
      flex: 0.8,
      renderCell: () => <Chip label="HELP US..." sx={{ bgcolor: '#e5f8fe', color: '#79dbfb' }} />
    },
    {
      field: 'edit',
      headerName: 'Edit',
      flex: 0.3,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ReadMoreIcon sx={{cursor:'pointer'}} onClick={() => handleNavigate(params.row.id)} />
          <EditOutlinedIcon sx={{ color: 'red' }} fontSize="small" onClick={() => handleEdit(params.row)} />
        </Box>
      )
    }
  ];

  return (
    <>
      <Grid>
        <Card sx={{ backgroundColor: '#eef2f6' }}>
          <Grid>
            <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
              <Typography variant="h4">Submitted Form</Typography>
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
          </Grid>

          <Grid container spacing={2}>
            <FilterPanel
              showFilter={showFilter}
              formTypes={formTypes}
              setFormType={setFormType}
              campaigns={campaignFilter}
              setCampaignFilter={setCampaignFilter}
              selectedFilters={['formType', 'campaignFilter']}
            />

            <Grid item xs={9}>
              <Card style={{ height: 'auto' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  components={{
                    Toolbar: () => <CustomHeader />
                  }}
                  getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row')}
                  autoHeight
                  getRowHeight={() => 'auto'}
                  sx={{
                    '& .MuiDataGrid-cell': {
                      whiteSpace: 'normal',
                      lineHeight: '1.4rem',
                      py: 1
                    },
                    '& .MuiDataGrid-row': {
                      borderBottom: '1px solid #ccc'
                    },
                    '& .MuiDataGrid-columnHeader': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                />
              </Card>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
};

export default Lead;
