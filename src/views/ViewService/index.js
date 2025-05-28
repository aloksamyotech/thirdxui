import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Divider,
  TextField,
  Stack,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import InfoIcon from '@mui/icons-material/Info';
import { useLocation, useNavigate } from 'react-router-dom';
import Background from 'assets/images/UserProfile.png';
import FilterPanel from 'components/FilterPanel';
import { urls } from 'common/urls';
import { getApi } from 'common/apiClient';
import { imageUrl } from 'common/urls';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';
import { toast } from 'react-hot-toast';
import SectionSkeleton from 'ui-component/Loader/SectionSkeleton';

const UserProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceId = location.state?.row?._id || location.state?.row || location.state?.serviceId;
  const [showFilter, setShowFilter] = useState(true);
  const [countryOfOriginFilter, setCountryOfOriginFilter] = useState('');
  const [countriesWithFlags, setCountriesWithFlags] = useState([]);
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);
  const [timeFilter, setTimeFilter] = useState('');
  const [timeOptions, settimeOptions] = useState('');
  const [sessionLeadFilter, setSessionLeadFilter] = useState('');
  const [serviceData, setServiceData] = useState(null);
  const [sessionData, setSessionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [campaignTypeOptions, setCampaignTypeOptions] = useState([]);
  const [campaign, setCampaignFilter] = useState('');

  const dateAddedFilters = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'year', label: 'Last 1 Year' }
  ];

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        const countries = data.map((country) => ({
          value: country.cca2,
          label: country.name.common,
          flag: country.flags.png
        }));
        setCountriesWithFlags(countries);
      });
  }, []);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await getApi(urls.configuration.fetch);
        const options = response?.data?.allConfiguration
          ?.filter((item) => item.configurationType === 'Location')
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

  useEffect(() => {
    const fetchService = async () => {
      if (!serviceId) {
        toast.error('Service ID not found');
        navigate('/services');
        return;
      }

      try {
        setLoading(true);
        const res = await getApi(urls.service.getById.replace(':id', serviceId));
        if (res?.data?.userData) {
          setServiceData(res.data.userData);
          fetchSessionlist(res.data.userData._id);
        } else {
          toast.error('Service not found');
          navigate('/services');
        }
      } catch (error) {
        toast.error('Failed to fetch service details');
        navigate('/services');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const fetchSessionlist = async (serviceId) => {
    try {
      setLoading2(true);
      if (!serviceId) return;
      const response = await getApi(urls.session.getById.replace(':id', serviceId));
      if (response?.data?.userData) {
        setSessionData(response.data.userData);
      }
    } catch (error) {
      console.error('error:', error);
    } finally {
      setLoading2(false);
    }
  };

  const handleFilter = async () => {
    try {
      const queryParams = new URLSearchParams();

      if (dateOpenedFilter && dateOpenedFilter !== '') {
        const formattedDate = new Date(dateOpenedFilter).toISOString().split('T')[0];
        queryParams.append('date', formattedDate);
      }

      queryParams.append('name', sessionLeadFilter);
      queryParams.append('page', paginationModel.page + 1);
      queryParams.append('limit', paginationModel.pageSize);
      queryParams.append('time', timeFilter);

      const url = `${urls.session.fetchWithPagination}?${queryParams.toString()}`;
      const response = await getApi(url);

      const allSessions = response?.data?.data || [];
      const pagination = response?.data?.meta || { total: 0 };

      const formattedUsers = allSessions?.map((item, index) => ({
        id: item._id || index,
        date: item?.date ? new Date(item.date).toLocaleDateString() : '',
        country: item?.country || '',
        time: item?.time || ''
      }));

      setSessionData(formattedUsers);

      setTotalRows(pagination?.total);
      setIsFiltered(true);
    } catch (error) {
      console.error('Failed to fetch filtered sessions:', error);
    }
  };

  const handleReset = () => {
    setCampaignFilter('');
    setTimeFilter('');
    setDateOpenedFilter('');
    setIsFiltered(false);
    setSessionLeadFilter('');
    setPaginationModel({
      page: 0,
      pageSize: 10
    });
  };

  useEffect(() => {
    if (dateOpenedFilter || campaign || paginationModel || isFiltered || sessionLeadFilter || timeFilter) {
      handleFilter();
    } else {
      fetchDonor();
    }
  }, [dateOpenedFilter, campaign, paginationModel, isFiltered, sessionLeadFilter, timeFilter]);

  return (
    <>
      {!serviceId ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid item xs={12} mb={2}>
          <Stack direction="row" alignItems="center">
            <Typography fontWeight="bold" display="flex" alignItems="center">
              <IconButton onClick={() => navigate('/services')}>
                <KeyboardBackspaceIcon sx={{ fontSize: 20, color: 'black' }} />
              </IconButton>
              Service Details
            </Typography>
          </Stack>
        </Grid>
      )}

      <Grid container spacing={2}>
        <FilterPanel
          showFilter={showFilter}
          dateAddedFilters={dateAddedFilters}
          dateOpenedFilter={dateOpenedFilter}
          setDateOpenedFilter={(value) => setDateOpenedFilter(value)}
          countriesWithFlags={countriesWithFlags}
          countryOfOriginFilter={countryOfOriginFilter}
          setCountryOfOriginFilter={(value) => setCountryOfOriginFilter(value)}
          timeFilter={timeFilter}
          setTimeFilter={(value) => setTimeFilter(value)}
          timeOptions={timeOptions}
          campaigns={campaignTypeOptions}
          campaignFilter={campaign}
          setCampaignFilter={setCampaignFilter}
          sessionLeads={[
            { value: 'Lead 1', label: 'Lead 1' },
            { value: 'Lead 2', label: 'Lead 2' }
          ]}
          setSessionLeadFilter={setSessionLeadFilter}
          selectedFilters={['campaignFilter', 'dateOpenedFilter', 'timeFilter', 'sessionLeadFilter']}
          onReset={handleReset}
        />

        <Grid item xs={12} md={9}>
          <Card sx={{ borderRadius: 3, mb: 2 }}>
            {loading ? (
              <Box
                sx={{
                  margin: '5px'
                }}
              >
                <SectionSkeleton lines={1} variant="rectangular" width="100%" height={200} />
              </Box>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Box
                    component="img"
                    src={
                      loading
                        ? Background
                        : serviceData?.file
                        ? `${imageUrl.replace(/\/$/, '')}/${serviceData.file.replace(/^\//, '')}`
                        : Background
                    }
                    alt="Service"
                    sx={{ width: '100%', height: '180px', objectFit: 'cover' }}
                  />
                </Grid>

                <Grid item xs={12} md={8}>
                  <Stack>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box sx={{ maxWidth: '60%' }}>
                        <Tooltip title={(serviceData?.name || '').toUpperCase()}>
                          <Typography
                            variant="h4"
                            sx={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: '100%',
                              color: '#808191'
                            }}
                            fontSize={18}
                            fontWeight={500}
                          >
                            {(serviceData?.name || '').toUpperCase()}
                          </Typography>
                        </Tooltip>

                        <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                          <Box sx={{ position: 'relative', width: 16, height: 16 }}>
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                border: `1.5px solid ${serviceData?.isActive ? 'green' : 'red'}`,
                                position: 'absolute',
                                top: 0,
                                left: 0
                              }}
                            />
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: serviceData?.isActive ? 'green' : 'red',
                                position: 'absolute',
                                top: '4px',
                                left: '4px'
                              }}
                            />
                          </Box>

                          <Typography variant="body1" color={serviceData?.isActive ? 'green' : 'red'} fontWeight={400}>
                            {serviceData?.isActive ? 'ACTIVE' : 'INACTIVE'}
                          </Typography>
                        </Stack>
                      </Box>

                      <Button
                        variant="contained"
                        sx={{ backgroundColor: '#009fc7', textTransform: 'none', m: 2, whiteSpace: 'nowrap' }}
                        onClick={() => navigate('/add-session', { state: { serviceId: serviceData._id } })}
                      >
                        Add New Session {<AddIcon />}
                      </Button>
                    </Box>

                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Service Code - {serviceData?.code}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Start Date - {formatDate(serviceData?.createdAt)}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Service Description - </strong>
                      {serviceData?.description}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            )}
          </Card>

          <Card sx={{ p: 2, borderRadius: 2, boxShadow: 0, backgroundColor: '#fff', height: 400 }}>
            <Typography variant="h5" mb={1}>
              Session List
            </Typography>
            <Divider />

            {/* <Stack spacing={1} mt={2}>
              {sessionData?.map((session, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    px: 2,
                    py: 1.5,
                    borderBottom: '1px solid #e0e0e0',
                    flexWrap: 'wrap'
                  }}
                >
                  <Box minWidth={90}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {new Date(session.date).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {session.time}
                    </Typography>
                  </Box>

                  <Box sx={{ flexGrow: 1, px: 2, minWidth: 200 }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                      {session.campaigns}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: '#1B4B66',
                        textTransform: 'none',
                        fontSize: '10px',
                        py: 0.5,
                        px: 0.5,
                        maxHeight: '50px'
                      }}
                      onClick={() => navigate('/add-session', { state: { session } })}
                    >
                      Edit Session
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        color: '#1B4B66',
                        fontSize: '10px',
                        py: 0.48,
                        px: 0.5,
                        maxHeight: '50px'
                      }}
                      onClick={() => navigate('/attendees', { state: { session } })}
                    >
                      Add Attendee
                    </Button>
                    <IconButton size="small">
                      <InfoIcon sx={{ color: '#49494c' }} fontSize="small" onClick={() => navigate('/view-session')} />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Stack> */}
            <Stack spacing={1} mt={2}>
              {loading2 ? (
                <Box
                  sx={{
                    minHeight: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    px: 2
                  }}
                >
                  <SingleRowLoader />
                </Box>
              ) : (
                sessionData?.map((session, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      px: 2,
                      py: 2,
                      borderBottom: '1px solid #e0e0e0',
                      flexWrap: 'wrap',
                      gap: 2
                    }}
                  >
                    {/* Date + Time */}
                    <Box sx={{ minWidth: 90 }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {new Date(session.date).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: '2-digit'
                        })}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {session.time}
                      </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1, px: 2, maxWidth: 300 }}>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                        {session?.serviceId?.name}
                      </Typography>
                      <Tooltip title={session?.description || ''} placement="top" arrow>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '100%'
                          }}
                        >
                          {session?.description}
                        </Typography>
                      </Tooltip>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: '#1B4B66',
                          textTransform: 'none',
                          fontSize: '12px',
                          py: 0.2,
                          px: 1.2
                        }}
                        onClick={() => navigate('/add-session', { state: { session } })}
                      >
                        Edit Session
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          textTransform: 'none',
                          color: '#1B4B66',
                          borderColor: '#1B4B66',
                          fontSize: '12px',
                          py: 0.2,
                          px: 1.2
                        }}
                        onClick={() => navigate('/attendees', { state: { session } })}
                      >
                        Add Attendee
                      </Button>
                      <IconButton size="small" onClick={() => navigate('/view-session')}>
                        <InfoIcon sx={{ color: '#49494c' }} fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ))
              )}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default UserProfile;
