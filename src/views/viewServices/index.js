import React from 'react';
import { Box, Grid, Typography, Paper, Chip, Button, IconButton, Divider, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TagIcon from '@mui/icons-material/LocalOffer';
import { useLocation } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useEffect, useState } from 'react';
import { urls } from 'common/urls';
import CancelIcon from '@mui/icons-material/Cancel';
import { getApi } from 'common/apiClient';
import { useNavigate } from 'react-router-dom';
import SectionSkeleton from 'ui-component/Loader/SectionSkeleton';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { imageUrl } from 'common/urls';
import ManageServicePopover from 'components/ManageServicePopover';
const ServiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { serviceid } = location.state || {};
  const [serviceTypeName, setServiceTypeName] = useState('');
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [groupedTagsArray, setGroupedTagsArray] = useState([]);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (!serviceid) return;
      try {
        setLoading(true);
        const res = await getApi(urls.service.getById.replace(':id', serviceid));
        setServiceData(res?.data?.userData || {});
      } catch (error) {
        console.error('Failed to fetch service details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceid]);

  useEffect(() => {
    const fetchServiceTypeName = async () => {
      try {
        setLoading(true);
        const response = await getApi(urls.configuration.fetch);
        const configList = response?.data?.allConfiguration || [];
        const serviceTypeConfigs = configList.filter((item) => item.configurationType === 'Service Types');
        const matched = serviceTypeConfigs.find((item) => item._id === serviceData?.serviceType || item._id?.$oid === serviceType);

        if (matched) {
          setServiceTypeName(matched.name);
        } else {
          setServiceTypeName('Unknown');
        }
      } catch (error) {
        console.error('Error fetching configuration:', error);
        setServiceTypeName('Unknown');
      } finally {
        setLoading(false);
      }
    };
    if (serviceData?.serviceType) {
      fetchServiceTypeName();
    }
  }, [serviceData?.serviceType]);

  useEffect(() => {
    setLoading(true);

    const grouped = (serviceData?.tags || []).reduce((acc, tag) => {
      const categoryName = tag?.tagCategoryId?.name || 'Uncategorized';
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(tag.name);
      return acc;
    }, {});

    const groupedArray = Object.entries(grouped).map(([category, tags]) => ({
      category,
      tags
    }));

    setGroupedTagsArray(groupedArray);
    setLoading(false);
  }, [serviceData]);
  return (
    <Box sx={{ p: 2 }}>
      <Grid item xs={12} mb={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={() => navigate(-1)}>
            <KeyboardBackspaceIcon sx={{ fontSize: 20, color: 'black' }} />
          </IconButton>
          <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">
            View Service Details
          </Typography>
        </Stack>
      </Grid>

      <Grid container spacing={2} sx={{ height: 574 }}>
        <Grid item xs={12} md={6} sx={{ height: '100%' }}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <Box display="flex" alignItems="center" mb={2}>
              <HomeRepairServiceOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Service Information
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
              {loading ? (
                <SectionSkeleton lines={1} variant="rectangular" height={200} spacing={1} />
              ) : (
                <Grid
                  container
                  spacing={2}
                  sx={{
                    '& > *:not(:last-child)': {
                      marginBottom: '10px'
                    }
                  }}
                >
                  <Grid item xs={6}>
                    <Typography>
                      <Box component="span" sx={{ fontWeight: '600', fontSize: '12px', lineHeight: '24px', marginRight: '8px' }}>
                        Service Name:
                      </Box>
                      <Box component="span" sx={{ fontWeight: '400', fontSize: '12px', lineHeight: '24px' }}>
                        {serviceData?.name}
                      </Box>
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography>
                      <Box component="span" sx={{ fontWeight: '600', fontSize: '12px', lineHeight: '24px', marginRight: '8px' }}>
                        Service Status:
                      </Box>
                      <Box component="span" sx={{ fontWeight: '400', fontSize: '12px', lineHeight: '24px' }}>
                        {serviceData?.isActive ? 'Active' : 'Inactive'}
                      </Box>
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography>
                      <Box component="span" sx={{ fontWeight: '600', fontSize: '12px', lineHeight: '24px', marginRight: '8px' }}>
                        Service Code:
                      </Box>
                      <Box component="span" sx={{ fontWeight: '400', fontSize: '12px', lineHeight: '24px' }}>
                        {serviceData?.code}
                      </Box>
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography>
                      <Box component="span" sx={{ fontWeight: '600', fontSize: '12px', lineHeight: '24px', marginRight: '8px' }}>
                        Start Date:
                      </Box>
                      <Box component="span" sx={{ fontWeight: '400', fontSize: '12px', lineHeight: '24px' }}>
                        {formatDate(serviceData?.createdAt)}
                      </Box>
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography>
                      <Box component="span" sx={{ fontWeight: '600', fontSize: '12px', lineHeight: '24px', marginRight: '8px' }}>
                        Service Type:
                      </Box>
                      <Box component="span" sx={{ fontWeight: '400', fontSize: '12px', lineHeight: '24px' }}>
                        {serviceTypeName}
                      </Box>
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography>
                      <Box component="span" sx={{ fontWeight: '600', fontSize: '12px', lineHeight: '24px', marginRight: '8px' }}>
                        Attachment:
                      </Box>
                      <Box component="span" sx={{ fontWeight: '400', fontSize: '12px', lineHeight: '24px' }}>
                        {serviceData?.file ? 1 : 0} File
                      </Box>
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography>
                      <Box component="span" sx={{ fontWeight: '600', fontSize: '12px', lineHeight: '24px', marginRight: '8px' }}>
                        Description:
                      </Box>
                      <Box component="span" sx={{ fontWeight: '400', fontSize: '12px', lineHeight: '24px' }}>
                        {serviceData?.description}
                      </Box>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} mt={1}>
                    <Typography sx={{ fontWeight: '600', fontSize: '12px', lineHeight: '24px', marginBottom: 1 }}>Image:</Typography>
                    <Box mt={1}>
                      {serviceData?.file ? (
                        <img
                          src={
                            serviceData.file.startsWith('https://')
                              ? serviceData.file
                              : `${imageUrl.replace(/\/$/, '')}/${serviceData.file.replace(/^\//, '')}`
                          }
                          alt="Service"
                          style={{ width: 200, height: 'auto', borderRadius: 8 }}
                        />
                      ) : (
                        <Typography color="textSecondary">No image available</Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} sx={{ height: '100%' }}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <LocalOfferOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="subtitle1">Service Tags</Typography>
            </Box>

            <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
              {loading ? (
                <SectionSkeleton lines={4} height={100} spacing={1} />
              ) : groupedTagsArray.length === 0 ? (
                <Typography variant="body2" color="textSecondary">
                  No tags found.
                </Typography>
              ) : (
                groupedTagsArray.map((group, idx) => (
                  <Box
                    key={idx}
                    mb={2}
                    p={2}
                    sx={{
                      backgroundColor: '#F7F7F7',
                      borderRadius: 2,
                      width: '100%'
                    }}
                  >
                    <Box display="flex" alignItems="center" mb={1}>
                      <Typography variant="subtitle2">{group.category}</Typography>
                    </Box>

                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {group.tags.map((tag, i) => (
                        <Chip
                          key={i}
                          label={tag}
                          onDelete={() => {}}
                          deleteIcon={
                            <CancelIcon
                              sx={{
                                fontSize: 16,
                                color: '#666'
                              }}
                            />
                          }
                          sx={{
                            backgroundColor: '#009FC7',
                            color: '#fff',
                            height: 28,

                            '& .MuiChip-deleteIcon': {
                              marginLeft: '4px'
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            borderRadius: '6px',
            width: '100px',
            height: '36px',
            fontSize: '12px',
            backgroundColor: '#009fc7',
            '&:hover': {
              backgroundColor: '#009fc7'
            }
          }}
        >
          Manage
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => navigate(-1)}
          sx={{
            borderRadius: '6px',
            width: '100px',
            height: '36px',
            fontSize: '12px'
          }}
        >
          CLOSE
        </Button>
      </Box>

      <ManageServicePopover open={open} anchorEl={anchorEl} onClose={handleClose} data={serviceid} />
    </Box>
  );
};

export default ServiceDetails;
