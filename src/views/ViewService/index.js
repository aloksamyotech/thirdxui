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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import { useLocation, useNavigate } from 'react-router-dom';
import Background from 'assets/images/groupWork.jpg';
import FilterPanel from 'components/FilterPanel';
import { urls } from 'common/urls';
import { getApi } from 'common/apiClient';
import { imageUrl } from 'common/urls';

const UserProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceId = location.state?.row;
  const userId = serviceId?._id;
  const [showFilter, setShowFilter] = useState(true);
  const [countriesWithFlags, setCountriesWithFlags] = useState([]);
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');
  const [sessionLeadFilter, setSessionLeadFilter] = useState('');
  const [serviceData, setServiceData] = useState('');
  const [loading, setLoading] = useState(true);

  const sessionData = [
    { date: '25 Oct’24', time: '18:00', title: 'Cover Letter Writing', subtitle: 'Online session conducted by Maria imparted…' },
    { date: '25 Oct’24', time: '18:00', title: 'Cover Letter Writing', subtitle: 'Online session conducted by Maria imparted…' },
    { date: '25 Oct’24', time: '18:00', title: 'Cover Letter Writing', subtitle: 'Online session conducted by Maria imparted…' }
  ];

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
    const fetchService = async () => {
      const res = await getApi(urls.service.getById.replace(':id', userId));
      setServiceData(res?.data?.userData || {});
      setLoading(false);
    };

    fetchService();
  }, [userId]);


  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <IconButton onClick={() => navigate('/services')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight="bold">
          Service Details
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        <FilterPanel
          showFilter={showFilter}
          dateAddedFilters={dateAddedFilters}
          setDateAddedFilter={setDateOpenedFilter}
          countriesWithFlags={countriesWithFlags}
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
          sessionLeads={[
            { value: 'john_doe', label: 'John Doe' },
            { value: 'jane_smith', label: 'Jane Smith' }
          ]}
          setSessionLeadFilter={setSessionLeadFilter}
          selectedFilters={['countryOfOriginFilter', 'dateOpenedFilter', 'timeFilter', 'sessionLeadFilter']}
        />

        <Grid item xs={12} md={9}>
          <Card sx={{ borderRadius: 3, mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box
                  component="img"
                  src={loading ? Background : serviceData.file ? `${imageUrl}${serviceData.file}` : Background}
                  alt="Service"
                  sx={{ width: '100%', height: '180px', objectFit: 'cover' }}
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <Stack>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" fontWeight="bold">
                      {(serviceData?.name || '').toUpperCase()}
                    </Typography>

                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      sx={{ backgroundColor: '#007BBA', textTransform: 'none', m: 2 }}
                      onClick={() => navigate('/add-session')}
                    >
                      Add New Session
                    </Button>
                  </Box>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'green' }} />
                    <Typography variant="body2" color="green" fontWeight="bold">
                      {serviceData?.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </Typography>
                  </Stack>

                  <Typography variant="body2" color="textSecondary">
                    Service Code - {serviceData?.code}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Start Date - {formatDate(serviceData?.createdAt)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Service Description - </strong>
                    {serviceData?.description}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ p: 2, borderRadius: 2, boxShadow: 0, backgroundColor: '#fff' }}>
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Session List
            </Typography>
            <Divider />

            <Stack spacing={1} mt={2}>
              {sessionData?.map((session, index) => (
                <Box
                  key={index}
                  onClick={() => navigate('/view-session')}
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
                      {session.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {session.time}
                    </Typography>
                  </Box>

                  <Box sx={{ flexGrow: 1, px: 2, minWidth: 200 }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                      {session.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                      {session.subtitle}
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
                        py: 0.5,
                        px: 0.5,
                        maxHeight: '50px'
                      }}
                    >
                      Add Attendee
                    </Button>
                    <IconButton size="small">
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
