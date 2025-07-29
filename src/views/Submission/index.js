import { Stack, Grid, TextField, Card, Box, Typography, IconButton, Chip, Tooltip, InputBase, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import React, { useState } from 'react';
import FilterPanel from 'components/FilterPanel';
import { urls } from 'common/urls';
import { useEffect } from 'react';
import { getApi, updateApiPatch } from 'common/apiClient';
import moment from 'moment';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useNavigate } from 'react-router';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';
import SubmissionDialog from './SubmissionDialog';
import toast from 'react-hot-toast';
import { IconTrash } from '@tabler/icons';
import CommonConfirmDialog from 'components/deleteDialog';

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
  const [formType, setFormType] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formTypes, setFormTypes] = useState([]);
  const [formTitles, setFormTitles] = useState([]);
  const [dateCreated, setDateCreated] = useState('');
  const [showFilter, setShowFilter] = useState(true);
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleOpenDialog = (params) => {
    setSelectedRowId(params.row.id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleAccept = async () => {
    const url = `${urls?.responses?.submit}/${selectedRowId}`;
    await updateApiPatch(url, { status: 'APPROVED' });
    getAllResponse();
    toast.success('Submission Accepted');
    setDialogOpen(false);
  };

  const handleDecline = async () => {
    const url = `${urls?.responses?.submit}/${selectedRowId}`;
    await updateApiPatch(url, { status: 'REJECTED' });
    getAllResponse();
    toast.success('Submission Rejected');
    setDialogOpen(false);
    setConfirmOpen(false)
  };

  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`${id}`);
  };

  const getAllResponse = async () => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      page: paginationModel.page + 1,
      limit: paginationModel.pageSize,
      status: 'PENDING'
    });
    if (searchQuery) {
      queryParams.append('search', searchQuery);
    }
    if (formType) {
      queryParams.append('type', formType);
    }
    if (formTitle) {
      queryParams.append('title', formTitle);
    }
    if (dateCreated) {
      queryParams.append('createdAt', dateCreated);
    }
    const fromUrl = `${urls?.responses?.submit}?${queryParams.toString()}`;
    const response = await getApi(fromUrl);
    const pagination = response?.data?.meta || { total: 0 };
    const formattedData = response?.data?.data?.map((item, index) => {
      const submissionDate = moment(item?.submittedAt).format('L');
      let data = {
        id: item?._id,
        index: index + 1,
        type: item?.formId?.type,
        campaign: item?.template,
        title: item?.formId?.title,
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
  }, [searchQuery, formType, paginationModel, formTitle, dateCreated]);

  const getFormTypes = async () => {
    const url = `${urls?.responses?.submit}?limit=10000`;
    const response = await getApi(url);
    const options = response?.data?.data?.map((item) => ({
      value: item?.formId?.title,
      label: item?.formId?.title
    }));
    const optionsType = response?.data?.data?.map((item) => ({
      value: item?.formId?.type,
      label: item?.formId?.type
    }));
    setFormTypes(optionsType);
    setFormTitles(options);
  };
  useEffect(() => {
    getFormTypes();
  }, []);

  const columns = [
    {
      field: 'type',
      headerName: 'Form Type',
      flex: 0.8,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ whiteSpace: 'normal' }}>
          {params.value || '-'}
        </Typography>
      )
    },
    {
      field: 'title',
      headerName: 'Form Display Title',
      flex: 0.8,
      renderCell: (params) => <Chip label={params.value} sx={{ bgcolor: '#e5f8fe', color: '#79dbfb' }} />
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
      field: 'edit',
      headerName: 'Edit',
      flex: 0.3,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* <EditOutlinedIcon sx={{ color: 'red', cursor: 'pointer' }} fontSize="small" onClick={() => handleEdit(params.row)} /> */}

          <IconTrash
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRowId(params.row.id);
              setConfirmOpen(true)
            }}
            size={18}
            style={{ color: 'red', cursor: 'pointer', verticalAlign: 'middle' }}
          />
        </Box>
      )
    }
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <>
      <CommonConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDecline}
        content="Are you sure you want to delete ?"
        confirmText="Delete"
        cancelText="Cancel"
      />
      <Grid>
        <Card sx={{ backgroundColor: '#eef2f6' }}>
          <Grid>
            <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
              <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">
                Submitted Form
              </Typography>
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
              formTitles={formTitles}
              formTitle={formTitle}
              setFormTitle={setFormTitle}
              dateCreated={dateCreated}
              setDateCreated={setDateCreated}
              selectedFilters={['formType', 'formDisplayTitle', 'dateSubmitted']}
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
                  onRowClick={handleOpenDialog}
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
                  sx={{
                    '& .MuiDataGrid-row': {
                      borderBottom: '1px solid #ccc',
                      cursor: 'pointer'
                    }
                  }}
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
      <SubmissionDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onAccept={handleAccept}
        onDecline={handleDecline}
        id={selectedRowId}
      />
    </>
  );
};

export default Lead;
