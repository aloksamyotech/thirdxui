import { Divider, Select, MenuItem, TextField, Button, InputAdornment, Typography, Grid, IconButton, Pagination } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import { urls } from 'common/urls';
import { getApi } from 'common/apiClient';
import { useNavigate } from 'react-router-dom';
import SingleRowLoader from 'ui-component/Loader/SingleRowLoader';

const SessionItem = ({ sessionId, sessionData, id, date, time, title, description, summary, presenter, props }) => {
  const navigate = useNavigate();
  console.log(`sessionId`, sessionId);
  console.log(`serivce id `, id?._id);

  const handleEditClick = () => {
    navigate('/add-session', {
      state: {
        session: sessionData,
        serviceData: id
      }
    });
  };

  const handleAddAttendeesClick = () => {
    navigate('/attendees', {
      state: {
        session: { sessionId }
      }
    });
  };

  const handleViewSession = () => {
    navigate('/view-session', {
      state: {
        session: { _id: sessionId }
      }
    });
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
              onPointerDown={(e) => e.stopPropagation()}
            >
              Edit Session
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleAddAttendeesClick}
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
              onPointerDown={(e) => e.stopPropagation()}
            >
              Add Attendees
            </Button>

            <IconButton size="small" onClick={handleViewSession} onPointerDown={(e) => e.stopPropagation()}>
              <InfoIcon fontSize="small" sx={{ color: '#49494c' }} />
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
  const [range, setRange] = useState('This Year');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const queryParams = {
        name: search,
        range: range?.toLowerCase().replace(/\s/g, '-'),
        page,
        limit
      };

      const queryString = new URLSearchParams(queryParams).toString();

      const response = await getApi(`${urls.session.fetchWithPagination}?${queryString}`);
      const sessionList = response?.data?.data || [];
      const meta = response?.data?.meta || {};

      const formattedSessions = sessionList.map((item, index) => ({
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
        description: item?.description || '',
        presenter: item?.serviceuser?.name || '',
        sessionData: item
      }));

      setAllSession(formattedSessions);
      setTotalPages(meta?.totalPages || 1);
    } catch (err) {
      console.error('Error fetching sessions:', err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboardData();
  }, [search, range, page]);

  return (
    <Box
      sx={{
        height: '430px',
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
      >
        <Typography variant="h5" fontWeight={500} fontSize={14}>
          Current Sessions
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Select
            value={range}
            size="small"
            onChange={(e) => {
              setPage(1);
              setRange(e.target.value);
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <MenuItem value="This Week">This Week</MenuItem>
            <MenuItem value="This Month">This Month</MenuItem>
            <MenuItem value="This Year">This Year</MenuItem>
          </Select>
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{
              maxWidth: 120,
              '& input::placeholder': {
                fontSize: '12px',
                color: 'black',
                opacity: 1
              }
            }}
          />
        </Stack>
      </Stack>

      <Divider sx={{ mt: 1 }} />

      <Box sx={{ maxHeight: 328, overflowY: 'auto', pr: 1, height: 328 }}>
        {loading ? (
          <SingleRowLoader />
        ) : allSession.length > 0 ? (
          allSession.map((session, index) => {
            return (
              <SessionItem key={index} {...session} id={session.serviceId} sessionId={session?.id} sessionData={session?.sessionData} />
            );
          })
        ) : (
          <Box display="flex" alignItems="center" justifyContent="center" height="100%">
            <Typography variant="body2" color="text.secondary">
              No data found in this range
            </Typography>
          </Box>
        )}
      </Box>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination count={totalPages} page={page} onChange={(e, value) => setPage(value)} size="small" color="primary" />
        </Box>
      )}
      {/* {allSession.length > 0 ? (
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: 12,
            color: '#1B4B66',
            cursor: 'pointer',
            fontWeight: 500,
            mt: 2
          }}
          onClick={() => navigate('/services')}
          onPointerDown={(e) => e.stopPropagation()}
        >
          View all sessions
        </Typography>
      ) : null} */}
    </Box>
  );
};

export default Sessions;
