import { Button, Grid, MenuItem, TextField, Typography, IconButton, InputBase } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import { useState, useEffect } from 'react';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';

const CaseList = () => {
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [totalRows, setTotalRows] = useState(0);
  const [rows, setRows] = useState([]);

  const columns = [
    {
      field: 'receiptNumber',
      headerName: 'Receipt No.',
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="500" sx={{ fontSize: '12px' }}>
          #{params.value || '-'}
        </Typography>
      )
    },
    {
      field: 'type',
      headerName: 'Name',
      flex: 1.5,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 'normal',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            fontSize: '12px'
          }}
        >
          {params.value || '-'}
        </Typography>
      )
    },
    {
      field: 'title',
      headerName: 'Credited At',
      flex: 1,
      renderCell: (params) => <Typography sx={{ fontSize: '12px' }}>{params?.value || '-'}</Typography>
    },
    {
      field: 'status',
      headerName: 'Amount',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="600" sx={{ color: 'green', fontSize: '12px' }}>
          {params.value || '-'}
        </Typography>
      )
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontSize: '12px' }}>
          {params.value || '-'}
        </Typography>
      )
    }
  ];
  useEffect(() => {
    const fetchDonor = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize
        });
        const response = await getApi(
          `${urls.transaction.fetchWithPagination}?page=${paginationModel.page + 1}&limit=${paginationModel.pageSize}`
        );

        const allTransaction = response?.data?.data || [];

        const pagination = response?.data?.meta || { total: 0 };
        setTotalRows(pagination?.total);
        const formattedTransactions = allTransaction?.map((item, index) => ({
          id: item?._id || index,
          title: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-',
          type:
            item?.donorId?.personalInfo?.firstName || item?.donorId?.personalInfo?.lastName
              ? [item?.donorId?.personalInfo?.firstName || '-', item?.donorId?.personalInfo?.lastName || '-']
              : [item?.donorId?.companyInformation?.companyName || '-'],

          code: item?.campaign?.name || item.campaign || '-',
          status: item?.amountPaid != null ? `₹${item.amountPaid}` : '-',
          more: item?.transactionId || '-',
          receiptNumber: item?.receiptNumber || '-',
          phone: item?.donorId?.contactInfo?.phone || '-'
        }));
        setRows(formattedTransactions);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonor();
  }, []);
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
              fontWeight: '450',
              color: '#333',
              fontSize: '13px',
              lineHeight: '36px'
            }}
          >
            DONOR REPORT LIST
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: '30px',
                paddingLeft: '16px',
                border: '1px solid #e0e0e0',
                width: '250px',
                height: '30px'
              }}
            >
              <InputBase
                placeholder="Search..."
                sx={{
                  flex: 1,
                  color: 'text.primary'
                }}
              />
              <IconButton
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

            <GridToolbarExport />
          </Box>
        </GridToolbarContainer>
      </Box>
    );
  };

  return (
    <>
      <Grid container>
        <Box sx={{ backgroundColor: '#fff', borderRadius: 2 }} height="100vh" width="100%">
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
            rowCount={totalRows}
            rowHeight={65}
            loading={loading}
            getRowId={(row) => row.id}
            checkboxSelection
            pagination
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 25, 50]}
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
            sx={{
              '& .MuiDataGrid-row': {
                borderBottom: '1px solid #ccc'
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#eeeeee',
                fontSize: '0.75rem'
              },
              '& .MuiDataGrid-checkboxInput': {
                padding: '2px',
                transform: 'scale(0.8)'
              }
            }}
          />
        </Box>
      </Grid>
    </>
  );
};

export default CaseList;
