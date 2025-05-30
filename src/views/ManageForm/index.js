import { Stack, Grid, TextField, Card, Box, Typography, IconButton, Chip, Tooltip, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddFormModal from './AddForm.js';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import React, { useState } from 'react';
import FilterPanel from 'components/FilterPanel';
import { urls } from 'common/urls.js';
import { getApi } from 'common/apiClient.js';
import { useEffect } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router';

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
          Form List
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GridToolbarExport />
        </Box>
      </GridToolbarContainer>
    </Box>
  );
};


// const initialRows = [
//   { id: 1, description: 'Self Referral form', campaign: 'Beach Cleaning -Corporate volunteer project 2019', title: 'Satisfaction Survey' },
//   { id: 2, description: 'Community Referral form', campaign: 'Form Campaign', title: 'Community Referral' },
//   { id: 3, description: 'Satisfaction survey', campaign: 'Beach Cleaning -Corporate volunteer project 2019', title: 'Volunteer Signup' },
//   { id: 4, description: 'Volunteer sign up form', campaign: 'Form Campaign' },
//   { id: 5, description: 'Workshop sign up form', campaign: 'Beach Cleaning -Corporate volunteer project 2019' }
// ];

const Lead = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [campaign, setCampaignFilter] = useState('');
  const [rows, setRows] = useState([]);
  const [formType, setFormType] = useState('');
  const [formTypes, setFormTypes] = useState([])
  const [showFilter, setShowFilter] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });

  const navigate = useNavigate()

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleNavigate = (id) => {
    window.open(`/surveyform/${id}`, '_blank');
    // navigate(`/surveyform/${id}`)
  }

  const getAllForms = async () => {
    const queryParams = new URLSearchParams({
      page: paginationModel.page + 1,
      limit: paginationModel.pageSize,
    });
    if (searchQuery) {
      queryParams.append('search', searchQuery);
    }
    if (formType) {
      queryParams.append('search', formType);
    }
    const fromUrl = (`${urls?.forms?.getAll}?${queryParams.toString()}`)
    const response = await getApi(fromUrl)
    const pagination = response?.data?.meta || { total: 0 };
    const formattedData = response?.data?.data?.map((item, index) => {
      let data = {
        id: item?._id,
        index: index + 1,
        description: item?.title,
        campaign: item?.template,
        title: "help",
        link: item?.publicId
      }
      return data
    })
    setTotalRows(pagination?.total);
    setRows(formattedData)
  }
  useEffect(() => {
    getAllForms()
  }, [searchQuery, formType, paginationModel])

  const getFormTypes = async () => {
    const url = `${urls?.forms?.getAll}?limit=1000`
    const response = await getApi(url)
    const options = response?.data?.data?.map((item) => ({
      value: item?.title,
      label: item?.title
    }))
    setFormTypes(options)

  }
  useEffect(() => {
    getFormTypes()
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
      headerName: 'Action',
      flex: 0.3,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <OpenInNewIcon color='primary' fontSize='small' sx={{ cursor: 'pointer' }} onClick={() => handleNavigate(params.row.link)} />
          <EditOutlinedIcon sx={{ color: ' #EBEBE4' }} fontSize="small" onClick={() => handleEdit(params.row)} />
        </Box>
      )
    }
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Grid>
        <AddFormModal open={openAdd} onClose={handleCloseAdd} getAllForms={getAllForms} />
        <Card sx={{ backgroundColor: '#eef2f6' }}>
          <Grid>
            <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
              <Tooltip title="Add" arrow>
                <IconButton
                  onClick={() => handleOpenAdd()}
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
                  Add New Form
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
                  value={searchQuery}
                  onChange={handleSearchChange}
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
              formType={formType}
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
                  rowCount={totalRows}
                  pagination
                  paginationMode="server"
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  pageSizeOptions={[10]}
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
