import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, Stack } from '@mui/material';
import UserBg from 'assets/images/form.png';
import ServiceUser from 'assets/images/serviceUser.png';

const ViewReferralDialog = ({ open, onClose, onAccept, onDecline }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: '800px' }
      }}
    >
      <DialogContent>
        <Box display="flex" justifyContent="center" mb={2}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" sx={{ backgroundColor: '#009fc7' }} onClick={onAccept}>
              Accept
            </Button>
            <Button variant="contained" color="error" onClick={onDecline}>
              Decline
            </Button>
          </Stack>
        </Box>

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
                  p: 2
                }}
              >
                <Grid container alignItems="center" spacing={2}>
                  <img src={ServiceUser} alt="John Doe" style={{ width: 72, height: 72, borderRadius: '50%', marginLeft: '16px' }} />
                  <Grid item xs>
                    <Typography variant="h5" fontWeight="bold">
                      John Doe
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      johndoe@example.com
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      #7864 | Individual | Added 09/10/2024
                    </Typography>
                  </Grid>
                </Grid>

                <Box textAlign="right" sx={{ pr: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    Address
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                    123 Main Street, New York, NY
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        <Grid item xs={12} mt={6}>
          <Card sx={{ m: 1, border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                About
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InfoItem label="Full Name" value="John Doe" />
                  <InfoItem label="User ID" value="123456" />
                  <InfoItem label="Ethnicity" value="Mixed - Black and White Caribbean" />
                  <InfoItem label="Language" value="English" />
                  <InfoItem label="Gender" value="Male" />
                  <InfoItem label="DOB" value="1990-05-15" />
                </Grid>
                <Grid item xs={6}>
                  <InfoItem label="Age" value="34" />
                  <InfoItem label="Alternative Id" value="XYZ789" />
                  <InfoItem label="Telephone no" value="+1 234 567 890" />
                  <InfoItem label="Email" value="abc@gmail.com" />
                  <InfoItem label="Contact" value="+123456" />
                  <InfoItem label="Address" value="200 Dutch Meadows, USA" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const InfoItem = ({ label, value }) => (
  <Box display="flex" alignItems="center" mb={1}>
    <Typography variant="body1">
      <strong>{label}:</strong> <Typography component="span">{value}</Typography>
    </Typography>
  </Box>
);

export default ViewReferralDialog;
