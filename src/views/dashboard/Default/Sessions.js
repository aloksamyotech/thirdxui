import { Divider, Select, MenuItem, TextField, Button, InputAdornment, Typography, Grid, IconButton } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import { urls } from 'common/urls';
import { getApi } from 'common/apiClient';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';

const sessionsData = [
  {
    date: "25 Oct '24",
    time: '18:00',
    title: 'Cover Letter Writing',
    description: 'Online session conducted by',
    presenter: 'Maria',
    summary: 'imparted...'
  },
  {
    date: "25 Oct '24",
    time: '18:00',
    title: 'Cover Letter Writing',
    description: 'Online session conducted by',
    presenter: 'Maria',
    summary: 'imparted...'
  },
  {
    date: "25 Oct '24",
    time: '18:00',
    title: 'Cover Letter Writing',
    description: 'Online session conducted by',
    presenter: 'Maria',
    summary: 'imparted...'
  },
  {
    date: "25 Oct '24",
    time: '18:00',
    title: 'Cover Letter Writing',
    description: 'Online session conducted by',
    presenter: 'Maria',
    summary: 'imparted...'
  }
];

const SessionItem = ({ id, date, time, title, description, summary, presenter }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate();
  };

  const handleAddAttendeesClick = () => {
    navigate();
  };
  return (
    <Box sx={{ py: 1, px: 1 }}>
      <Grid container spacing={1} alignItems="center" wrap="wrap">
        <Grid item xs={12} sm={2}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
            <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{date}</Typography>
            <Typography sx={{ fontSize: 13 }}>{time}</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={5}>
          <Typography sx={{ fontWeight: 600, fontSize: 12, lineHeight: '23px', color: '#26262680' }}>{title}</Typography>
          <Typography
            sx={{ fontSize: 12, color: '#26262680', whiteSpace: 'pre-line', wordBreak: 'break-word', overflowWrap: 'break-word' }}
          >
            {description}
          </Typography>
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
            <span style={{ fontWeight: 500 }}>{presenter}</span> {summary}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={5} md={4}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center">
            <Button
              variant="contained"
              size="small"
              onClick={handleEditClick}
              onPointerDown={(e) => e.stopPropagation()}
              sx={{
                backgroundColor: '#1B4B66',
                textTransform: 'none',
                fontSize: 8,
                px: 0.5,
                py: 0.6,
                maxWidth: 90,
                borderRadius: 1.5,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#163A52'
                }
              }}
            >
              Edit Session
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleAddAttendeesClick}
              onPointerDown={(e) => e.stopPropagation()}
              sx={{
                textTransform: 'none',
                fontSize: 8,
                px: 1.2,
                py: 0.5,
                maxWidth: 120,
                whiteSpace: 'nowrap',
                borderRadius: 1.5,
                color: '#1B4B66',
                borderColor: '#1B4B66',
                '&:hover': {
                  backgroundColor: 'rgba(27,75,102,0.04)',
                  borderColor: '#1B4B66'
                }
              }}
            >
              Add Attendees
            </Button>

            <IconButton size="small">
              <InfoIcon fontSize="small" sx={{ color: '#49494c' }} onPointerDown={(e) => e.stopPropagation()} />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

const Sessions = () => {
  const [allSession, setAllSession] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    setLoading(true);
    const session = await getApi(urls.session.fetch);
    const currentSessions = session?.data?.allSession;

    const formattedSessions = currentSessions?.map((item, index) => ({
      id: item._id || index,
      date: item?.date
        ? new Date(item.date)
          .toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: '2-digit'
          })
          .replace(/(\d{2})\/(\w{3})\/(\d{2})/, "$1 $2'$3")
        : '',

      title: item?.serviceId?.name || '',
      serviceId: item?.serviceId || '',
      time: item?.time || '',
      description: item?.description || ''
    }));

    setAllSession(formattedSessions);
    setLoading(false);
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);
  const filteredData = allSession.filter((item) => item?.serviceId?.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        p: 2,
        borderRadius: 2,
        boxShadow: '0 1px 6px rgba(0,0,0,0.1)'
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" fontWeight={500} fontSize={14}>
          Current Sessions
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" onPointerDown={(e) => e.stopPropagation()}>
          <Select value="This Week" size="small">
            <MenuItem value="This Week">This Week</MenuItem>
            <MenuItem value="This Month">This Month</MenuItem>
            <MenuItem value="This Year">This Year</MenuItem>
          </Select>
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            onPointerDown={(e) => e.stopPropagation()}
            sx={{
              maxWidth: 120,
              '& input::placeholder': {
                fontSize: '12px',
                color: 'black',
                opacity: 1
              }
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Stack>
      </Stack>

      <Divider />
      <Box sx={{ maxHeight: 328, overflowY: 'auto', pr: 1, height: 328 }}>
        {loading ? (
          <SingleRowLoader />
        ) : (
          filteredData.map((session, index) => <SessionItem key={index} {...session} id={session.serviceId} />)
        )}
      </Box>

      <Typography
        sx={{
          textAlign: 'center',

          fontSize: 12,

          color: '#1B4B66',

          cursor: 'pointer',

          fontWeight: 500
        }}
        onClick={() => navigate('/services')}
        onPointerDown={(e) => e.stopPropagation()}
      >
        View all sessions
      </Typography>
    </Box>
  );
};

export default Sessions;
