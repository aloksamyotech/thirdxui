import { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Avatar, Tooltip, Grid, Stack, IconButton, Tabs, Tab, Divider, Popover, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useParams } from 'react-router-dom';
import UserBg from 'assets/images/form.png';
import OptionsPopover from 'components/AddFilter';
import { getApi, postApi, updateApiPatch } from 'common/apiClient';
import { urls } from 'common/urls';
import { imageUrl } from 'common/urls';
import '../ViewServiceUser/index.css';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-hot-toast';

const ViewSubmission = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    personalInfo: {
      "title": "Mr",
      "firstName": "John",
      "middleName": "H",
      "lastName": "Doe",
      "nickName": "Johnny",
      "gender": "Male",
      "ethnicity": "Asian",
      "dateOfBirth": "1990-01-01T00:00:00.000Z"
    },
    contactInfo: {
      "homePhone": "0123456789",
      "phone": "0987654321",
      "email": "john.doe@example.com",
      "addressLine1": "123 Main Street",
      "addressLine2": "Apt 4B",
      "town": "Townsville",
      "district": "Central",
      "postcode": "AB12CD",
      "country": "Countryland",
      "firstLanguage": "English",
      "otherId": "ID123456789"
    },
    otherInfo: {
      "file": "file.pdf",
      "description": "Test user",
      "benificiary": "68358ac07c75f31fd02bf143",
      "campaigns": "68358ac07c75f31fd02bf143",
      "engagement": "68358ac07c75f31fd02bf143",
      "eventAttanded": "68358ac07c75f31fd02bf143",
      "fundingInterest": "68358ac07c75f31fd02bf143",
      "fundraisingActivities": "68358ac07c75f31fd02bf143",
      "restrictAccess": false
    },
    emergencyContact: {
      "title": "Mrs",
      "gender": "Female",
      "firstName": "Jane",
      "lastName": "Doe",
      "relationshipToUser": "Wife",
      "homePhone": "0123498765",
      "phone": "0987612345",
      "email": "jane.doe@example.com",
      "addressLine1": "123 Main Street",
      "addressLine2": "Apt 4B",
      "country": "Countryland",
      "town": "Townsville",
      "postcode": "AB12CD"
    },
    contactPreferences: {
      'preferredMethod': '68355dfe2d4f3ed5720dd1a9',
      "contactPurposes": '68355dfe2d4f3ed5720dd1a9',
      "dateOfConfirmation": "2024-01-01T00:00:00.000Z",
      "reason": '68355dfe2d4f3ed5720dd1a9',
      "contactMethods": {
        "telephone": true,
        "email": true,
        "sms": false,
        "letter": false
      }
    },
    isActive: true,
    role: "volunteer",
    isDeleted: false,
    createdAt: "2025-05-06T12:32:09.474Z",
    updatedAt: "2025-05-06T12:32:09.474Z",
    __v: 0
  });
  const [loading, setLoading] = useState(true);
  const uniqueid = location?.state?.serialNumber || 1;
  const { id } = useParams()
  const [formTitle, setFormTitle] = useState('-')
  const [formStatus, setFormStatus] = useState('PENDING')

  const fetchUserById = async () => {
    try {
      const fromUrl = `${urls?.responses?.response}/${id}`
      const response = await getApi(fromUrl);
      const user = response?.data?.data;
      setFormTitle(response?.data?.formId?.title)
      setFormStatus(response?.data?.status)
      if (user) {
        setUserData(user);
      }
    } catch (error) {
      console.error('Error fetching user by ID:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchUserById();
    }
  }, [id]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleBackClick = () => {
    navigate('/submission');
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const options = [
    { label: 'Accept', icon: <MergeTypeIcon /> },
    { label: 'Reject', icon: <DeleteIcon /> }
  ];

  const fd = new FormData();
  // fd.append('personalInfo[firstName]', formData.personalInfo.firstName || '');
  fd.append('personalInfo[firstName]', userData?.['First Name'] || '');
  // fd.append('personalInfo[lastName]', formData.personalInfo.lastName || '');
  fd.append('personalInfo[lastName]', userData?.['Last Name'] || '');
  fd.append('personalInfo[title]', formData.personalInfo.title || '');
  fd.append('personalInfo[gender]', formData.personalInfo.gender || '');
  const dob = formData.personalInfo.dateOfBirth;
  fd.append('personalInfo[dateOfBirth]', dob ? new Date(dob).toISOString() : '');
  fd.append('personalInfo[nickName]', formData.personalInfo.nickName || '');
  fd.append('personalInfo[ethnicity]', formData.personalInfo.ethnicity || '');

  fd.append('contactInfo[homePhone]', formData.contactInfo.homePhone || '');
  // fd.append('contactInfo[phone]', formData.contactInfo.phone || '');
  fd.append('contactInfo[phone]', userData?.['Contact Number'] || '');
  // fd.append('contactInfo[email]', formData.contactInfo.email || '');
  fd.append('contactInfo[email]', userData?.Email || '');
  // fd.append('contactInfo[addressLine1]', formData.contactInfo.addressLine1 || '');
  fd.append('contactInfo[addressLine1]', userData?.Address || '');
  // fd.append('contactInfo[addressLine2]', formData.contactInfo.addressLine2 || '');
  fd.append('contactInfo[addressLine2]', userData?.Address || '');
  fd.append('contactInfo[town]', formData.contactInfo.town || '');
  fd.append('contactInfo[district]', formData.contactInfo.district || '');
  fd.append('contactInfo[postcode]', formData.contactInfo.postcode || '');
  fd.append('contactInfo[country]', formData.contactInfo.country || '');
  fd.append('contactInfo[firstLanguage]', formData.contactInfo.firstLanguage || '');
  fd.append('contactInfo[otherId]', formData.contactInfo.otherId || '');

  fd.append('otherInfo[description]', formData.otherInfo.description || '');
  fd.append('otherInfo[benificiary]', formData.otherInfo.benificiary || '');
  fd.append('otherInfo[campaigns]', formData.otherInfo.campaigns || '');
  fd.append('otherInfo[engagement]', formData.otherInfo.engagement || '');
  fd.append('otherInfo[eventAttanded]', formData.otherInfo.eventAttanded || '');
  fd.append('otherInfo[fundingInterest]', formData.otherInfo.fundingInterest || '');
  fd.append('otherInfo[fundraisingActivities]', formData.otherInfo.fundraisingActivities || '');
  fd.append('otherInfo[restrictAccess]', formData.otherInfo.restrictAccess ? 'true' : 'false');

  fd.append('emergencyContact[firstName]', formData.emergencyContact.firstName || '');
  fd.append('emergencyContact[lastName]', formData.emergencyContact.lastName || '');
  fd.append('emergencyContact[title]', formData.emergencyContact.title || '');
  fd.append('emergencyContact[gender]', formData.emergencyContact.gender || '');
  fd.append('emergencyContact[relationshipToUser]', formData.emergencyContact.relationshipToUser || '');
  fd.append('emergencyContact[homePhone]', formData.emergencyContact.homePhone || '');
  fd.append('emergencyContact[phone]', formData.emergencyContact.phone || '');
  fd.append('emergencyContact[email]', formData.emergencyContact.email || '');
  fd.append('emergencyContact[addressLine1]', formData.emergencyContact.addressLine1 || '');
  fd.append('emergencyContact[addressLine2]', formData.emergencyContact.addressLine2 || '');
  fd.append('emergencyContact[country]', formData.emergencyContact.country || '');
  fd.append('emergencyContact[town]', formData.emergencyContact.town || '');
  fd.append('emergencyContact[postcode]', formData.emergencyContact.postcode || '');
  // required obj id
  fd.append('contactPreferences[preferredMethod]', formData.contactPreferences.preferredMethod);
  fd.append('contactPreferences[contactPurposes]', formData.contactPreferences.contactPurposes);
  fd.append('contactPreferences[reason]', formData.contactPreferences.reason);
  fd.append('file', formData.file || '');
  const confirmDate = formData.confirmationDate;
  fd.append('contactPreferences[dateOfConfirmation]', confirmDate ? new Date(confirmDate).toISOString() : '');
  fd.append('contactPreferences[contactMethods][telephone]', formData.contactPreferences.contactMethods.telephone ? 'true' : 'false');
  fd.append('contactPreferences[contactMethods][email]', formData.contactPreferences.contactMethods.emailConsent ? 'true' : 'false');
  fd.append('contactPreferences[contactMethods][sms]', formData.contactPreferences.contactMethods.sms ? 'true' : 'false');
  fd.append('contactPreferences[contactMethods][whatsapp]', formData.contactPreferences.contactMethods.whatsapp ? 'true' : 'false');
  fd.append('role', 'volunteer');
  fd.append('isActive', true);

  const handleOptionClick = async (label) => {
    if (label == 'Accept') {
      const url = urls?.serviceuser?.create
      await postApi(url, fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const urlUpdate = `${urls?.responses?.submit}/${id}`
      await updateApiPatch(urlUpdate, { status: 'APPROVED' })
      toast.success('Added in Volunteer')
      handleClose();
    } else {
      handleClose();
    }
  };

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <List>
          {options.map((option) => (
            <ListItem button key={option.label} onClick={() => handleOptionClick(option.label)}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primary={option.label} />
            </ListItem>
          ))}
        </List>
      </Popover>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center">
          <Typography fontWeight="bold" display="flex" alignItems="center">
            <IconButton onClick={handleBackClick}>
              <KeyboardBackspaceIcon sx={{ fontSize: 20, color: 'black' }} />
            </IconButton>
            Submission
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
            </Card>
          </Box>
        </Grid>
        {formTitle == 'Volunteer Sign Up Form' &&
          <Box sx={{ mt: '-40px', mb: '20px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleClick}
              sx={{ mr: '20px' }}
              disabled={formStatus === 'APPROVED'}
            >
              {formStatus == 'APPROVED' ? "APPROVED" : "MANAGE"}
            </Button>
          </Box>
        }
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
                label="User"
                value={0}
                sx={(theme) => ({
                  marginRight: 2
                })}
              />
              <Tab
                label="Additional Fields"
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
                      <Typography variant="h5" fontWeight="600" gutterBottom>
                        Form Title
                        <Typography component="span" className="text">: {formTitle}</Typography>
                      </Typography>
                      <Typography variant="h5" fontWeight="600" gutterBottom>
                        ABOUT
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1" className="heading">
                              <span>Full Name:</span>
                              <Typography component="span" className="text">{`${userData?.['First Name']} ${userData?.['Last Name']}` ?? '-'}</Typography>
                            </Typography>
                          </Box>{' '}
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1" className="heading">
                              <span>User ID:</span> <Typography component="span" className="text">{userData?.userId ?? '-'}</Typography>
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1" className="heading">
                              <span>Ethnicity:</span>{' '}
                              <Typography component="span" className="text">{userData?.Ethicity ?? '-'}</Typography>
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1" className="heading">
                              <span>Language:</span>{' '}
                              <Typography component="span" className="text">{userData?.Language ?? '-'}</Typography>
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1" className="heading">
                              <span>Contact:</span>{' '}
                              <Typography component="span" className="text">
                                +{userData?.['Contact Number'] ?? '-'}
                              </Typography>
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1" className="heading">
                              <span>Address:</span>{' '}
                              <Typography component="span" className="text">{userData?.Address ?? '-'}</Typography>
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={6}>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1" className="heading">
                              <span>Gender:</span>{' '}
                              <Typography component="span" className="text">{userData?.Gender ?? '-'}</Typography>
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1" className="heading">
                              <span>DOB:</span>{' '}
                              <Typography component="span" className="text">
                                {userData?.['Date Of Birth'] ?? '-'}
                              </Typography>
                            </Typography>
                          </Box>

                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1" className="heading">
                              <span>Age:</span>{' '}
                              <Typography component="span" className="text">
                                {userData?.Age ?? '-'}
                              </Typography>
                            </Typography>
                          </Box>

                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1" className="heading">
                              <span>Alternative Id:</span> <Typography component="span" fontSize="12px">{userData?.AlternativeId ?? '-'}</Typography>
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1" className="heading">
                              <span>Telephone no:</span>{' '}
                              <Typography component="span" className="text">
                                +{userData?.TelephoneNumber ?? '-'}
                              </Typography>
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
                      <Typography variant="h5" fontWeight="600" gutterBottom>
                        Risk Assessment
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="body1" color="textSecondary" className="text">
                            {userData?.s ?? 'No description available.'}
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography variant="h6" className="text" sx={{ color: '#009fc7' }}>
                            Key Indicators Concern
                          </Typography>

                          <ul>
                            <li>
                              <Typography variant="body2" className="text">
                                Data breaches detected
                              </Typography>
                            </li>
                            <li>
                              <Typography variant="body2" className="text">
                                Unauthorized access attempts
                              </Typography>
                            </li>
                            <li>
                              <Typography variant="body2" className="text">
                                Compliance violations reported
                              </Typography>
                            </li>
                            <li>
                              <Typography variant="body2" className="text">
                                Subtractive mixture
                              </Typography>
                            </li>
                            <li>
                              <Typography variant="body2" className="text">
                                Learning disability
                              </Typography>
                            </li>
                          </ul>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Card sx={{ m: 1, border: '1px solid #e0e0e0' }}>
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                        Next of Kin Details
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1" className="heading">
                              <span>Full Name:</span>{' '}
                              <Typography component="span" className="text">{userData?.s ?? '-'}</Typography>
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1" className="heading">
                              <span>Gender:</span>{' '}
                              <Typography component="span" className="text">{userData?.s ?? '-'}</Typography>
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1" className="heading">
                              <span>Relationship to Service User:</span>{' '}
                              <Typography component="span" className="text">{userData?.s ?? '-'}</Typography>
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1" className="heading">
                              <span>Address:</span>{' '}
                              <Typography component="span" className="text">{userData?.s ?? '-'}</Typography>
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={6}>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1" className="heading">
                              <span>Home no:</span>{' '}
                              <Typography component="span" className="text">
                                +{userData?.s ?? '-'}
                              </Typography>
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1" className="heading">
                              <span>Mobile no:</span>{' '}
                              <Typography component="span" className="text">
                                +{userData?.s ?? '-'}
                              </Typography>
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1" className="heading">
                              <span>Email:</span>{' '}
                              <Typography component="span" className="text">{userData?.s ?? '-'}</Typography>
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
                      <Typography variant="subtitle1" fontWeight="600" color="#042E4C" gutterBottom>
                        Contact Preferences
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography className="heading" variant="body2">
                            Email:{' '}
                            <Typography component="span" className="text">
                              {userData?.s ? 'Yes' : 'No'}
                            </Typography>
                          </Typography>

                          <Typography className="heading" variant="body2">
                            Telephone:{' '}
                            <Typography component="span" className="text">
                              {userData?.s ? 'Yes' : 'No'}
                            </Typography>
                          </Typography>

                          <Typography className="heading" variant="body2">
                            SMS:{' '}
                            <Typography component="span" className="text">
                              {userData?.s ? 'Yes' : 'No'}
                            </Typography>
                          </Typography>

                          <Typography className="heading" variant="body2">
                            Letter:{' '}
                            <Typography component="span" className="text">
                              {userData?.s ? 'Yes' : 'No'}
                            </Typography>
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography className="heading" variant="body2">
                            Reason:{' '}
                            <Typography component="span" className="text">
                              {userData?.s || 'N/A'}
                            </Typography>
                          </Typography>

                          <Typography className="heading" variant="body2">
                            Contact purposes:{' '}
                            <Typography component="span" className="text">
                              {userData?.s || 'N/A'}
                            </Typography>
                          </Typography>

                          <Typography className="heading" variant="body2">
                            Preferred Method of Contact:{' '}
                            <Typography component="span" className="text">
                              {userData?.s || 'N/A'}
                            </Typography>
                          </Typography>

                          <Typography className="heading" variant="body2">
                            Date of confirmation:{' '}
                            <Typography component="span" className="text">
                              {userData?.s || 'N/A'}
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
              <Card sx={{ m: 1, border: '1px solid #e0e0e0' }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="600" gutterBottom sx={{ mb: '20px' }}>
                    Additional Fields
                  </Typography>
                  <Grid container spacing={2}>
                    {formTitle == 'Volunteer Sign Up Form' &&
                      <>
                        <Grid item xs={12}>
                          <Box display="flex" alignItems="flex-start" mb={1} flexDirection='column'>
                            <Typography variant="body1" className="heading">Do you have a disability or condition that you would like us to be aware of, so we can better support you ?</Typography>
                            <Typography>{userData?.['Do you have a disability or condition that you would like us to be aware of, so we can better support you ?'] ?? '-'}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box display="flex" alignItems="flex-start" mb={1} flexDirection='column'>
                            <Typography variant="body1" className="heading">Interest and skills</Typography>
                            <Typography>{userData?.['Interest and skills'] ?? '-'}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box display="flex" alignItems="flex-start" mb={1} flexDirection='column'>
                            <Typography variant="body1" className="heading">Please add any comments or questions you might have</Typography>
                            <Typography>{userData?.['Please add any comments or questions you might have'] ?? '-'}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box display="flex" alignItems="flex-start" mb={1} flexDirection='column'>
                            <Typography variant="body1" className="heading">Do you any past experience in volunteer work ?</Typography>
                            <Typography>{userData?.['Do you any past experience in volunteer work ?'] ?? '-'}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box display="flex" alignItems="flex-start" mb={1} flexDirection='column'>
                            <Typography variant="body1" className="heading">When are you available?</Typography>
                            <Typography>{userData?.['When are you available?'] ?? '-'}</Typography>
                          </Box>
                        </Grid>
                      </>}
                    {formTitle == 'Community Referral' &&
                      <>
                        <Grid item xs={12}>
                          <Box display="flex" alignItems="flex-start" mb={1} flexDirection='column'>
                            <Typography variant="body1" className="heading">Safeguarding/Risk Factors</Typography>
                            <Typography>{userData?.['Safeguarding/Risk Factors'] ?? '-'}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box display="flex" alignItems="flex-start" mb={1} flexDirection='column'>
                            <Typography variant="body1" className="heading">Do you have a disability or condition that you would like us to be aware of, so we can better support you ?</Typography>
                            <Typography>{userData?.['Do you have a disability or condition that you would like us to be aware of, so we can better support you ?'] ?? '-'}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box display="flex" alignItems="flex-start" mb={1} flexDirection='column'>
                            <Typography variant="body1" className="heading">Please choose which session you will be attending</Typography>
                            <Typography>{userData?.['Please choose which session you will be attending'] ?? '-'}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box display="flex" alignItems="flex-start" mb={1} flexDirection='column'>
                            <Typography variant="body1" className="heading">Dietary restrictions</Typography>
                            <Typography>{userData?.['Dietary restrictions'] ?? '-'}</Typography>
                          </Box>
                        </Grid>
                      </>}
                    {formTitle == 'Satisfaction Survey' &&
                      <>
                        <Grid item xs={12}>
                          <Box display="flex" alignItems="flex-start" mb={1} flexDirection='column'>
                            <Typography variant="body1" className="heading">I think your organisation have helped me to achieve my goals: (1 -Strongly Disagree, 5 -Strongly Disagree)</Typography>
                            <Typography>{userData?.['I think your organisation have helped me to achieve my goals: (1 -Strongly Disagree, 5 -Strongly Disagree)'] ?? '-'}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box display="flex" alignItems="flex-start" mb={1} flexDirection='column'>
                            <Typography variant="body1" className="heading">The staff/Mentor at your organisation have treated me fairly and with respect: (1 -Strongly Disagree, 5 -Strongly Disagree)</Typography>
                            <Typography>{userData?.['The staff/Mentor at your organisation have treated me fairly and with respect: (1 -Strongly Disagree, 5 -Strongly Disagree)'] ?? '-'}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box display="flex" alignItems="flex-start" mb={1} flexDirection='column'>
                            <Typography variant="body1" className="heading">I am now more able to deal with issues and problems in my life than I was before: (1 -Strongly Disagree, 5 -Strongly Disagree)</Typography>
                            <Typography>{userData?.['I am now more able to deal with issues and problems in my life than I was before: (1 -Strongly Disagree, 5 -Strongly Disagree)'] ?? '-'}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box display="flex" alignItems="flex-start" mb={1} flexDirection='column'>
                            <Typography variant="body1" className="heading">I now feel more positive about my future: (1 -Strongly Disagree, 5 -Strongly Disagree)</Typography>
                            <Typography>{userData?.['I now feel more positive about my future: (1 -Strongly Disagree, 5 -Strongly Disagree)'] ?? '-'}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box display="flex" alignItems="flex-start" mb={1} flexDirection='column'>
                            <Typography variant="body1" className="heading">I am satisfied with the service I received from your organisation: (1 -Strongly Disagree, 5 -Strongly Disagree)</Typography>
                            <Typography>{userData?.['I am satisfied with the service I received from your organisation: (1 -Strongly Disagree, 5 -Strongly Disagree)'] ?? '-'}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box display="flex" alignItems="flex-start" mb={1} flexDirection='column'>
                            <Typography variant="body1" className="heading">In what way/s could the service/s provided to me by your organisation be improved?</Typography>
                            <Typography>{userData?.['In what way/s could the service/s provided to me by your organisation be improved?'] ?? '-'}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box display="flex" alignItems="flex-start" mb={1} flexDirection='column'>
                            <Typography variant="body1" className="heading">Id also like to add</Typography>
                            <Typography>{userData?.['Id also like to add'] ?? '-'}</Typography>
                          </Box>
                        </Grid>
                      </>
                    }
                  </Grid>
                </CardContent>
              </Card>
            )}
          </Box>
        </Grid>
      </Card >
    </>
  );
};

export default ViewSubmission;
