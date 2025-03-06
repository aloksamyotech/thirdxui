import { useState } from 'react';
import { Box, Card, CardContent, Typography, Tooltip, Grid, Stack, IconButton, Tabs, Tab, Divider } from '@mui/material';
import {
  Add as AddIcon,
  Person as PersonIcon,
  ArrowBack as ArrowBackIcon,
  Email as EmailIcon,
  Home as HomeIcon,
  Star as StarIcon,
  CalendarMonth as CalendarMonthIcon,
  Public as PublicIcon,
  Check as CheckIcon,
  Call as CallIcon,
  Female as FemaleIcon,
  Translate as TranslateIcon,
  EmojiFlags as EmojiFlagsIcon
} from '@mui/icons-material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { useNavigate } from 'react-router-dom';
import FilterPanel from 'components/FilterPanel';
import AddCaseNoteForm from './addCaseNote.js';

const formTypes = [
  { value: 'Gift and Decoration', label: 'Gift and Decoration' },
  { value: 'Transactions', label: 'Transactions' },
  { value: 'Short Credit Transactions', label: 'Recruiting Payment Transactions' },
  { value: 'Recruiting Payment Transactions', label: 'Short Credit Transactions' },
  { value: 'Volunteer sign up form', label: 'Volunteer sign up form' },
  { value: 'Opportunities', label: 'Opportunities' },
  { value: 'Opportunities Pledge', label: 'Opportunities Pledge' },
  { value: 'Change Log', label: 'Change Log' }
];

const dateFilters = [
  { value: 'today', label: 'All Dates' },
  { value: 'week', label: 'Last 7 days' },
  { value: 'month', label: 'Last 30 days' },
  { value: 'year', label: 'Last 2 months' }
];

