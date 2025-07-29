import React from 'react';
import { Card, Grid, IconButton, Tooltip, Typography, InputBase, Button, Menu, MenuItem } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import { getApi, updateApi } from 'common/apiClient';
import { urls } from 'common/urls';
import { useLocation, useNavigate } from 'react-router-dom';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';
import { entityTypeMap, ROLES, sessionNames } from 'common/constants';
import CustomHeader from 'components/CustomHeader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const ListView = () => {
  const location = useLocation();
  const { id, listType } = location.state;
  const navigate = useNavigate();
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [listData, setListData] = useState();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });

  const fetchLists = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize
      });

      //   if (!includeArchives) {
      //     queryParams.append('archive', 'false');
      //   }

      const response = await getApi(`${urls.list.fetchListData}/${id}?${queryParams.toString()}`);
      const users = response?.data?.data || [];
      const pagination = response?.data?.meta || {};

      const formattedUsers = users.map((user, index) => ({
        id: user?._id,
        serialNumber: `#C-${(index + 1).toString().padStart(3, '0')}`,
        name: user?.personalInfo ? (`${user.personalInfo.firstName} ${user.personalInfo.lastName}`): user?.uniqueId || user?.name||user?.transactionId||user?.title
      }));
     
      setListData(response?.data?.listData);

      setRows(formattedUsers);
      setTotalRows(pagination?.total);
    } catch (error) {
      console.error('Failed to fetch mails:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const columns = [
    {
      field: 'person',
      headerName: 'Details',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={2} width="100%" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <PersonIcon />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 450 }}>
                {params.row.name} {params.row.serialNumber}
              </Typography>
            </Box>
          </Stack>

          <Tooltip title="Info" arrow>
            <IconButton>
              <InfoIcon sx={{ color: '#49494c' }} />
            </IconButton>
          </Tooltip>
        </Stack>
      )
    }
  ];

  return (
    <>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center" gap={1}>
            <IconButton onClick={() => navigate(-1)} size="small">
              <ArrowBackIcon />
            </IconButton>
            {'Lists'}
          </Typography>
        </Box>
        <Box width="100%">
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
              rowHeight={65}
              getRowId={(row) => row.id}
              checkboxSelection
              onRowSelectionModelChange={(newSelection) => {
                setSelectedIds(newSelection);
              }}
              slots={{
                toolbar: () => (
                  <CustomHeader
                    entityType={entityTypeMap[listType] || 'service_user'}
                    title={`${listType} List`}
                    selectedIds={selectedIds}
                    enableBulkActions={true}
                    exportEnabled={true}
                    extraActions={null}
                    refetchData={fetchLists}
                    isCompletlyDelete={true}
                  />
                ),
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
              paginationMode="server"
              rowCount={totalRows}
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
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
        </Box>
      </Grid>
    </>
  );
};

export default ListView;
