import { Button, Grid, MenuItem, TextField, Typography, IconButton, InputBase } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import { useState, useEffect } from 'react';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useGridApiContext } from '@mui/x-data-grid';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
const CaseList = ({ selectedName, status, caseId, dateOpenedFilter }) => {
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
      renderCell: (params) => {
        const formatAmount = (value) => {
          const numericValue = parseFloat(value.replace(/[^\d.-]/g, ''));
          if (isNaN(numericValue)) return `$0`;
          let formattedValue = numericValue;
          let suffix = '';
          if (numericValue >= 1_000_000_000) {
            formattedValue = (numericValue / 1_000_000_000).toFixed(1);
            suffix = 'B';
          } else if (numericValue >= 1_000_000) {
            formattedValue = (numericValue / 1_000_000).toFixed(1);
            suffix = 'M';
          } else if (numericValue >= 1_000) {
            formattedValue = (numericValue / 1_000).toFixed(1);
            suffix = 'K';
          }

          return `$${formattedValue}${suffix}`;
        };

        return (
          <Typography variant="body2" fontWeight="600" sx={{ color: 'green', fontSize: '12px' }}>
            {formatAmount(params.value) || '-'}
          </Typography>
        );
      }
    },

    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        const phoneNumber = params.value ? params.value.replace(/^\+91/, '') : '-';
        return (
          <Typography variant="body2" sx={{ fontSize: '12px' }}>
            {phoneNumber || '-'}
          </Typography>
        );
      }
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

        if (selectedName) {
          queryParams.append('name', selectedName);
        }
        if (status) queryParams.append('status', status === 'active');

        if (caseId) queryParams.append('uniqueId', caseId);

        if (dateOpenedFilter && dateOpenedFilter !== '') {
          const formattedDate = new Date(dateOpenedFilter).toISOString().split('T')[0];
          queryParams.append('createdAt', formattedDate);
        }
        const response = await getApi(`${urls.transaction.fetchWithPagination}?${queryParams.toString()}`);

        const allTransaction = response?.data?.data || [];

        const pagination = response?.data?.meta || { total: 0 };
        setTotalRows(pagination?.total);
        const formattedTransactions = allTransaction?.map((item, index) => ({
          id: item?._id || index,
          title: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-',
          type:
            item?.donorId?.personalInfo?.firstName || item?.donorId?.personalInfo?.lastName
              ? [`${item?.donorId?.personalInfo?.firstName || '-'}`, `${item?.donorId?.personalInfo?.lastName || '-'}`].join(' ')
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
  }, [paginationModel, selectedName, status, caseId, dateOpenedFilter]);
  const CustomHeader = () => {
    const apiRef = useGridApiContext();

    const handleExportCSV = () => {
      apiRef.current.exportDataAsCsv();
    };

    const handlePrint = () => {
      apiRef.current.exportDataAsPrint();
    };
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
            {' '}
            Donor Report List
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PrintOutlinedIcon sx={{ cursor: 'pointer' }} onClick={handlePrint} />
              <SaveAltOutlinedIcon sx={{ cursor: 'pointer' }} onClick={handleExportCSV} />
              <OpenInNewIcon sx={{ cursor: 'pointer' }} onClick={() => window.open(window.location.href, '_blank')} />
            </Box>
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