const UserProfileCard = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [formType, setFormType] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [showFilter, setShowFilter] = useState(true);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center">
          <Typography variant="h4" display="flex" alignItems="center">
            <IconButton onClick={() => navigate('/dashboard/people')} sx={{ ml: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            BACK
          </Typography>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
              <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center">
                <PersonIcon sx={{ fontSize: 22, mr: 1, color: 'gray' }} />
                John Doe
                <StarIcon sx={{ fontSize: 18, ml: 1, color: 'gold' }} />
                <StarIcon sx={{ fontSize: 18, color: 'gold' }} />
                <StarIcon sx={{ fontSize: 18, color: 'gold' }} />
                <StarIcon sx={{ fontSize: 18, color: 'gold' }} />
                <StarIcon sx={{ fontSize: 18, color: '#ccc' }} />
              </Typography>
            </Box>

            <Typography variant="body2" color="textSecondary" display="flex" alignItems="center" mt={1}>
              #7864 | Individual | Added 09/10/2024
            </Typography>

            <Typography variant="body2" color="textSecondary" display="flex" alignItems="center" mt={1}>
              <EmailIcon sx={{ fontSize: 18, mr: 1, color: 'gray' }} />
              johndoe@example.com
            </Typography>

            <Typography variant="body2" color="textSecondary" display="flex" alignItems="center" mt={1}>
              <HomeIcon sx={{ fontSize: 18, mr: 1, color: 'gray' }} />
              123 Main Street, New York, NY
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
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
                backgroundColor: tabValue === 0 ? '#e3f2fd' : 'transparent',
                transition: 'background-color 0.3s ease',
                marginRight: 2
              })}
            />
            <Tab
              label="Timeline"
              value={1}
              sx={(theme) => ({
                backgroundColor: tabValue === 1 ? '#e3f2fd' : 'transparent',
                transition: 'background-color 0.3s ease',
                marginRight: 2
              })}
            />
          </Tabs>

          {tabValue === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card sx={{ p: 2 }}>
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      About
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box display="flex" alignItems="center" mb={1}>
                          <PersonIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">Full Name: John Doe</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                          <CheckIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">User ID: 123456</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                          <StarIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">Ethnicity: Mixed - Black and White Caribbean</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                          <PublicIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">Country: USA</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                          <TranslateIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">Language: English</Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box display="flex" alignItems="center" mb={1}>
                          <FemaleIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">Gender: Male</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                          <CalendarMonthIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">Date of Birth: 1990-05-15</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                          <StarIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">Age: 34</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                          <EmojiFlagsIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">Alternative Id: XYZ789</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                          <CallIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">Telephone no: +1 234 567 890</Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                          Contact Info
                        </Typography>
                        <Box display="flex" alignItems="center" mb={1}>
                          <CallIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">+1 987 654 3210</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <EmailIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">johndoe@email.com</Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                          Address
                        </Typography>
                        <Box display="flex" alignItems="center" mb={1}>
                          <Typography variant="body1">123 Main Street, NY</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <Typography variant="body1">New York, USA</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card sx={{ p: 2 }}>
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      Next of Kin Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box display="flex" alignItems="center" mb={1}>
                          <PersonIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">Full Name: John Doe</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                          <CheckIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">Relationship to Service Yser...</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                          <StarIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">Town: London</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                          <PublicIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">Country: England</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                          <TranslateIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">PostCode: 12345</Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box display="flex" alignItems="center" mb={1}>
                          <CallIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">Home no: +138733</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                          <CalendarMonthIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">Mobile no: 9776526</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                          <EmailIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">Email: example@gmail.com</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                          <HomeIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">Address-1: England</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" mb={1}>
                          <HomeIcon sx={{ mr: 1, color: 'gray' }} />
                          <Typography variant="body1">Address-2: England</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ p: 2 }}>
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      GDPR
                    </Typography>

                    <Box>
                      <Box display="flex" justifyContent="space-between" my={1}>
                        <Typography variant="body1">Telephone</Typography>
                        <Typography variant="body1">SMS</Typography>
                        <Typography variant="body1">Email</Typography>
                        <Typography variant="body1">Letter</Typography>
                      </Box>

                      <Box display="flex" justifyContent="space-between" my={1}>
                        <Typography variant="body1">Yes</Typography>
                        <Typography variant="body1">No</Typography>
                        <Typography variant="body1">Yes</Typography>
                        <Typography variant="body1">No</Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" fontWeight="bold">
                          Preferred Method of Contact
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          Email
                        </Typography>

                        <Typography variant="body2" fontWeight="bold" sx={{ mt: 2 }}>
                          Date of Confirmation
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          2024-03-01
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" fontWeight="bold">
                          Contact Purpose
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          Marketing
                        </Typography>

                        <Typography variant="body2" fontWeight="bold" sx={{ mt: 2 }}>
                          Reason
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          User Consent
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ p: 3, borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      Risk Assessment
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="body1" color="textSecondary">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula purus id est efficitur volutpat.
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="h6" fontWeight="bold">
                          Key Indicators of Concern
                        </Typography>
                        <ul>
                          <li>
                            <Typography variant="body2">Data breaches detected</Typography>
                          </li>
                          <li>
                            <Typography variant="body2">Unauthorized access attempts</Typography>
                          </li>
                          <li>
                            <Typography variant="body2">Compliance violations reported</Typography>
                          </li>
                        </ul>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {tabValue === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" alignItems="center" mt={1} gap={2}>
                  <Typography variant="body2" color="textSecondary">
                    Add Case Note
                  </Typography>
                  <Tooltip title="Add Case Note" arrow>
                    <IconButton
                      onClick={handleOpen}
                      sx={{
                        backgroundColor: '#41C048',
                        borderRadius: '50%',
                        width: '35px',
                        height: '35px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: 3,
                        color: 'white',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#41C048',
                          color: '#ffffff'
                        }
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
              <FilterPanel
                showFilter={showFilter}
                formTypes={formTypes}
                setFormType={setFormType}
                dateFilters={dateFilters}
                setDateFilter={setDateFilter}
              />

              <Grid item xs={9}>
                <Card sx={{ p: 3, borderRadius: 3 }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                    User Activity Timeline
                  </Typography>

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

              <AddCaseNoteForm open={open} handleClose={handleClose} />
            </Grid>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserProfileCard;
