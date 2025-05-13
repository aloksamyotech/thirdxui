import { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Avatar, Tooltip, Grid, Stack, IconButton, Tabs, Tab, Divider } from '@mui/material';
import { Add as AddIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { useNavigate } from 'react-router-dom';
import FilterPanel from 'components/FilterPanel';
import CaseNoteDialog from 'components/AddCaseNote';
import AddItemDialog from 'components/AddItem';
import UserBg from 'assets/images/form.png';
import ServiceUser from 'assets/images/serviceUser.png';
import OptionsPopover from 'components/AddFilter';

const UserProfileCard = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [showFilter, setShowFilter] = useState(true);
  const [activityType, setActivityType] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [caseNoteOpen, setCaseNoteOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleSelectItem = (item) => {
    if (item === 'caseNote') {
      setCaseNoteOpen(true);
    }
    setAddItemOpen(false);
  };

  const activityTypes = [
    { value: 'meeting', label: 'Meeting' },
    { value: 'training', label: 'Training' },
    { value: 'workshop', label: 'Workshop' }
  ];

  const sessionNames = [
    { value: 'session1', label: 'Session 1' },
    { value: 'session2', label: 'Session 2' }
  ];

  const dateAddedFilters = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'year', label: 'Last 1 Year' }
  ];

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSave = (data) => {
    console.log('Case note submitted:', data);
    setCaseNoteOpen(false);
  };

  return (
    <>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center">
          <Typography variant="h4" display="flex" alignItems="center">
            <IconButton onClick={() => navigate('/people')} sx={{ ml: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            PROFILE
          </Typography>
        </Stack>
      </Grid>

      <Card>
        <Grid item xs={12}>
          <Box
            sx={{
              backgroundImage: `url(${UserBg})`,
              height: 100,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              position: 'relative'
            }}
          >
            <Card
              sx={{
                position: 'absolute',
                top: 35,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '95%',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: 3
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1
                }}
              >
                <Grid container alignItems="center" spacing={2}>
                  <img src={ServiceUser} alt={name} style={{ width: 72, height: 72, borderRadius: '50%', marginLeft: '16px' }} />
                  <Grid item xs>
                    <Typography variant="h5" fontWeight="bold">
                      John Doe
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'green' }} />
                      <Typography variant="body2" color="green">
                        ACTIVE DONOR
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="textSecondary">
                      johndoe@example.com
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      #7864 | Individual | Added 09/10/2024
                    </Typography>
                  </Grid>
                </Grid>

                <Box textAlign="right" sx={{ pr: 2 }}>
                  <Button variant="contained" onClick={handleClick} sx={{ mb: 1, backgroundColor: '#00AEEF' }}>
                    Edit
                  </Button>
                  <Typography variant="body2" color="textSecondary">
                    Address
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ whiteSpace: 'nowrap', overflowWrap: 'break-word' }}>
                    123 Main Street, New York, NY
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        <Grid item xs={12} mt={10}>
          <Box sx={{ width: '100%' }}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              sx={{
                px: 2,
                display: 'flex',
                gap: 2,
                borderBottom: '1px solid #4792d3'
              }}
            >
              <Tab
                label="People"
                value={0}
                sx={(theme) => ({
                  marginRight: 2
                })}
              />
              <Tab
                label="Timeline"
                value={1}
                sx={(theme) => ({
                  marginRight: 2
                })}
              />
            </Tabs>

            {tabValue === 0 && (
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Card sx={{ m: 1, border: '1px solid #e0e0e0' }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        About
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1">
                              <strong>Full Name:</strong> <Typography component="span">John Doe</Typography>
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1">
                              <strong>Phone:</strong> <Typography component="span">123456</Typography>
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1">
                              <strong>DOB:</strong> <Typography component="span">1990-05-15</Typography>
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1">
                              <strong>Age:</strong> <Typography component="span">34</Typography>
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1">
                              <strong>Donor Id:</strong> <Typography component="span">123</Typography>
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={6}>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1">
                              <strong>Total Donations:</strong> <Typography component="span">$5000</Typography>
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1">
                              <strong>No:</strong> <Typography component="span">1990-05-15</Typography>
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1">
                              <strong>Age:</strong> <Typography component="span">34</Typography>
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1">
                              <strong>Alternative Id:</strong> <Typography component="span">XYZ789</Typography>
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1">
                              <strong>Telephone no:</strong> <Typography component="span">+1 234 567 890</Typography>
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card sx={{ m: 1, border: '1px solid #e0e0e0' }}>
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold" color="#042E4C" gutterBottom>
                        GDPR
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography fontWeight="bold" variant="body2">
                            Email:{' '}
                            <Typography component="span" fontWeight="normal">
                              No
                            </Typography>
                          </Typography>

                          <Typography fontWeight="bold" variant="body2">
                            Telephone:{' '}
                            <Typography component="span" fontWeight="normal">
                              No
                            </Typography>
                          </Typography>

                          <Typography fontWeight="bold" variant="body2">
                            SMS:{' '}
                            <Typography component="span" fontWeight="normal">
                              Yes
                            </Typography>
                          </Typography>

                          <Typography fontWeight="bold" variant="body2">
                            Letter:{' '}
                            <Typography component="span" fontWeight="normal">
                              No
                            </Typography>
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography fontWeight="bold" variant="body2">
                            Reason:{' '}
                            <Typography component="span" fontWeight="normal">
                              personals reason
                            </Typography>
                          </Typography>

                          <Typography fontWeight="bold" variant="body2">
                            Contact purposes:{' '}
                            <Typography component="span" fontWeight="normal">
                              No
                            </Typography>
                          </Typography>

                          <Typography fontWeight="bold" variant="body2">
                            Preferred Method of Contact:{' '}
                            <Typography component="span" fontWeight="normal">
                              No
                            </Typography>
                          </Typography>

                          <Typography fontWeight="bold" variant="body2">
                            Date of confirmation:{' '}
                            <Typography component="span" fontWeight="normal">
                              31/10/2024
                            </Typography>
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {tabValue === 1 && (
              <Grid container spacing={2} p={2}>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} gap={2}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                      Activity Timeline
                    </Typography>

                    <Box display="flex" alignItems="center">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => setAddItemOpen(true)}
                        sx={{ backgroundColor: '#009fc7' }}
                        endIcon={<AddIcon />}
                      >
                        Add Item
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                <FilterPanel
                  showFilter={showFilter}
                  activityTypes={activityTypes}
                  setActivityTypeFilter={setActivityType}
                  sessionNames={sessionNames}
                  setSessionNameFilter={setSessionName}
                  dateAddedFilters={dateAddedFilters}
                  setDateAddedFilter={setDateOpenedFilter}
                  selectedFilters={['activityTypeFilter', 'sessionNameFilter', 'dateOpenedFilter']}
                />

                <Grid item xs={9}>
                  <Card>
                    <Timeline position="alternate">
                      <TimelineItem>
                        <TimelineOppositeContent color="text.secondary">2024-03-01</TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot color="error" />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography variant="h6">Survey Completed</Typography>
                          <Typography variant="body2" color="textSecondary">
                            Mentee Satisfaction Form
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>

                      <TimelineItem>
                        <TimelineOppositeContent color="text.secondary">2024-02-20</TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot color="secondary" />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography variant="h6">Attended a Session</Typography>
                          <Typography variant="body2" color="textSecondary">
                            Leadership Training Workshop
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>

                      <TimelineItem>
                        <TimelineOppositeContent color="text.secondary">2024-02-20</TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot color="warning" />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography variant="h6">Attended a Session</Typography>
                          <Typography variant="body2" color="textSecondary">
                            Leadership Training Workshop
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>

                      <TimelineItem>
                        <TimelineOppositeContent color="text.secondary">2024-01-15</TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot color="primary" />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography variant="h6">Volunteering Activity</Typography>
                          <Typography variant="body2" color="textSecondary">
                            Mentee Satisfaction Form
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                    </Timeline>
                  </Card>
                </Grid>

                <AddItemDialog open={addItemOpen} onClose={() => setAddItemOpen(false)} onSelect={handleSelectItem} />

                <CaseNoteDialog
                  open={caseNoteOpen}
                  handleClose={() => setCaseNoteOpen(false)}
                  onSubmit={handleSave}
                  title="Add Case Note"
                />
              </Grid>
            )}
          </Box>
        </Grid>
      </Card>

      <OptionsPopover open={open} anchorEl={anchorEl} onClose={handleClose} />
    </>
  );
};

export default UserProfileCard;
