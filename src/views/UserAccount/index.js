import { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, TextField, Tabs, Tab, Divider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import PublicIcon from '@mui/icons-material/Public';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TranslateIcon from '@mui/icons-material/Translate';

const EmployeeDetails = () => {
  const [tabValue, setTabValue] = useState(0);
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
    <Grid container spacing={3} p={2}>
      <Typography variant="h4">User Account</Typography>
      <Box sx={{ width: '100%', mt: '15px' }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Profile" />
          <Tab label="Change Password" />
          <Tab label="Settings" />
        </Tabs>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box p={2} boxShadow={3} borderRadius={2} bgcolor="background.paper">
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Contact Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Box display="flex" alignItems="center" mb={2}>
                    <EmailIcon sx={{ color: '#caced4', mr: 1 }} />
                    <Typography variant="body1">
                      <b>Email:</b> {empData.email || 'N/A'}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mb={2}>
                    <PhoneIcon sx={{ color: '#caced4', mr: 1 }} />
                    <Typography variant="body1">
                      <b>Contact:</b> {empData.phone || 'N/A'}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mb={2}>
                    <LocationOnIcon sx={{ color: '#caced4', mr: 1 }} />
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
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    About
                  </Typography>
                  <Divider sx={{ mb: 1 }} />

                  <Box display="flex" alignItems="center" mb={1}>
                    <PersonIcon sx={{ color: '#caced4', mr: 1 }} />
                    <Typography variant="body1">
                      <b>Full Name:</b> {empData.fullName || 'N/A'}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mb={1}>
                    <BadgeIcon sx={{ color: '#caced4', mr: 1 }} />
                    <Typography variant="body1">
                      <b>User ID:</b> {empData.userId || 'N/A'}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mb={1}>
                    <StarBorderIcon sx={{ color: '#caced4', mr: 1 }} />
                    <Typography variant="body1">
                      <b>Ethnicity:</b> {empData.ethnicity || 'N/A'}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mb={1}>
                    <PublicIcon sx={{ color: '#caced4', mr: 1 }} />
                    <Typography variant="body1">
                      <b>Country:</b> {empData.country || 'N/A'}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mb={1}>
                    <TranslateIcon sx={{ color: '#caced4', mr: 1 }} />
                    <Typography variant="body1">
                      <b>Language:</b> {empData.language || 'N/A'}
                    </Typography>
                  </Box>

                  <Typography variant="h6" fontWeight="bold" gutterBottom mt={2}>
                    Contact
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Box display="flex" alignItems="center" mb={1}>
                    <PhoneIcon sx={{ color: '#caced4', mr: 1 }} />
                    <Typography variant="body1">
                      <b>Phone:</b> {empData.phone || 'N/A'}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <EmailIcon sx={{ color: '#caced4', mr: 1 }} />
                    <Typography variant="body1">
                      <b>Email:</b> {empData.email || 'N/A'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default EmployeeDetails;
