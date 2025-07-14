import { useState } from 'react';
import {
  Box,
  Grid,
  Avatar,
  Card,
  CardContent,
  Typography,
  TextField,
  Stack,
  Tabs,
  Tab,
  Divider,
  MenuItem,
  Select,
  Button,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Switch,
  Paper,
  IconButton,
  Skeleton
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';

import AntSwitch from 'components/AntSwitch.js';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import PublicIcon from '@mui/icons-material/Public';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TranslateIcon from '@mui/icons-material/Translate';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WorkIcon from '@mui/icons-material/Work';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditProfileModal from './editProfile.js';
import ProfileLogo from 'assets/images/profile.png';
import Background from 'assets/images/background.jpg';
import { urls } from 'common/urls.js';
import { getApi, updateApiPatch } from 'common/apiClient.js';
import { useEffect } from 'react';
import moment from 'moment';
import { imageUrl } from 'common/urls';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const EmployeeDetails = () => {
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [emailNotification, setEmailNotification] = useState(true);
  const [copyToPersonalEmail, setCopyToPersonalEmail] = useState(true);
  const [newNotification, setNewNotification] = useState(true);
  const [directMessage, setDirectMessage] = useState(true);
  const [connection, setConnection] = useState(true);
  const [products, setProducts] = useState(true);
  const [tips, setTips] = useState(true);
  const [other, setOthers] = useState(true);
  const [business, setBusiness] = useState(true);
  const [notificationTime, setNotificationTime] = useState('online');
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    email: '',
    organization: '',
    state: '',
    country: '',
    zipCode: '',
    language: '',
    status: '',
    currency: '',
    profilePhoto: '',
    file: ''
  });
  const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Current password is required'),
      // .min(8, 'Must be at least 8 characters'),
      newPassword: Yup.string()
        .required('New password is required')
        .min(8, 'Must be at least 8 characters')
        .matches(passwordRules, 'Password must include uppercase, lowercase, number, and special character'),
      confirmPassword: Yup.string()
        .required('Please confirm your new password')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    }),

    onSubmit: async (values) => {
      const url = urls?.login?.changePassword;
      const response = await updateApiPatch(url, {
        password: values.password,
        newPassword: values.newPassword
      });
      if (response.message == 'Success') {
        toast.success('Password changed successfully!');
        // window.location.reload()
        formik.resetForm();
      } else {
        toast.error('Current Password Is Incorrect');
      }
    }
  });

  const empData = {
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    location: 'New York, USA',
    fullName: 'John Doe',
    userId: '1765',
    ethnicity: 'Mixed-White and Black carebien',
    country: 'USA',
    language: 'English'
  };
  const getUserInfo = async () => {
    setLoading(true);
    const url = urls?.login?.getUserProfile;
    const response = await getApi(url);
    setUserData(response?.data?.findAdmin);
    setLoading(false);
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Grid container spacing={2} p={2}>
        <Typography fontWeight="600" fontSize="16px" display="flex" alignItems="center">
          User Account
        </Typography>
        <Box sx={{ width: '100%', mt: '15px' }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              display: 'flex',
              gap: 2,
              borderBottom: '1px solid #4792d3'
            }}
          >
            <Tab
              label="Profile"
              value={0}
              sx={(theme) => ({
                backgroundColor: tabValue === 0 ? '#e3f2fd' : 'transparent',
                transition: 'background-color 0.3s ease',
                marginRight: 2
              })}
            />
            <Tab
              label="Change Password"
              value={1}
              sx={(theme) => ({
                backgroundColor: tabValue === 1 ? '#e3f2fd' : 'transparent',
                transition: 'background-color 0.3s ease',
                marginRight: 2
              })}
            />
            <Tab
              label="Settings"
              value={2}
              sx={(theme) => ({
                backgroundColor: tabValue === 2 ? '#e3f2fd' : 'transparent',
                transition: 'background-color 0.3s ease',
                marginRight: 2
              })}
            />
          </Tabs>

          {tabValue === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={4} sm={5} mt={2}>
                <Box>
                  <Card sx={{ maxWidth: 360, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
                    <Box
                      sx={{
                        height: 70,
                        backgroundImage: loading ? 'none' : `url(${Background})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        bgcolor: loading ? '#f0f0f0' : undefined
                      }}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 2,
                          border: '3px solid white',
                          backgroundColor: '#e0e7ff',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'absolute',
                          top: 40,
                          left: 16,
                          zIndex: 2
                        }}
                      >
                        {loading ? (
                          <Skeleton variant="circular" width={40} height={40} />
                        ) : (
                          <Box
                            component="img"
                            src={
                              userData.file
                                ? userData.file.startsWith('https://')
                                  ? userData.file
                                  : `${imageUrl}${userData.file}`
                                : ProfileLogo
                            }
                            alt="Profile"
                            sx={{
                              width: '80%',
                              height: '80%',
                              objectFit: 'contain'
                            }}
                          />
                        )}
                      </Box>

                      <Box sx={{ position: 'absolute', top: 50, left: 90 }}>
                        {loading ? (
                          <Skeleton variant="text" width={100} height={20} />
                        ) : (
                          <Typography fontSize={15} fontWeight={280} color="black">
                            {userData?.firstName || userData?.lastName ? `${userData?.firstName ?? ''} ${userData?.lastName ?? ''}` : '-'}
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    <CardContent>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="flex-start"
                        flexWrap="wrap"
                        sx={{ pl: '65px', pr: 1 }}
                      >
                        {loading ? (
                          <Skeleton variant="text" width={250} height={20} />
                        ) : (
                          <>
                            <Box display="flex" alignItems="center" gap={0.5}>
                              <OpacityOutlinedIcon fontSize="5px" sx={{ color: '#6f7082' }} />
                              <Typography fontSize="9px" color="#404040">
                                Role
                              </Typography>
                            </Box>

                            <Box display="flex" alignItems="center">
                              <LocationOnIcon fontSize="5px" sx={{ color: 'text.secondary' }} />
                              <Typography fontSize="9px" color="#404040">
                                {userData?.country ?? '-'}
                              </Typography>
                            </Box>

                            <Box display="flex" alignItems="center">
                              <CalendarTodayIcon fontSize="5px" />
                              <Typography fontSize="9px" color="#404040">
                                Joined: {moment(userData?.createdAt).format('MMMM YYYY')}
                              </Typography>
                            </Box>
                          </>
                        )}
                      </Stack>
                    </CardContent>

                    <Divider />
                    <CardContent sx={{ pt: 2 }}>
                      {['email', 'phoneNumber', 'address'].map((key, idx) => (
                        <Box key={key} display="flex" justifyContent="space-between" alignItems="center" mb={idx < 2 ? 2 : 0}>
                          <Box display="flex" alignItems="center" gap={1}>
                            {key === 'email' && <EmailOutlinedIcon fontSize="10px" sx={{ color: '#6f7082', mr: 1 }} />}
                            {key === 'phoneNumber' && <PhoneIcon fontSize="10px" />}
                            {key === 'address' && <LocationOnIcon fontSize="10px" />}
                            <Typography fontSize={12}>
                              {key === 'phoneNumber' ? 'Contact:' : key.charAt(0).toUpperCase() + key.slice(1) + ':'}
                            </Typography>
                          </Box>
                          {loading ? (
                            <Skeleton variant="text" width={100} height={20} />
                          ) : (
                            <Typography fontSize={12}>{userData?.[key] || '-'}</Typography>
                          )}
                        </Box>
                      ))}
                    </CardContent>
                  </Card>
                </Box>
              </Grid>

              <Grid item xs={12} md={8} sm={7} mt={2}>
                <Box p={3} bgcolor="#f9f9f9" borderRadius={2} border="1px solid #e0e0e0" height="60vh" width="103%">
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle2">ABOUT</Typography>
                    <IconButton onClick={() => setOpen(true)} size="small">
                      <BorderColorIcon sx={{ fontSize: 16, color: '#3f51b5' }} />
                    </IconButton>
                  </Box>

                  <Box mt={2} display="flex" alignItems="center" mb={1.5}>
                    <PersonOutlineIcon fontSize="small" sx={{ color: '#6f7082', mr: 1 }} />
                    {loading ? (
                      <Skeleton variant="text" width={200} height={20} />
                    ) : (
                      <Typography fontSize={13}>
                        <Box component="span" sx={{ color: '#3d3838', fontWeight: 500 }}>
                          Full Name:
                        </Box>{' '}
                        {userData?.firstName || userData?.lastName ? `${userData?.firstName ?? ''} ${userData?.lastName ?? ''}` : '-'}
                      </Typography>
                    )}
                  </Box>

                  <Box display="flex" alignItems="center" mb={1.5}>
                    <CheckOutlinedIcon fontSize="small" sx={{ color: '#6f7082', mr: 1 }} />
                    {loading ? (
                      <Skeleton variant="text" width={180} height={20} />
                    ) : (
                      <Typography fontSize={13}>
                        <Box component="span" sx={{ color: '#3d3838', fontWeight: 500 }}>
                          User ID:
                        </Box>{' '}
                        {userData?.userId || '-'}
                      </Typography>
                    )}
                  </Box>

                  <Box display="flex" alignItems="center" mb={1.5}>
                    <StarBorderIcon fontSize="small" sx={{ color: '#6f7082', mr: 1 }} />
                    {loading ? (
                      <Skeleton variant="text" width={160} height={20} />
                    ) : (
                      <Typography fontSize={13}>
                        <Box component="span" sx={{ color: '#3d3838', fontWeight: 500 }}>
                          Ethnicity:
                        </Box>{' '}
                        {userData?.ethnicity || '-'}
                      </Typography>
                    )}
                  </Box>

                  <Box display="flex" alignItems="center" mb={1.5}>
                    <OutlinedFlagIcon fontSize="small" sx={{ color: '#6f7082', mr: 1 }} />
                    {loading ? (
                      <Skeleton variant="text" width={160} height={20} />
                    ) : (
                      <Typography fontSize={13}>
                        <Box component="span" sx={{ color: '#3d3838', fontWeight: 500 }}>
                          Country:
                        </Box>{' '}
                        {userData?.country || '-'}
                      </Typography>
                    )}
                  </Box>

                  <Box display="flex" alignItems="center" mb={3}>
                    <TranslateIcon fontSize="small" sx={{ color: '#6f7082', mr: 1 }} />
                    {loading ? (
                      <Skeleton variant="text" width={140} height={20} />
                    ) : (
                      <Typography fontSize={13}>
                        <Box component="span" sx={{ color: '#3d3838', fontWeight: 500 }}>
                          Language:
                        </Box>{' '}
                        {userData?.language || '-'}
                      </Typography>
                    )}
                  </Box>

                  <Typography variant="subtitle2" gutterBottom mb={2}>
                    CONTACTS
                  </Typography>

                  <Box display="flex" alignItems="center" mb={2}>
                    <PhoneIcon fontSize="small" sx={{ color: '#6f7082', mr: 1 }} />
                    {loading ? (
                      <Skeleton variant="text" width={160} height={20} />
                    ) : (
                      <Typography fontSize={13}>
                        <Box component="span" sx={{ color: '#3d3838', fontWeight: 500 }}>
                          Contact:
                        </Box>{' '}
                        {userData?.phoneNumber || '-'}
                      </Typography>
                    )}
                  </Box>

                  <Box display="flex" alignItems="center">
                    <EmailOutlinedIcon fontSize="small" sx={{ color: '#6f7082', mr: 1 }} />
                    {loading ? (
                      <Skeleton variant="text" width={200} height={20} />
                    ) : (
                      <Typography fontSize={13}>
                        <Box component="span" sx={{ color: '#3d3838', fontWeight: 500 }}>
                          Email:
                        </Box>{' '}
                        {userData?.email || '-'}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}

          {tabValue === 1 && (
            <Card sx={{ width: '100%', margin: 'auto', mt: 2 }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Change Password
                </Typography>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Current Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="New Password"
                      type="password"
                      fullWidth
                      margin="normal"
                      name="newPassword"
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                      error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                      helperText={formik.touched.newPassword && formik.errors.newPassword}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      margin="normal"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                      helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2, fontSize: 14, color: 'gray' }}>
                  <Typography> Password Requirements: </Typography>
                  <ul>
                    <li>Minimum 8 characters long - the more, the better</li>
                    <li>At least one lowercase character</li>
                    <li>At least one number, symbol, or whitespace character</li>
                  </ul>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                      <Button variant="contained" sx={{ backgroundColor: '#053146' }} onClick={formik.handleSubmit}>
                        CHANGE PASSWORD
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={formik.resetForm}
                        sx={{
                          border: '1px solid #6467c2',
                          color: '#6467c2',
                          '&:hover': {
                            border: '1px solid #4d50a0',
                            backgroundColor: '#f4f5ff',
                            color: '#4d50a0'
                          }
                        }}
                      >
                        CANCEL
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {tabValue === 2 && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  Email Settings
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We need permission from your browser to show notifications.
                  <span style={{ color: '#4ba1f8' }}>Request Permission</span>
                </Typography>

                <TableContainer component={Paper} sx={{ border: '1px solid #ddd', borderRadius: 2, mb: 2, mt: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>
                          SETUP EMAIL NOTIFICATION
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ width: '10%', minWidth: 50, padding: '4px' }}>
                          <AntSwitch checked={emailNotification} onChange={() => setEmailNotification(!emailNotification)} />
                        </TableCell>
                        <TableCell sx={{ width: '90%', padding: '4px' }}>Email Notification</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell sx={{ width: '10%', minWidth: 50, padding: '4px' }}>
                          <AntSwitch checked={copyToPersonalEmail} onChange={() => setCopyToPersonalEmail(!copyToPersonalEmail)} />
                        </TableCell>
                        <TableCell sx={{ width: '90%', padding: '4px' }}>Send Copy to Personal Email</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <TableContainer component={Paper} sx={{ border: '1px solid #ddd', borderRadius: 2, mb: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>
                          ACTIVITY RELATED MAILS
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ width: '10%', minWidth: 50, padding: '4px' }}>
                          <AntSwitch checked={newNotification} onChange={() => setNewNotification(!newNotification)} />
                        </TableCell>
                        <TableCell sx={{ width: '90%', padding: '4px' }}>Have new Notification</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '10%', minWidth: 50, padding: '4px' }}>
                          <AntSwitch checked={directMessage} onChange={() => setDirectMessage(!directMessage)} />
                        </TableCell>
                        <TableCell sx={{ width: '90%', padding: '4px' }}>You&apos;ve sent a direct message</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '10%', minWidth: 50, padding: '4px' }}>
                          <AntSwitch checked={connection} onChange={() => setConnection(!connection)} />
                        </TableCell>
                        <TableCell sx={{ width: '90%', padding: '4px' }}>Someone adds you as a connection</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '10%', minWidth: 50, padding: '4px' }}>
                          <AntSwitch checked={directMessage} onChange={() => setDirectMessage(!directMessage)} />
                        </TableCell>
                        <TableCell sx={{ width: '90%', padding: '4px' }}>You&apos;ve sent a direct message</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <TableContainer component={Paper} sx={{ border: '1px solid #ddd', borderRadius: 2, mb: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>
                          UPDATED FROM SYSTEM NOTIFICATION
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ width: '10%', minWidth: 50, padding: '4px' }}>
                          <AntSwitch checked={products} onChange={() => setProducts(!products)} />
                        </TableCell>
                        <TableCell sx={{ width: '90%', padding: '4px' }}>News about PCT-themed products and feature products</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '10%', minWidth: 50, padding: '4px' }}>
                          <AntSwitch checked={tips} onChange={() => setTips(!tips)} />
                        </TableCell>
                        <TableCell sx={{ width: '90%', padding: '4px' }}>Tips on getting more out of PCT-themes</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '10%', minWidth: 50, padding: '4px' }}>
                          <AntSwitch checked={other} onChange={() => setOthers(!other)} />
                        </TableCell>
                        <TableCell sx={{ width: '90%', padding: '4px' }}>News about products and other services</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '10%', minWidth: 50, padding: '4px' }}>
                          <AntSwitch checked={business} onChange={() => setBusiness(!business)} />
                        </TableCell>
                        <TableCell sx={{ width: '90%', padding: '4px' }}>Tips and Documents business products</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid container alignItems="center" spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12}>
                    <Typography variant="h5">When should we send you notifications?</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Select fullWidth value={notificationTime} onChange={(e) => setNotificationTime(e.target.value)}>
                      <MenuItem value="online">Only when I&apos;m online</MenuItem>
                      <MenuItem value="always">Always</MenuItem>
                      <MenuItem value="never">Never</MenuItem>
                    </Select>
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ justifyContent: 'flex-end' }}>
                  <Grid item>
                    <Button variant="contained" sx={{ backgroundColor: '#053146' }}>
                      SAVE CHANGES
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      sx={{
                        color: '#bbbdfa',
                        borderColor: '#bbbdfa',
                        '&:hover': {
                          borderColor: '#bbbdfa',
                          backgroundColor: 'rgba(5, 49, 70, 0.04)'
                        }
                      }}
                    >
                      CANCEL
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Box>
      </Grid>
      <EditProfileModal open={open} onClose={() => setOpen(false)} userData={userData} getUserInfo={getUserInfo} />
    </>
  );
};

export default EmployeeDetails;
