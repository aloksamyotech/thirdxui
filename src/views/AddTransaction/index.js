import { useEffect, useState } from 'react';
import { Grid, TextField, Card, CardContent, CardHeader, Tabs, Tab, Box, Typography, MenuItem, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { urls } from 'common/urls';
import { postApi, getApi } from 'common/apiClient';

const AddCaseForm = ({ onCancel }) => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const fileInputRef = useRef(null);
  const [serviceType, setServiceType] = useState([]);
  const [campaignTypeOptions, setCampaignTypeOptions] = useState([]);

  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'all'
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        assignedTo: data.assignedTo || '',
        campaign: data.campaign || '',
        amountPaid: data.amountPaid || '',
        paymentMethod: data.paymentMethod || '',
        processingCost: data.processingCost || '',
        currency: data.currency || '',
        receiptNumber: data.receiptNumber || '',
        transactionId: data.transactionId || ''
      };

      const res = await postApi(urls.transaction.create, payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      toast.success('Transaction added successfully!');
      navigate('/financial');
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Submission failed!');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getApi(urls.configuration.fetch);

        const servicetypeoption = response?.data?.allConfiguration?.filter((item) => item.configurationType === 'Payment Method');
        setServiceType(servicetypeoption);
      } catch (error) {
        console.error('Error fetching config:', error);
      }
    };
    fetchData();
  }, []);


   useEffect(() => {
      const fetchCampaign = async () => {
        try {
          const response = await getApi(urls.configuration.fetch);
  
          const options = response?.data?.allConfiguration
            ?.filter((item) => item.configurationType === 'Campaign')
            ?.map((item) => ({
              value: item._id,
              label: item.name
            }));
  
          setCampaignTypeOptions(options);
        } catch (error) {
          console.error('Error fetching config:', error);
        }
      };
      fetchCampaign();
    }, []);
  

    

  return (
    <Grid>
      <Card sx={{ backgroundColor: '#eef2f6' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">Add Transaction</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/financial')}>
            <ArrowBackIcon sx={{ color: 'grey' }} />
            <Typography variant="h6" sx={{ mr: 1 }}>
              Back
            </Typography>
          </Box>
        </Box>

        <Card sx={{ padding: 2, marginTop: 2 }}>
          <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)} sx={{ borderBottom: '1px solid #4792d3' }}>
            <Tab label="Payment" />
            {/* <Tab label="Allocation" /> */}
          </Tabs>

          <Box component="form" mt={2} onSubmit={handleSubmit(onSubmit)}>
            {tabIndex === 0 && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ boxShadow: 1, borderRadius: 2, p: 0 }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Assigned To"
                            {...register('assignedTo', {
                              required: 'only letter Required',
                              pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: 'Only letters allowed'
                              }
                            })}
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
                            }}
                            error={!!errors.assignedTo}
                            helperText={errors.assignedTo?.message}
                          />
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


                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Processing Cost"
                            {...register('processingCost', {
                              required: 'only number Required',
                              pattern: {
                                value: /^[0-9]+$/,
                                message: 'Only numbers allowed'
                              }
                            })}
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(/[^0-9]/g, '');
                            }}
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
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="INR">INR</MenuItem>
                              </TextField>
                            )}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card sx={{ boxShadow: 1, borderRadius: 2, p: 0 }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Amount Paid"
                            {...register('amountPaid', {
                              required: ' only number Required',
                              pattern: {
                                value: /^[0-9]+$/,
                                message: 'Only numbers allowed'
                              }
                            })}
                            onInput={(e) => {
                              e.target.value = e.target.value.replace(/[^0-9]/g, '');
                            }}
                            error={!!errors.amountPaid}
                            helperText={errors.amountPaid?.message}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="paymentMethod"
                            control={control}
                            rules={{
                              required: 'Payment Method is required'
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                select
                                fullWidth
                                label="Payment Method"
                                size="small"
                                error={!!errors.serviceType}
                                helperText={errors.serviceType?.message}
                              >
                                {serviceType?.map((option) => (
                                  <MenuItem key={option._id} value={option._id}>
                                    {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
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
                              maxLength: {
                                value: 40,
                                message: 'Maximum 40 characters allowed'
                              }
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
                              maxLength: {
                                value: 40,
                                message: 'Maximum 40 characters allowed'
                              }
                            })}
                            error={!!errors.transactionId}
                            helperText={errors.transactionId?.message}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {/* {tabIndex === 1 && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Controller
                    name="preferredContact"
                    control={control}
                    rules={{ required: 'Product is required' }}
                    render={({ field }) => (
                      <TextField
                        select
                        fullWidth
                        size="small"
                        label="Product"
                        {...field}
                        error={!!errors.preferredContact}
                        helperText={errors.preferredContact?.message}
                      >
                        <MenuItem value="Dog Food">Dog Food</MenuItem>
                        <MenuItem value="Cat Food">Cat Food</MenuItem>
                      </TextField>
                    )}
                  />
                </Grid>
 
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Quantity"
                    {...register('contactPurpose', {
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
 
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Amount Due"
                    {...register('reason', {
                      required: 'Amount Due is required',
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Only numbers allowed'
                      }
                    })}
                    error={!!errors.reason}
                    helperText={errors.reason?.message}
                  />
                </Grid>
              </Grid>
            )} */}

            <Grid container spacing={2} sx={{ justifyContent: 'flex-end', mt: 1, pr: 2 }}>
              <Grid item>
                <Button type="submit" variant="contained" sx={{ background: '#053146' }}>
                  Save Changes
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="error" onClick={onCancel}>
                  Cancel
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
