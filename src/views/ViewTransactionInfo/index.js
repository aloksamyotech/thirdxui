import { Card, Grid, IconButton, Stack, Typography, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useLocation, useNavigate } from 'react-router';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';

const ViewTransaction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location?.state?.id;
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTransaction = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await getApi(`${urls.transaction.fetchTransactionById}/${id}`);
      setTransactionData(response?.data?.data || null);
    } catch (error) {
      console.error('Failed to fetch transaction:', error);
      setTransactionData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTransaction();
    }
  }, [id]);

  return (
    <>
      {/* Header */}
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center">
          <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">
            <IconButton onClick={() => navigate(-1)}>
              <KeyboardBackspaceIcon sx={{ fontSize: 20, color: 'black' }} />
            </IconButton>
            Transaction Information
          </Typography>
        </Stack>
      </Grid>

      {/* Card Section */}
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12}>
          <Card sx={{ width: '100%', backgroundColor: '#fff', p: 3, borderRadius: 2 }}>
            {loading ? (
              <Typography>Loading...</Typography>
            ) : !transactionData ? (
              <Typography textAlign="center" color="text.secondary" fontWeight={500}>
                No transaction found
              </Typography>
            ) : (
              <>
                {/* Payment Information */}
                <Typography fontWeight="600" mb={2}>
                  Payment Details
                </Typography>
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight={500}>Assigned To</Typography>
                    <Typography color="text.secondary">{transactionData?.donorId?.role || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight={500}>Campaign</Typography>
                    <Typography color="text.secondary">{transactionData?.campaign?.name || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight={500}>Processing Costs</Typography>
                    <Typography color="text.secondary">{transactionData?.processingCost || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight={500}>Currency</Typography>
                    <Typography color="text.secondary">{transactionData?.currency?.name || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight={500}>Amount Paid</Typography>
                    <Typography color="text.secondary">{transactionData?.amountPaid || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight={500}>Payment Method</Typography>
                    <Typography color="text.secondary">{transactionData?.paymentMethod?.name || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight={500}>Receipt No.</Typography>
                    <Typography color="text.secondary">{transactionData?.receiptNumber || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography fontWeight={500}>Transaction ID</Typography>
                    <Typography color="text.secondary">{transactionData?.transactionId || '-'}</Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* Allocation Information */}
                <Typography fontWeight="600" mb={2}>
                  Allocation Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography fontWeight={500}>Product</Typography>
                    <Typography color="text.secondary">{transactionData?.productId?.name || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography fontWeight={500}>Quantity</Typography>
                    <Typography color="text.secondary">{transactionData?.quantity || '-'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography fontWeight={500}>Amount Due</Typography>
                    <Typography color="text.secondary">{transactionData?.amountDue || '-'}</Typography>
                  </Grid>
                </Grid>
              </>
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ViewTransaction;
