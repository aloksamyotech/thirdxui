import { useEffect, useState, useRef } from 'react';
import { Grid, TextField, Card, Tabs, Tab, Box, MenuItem, Button, Autocomplete, FormControl } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { urls } from 'common/urls';
import { postApi, getApi } from 'common/apiClient';

const AddCaseForm = ({ onCancel, fetchTransections }) => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [paymentTabComplete, setPaymentTabComplete] = useState(false);
  const fileInputRef = useRef(null);

  const [serviceType, setServiceType] = useState([]);
  const [products, setProducts] = useState([]);
  const [campaignTypeOptions, setCampaignTypeOptions] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [donorData, setDonorData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    handleSubmit,
    control,
    register,
    setValue,
    getValues,
    trigger,
    formState: { errors }
  } = useForm({ mode: 'all' });

  const handleTabChange = (newIndex) => {
    setTabIndex(newIndex);
  };

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (searchQuery) queryParams.append('search', searchQuery);
        // queryParams.append('role', 'donor');

        const response = await getApi(`${urls.serviceuser.fetchWithPagination}?${queryParams.toString()}`);
        const allDonors = response.data.data || [];

        const activeDonors = allDonors
          .filter((donor) => donor.isActive)
          .map((donor) => {
            const fullName = `${donor.personalInfo?.firstName || ''} ${donor.personalInfo?.lastName || ''}`.trim();
            const companyName = donor.companyInformation?.companyName || '';
            const labelParts = [];

            if (fullName) labelParts.push(fullName);
            if (companyName) labelParts.push(companyName);

            return {
              label: labelParts.join(' - ') || 'Unnamed',
              value: donor._id?.$oid || donor._id
            };
          });

        setDonorData(activeDonors);
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };

    fetchDonors();
  }, [searchQuery]);

  const fetchData = async () => {
    try {
      const response = await getApi(urls.configuration.fetch);
      const config = response?.data?.allConfiguration || [];

      setServiceType(config.filter((item) => item.configurationType === 'Payment Method'));
      setProducts(config.filter((item) => item.configurationType === 'Product'));

      setCampaignTypeOptions(
        config.filter((item) => item.configurationType === 'Campaign').map((item) => ({ value: item._id, label: item.name }))
      );

      setCurrency(config.filter((item) => item.configurationType === 'Currency').map((item) => ({ value: item._id, label: item.name })));
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    if (tabIndex === 0 && !paymentTabComplete) {
      const valid = await trigger([
        'assignedTo',
        'campaign',
        'amountPaid',
        'paymentMethod',
        'processingCost',
        'currency',
        'receiptNumber',
        'transactionId'
      ]);
      if (valid) {
        setPaymentTabComplete(true);
        setTabIndex(1);
      }
      return;
    }

    const valid = await trigger(['product', 'quantity', 'amountDue']);
    if (!valid) return;

    try {
      const payload = {
        donorId: data.assignedTo || '',
        campaign: data.campaign || '',
        amountPaid: data.amountPaid || '',
        paymentMethod: data.paymentMethod || '',
        quantity: data.quantity || '',
        amountDue: data.amountDue || '',
        processingCost: data.processingCost || '',
        currency: data.currency || '',
        receiptNumber: data.receiptNumber || '',
        transactionId: data.transactionId || '',
        productId: data.product || null
      };

      await postApi(urls.transaction.create, payload, {
        headers: { 'Content-Type': 'application/json' }
      });

      toast.success('Transaction added successfully!');

      setTabIndex(0);
      setPaymentTabComplete(false);
      onCancel?.();
    } catch (error) {
      toast.error('Submission failed!');
    } finally {
      fetchTransections();
    }
  };

  return (
    <Grid>
      <Card>
        <Card sx={{ padding: 3, borderRadius: 3, boxShadow: 'none', backgroundColor: '#ffffff' }}>
          <Tabs
            value={tabIndex}
            onChange={(e, newValue) => setTabIndex(newValue)}
            sx={{
              minHeight: 'auto',
              borderBottom: '1px solid #e0e0e0',
              mb: 2,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 14,
                color: '#7b7b7b',
                minHeight: 32,
                px: 2
              },
              '& .Mui-selected': { color: '#4a90e2' },
              '& .MuiTabs-indicator': {
                backgroundColor: '#4a90e2',
                height: 3,
                borderRadius: 2
              }
            }}
          >
            <Tab label="Payment" />
            <Tab label="Allocation" />
          </Tabs>

          <Box component="form" mt={2} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {tabIndex === 0 && (
                <Box sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    {/* Donor and Campaign */}
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth size="small" error={!!errors.assignedTo}>
                        <Controller
                          name="assignedTo"
                          control={control}
                          rules={{ required: 'Assigned To is required' }}
                          render={({ field }) => (
                            <Autocomplete
                              {...field}
                              options={donorData}
                              getOptionLabel={(option) => option.label || ''}
                              onChange={(event, value) => setValue('assignedTo', value ? value.value : '')}
                              onInputChange={(_, newInputValue) => setSearchQuery(newInputValue)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Assigned to"
                                  error={!!errors.assignedTo}
                                  helperText={errors.assignedTo?.message}
                                />
                              )}
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="campaign"
                        control={control}
                        rules={{ required: 'Campaign is required' }}
                        render={({ field }) => (
                          <TextField
                            select
                            fullWidth
                            size="small"
                            label="Campaign"
                            {...field}
                            error={!!errors.campaign}
                            helperText={errors.campaign?.message}
                          >
                            {campaignTypeOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>

                    {/* Other payment details */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Amount Paid"
                        {...register('amountPaid', {
                          required: 'Only number required',
                          pattern: { value: /^[0-9]+$/, message: 'Only numbers allowed' }
                        })}
                        onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
                        error={!!errors.amountPaid}
                        helperText={errors.amountPaid?.message}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="paymentMethod"
                        control={control}
                        rules={{ required: 'Payment Method is required' }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            fullWidth
                            label="Payment Method"
                            size="small"
                            error={!!errors.paymentMethod}
                            helperText={errors.paymentMethod?.message}
                          >
                            {serviceType.map((option) => (
                              <MenuItem key={option._id} value={option._id}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Processing Cost"
                        {...register('processingCost', {
                          required: 'Only number required',
                          pattern: { value: /^[0-9]+$/, message: 'Only numbers allowed' }
                        })}
                        onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
                        error={!!errors.processingCost}
                        helperText={errors.processingCost?.message}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="currency"
                        control={control}
                        rules={{ required: 'Currency is required' }}
                        render={({ field }) => (
                          <TextField
                            select
                            fullWidth
                            size="small"
                            label="Currency"
                            {...field}
                            error={!!errors.currency}
                            helperText={errors.currency?.message}
                          >
                            {currency.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Receipt No."
                        {...register('receiptNumber', {
                          pattern: {
                            value: /^[a-zA-Z0-9]*$/,
                            message: 'Only alphanumeric characters allowed'
                          },
                          maxLength: { value: 40, message: 'Max 40 characters allowed' }
                        })}
                        error={!!errors.receiptNumber}
                        helperText={errors.receiptNumber?.message}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Transaction ID"
                        {...register('transactionId', {
                          pattern: {
                            value: /^[a-zA-Z0-9]*$/,
                            message: 'Only alphanumeric characters allowed'
                          },
                          maxLength: { value: 40, message: 'Max 40 characters allowed' }
                        })}
                        error={!!errors.transactionId}
                        helperText={errors.transactionId?.message}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}

              {tabIndex === 1 && (
                <Grid item xs={12}>
                  <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Controller
                          name="product"
                          control={control}
                          rules={{ required: 'Product is required' }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              select
                              fullWidth
                              label="Product"
                              size="small"
                              error={!!errors.product}
                              helperText={errors.product?.message}
                            >
                              {products.map((option) => (
                                <MenuItem key={option._id} value={option._id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          )}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Quantity"
                          {...register('quantity', {
                            required: 'Quantity is required',
                            pattern: {
                              value: /^[0-9]+$/,
                              message: 'Only numbers allowed'
                            }
                          })}
                          error={!!errors.contactPurpose}
                          helperText={errors.contactPurpose?.message}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Amount Due"
                          {...register('amountDue', {
                            required: 'Amount Due is required'
                          })}
                          error={!!errors.reason}
                          helperText={errors.reason?.message}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              )}
            </Grid>

            <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt: 2 }}>
              <Grid item>
                <Button type="submit" variant="contained" sx={{ background: '#053146' }}>
                  SAVE CHANGES
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: '#a6a9ff',
                    color: '#a6a9ff',
                    '&:hover': {
                      borderColor: '#a6a9ff',
                      backgroundColor: '#f0f1ff'
                    }
                  }}
                  onClick={() => {
                    onCancel?.();
                    setTabIndex(0);
                    setPaymentTabComplete(false);
                  }}
                >
                  CANCEL
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Card>
    </Grid>
  );
};

export default AddCaseForm;
