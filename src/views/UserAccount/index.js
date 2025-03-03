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
  IconButton
} from '@mui/material';
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

const EmployeeDetails = () => {
  const [tabValue, setTabValue] = useState(0);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
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

  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1234567890',
    address: '123 Main St, Vatican City',
    email: 'johndoe@example.com',
    organization: 'Tech Corp',
    state: 'Rome',
    country: 'Vatican City',
    zip: '00120',
    language: 'English',
    status: 'Active',
    currency: 'EUR',
    profilePhoto: 'https://via.placeholder.com/100'
  };

  const handleChangePassword = () => {
    console.log('Password changed!');
  };

  const handleClear = () => {
    setPassword('');
    setConfirmPassword('');
    setOldPassword('');
  };

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

  return (
    <>
      <Grid container spacing={2} p={2}>
        <Typography variant="h4">User Account</Typography>
        <Box sx={{ width: '100%', mt: '15px' }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="Profile" />
            <Tab label="Change Password" />
            <Tab label="Settings" />
          </Tabs>

          {tabValue === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box p={2} boxShadow={3} borderRadius={2} bgcolor="background.paper">
                  <Card sx={{ maxWidth: 400, borderRadius: 3, overflow: 'hidden' }}>
                    <Box
                      sx={{
                        height: 80,
                        backgroundImage: `url(${Background})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        px: 15
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold" color="#6f7082" sx={{ mt: 8, position: 'relative' }}>
                        John Doe
                      </Typography>
                    </Box>

                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          border: '4px solid white',
                          position: 'relative',
                          top: '-50px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          backgroundColor: '#ADD8E6',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <img
                          src={ProfileLogo}
                          alt="Profile"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </Box>

                      <Stack direction="row" alignItems="center" flexWrap="wrap" sx={{ mt: -8 }} spacing={1}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <WorkIcon fontSize="small" sx={{ color: '#6f7082' }} />
                          <Typography variant="body2" color="text.secondary">
                            Role
                          </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={0.5}>
                          <CalendarTodayIcon fontSize="small" sx={{ color: '#6f7082' }} />
                          <Typography variant="body2" color="text.secondary">
                            Joined April 2024
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={0.2}>
                          <LocationOnIcon fontSize="small" sx={{ color: '#6f7082' }} />
                          <Typography variant="body2" color="text.secondary">
                            USA
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>

                    <CardContent sx={{ mt: -9 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Contact Information
                      </Typography>
                      <Divider sx={{ mb: 2 }} />

                      <Box display="flex" alignItems="center" mb={2}>
                        <EmailIcon sx={{ color: '#6f7082', mr: 1 }} />
                        <Typography variant="body1">
                          <b>Email:</b> {empData.email || 'N/A'}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" mb={2}>
                        <PhoneIcon sx={{ color: '#6f7082', mr: 1 }} />
                        <Typography variant="body1">
                          <b>Contact:</b> {empData.phone || 'N/A'}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" mb={2}>
                        <LocationOnIcon sx={{ color: '#6f7082', mr: 1 }} />
                        <Typography variant="body1">
                          <b>Location:</b> {empData.location || 'N/A'}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box p={1} boxShadow={3} borderRadius={2} bgcolor="background.paper">
                  <Card>
                    <CardContent>
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          About
                        </Typography>
                        <IconButton onClick={() => setOpen(true)}>
                          <BorderColorIcon color="primary" />
                        </IconButton>
                      </Box>
                      <Divider sx={{ mb: 1 }} />

                      <Box display="flex" alignItems="center" mb={1}>
                        <PersonIcon sx={{ color: '#6f7082', mr: 1 }} />
                        <Typography variant="body1">
                          <b>Full Name:</b> {empData.fullName || 'N/A'}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" mb={1}>
                        <BadgeIcon sx={{ color: '#6f7082', mr: 1 }} />
                        <Typography variant="body1">
                          <b>User ID:</b> {empData.userId || 'N/A'}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" mb={1}>
                        <StarBorderIcon sx={{ color: '#6f7082', mr: 1 }} />
                        <Typography variant="body1">
                          <b>Ethnicity:</b> {empData.ethnicity || 'N/A'}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" mb={1}>
                        <PublicIcon sx={{ color: '#6f7082', mr: 1 }} />
                        <Typography variant="body1">
                          <b>Country:</b> {empData.country || 'N/A'}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" mb={1}>
                        <TranslateIcon sx={{ color: '#6f7082', mr: 1 }} />
                        <Typography variant="body1">
                          <b>Language:</b> {empData.language || 'N/A'}
                        </Typography>
                      </Box>

                      <Typography variant="h6" fontWeight="bold" gutterBottom mt={2}>
                        Contact
                      </Typography>
                      <Divider sx={{ mb: 2 }} />

                      <Box display="flex" alignItems="center" mb={1}>
                        <PhoneIcon sx={{ color: '#6f7082', mr: 1 }} />
                        <Typography variant="body1">
                          <b>Phone:</b> {empData.phone || 'N/A'}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <EmailIcon sx={{ color: '#6f7082', mr: 1 }} />
                        <Typography variant="body1">
                          <b>Email:</b> {empData.email || 'N/A'}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          )}

          {tabValue === 1 && (
            <Card sx={{ width: '100%', margin: 'auto' }}>
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
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="New Password"
                      type="password"
                      fullWidth
                      margin="normal"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      margin="normal"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                  <Grid item>
                    <Button variant="contained" color="secondary" onClick={handleChangePassword}>
                      CHANGE PASSWORD
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="error" onClick={handleClear}>
                      CLEAR
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {tabValue === 2 && (
            <Card>
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
                          <Switch checked={emailNotification} onChange={() => setEmailNotification(!emailNotification)} />
                        </TableCell>
                        <TableCell sx={{ width: '90%', padding: '4px' }}>Email Notification</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell sx={{ width: '10%', minWidth: 50, padding: '4px' }}>
                          <Switch checked={copyToPersonalEmail} onChange={() => setCopyToPersonalEmail(!copyToPersonalEmail)} />
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
                          <Switch checked={newNotification} onChange={() => setNewNotification(!newNotification)} />
                        </TableCell>
                        <TableCell sx={{ width: '90%', padding: '4px' }}>Have new Notification</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '10%', minWidth: 50, padding: '4px' }}>
                          <Switch checked={directMessage} onChange={() => setDirectMessage(!directMessage)} />
                        </TableCell>
                        <TableCell sx={{ width: '90%', padding: '4px' }}>You&apos;ve sent a direct message</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '10%', minWidth: 50, padding: '4px' }}>
                          <Switch checked={connection} onChange={() => setConnection(!connection)} />
                        </TableCell>
                        <TableCell sx={{ width: '90%', padding: '4px' }}>Someone adds you as a connection</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '10%', minWidth: 50, padding: '4px' }}>
                          <Switch checked={directMessage} onChange={() => setDirectMessage(!directMessage)} />
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
                          <Switch checked={products} onChange={() => setProducts(!products)} />
                        </TableCell>
                        <TableCell sx={{ width: '90%', padding: '4px' }}>News about PCT-themed products and feature products</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '10%', minWidth: 50, padding: '4px' }}>
                          <Switch checked={tips} onChange={() => setTips(!tips)} />
                        </TableCell>
                        <TableCell sx={{ width: '90%', padding: '4px' }}>Tips on getting more out of PCT-themes</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '10%', minWidth: 50, padding: '4px' }}>
                          <Switch checked={other} onChange={() => setOthers(!other)} />
                        </TableCell>
                        <TableCell sx={{ width: '90%', padding: '4px' }}>News about products and other services</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: '10%', minWidth: 50, padding: '4px' }}>
                          <Switch checked={business} onChange={() => setBusiness(!business)} />
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
                    <Button variant="contained" color="secondary">
                      SAVE CHANGES
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="error">
                      RESET
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Box>
      </Grid>

      <EditProfileModal open={open} onClose={() => setOpen(false)} userData={userData} />
    </>
  );
};

export default EmployeeDetails;
