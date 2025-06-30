import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Tooltip,
  Grid,
  Stack,
  IconButton,
  Tabs,
  Tab,
  Divider,
  Paper,
  Chip
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Timeline from '@mui/lab/Timeline';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import CancelIcon from '@mui/icons-material/Cancel';

import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { useNavigate } from 'react-router-dom';
import FilterPanel from 'components/FilterPanel';
import CaseNoteDialog from 'components/AddCaseNote';
import AddItemDialog from 'components/AddItem';
import UserBg from 'assets/images/form.png';
import ServiceUser from 'assets/images/UserProfile.png';
import OptionsPopover from 'components/AddFilter';
import { useLocation } from 'react-router-dom';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import { imageUrl } from 'common/urls';
import './index.css';
import SectionSkeleton from 'ui-component/Loader/SectionSkeleton';

const UserProfileCard = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [showFilter, setShowFilter] = useState(true);
  const [activityType, setActivityType] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [caseNoteOpen, setCaseNoteOpen] = useState(false);
  const [includeArchives, setIncludeArchives] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [groupedTags, setGroupedTags] = useState([]);
  const id = location?.state?.id;
  const uniqueid = location?.state?.serialNumber;

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const response = await getApi(urls.serviceuser.getById.replace(':userId', id));
        const user = response?.data;

        if (user) {
          setUserData(user);
        }
      } catch (error) {
        console.error('Error fetching user by ID:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchUserById();
    }
  }, [id]);

  useEffect(() => {
    const fetchAndGroupTags = async () => {
      try {
        const response = await getApi(urls.tag.getAllTags);
        const allTags = response?.data?.allTags || [];


        const combinedData = [
          ...(userData?.otherInfo?.benificiary ?? []),
          ...(userData?.otherInfo?.campaigns ?? []),
          ...(userData?.otherInfo?.eventAttanded ?? []),
          ...(userData?.otherInfo?.engagement ?? []),
          ...(userData?.otherInfo?.fundingInterest ?? []),
          ...(userData?.otherInfo?.fundraisingActivities ?? [])
        ];


        const allIds = combinedData.map((item) => {
          const id = typeof item === 'object' && item !== null ? item._id : item;
          if (!id) {
            console.warn('⚠️ Invalid ID in item:', item);
          }
          return id;
        });


        const relatedTags = allTags.filter((tag) => allIds.includes(tag._id?.$oid || tag._id));


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
        console.error('❌ Error fetching tags:', err);
      }
    };

    if (userData?.otherInfo) {
      fetchAndGroupTags();
    } else {
      console.log('⛔ userData.otherInfo not found, skipping tag fetch.');
    }
  }, [userData]);
  const createdAt = userData?.createdAt;
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    })
    : '';
  const personalInfo = userData?.personalInfo || {};
  const contactInfo = userData?.contactInfo || {};
  const emergencyContact = userData?.emergencyContact || {};
  const contactPreferences = userData?.contactPreferences || {};
  const otherInfo = userData?.otherInfo || {};
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
    setCaseNoteOpen(false);
  };

  const imagePath = userData?.otherInfo?.file;
  const fullImageUrl = imagePath
    ? imagePath.startsWith('https://')
      ? imagePath
      : `${imageUrl.replace(/\/$/, '')}/${imagePath.replace(/^\//, '')}`
    : '';

  const handleBackClick = () => {
    navigate(-1);
    // if (location.state?.isArchive) {
    //   navigate('/archives');
    // } else if (userData?.role === 'volunteer') {
    //   navigate('/volunteer');
    // } else {
    //   navigate('/people');
    // }
  };

  return (
    <>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center">
          <Typography sx={{fontSize:'16px', fontWeight:'600'}}>
            <IconButton onClick={handleBackClick}>
              <KeyboardBackspaceIcon sx={{ fontSize: 20, color: 'black' }} />
            </IconButton>
            Profile
          </Typography>
        </Stack>
      </Grid>

      <Card>
        <Grid item xs={12}>
          {loading ? (
            <Box
              sx={{
                margin: '5px'
              }}
            >
              <SectionSkeleton lines={1} variant="rectangular" width="100%" height={200} />
            </Box>
          ) : (
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
                    p: 2
                  }}
                >
                  <Grid container alignItems="center" spacing={2}>
                    <img
                      src={fullImageUrl || ServiceUser}
                      alt={personalInfo?.firstName || 'User'}
                      style={{ width: 84, height: 84, borderRadius: '50%', marginLeft: '16px' }}
                    />
                    <Grid item xs>
                      <Typography variant="body1" fontSize={16} fontWeight={500} mb={1}>
                        {`${personalInfo?.firstName ?? ''} ${personalInfo?.lastName ?? ''}`}
                      </Typography>
                      <Typography variant="body2" mb={1}>
                        {contactInfo?.email ?? ''}
                      </Typography>
                      <Typography variant="body2">
                        {uniqueid ?? ''} | Individual | Added {formattedDate ?? ''}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box textAlign="right" sx={{ pr: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleClick}
                      sx={{
                        mb: 1, borderRadius: '6px', width: '35%', height: 'auto', fontSize: '10px', backgroundColor: '#009fc7',
                        '&:hover': {
                          backgroundColor: '#009fc7'
                        }
                      }}
                    >
                      MANAGE
                    </Button>
                    <Typography variant="body2" color="textSecondary" sx={{ whiteSpace: 'nowrap', overflowWrap: 'break-word' }}>
                      Address
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ whiteSpace: 'nowrap', overflowWrap: 'break-word' }}>
                      {`${contactInfo?.addressLine1 ?? ''} ${contactInfo?.country ?? ''}`}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          )}
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
              <Grid container sx={{ px: '10px', py: '20px' }}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ m: 1, border: '1px solid #e0e0e0', height: '318px' }}>
                    {loading ? (
                      <SectionSkeleton lines={1} variant="rectangular" width="100%" height={300} />
                    ) : (
                      <CardContent>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: '14px',
                            color: '#053146',
                            mb: 1,
                          }}
                          gutterBottom
                        >
                          ABOUT
                        </Typography>
                        <Grid container spacing={5}>
                          <Grid item xs={6} >
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography variant="body1" className="heading">
                                <span>Full Name:</span>
                                <Typography component="span" className="text" marginLeft={1}>
                                  {`${personalInfo?.firstName ?? ''} ${personalInfo?.lastName ?? ''}`}
                                </Typography>
                              </Typography>
                            </Box>{' '}
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography variant="body1" className="heading">
                                <span>User ID:</span> <Typography marginLeft={1} component="span" className="text">{`${uniqueid ?? ''}`}</Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography variant="body1" className="heading">
                                <span>Ethnicity:</span>{' '}
                                <Typography marginLeft={1} component="span" className="text">{`${personalInfo?.ethnicity ?? ''}`}</Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography variant="body1" className="heading">
                                <span>Language:</span>{' '}
                                <Typography marginLeft={1} component="span" className="text">{`${contactInfo?.firstLanguage ?? ''}`}</Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography variant="body1" className="heading">
                                <span>Contact:</span>{' '}
                                <Typography marginLeft={1} component="span" className="text">
                                  +{`${contactInfo?.phone ?? ''}`}
                                </Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography variant="body1" className="heading">
                                <span>Address:</span>{' '}
                                <Typography marginLeft={1} component="span" className="text">{`${contactInfo?.addressLine1 ?? ''}`}</Typography>
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={6}>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography variant="body1" className="heading">
                                <span>Gender:</span>{' '}
                                <Typography marginLeft={1} component="span" className="text">{`${personalInfo?.gender ?? ''}`}</Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography variant="body1" className="heading">
                                <span>DOB:</span>{' '}
                                <Typography marginLeft={1} component="span" className="text">
                                  {personalInfo?.dateOfBirth ? new Date(personalInfo.dateOfBirth).toLocaleDateString('en-GB') : ''}
                                </Typography>
                              </Typography>
                            </Box>

                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography variant="body1" className="heading">
                                <span>Age:</span>{' '}
                                <Typography marginLeft={1} component="span" className="text">
                                  {personalInfo?.dateOfBirth
                                    ? Math.floor((new Date() - new Date(personalInfo.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
                                    : ''}
                                </Typography>
                              </Typography>
                            </Box>

                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography variant="body1" className="heading">
                                <span>Alternative Id:</span> <Typography marginLeft={1} component="span" fontSize="12px">{`${uniqueid ?? ''}`}</Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography variant="body1" className="heading">
                                <span>Telephone no:</span>{' '}
                                <Typography marginLeft={1} component="span" className="text">
                                  +{`${contactInfo?.homePhone ?? ''}`}
                                </Typography>
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    )}
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card sx={{ m: 1, border: '1px solid #e0e0e0', height: '318px', p: 2 }}>
                    {loading ? (
                      <SectionSkeleton lines={1} variant="rectangular" width="100%" height={300} />
                    ) : (
                      <CardContent
                        sx={{
                          p: 0,
                          maxHeight: '270px',
                          overflowY: 'auto'
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: '14px',
                            color: '#053146',
                            mb: 1,
                          }}
                          gutterBottom
                        >
                          Risk Assessment
                        </Typography>

                        <Typography variant="body2" color="textSecondary" mb={2} className="text">
                          {otherInfo?.description ?? 'No description available.'}
                        </Typography>

                        <Box sx={{ bgcolor: '#F7F7F7', p: 1, marginRight: 2, borderRadius: 2 }}>
                          <Typography variant="subtitle1" sx={{ mb: 1 }}>
                            Key Indicator Concern
                          </Typography>

                          <Grid container spacing={1}>
                            {[
                              'Attendance and Engagement',
                              'Poor school',
                              'Learning disability',
                              'Subtractive Mixture',
                              'Learning disability',
                            ].map((label, index) => (
                              <Grid item key={index}>
                                <Chip
                                  label={label}
                                  onDelete={() => { }}
                                  deleteIcon={
                                    <CancelIcon
                                      sx={{
                                        fontSize: 16,
                                        color: '#666',
                                      }}
                                    />
                                  }
                                  sx={{
                                    bgcolor: '#009FC7',
                                    color: '#fff',
                                    fontSize: '12px',
                                    fontWeight: 400,
                                    borderRadius: '20px',
                                    height: 28,
                                    '& .MuiChip-deleteIcon': {
                                      marginLeft: '4px',
                                    },
                                  }}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </Box>

                        <Box display="flex" alignItems="center" mb={1} mt={2}>
                          <Typography variant="subtitle1" sx={{ color: '#009fc7' }} className="text">
                            Tags
                          </Typography>
                        </Box>

                        <Grid>
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
                                  <Typography sx={{ fontSize: '12px', fontWeight: '500' }}>
                                    {group.category}
                                  </Typography>
                                </Box>

                                <Box display="flex" flexWrap="wrap" gap={1}>
                                  {group.tags.map((tag, i) => (
                                    <Chip
                                      key={i}
                                      label={tag}
                                      onDelete={() => { }}
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
                                        fontWeight: 400,
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
                        </Grid>
                      </CardContent>
                    )}
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card sx={{ m: 1, border: '1px solid #e0e0e0', height: '218px' }}>
                    {loading ? (
                      <SectionSkeleton lines={1} variant="rectangular" width="100%" height={200} />
                    ) : (
                      <CardContent>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: '14px',
                            color: '#053146',
                            mb: 1,
                          }}
                          gutterBottom
                        >
                          Next of Kin Details
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography variant="body1" className="heading">
                                <span>Full Name:</span>{' '}
                                <Typography marginLeft={1} component="span" className="text">{`${emergencyContact?.firstName ?? ''} ${emergencyContact?.lastName ?? ''
                                  }`}</Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography variant="body1" className="heading">
                                <span>Gender:</span>{' '}
                                <Typography marginLeft={1} component="span" className="text">{`${emergencyContact?.gender ?? ''}`}</Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography variant="body1" className="heading">
                                <span>Relationship to Service User:</span>{' '}
                                <Typography marginLeft={1} component="span" className="text">{`${emergencyContact?.relationshipToUser ?? ''}`}</Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography variant="body1" className="heading">
                                <span>Address:</span>{' '}
                                <Typography marginLeft={1} component="span" className="text">{`${emergencyContact?.addressLine1 ?? ''}`}</Typography>
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={6}>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography variant="body1" className="heading">
                                <span>Home no:</span>{' '}
                                <Typography marginLeft={1} component="span" className="text">
                                  +{`${emergencyContact?.homePhone ?? ''}`}
                                </Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography variant="body1" className="heading">
                                <span>Mobile no:</span>{' '}
                                <Typography marginLeft={1} component="span" className="text">
                                  +{`${emergencyContact?.phone ?? ''}`}
                                </Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography variant="body1" className="heading">
                                <span>Email:</span>{' '}
                                <Typography marginLeft={1} component="span" className="text">{`${emergencyContact?.email ?? ''}`}</Typography>
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    )}
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card sx={{ m: 1, border: '1px solid #e0e0e0', height: '218px' }}>
                    {loading ? (
                      <SectionSkeleton lines={1} variant="rectangular" width="100%" height={200} />
                    ) : (
                      <CardContent>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: '14px',
                            color: '#053146',
                            mb: 1,
                          }} gutterBottom
                        >
                          Contact Preferences
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography className="heading" variant="body1">
                                Email:{' '}
                                <Typography marginLeft={1} component="span" className="text">
                                  {contactPreferences?.contactMethods?.email ? 'Yes' : 'No'}
                                </Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography className="heading" variant="body1">
                                Telephone:{' '}
                                <Typography marginLeft={1} component="span" className="text">
                                  {contactPreferences?.contactMethods?.telephone ? 'Yes' : 'No'}
                                </Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography className="heading" variant="body1">
                                SMS:{' '}
                                <Typography marginLeft={1} component="span" className="text">
                                  {contactPreferences?.contactMethods?.sms ? 'Yes' : 'No'}
                                </Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography className="heading" variant="body1">
                                Letter:{' '}
                                <Typography marginLeft={1} component="span" className="text">
                                  {contactPreferences?.contactMethods?.letter ? 'Yes' : 'No'}
                                </Typography>
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={6}>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography className="heading" variant="body1">
                                Reason:{' '}
                                <Typography marginLeft={1} component="span" className="text">
                                  {contactPreferences?.reason?.name || '-'}
                                </Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography className="heading" variant="body1">
                                Contact purposes:{' '}
                                <Typography marginLeft={1} component="span" className="text">
                                  {contactPreferences?.contactPurposes?.name || '-'}
                                </Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography className="heading" variant="body1">
                                Preferred Method of Contact:{' '}
                                <Typography marginLeft={1} component="span" className="text">
                                  {contactPreferences?.preferredMethod?.name || '-'}
                                </Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography className="heading" variant="body1">
                                Date of confirmation:{' '}
                                <Typography marginLeft={1} component="span" className="text">
                                  {contactPreferences?.dateOfConfirmation
                                    ? new Date(contactPreferences?.dateOfConfirmation).toLocaleDateString('en-GB')
                                    : '-'}
                                </Typography>
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    )}
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
                        sx={{
                          backgroundColor: '#009fc7',
                          '&:hover': {
                            backgroundColor: '#009fc7'
                          }
                        }}
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
                  dateOpenedFilter={dateOpenedFilter}
                  setDateOpenedFilter={(value) => setDateOpenedFilter(value)}
                  includeArchives={includeArchives}
                  setIncludeArchives={setIncludeArchives}
                  selectedFilters={['activityTypeFilter', 'dateOpenedFilter', 'sessionNameFilter', 'includeArchives']}
                  customDateLabel="By Date"
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

      <OptionsPopover open={open} anchorEl={anchorEl} onClose={handleClose} data={userData} />
    </>
  );
};

export default UserProfileCard;
