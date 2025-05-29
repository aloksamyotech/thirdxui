import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, Stack } from '@mui/material';
import UserBg from 'assets/images/form.png';
import ServiceUser from 'assets/images/serviceUser.png';
import { fontSize } from '@mui/system';

const ViewReferralDialog = ({ open, onClose, onAccept, onDecline }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      PaperProps={{
        sx: {
          width: '63vw',
          maxWidth: 'none',
          borderRadius: 4,
          height: '88vh',
          overflow: 'hidden'
        }
      }}
    >
      <DialogContent>
        <Box display="flex" justifyContent="center" mb={1}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" sx={{ backgroundColor: '#009fc7', py: 0.5, px: 2, borderRadius: 2 }} onClick={onAccept}>
              Accept
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={onDecline}
              sx={{
                py: 0.5,
                px: 2,
                borderRadius: 2
              }}
            >
              Decline
            </Button>
          </Stack>
        </Box>

        <Grid item xs={12} mb={9}>
          <Box
            sx={{
              backgroundImage: `url(${UserBg})`,
              height: 100,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              position: 'relative'
            }}
          >
            <Card
              sx={{
                position: 'absolute',
                top: 25,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '98%',
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
                    <Typography variant="h6" sx={{ fontSize: '15px', color: '#7f7f7f' }} mb={1}>
                      Mr Edward Abbott
                    </Typography>
                    <Typography variant="body2" color="textSecondary" fontSize="13px" mb={1}>
                      edward.@example.com
                    </Typography>
                    <Typography variant="body2" color="textSecondary" fontSize="13px">
                      #7864 | Individual | Added 09/10/2024
                    </Typography>
                  </Grid>
                </Grid>

                <Box textAlign="right" sx={{ pr: 2, width: '70%' }}>
                  <Typography variant="body2" color="textSecondary" sx={{ fontSize: '12px' }} mb={1}>
                    Address
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ whiteSpace: 'normal', wordBreak: 'break-word', fontSize: '10px' }}
                    mb={2}
                  >
                    200 Dutch Meadows Ln, Glenville NY 12302
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#009fc7',
                      height: '32px',
                      width: '50px',
                      borderRadius: 2,
                      fontSize: '12px',
                      padding: 0
                    }}
                  >
                    VIEW
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        <Grid item xs={12} mt={6} sx={{ width: '100%' }}>
          <Card sx={{ border: '1px solid #e0e0e0', height: '45vh' }}>
            <CardContent>
              <Typography sx={{ fontSize: '14px' }} gutterBottom>
                ABOUT
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
  <Box display="flex" alignItems="center" mb={2}>
    <Typography variant="body1">
      <Box component="strong" sx={{ fontSize: '12px', fontWeight: '100px', mr: 0.5, color: '#5f5f5f' }}>
        {label}:
      </Box>
      <Box component="span">{value}</Box>
    </Typography>
  </Box>
);

export default ViewReferralDialog;
