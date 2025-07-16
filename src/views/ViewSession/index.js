import React from 'react';
import { Box, Grid, Typography, Paper, Chip, Button, IconButton, Divider, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TagIcon from '@mui/icons-material/LocalOffer';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useEffect, useState } from 'react';
import { urls } from 'common/urls';
import CancelIcon from '@mui/icons-material/Cancel';
import { getApi } from 'common/apiClient';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { imageUrl } from 'common/urls';
import OptionsPopover from 'components/AddFilter';
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';

const ServiceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // const { serviceid } = location.state || {};
  const [serviceTypeName, setServiceTypeName] = useState('');
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [groupedTags, setGroupedTags] = useState([]);
  const session = location.state?.session;
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
      if (!session?._id) return;
      try {
        const res = await getApi(urls.session.getById.replace(':id', session?._id));
        setSessionData(res?.data?.userData || {});
      } catch (error) {
        console.error('Failed to fetch service details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [session?._id]);

  useEffect(() => {
    const fetchServiceTypeName = async () => {
      try {
        const response = await getApi(urls.configuration.fetch);
        const configList = response?.data?.allConfiguration || [];
        const serviceTypeConfigs = configList.filter((item) => item.configurationType === 'Service Types');
        const matched = serviceTypeConfigs.find((item) => item._id === sessionData?.serviceType || item._id?.$oid === serviceType);

        if (matched) {
          setServiceTypeName(matched.name);
        } else {
          setServiceTypeName('Unknown');
        }
      } catch (error) {
        console.error('Error fetching configuration:', error);
        setServiceTypeName('Unknown');
      }
    };
    if (sessionData?.serviceType) {
      fetchServiceTypeName();
    }
  }, [sessionData?.serviceType]);

  useEffect(() => {
    const fetchAndGroupTags = async () => {
      try {

        const session = sessionData?.[0]; // Only using the first item
        if (!session) {
          console.warn('No session data found');
          return;
        }


        const allTagsResponse = await getApi(urls.tag.getAllTags);

        const allTags = allTagsResponse?.data?.allTags || [];

        const allIds = [
          ...session.benificiary,
          ...session.campaigns,
          ...session.eventAttanded,
          ...session.engagement,
          ...session.fundingInterest,
          ...session.fundraisingActivities
        ].map((id) => {
          const normalizedId = typeof id === 'object' ? id.$oid : id;
          return normalizedId;
        });


        const relatedTags = allTags.filter((tag) => {
          const tagId = tag._id;
          const isRelated = allIds.includes(tagId);
          return isRelated;
        });


        const grouped = {};
        relatedTags.forEach((tag) => {
          const category = tag.tagCategoryName || 'Uncategorized';
          if (!grouped[category]) grouped[category] = [];
          grouped[category].push(tag.name);
        });


        const formatted = Object.entries(grouped).map(([category, tags]) => ({
          category,
          tags
        }));


        setGroupedTags(formatted);
      } catch (err) {
        console.error('Error fetching tags:', err);
      }
    };

    if (sessionData?.length > 0) {
      fetchAndGroupTags();
    } else {
      console.warn('No sessionData available to trigger fetch');
    }
  }, [sessionData]);

  return (
    <Box sx={{ p: 2 }}>
      <Grid item xs={12} mb={2}>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          sx={{ width: '100%' }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={() => navigate(-1)}>
              <KeyboardBackspaceIcon sx={{ fontSize: 20, color: 'black' }} />
            </IconButton>
            <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">
              {sessionData?.[0].serviceId?.name} Session
            </Typography>
          </Stack>

          <Button
            variant="text"
            sx={{
              color: '#333333',
              borderRadius: '6px',
              fontWeight: '500',
              fontSize: '14px',
              padding: 1,
              paddingInline: 2,
              backgroundColor: '#E6E6E6',
              '&:hover': {
                backgroundColor: '#E6E6E6'
              }
            }}
            onClick={(event) => {
              event.stopPropagation();
              navigate('/attendees', { state: { session: sessionData?.[0] } });
            }}
          >
            View Attendees List
          </Button>
        </Stack>

      </Grid>

      <Grid container spacing={2} sx={{ height: 560 }}>
        <Grid item xs={12} md={6} sx={{ height: '50%' }}>
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
              <Diversity2OutlinedIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="subtitle1">ABOUT SESSION</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
              <Grid container spacing={2}>

                <Grid item xs={6}>
                  <Stack spacing={2}>
                    {[
                      { label: 'Location:', value: sessionData?.[0]?.country?.name || '-' },
                      {
                        label: 'Session Lead:',
                        value: [sessionData?.[0]?.serviceuser?.personalInfo?.firstName, sessionData?.[0]?.serviceuser?.personalInfo?.lastName]
                          .filter(Boolean)
                          .join(' ')
                      },
                      { label: 'Service Type:', value: sessionData?.[0]?.serviceId?.name || '-' }
                    ].map(({ label, value }, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          gap: 1,
                          alignItems: 'center',
                          '& > *:first-of-type': {
                            width: 110,
                            fontWeight: 600,
                            flexShrink: 0,
                            fontSize: '12px',
                            lineHeight: '24px',
                          },
                          '& > *:last-of-type': {
                            flexGrow: 1,
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '24px',
                          }
                        }}
                      >
                        <Typography component="span">{label}</Typography>
                        <Typography component="span">{value}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Grid>

                <Grid item xs={6}>
                  <Stack spacing={2}>
                    {[
                      { label: 'Date:', value: formatDate(sessionData?.[0]?.timestamp) || '-' },
                      { label: 'Time:', value: sessionData?.[0]?.serviceId?.name || '-' },
                      { label: 'Attachment:', value: (sessionData?.[0]?.file ? 1 : 0) + ' File' }
                    ].map(({ label, value }, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          gap: 1,
                          alignItems: 'center',
                          '& > *:first-of-type': {
                            width: 110,
                            fontWeight: 600,
                            flexShrink: 0,
                            fontSize: '12px',
                            lineHeight: '24px',
                          },
                          '& > *:last-of-type': {
                            flexGrow: 1,
                            fontWeight: 400,
                            fontSize: '12px',
                            lineHeight: '24px',
                          }
                        }}
                      >
                        <Typography component="span">{label}</Typography>
                        <Typography component="span">{value}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
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
            {/* Header */}
            <Box display="flex" alignItems="center" mb={2}>
              <LocalOfferOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="subtitle1">Session Tags</Typography>
            </Box>

            {/* Scrollable content */}
            <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
              {groupedTags.length === 0 ? (
                <Typography variant="body2" color="textSecondary">
                  No tags found.
                </Typography>
              ) : (
                groupedTags.map((group, idx) => (
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
                          size="small"
                          onDelete={() => { }}
                          deleteIcon={
                            <CancelIcon
                              sx={{
                                fontSize: 16,
                                color: '#009FC7'
                              }}
                            />
                          }
                          sx={{
                            backgroundColor: '#009FC7',
                            color: '#FFFFFF',
                            height: 24,
                            fontSize: '0.75rem',
                            padding: '0 4px',

                            '& .MuiChip-deleteIcon': {
                              marginLeft: '4px',
                              color: '#009FC7'
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

    </Box >
  );
};

export default ServiceDetails;
