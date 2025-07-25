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
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });

  const handleViewInfo = (userId, role) => {
    if (role === ROLES.SERVICE_USER || role === ROLES.VOLUNTEER) {
      navigate('/view-people', { state: { id: userId, isArchive: true } });
    } else if (role === ROLES.DONOR) {
      const user = rows.find((row) => row.id === userId);
      navigate('/view-donor', {
        state: {
          id: userId,
          subRole: user?.subRole,
          isArchive: true
        }
      });
    }
  };

  const fetchListData = async () => {
    setLoading(true);
    try {
      let filtered = [];
      let formattedData = [];

      switch (listType) {
        case 'Service user': {
          const queryParams = new URLSearchParams({
            role: ROLES.SERVICE_USER,
            deleted: 'true'
          });
          const response = await getApi(`${urls.serviceuser.fetchWithPagination}?${queryParams.toString()}`);
          const filtered = response?.data?.data || [];
          formattedData = filtered.map((item) => ({
            id: item._id,
            name: item?.personalInfo?.firstName || '-',
            lastName: item?.personalInfo?.lastName || '-',
            uniqueId: item.uniqueId || '-',
            address: item?.contactInfo?.addressLine1 || '-',
            district: item?.contactInfo?.district || '-',
            country: item?.contactInfo?.country || '-',
            postcode: item?.contactInfo?.postcode || '-'
          }));

          break;
        }

        case 'Volunteer': {
          const queryParams = new URLSearchParams({
            role: ROLES.VOLUNTEER,
            deleted: 'true'
          });
          const response = await getApi(`${urls.serviceuser.fetchWithPagination}?${queryParams.toString()}`);
          const filtered = response?.data?.data || [];
          formattedData = filtered.map((item) => ({
            id: item._id,
            name: item?.personalInfo?.firstName || '-',
            lastName: item?.personalInfo?.lastName || '-',
            uniqueId: item.uniqueId || '-',
            address: item?.contactInfo?.addressLine1 || '-',
            district: item?.contactInfo?.district || '-',
            country: item?.contactInfo?.country || '-',
            postcode: item?.contactInfo?.postcode || '-'
          }));
          break;
        }

        case 'Donor': {
          const queryParams = new URLSearchParams({
            role: ROLES.DONOR,
            deleted: 'true'
          });

          const response = await getApi(`${urls.serviceuser.fetchWithPagination}?${queryParams.toString()}`);
          const filtered = response?.data?.data || [];
          formattedData = filtered.map((item) => {
            const fullName =
              item?.personalInfo?.firstName || item?.personalInfo?.lastName
                ? `${item?.personalInfo?.firstName || ''} ${item?.personalInfo?.lastName || ''}`.trim()
                : item?.companyInformation?.companyName || '-';

            return {
              id: item._id,
              name: fullName,
              lastName: item?.personalInfo?.lastName || '-',
              uniqueId: item.uniqueId || '-',
              address: item?.contactInfo?.addressLine1 || '-',
              district: item?.contactInfo?.district || '-',
              country: item?.contactInfo?.country || '-',
              postcode: item?.contactInfo?.postcode || '-'
            };
          });

          break;
        }

        case 'Service': {
          const queryParams = new URLSearchParams({
            deleted: 'true'
          });
          const response = await getApi(`${urls.service.fetchWithPagination}?${queryParams.toString()}`);
          const filtered = response?.data?.data || [];
          formattedData = filtered.map((item) => ({
            id: item._id,
            name: item.name || '-',
            uniqueId: item.code || '-'
          }));

          break;
        }

        case 'Case': {
          const queryParams = new URLSearchParams({
            deleted: 'true'
          });

          if (dateOpenedFilter && dateOpenedFilter !== '') {
            const formattedDate = new Date(dateOpenedFilter).toISOString().split('T')[0];
            queryParams.append('createdAt', formattedDate);
          }

          const response = await getApi(`${urls.case.fetchWithPagination}?${queryParams.toString()}`);
          const filtered = response?.data?.data || [];

          formattedData = filtered.map((item) => ({
            id: item._id,
            name: item?.serviceUserId?.personalInfo?.firstName || '-',
            lastName: item?.serviceUserId?.personalInfo?.lastName || '-',
            uniqueId: item?.uniqueId || '-',
            address: item?.serviceUserId?.contactInfo?.addressLine1 || '-',
            district: item?.serviceUserId?.contactInfo?.district || '-',
            country: item?.serviceUserId?.contactInfo?.country || '-',
            postcode: item?.serviceUserId?.contactInfo?.postcode || '-'
          }));
          break;
        }

        case 'Mailing List': {
          const queryParams = new URLSearchParams({
            deleted: 'true'
          });
          const response = await getApi(`${urls.mail.fetchWithPagination}?${queryParams.toString()}`);
          const filtered = response?.data?.data || [];
          formattedData = filtered.map((item) => ({
            id: item._id,
            listName: item.name || '-'
          }));
          break;
        }

        case 'Donation': {
          const queryParams = new URLSearchParams({
            deleted: 'true'
          });
          const response = await getApi(`${urls.transaction.fetchWithPagination}?${queryParams.toString()}`);
          const filtered = response?.data?.data || [];
          formattedData = filtered.map((item) => {
            const fullName =
              item?.donorId?.personalInfo?.firstName || item?.donorId?.personalInfo?.lastName
                ? `${item?.donorId?.personalInfo?.firstName || ''} ${item?.donorId?.personalInfo?.lastName || ''}`.trim()
                : item?.donorId?.companyInformation?.companyName || '-';

            return {
              id: item._id,
              name: fullName,
              uniqueId: item?.donorId?.uniqueId || '-',
              address: item?.donorId?.contactInfo?.addressLine1 || '-',
              district: item?.donorId?.contactInfo?.district || '-',
              country: item?.donorId?.contactInfo?.country || '-',
              postcode: item?.donorId?.contactInfo?.postcode || '-'
            };
          });
          break;
        }

        case 'Form': {
          const res = await getApi(urls.forms.getAll);
          filtered = (res?.data?.data || []).filter((item) => item?.isDeleted === true);
          formattedData = filtered.map((item) => ({
            id: item._id,
            title: item.title || '-',
            publicId: item.publicId || '-',
            template: item.template || '-'
          }));
          break;
        }

        default:
          console.error('⚠️ No matching listType');
          return;
      }

      setRows(formattedData);
      setLoading(false);
    } catch (error) {
      console.error('❌ API call error:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (listType) {
      fetchListData();
    }
  }, [listType]);
  const columns = (listType) => [
    {
      field: 'person',
      headerName: 'Details',
      flex: 1,
      renderCell: (params) => {
        const row = params.row;

        switch (listType) {
          case 'Form':
            return (
              <Box>
                <Typography fontWeight={500}>{row.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {row.publicId} | Template: {row.template}
                </Typography>
              </Box>
            );

          case 'Mailing List':
            return (
              <Box>
                <Typography fontWeight={500}>{row.listName}</Typography>
              </Box>
            );

          case 'Service':
            return (
              <Box>
                <Typography fontWeight={500}>
                  {row.name} Code: {row.uniqueId}
                </Typography>
              </Box>
            );
          //   case 'Donation':
          //     return <Box></Box>;
          default:
            return (
              <Stack direction="row" alignItems="center" spacing={2} width="100%" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={2}>
                  <PersonIcon />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 450 }}>
                      {row.name} {row.lastName} {row.uniqueId}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {row.address}, {row.district}, {row.postcode}, {row.country}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Tooltip title="Info" arrow>
                    <IconButton onClick={() => handleViewInfo(row.id, row.role)}>
                      <InfoIcon sx={{ color: '#49494c' }} />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            );
        }
      }
    }
  ];

  return (
    <>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb:2}}>
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
              rows={rows}
              columns={columns(listType)}
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
                    refetchData={fetchListData}
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
