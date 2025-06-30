import { Stack, Grid, TextField, Card, Box, Typography, IconButton, Chip, Tooltip, InputBase, Button } from '@mui/material';
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
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';

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
            fontWeight: '400',
            color: '#333',
            fontSize: '14px',
            lineHeight: '36px'
          }}
        >
          Submitted Form List
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GridToolbarExport />
        </Box>
      </GridToolbarContainer>
    </Box>
  );
};

const Lead = () => {
  const [campaign, setCampaignFilter] = useState('');
  const [formType, setFormType] = useState('');
  const [formTypes, setFormTypes] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`${id}`);
  };

  const getAllResponse = async () => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      page: paginationModel.page + 1,
      limit: paginationModel.pageSize
    });
    if (searchQuery) {
      queryParams.append('search', searchQuery);
    }
    if (formType) {
      queryParams.append('search', formType);
    }
    const fromUrl = `${urls?.responses?.submit}?${queryParams.toString()}`;
    const response = await getApi(fromUrl);
    const pagination = response?.data?.meta || { total: 0 };
    const formattedData = response?.data?.data?.map((item, index) => {
      const submissionDate = moment(item?.submittedAt).format('L');
      let data = {
        id: item?._id,
        index: index + 1,
        description: item?.formId?.title,
        campaign: item?.template,
        title: 'help',
        submissionDate,
        status: item?.status
      };
      return data;
    });
    setTotalRows(pagination?.total);
    setRows(formattedData);
    setLoading(false);
  };
  useEffect(() => {
    getAllResponse();
  }, [searchQuery, formType, paginationModel]);

  const getFormTypes = async () => {
    const url = `${urls?.responses?.submit}?limit=10000`;
    const response = await getApi(url);
    const options = response?.data?.data?.map((item) => ({
      value: item?.formId?.title,
      label: item?.formId?.title
    }));
    setFormTypes(options);
  };
  useEffect(() => {
    getFormTypes();
  }, []);

  const columns = [
    {
      field: 'description',
      headerName: 'Form Type',
      flex: 0.8,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ whiteSpace: 'normal' }}>
          {params.value || '-'}
        </Typography>
      )
    },
    {
      field: 'submissionDate',
      headerName: 'Date Submitted',
      flex: 0.8,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ whiteSpace: 'normal' }}>
          {params.value || '-'}
        </Typography>
      )
    },
    {
      field: 'campaign',
      headerName: 'Form Campaign',
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {/* {params.value} */}-
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
      field: 'status',
      headerName: 'Status',
      flex: 0.8,
      renderCell: (params) => (
        <Button
          size="small"
          variant="contained"
          sx={{
            color: params?.value === 'PENDING' ? '#ffc107' : params?.value === 'APPROVED' ? '#00c853' : '#d84315',
            backgroundColor: params?.value === 'PENDING' ? '#fff8e1' : params?.value === 'APPROVED' ? '#b9f6ca' : '#fbe9e7',
            boxShadow: 'none',
            borderRadius: '10px',
            padding: '0px',
            fontWeight: '400',
            '&:hover': {
              color: params?.value === 'PENDING' ? '#ffc107' : params?.value === 'APPROVED' ? '#00c853' : '#d84315',
              backgroundColor: params?.value === 'PENDING' ? '#fff8e1' : params?.value === 'APPROVED' ? '#b9f6ca' : '#fbe9e7',
              boxShadow: 'none'
            }
          }}
        >
          {params?.value || '-'}
        </Button>
      )
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
          <ReadMoreIcon sx={{ cursor: 'pointer' }} onClick={() => handleNavigate(params.row.id)} />
          <EditOutlinedIcon sx={{ color: 'red' }} fontSize="small" onClick={() => handleEdit(params.row)} />
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
        <Card sx={{ backgroundColor: '#eef2f6' }}>
          <Grid>
            <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
              <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">Submitted Form</Typography>
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
                  value={searchQuery}
                  onChange={handleSearchChange}
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
              <Card style={{ height: '100vh' }}>
                <DataGrid
                  rows={
                    loading
                      ? []
                      : rows.map((row, index) => ({
                          ...row,
                          sNo: paginationModel.page * paginationModel.pageSize + index + 1
                        }))
                  }
                  columns={columns}
                  loading={loading}
                  slots={{
                    toolbar: () => <CustomHeader />,
                    loadingOverlay: () => (
                      <Box
                        sx={{
                          height: '100%',
                          display: 'flex',
                          alignItems: 'self-start',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(255, 255, 255, 0.15)'
                        }}
                      >
                        <SingleRowLoader />
                      </Box>
                    ),
                    noRowsOverlay: () => (loading ? null : <Box sx={{ padding: 2, textAlign: 'center' }}>No data available.</Box>)
                  }}
                  getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row')}
                  rowHeight={65}
                  // getRowHeight={() => 'auto'}
                  // sx={{
                  //   '& .MuiDataGrid-cell': {
                  //     whiteSpace: 'normal',
                  //     lineHeight: '1.4rem',
                  //     py: 1
                  //   },
                  //   '& .MuiDataGrid-row': {
                  //     borderBottom: '1px solid #ccc'
                  //   },
                  //   '& .MuiDataGrid-columnHeader': {
                  //     backgroundColor: '#f5f5f5'
                  //   }
                  // }}
                  rowCount={totalRows}
                  pagination
                  paginationMode="server"
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  pageSizeOptions={[5, 10, 25, 50]}
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
