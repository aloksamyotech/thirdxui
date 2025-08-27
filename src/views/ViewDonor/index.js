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
  Chip
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { useNavigate, useLocation } from 'react-router-dom';
import FilterPanel from 'components/FilterPanel';
import CancelIcon from '@mui/icons-material/Cancel';
import CaseNoteDialog from 'components/AddCaseNote';
import AddItemDialog from 'components/AddItem';
import UserBg from 'assets/images/form.png';
import ServiceUser from 'assets/images/UserProfile.png';
import OptionsPopover from 'components/AddFilter';
import { getApi } from 'common/apiClient';
import { urls } from 'common/urls';
import OptionsPopoverDonor from 'components/PopoverDoner';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import { imageUrl } from 'common/urls';
import SectionSkeleton from 'ui-component/Loader/SectionSkeleton';
import { colors, SUBROLES } from 'common/constants';
import TimelineActivity from 'components/TimelineActivity';
import moment from 'moment';

const UserProfileCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?._id || location.state?.id;
  const sub_role = location.state?.subRole;
  const isArchive = location.state?.isArchive;
  const [tabValue, setTabValue] = useState(0);
  const [showFilter, setShowFilter] = useState(true);
  const [activityType, setActivityType] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [dateOpenedFilter, setDateOpenedFilter] = useState('');
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [caseNoteOpen, setCaseNoteOpen] = useState(false);
  const [includeArchives, setIncludeArchives] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [timeLineData, setTimeLineData] = useState();
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const response = await getApi(urls.serviceuser.getById.replace(':userId', id));
        const user = response?.data;

        if (user) {
          setUserData(user);
          setRole(user?.role);
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

  function formatKeyToLabel(key) {
    return key

      .replace(/([A-Z])/g, ' $1')

      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };
  useEffect(() => {
    const fetchTimeLineData = async () => {
      const response = await getApi(`${urls.timeline.getTimeLineById}${id}`);

      const formattedTimeline = response?.data?.timeline?.map((item) => {
        return {
          ...item,
          label: formatKeyToLabel(item.type),
          dateField: moment(item.date).format('DD MMM YYYY'),
          color: getRandomColor()
        };
      });

      setTimeLineData(formattedTimeline);
    };

    if (id) {
      fetchTimeLineData();
    }
  }, [id]);

  const createdAt = userData?.createdAt;
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      })
    : '';
  const isActive = userData?.isActive;
  const uniqueId = userData?.uniqueId || '-';
  const personalInfo = userData?.personalInfo || {};
  const contactInfo = userData?.contactInfo || {};
  const emergencyContact = userData?.emergencyContact || {};
  const contactPreferences = userData?.contactPreferences || {};
  const otherInfo = userData?.otherInfo || {};
  const companyInformation = userData?.companyInformation || {};
  let imagePath = userData?.otherInfo?.file || '';

  if (imagePath.startsWith('/thirdexDev/thirdxBE/') || imagePath.startsWith('/thiredx/thirdxBE/')) {
    imagePath = imagePath.replace('/thirdexDev/thirdxBE/', '');
      imagePath = imagePath.replace('/thiredx/thirdxBE/', '');

  }

  const fullImageUrl = imagePath ? (imagePath.startsWith('https://') ? imagePath : `${imageUrl}${imagePath}`) : '';

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

  const handleBackClick = () => {
    if (isArchive) {
      navigate('/archives');
    } else {
      navigate('/donor');
    }
  };
  const groupedTags = (userData?.otherInfo?.tags || []).reduce((acc, tag) => {
    const categoryName = tag?.tagCategoryId?.name || 'Uncategorized';

    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }

    acc[categoryName].push(tag.name);

    return acc;
  }, {});

  const groupedTagsArray = Object.entries(groupedTags ?? {}).map(([category, tags]) => ({
    category,
    tags
  }));

  return (
    <>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center">
          <Typography fontWeight="bold" display="flex" alignItems="center">
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
                margin: '5px',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                position: 'relative'
              }}
            >
              <SectionSkeleton lines={1} variant="rectangular" width="100%" height={150} />
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
                      alt={name}
                      style={{ width: 72, height: 72, borderRadius: '50%', marginLeft: '16px' }}
                    />
                    <Grid item xs>
                      <Typography component="span" fontSize={18} fontWeight="500" lineHeight="2">
                        {personalInfo?.firstName || personalInfo?.lastName
                          ? `${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}`.trim()
                          : companyInformation?.companyName || '-'}
                      </Typography>

                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Box sx={{ position: 'relative', width: 16, height: 16 }}>
                          <Box
                            sx={{
                              width: 16,
                              height: 16,
                              borderRadius: '50%',
                              border: `1.5px solid ${isActive ? 'green' : 'red'}`,
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
                              backgroundColor: isActive ? 'green' : 'red',
                              position: 'absolute',
                              top: '4px',
                              left: '4px'
                            }}
                          />
                        </Box>

                        <Typography variant="body1" fontSize={12} color={isActive ? 'green' : 'red'} lineHeight="1">
                          {isActive ? 'ACTIVE DONOR' : 'INACTIVE DONOR'}
                        </Typography>
                      </Stack>

                      <Typography variant="body2" color="textSecondary" lineHeight="2">
                        {contactInfo?.email}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {uniqueId} |{' '}
                        {sub_role === SUBROLES.INDIVIDUAL
                          ? 'Individual'
                          : sub_role === SUBROLES.COMPANY
                          ? 'Company'
                          : sub_role === SUBROLES.GROUP
                          ? 'Group'
                          : sub_role}
                        | Added {formattedDate}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box textAlign="right" sx={{ pr: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleClick}
                      sx={{ mb: 1, borderRadius: '6px', width: '20%', height: 'auto', fontSize: '12px', backgroundColor: '#009fc7' }}
                    >
                      Manage
                    </Button>
                    {sub_role === SUBROLES.INDIVIDUAL && (
                      <>
                        <Typography variant="body2" color="textSecondary">
                          Address
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ whiteSpace: 'nowrap', overflowWrap: 'break-word' }}>
                          {contactInfo?.addressLine1} {contactInfo?.district} {contactInfo?.country}
                        </Typography>
                      </>
                    )}
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
                label="Profile"
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
                  <Card sx={{ m: 1, border: '1px solid #e0e0e0', height: '245px' }}>
                    {loading ? (
                      <SectionSkeleton lines={1} variant="rectangular" width="100%" height={245} />
                    ) : (
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          About
                        </Typography>
                        <Grid container spacing={2}>
                          {sub_role === SUBROLES.INDIVIDUAL && (
                            <>
                              <Grid item xs={6}>
                                <Box display="flex" alignItems="center" mb={1}>
                                  <Typography variant="body1" fontSize="12px" fontWeight="600" lineHeight="2">
                                    <span>Full Name:</span>{' '}
                                    <Typography component="span" fontSize="12px" fontWeight="400">
                                      {personalInfo?.firstName} {personalInfo?.lastName}
                                    </Typography>
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                  <Typography variant="body1" fontSize="12px" fontWeight="600" lineHeight="2">
                                    <span>Phone:</span>{' '}
                                    <Typography component="span" fontSize="12px">
                                      {contactInfo?.phone}
                                    </Typography>
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                  <Typography variant="body1" fontSize="12px" fontWeight="600" lineHeight="2">
                                    <span>DOB:</span>{' '}
                                    <Typography component="span" fontSize="12px">
                                      {personalInfo?.dateOfBirth ? new Date(personalInfo.dateOfBirth).toLocaleDateString('en-GB') : ''}
                                    </Typography>
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                  <Typography variant="body1" fontSize="12px" fontWeight="600" lineHeight="2">
                                    <span>Age:</span>{' '}
                                    <Typography component="span" fontSize="12px">
                                      {personalInfo?.dateOfBirth
                                        ? Math.floor((new Date() - new Date(personalInfo.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
                                        : ''}
                                    </Typography>
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                  <Typography variant="body1" fontSize="12px" fontWeight="600" lineHeight="2">
                                    <span>Donor ID:</span>{' '}
                                    <Typography component="span" fontSize="12px">
                                      {uniqueId}
                                    </Typography>
                                  </Typography>
                                </Box>
                              </Grid>

                              <Grid item xs={6}>
                                <Box display="flex" alignItems="center" mb={1}>
                                  <Typography variant="body1" fontSize="12px" fontWeight="600" lineHeight="2">
                                    <span>Total Donation:</span>{' '}
                                    <Typography component="span" fontSize="12px">
                                      $5,000
                                    </Typography>
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                  <Typography variant="body1" fontSize="12px" fontWeight="600" lineHeight="2">
                                    <span>Number of Donation:</span>{' '}
                                    <Typography component="span" fontSize="12px">
                                      06
                                    </Typography>
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                  <Typography variant="body1" fontSize="12px" fontWeight="600" lineHeight="2">
                                    <span>Last Donation Date:</span>{' '}
                                    <Typography component="span" fontSize="12px">
                                      31/10/2024
                                    </Typography>
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                  <Typography variant="body1" fontSize="12px" fontWeight="600" lineHeight="2">
                                    <span>Largest Donation:</span>{' '}
                                    <Typography component="span" fontSize="12px">
                                      $1,500(January 10,2025)
                                    </Typography>
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                  <Typography variant="body1" fontSize="12px" fontWeight="600" lineHeight="2">
                                    <span>Donation Purpose:</span>{' '}
                                    <Typography component="span" fontSize="12px">
                                      Education & Healthcare
                                    </Typography>
                                  </Typography>
                                </Box>
                              </Grid>
                            </>
                          )}

                          {(sub_role === SUBROLES.COMPANY || sub_role === SUBROLES.GROUP) && (
                            <>
                              <Grid item xs={6}>
                                <Box display="flex" alignItems="center" mb={1}>
                                  <Typography variant="body1" fontSize="12px" fontWeight="600" lineHeight="2">
                                    <span>Company Name:</span>{' '}
                                    <Typography component="span" fontSize="12px">
                                      {companyInformation.companyName}
                                    </Typography>
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                  <Typography variant="body1" fontSize="12px" fontWeight="600" lineHeight="2">
                                    <span>Contact person Name:</span>{' '}
                                    <Typography component="span" fontSize="12px">
                                      {companyInformation.mainContactName}
                                    </Typography>
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                  <Typography variant="body1" fontSize="12px" fontWeight="600" lineHeight="2">
                                    <span>Email:</span>{' '}
                                    <Typography component="span" fontSize="12px">
                                      {contactInfo.email}
                                    </Typography>
                                  </Typography>
                                </Box>
                              </Grid>

                              <Grid item xs={6}>
                                <Box display="flex" alignItems="center" mb={1}>
                                  <Typography variant="body1" fontSize="12px" fontWeight="600" lineHeight="2">
                                    <span>Recruitment Campaign:</span>{' '}
                                    <Typography component="span" fontSize="12px">
                                      {companyInformation.recruitmentCampaign?.name}
                                    </Typography>
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                  <Typography variant="body1" fontSize="12px" fontWeight="600" lineHeight="2">
                                    <span>Social Media Link:</span>{' '}
                                    <Typography component="span" fontSize="12px">
                                      {companyInformation.socialMediaLinks}
                                    </Typography>
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                  <Typography variant="body1" fontSize="12px" fontWeight="600" lineHeight="2">
                                    <span>Phone no.:</span>{' '}
                                    <Typography component="span" fontSize="12px">
                                      {contactInfo.phone}
                                    </Typography>
                                  </Typography>
                                </Box>
                              </Grid>
                            </>
                          )}
                        </Grid>
                      </CardContent>
                    )}
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card sx={{ m: 1, border: '1px solid #e0e0e0', height: '245px' }}>
                    {loading ? (
                      <SectionSkeleton lines={1} variant="rectangular" width="100%" height={245} />
                    ) : (
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold" color="#042E4C" gutterBottom fontSize="12px" lineHeight="2">
                          GDPR
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography variant="body2" fontSize="12px" fontWeight="600" lineHeight="2">
                                Email:{' '}
                                <Typography component="span" fontWeight="normal" fontSize="12px">
                                  {contactPreferences?.contactMethods?.email ? 'Yes' : 'No'}
                                </Typography>
                              </Typography>
                            </Box>

                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography fontWeight="600" variant="body2" fontSize="12px" lineHeight="2">
                                Telephone:{' '}
                                <Typography component="span" fontSize="12px">
                                  {contactPreferences?.contactMethods?.telephone ? 'Yes' : 'No'}
                                </Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography fontWeight="600" variant="body2" fontSize="12px" lineHeight="2">
                                SMS:{' '}
                                <Typography component="span" fontSize="12px">
                                  {contactPreferences?.contactMethods?.sms ? 'Yes' : 'No'}
                                </Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography fontWeight="600" variant="body2" fontSize="12px" lineHeight="2">
                                Letter:{' '}
                                <Typography component="span" fontSize="12px">
                                  {contactPreferences?.contactMethods?.letter ? 'Yes' : 'No'}
                                </Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography fontWeight="600" variant="body2" fontSize="12px" lineHeight="2">
                                Reason:{' '}
                                <Typography component="span" fontSize="12px">
                                  {contactPreferences?.reason?.name || 'N/A'}
                                </Typography>
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={6}>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography fontWeight="600" variant="body2" fontSize="12px" lineHeight="2">
                                Contact purposes:{' '}
                                <Typography component="span" fontSize="12px">
                                  {contactPreferences?.contactPurposes?.name || 'N/A'}
                                </Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography fontWeight="600" variant="body2" fontSize="12px" lineHeight="2">
                                Preferred Method of Contact:{' '}
                                <Typography component="span" fontSize="12px">
                                  {contactPreferences?.preferredMethod?.name || 'N/A'}
                                </Typography>
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Typography fontWeight="600" variant="body2" fontSize="12px" lineHeight="2">
                                Date of confirmation:{' '}
                                <Typography component="span" fontSize="12px">
                                  {contactPreferences?.dateOfConfirmation
                                    ? new Date(contactPreferences?.dateOfConfirmation).toLocaleDateString('en-GB')
                                    : 'N/A'}
                                </Typography>
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    )}
                  </Card>
                </Grid>
                <Grid item xs={12} md={12}>
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
                        <Box display="flex" alignItems="center" mb={1} mt={2}>
                          <Typography variant="subtitle1" sx={{ color: '#009fc7' }} className="text">
                            Tags
                          </Typography>
                        </Box>

                        <Typography variant="body2" color="textSecondary" mb={2} className="text">
                          {otherInfo?.description ?? 'No description available.'}
                        </Typography>

                        <Grid>
                          {groupedTagsArray.length === 0 ? (
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
                                  backgroundColor: '#f5f5f5',
                                  borderRadius: 1,
                                  width: '100%'
                                }}
                              >
                                <Box display="flex" alignItems="center" mb={1}>
                                  <Typography variant="subtitle2" fontWeight={600}>
                                    {group.category}
                                  </Typography>
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
              </Grid>
            )}

            {tabValue === 1 && (
              <Grid container spacing={2} p={2}>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} gap={2}>
                    <Typography fontWeight="600" fontSize="16px">
                      Activity Timeline
                    </Typography>

                    <Box display="flex" alignItems="center">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => setAddItemOpen(true)}
                        sx={{
                          backgroundColor: '#009FC7',
                          padding: '6px 10px'
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
                  <TimelineActivity timelineData={timeLineData} />
                </Grid>

                <AddItemDialog
                  open={addItemOpen}
                  onClose={() => setAddItemOpen(false)}
                  onSelect={handleSelectItem}
                  userId={id}
                  role={role}
                />

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

      <OptionsPopoverDonor open={open} anchorEl={anchorEl} onClose={handleClose} data={userData} />
    </>
  );
};

export default UserProfileCard;
