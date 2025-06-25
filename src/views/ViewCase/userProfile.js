import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Avatar, Grid, Box } from '@mui/material';
import userProfile from 'assets/images/UserProfile.png';

export default function UserProfileDialog({ open, handleClose, user, userView }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { width: '600px', maxWidth: '90%', height: '420px', maxHeight: '90vh', borderRadius: 5 }
      }}
    >
      <DialogTitle
        sx={{
          padding: 2
        }}
      >
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: 2,
            boxShadow: 1,
            padding: 2,
            maxWidth: 600,
            margin: 'auto',
            backgroundColor: '#fff',
            height: '110px'
          }}
        >
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <img
                src={userView ? (userView.startsWith('https://') ? userView : `${userView}`) : userProfile}
                alt={user?.name}
                style={{ width: 64, height: 64, borderRadius: '50%' }}
              />
            </Grid>

            <Grid item xs>
              <Typography mb={1} variant="h5">
                {user.name}
              </Typography>
              <Typography mb={1} sx={{ fontSize: '10px' }}>
                {user?.email}
              </Typography>
              <Typography mb={1} sx={{ fontSize: '10px' }}>
                {user?.phone}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography mb={1} align="right" sx={{ fontSize: '10px' }}>
                Address
              </Typography>
              <Typography mb={1} align="right" sx={{ fontSize: '10px' }}>
                {user?.address}
              </Typography>
              <Typography mb={1} align="right" sx={{ fontSize: '10px' }}>
                {user?.country}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          padding: 2,
          height: '400px',
          overflowY: 'auto',
          mt: '-5px'
        }}
      >
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: 2,
            padding: 2,
            backgroundColor: '#fff',
            height: '100%'
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            ABOUT
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              {[
                ['User ID', user?.userId],
                ['Name', user?.name],
                ['DOB', user?.dob],
                ['Age', user?.age],
                ['Contact', user?.phone],
                ['Email', user?.email]
              ].map(([label, value]) => (
                <Typography key={label} mb={2}>
                  <strong style={{ fontSize: '12px', color: '#7f7f7f' }}>{label}:</strong> <span style={{ fontSize: '12px' }}>{value}</span>
                </Typography>
              ))}
            </Grid>

            <Grid item xs={6}>
              {[
                ['Gender', user?.gender],
                ['Ethnicity', user?.ethnicity],
                ['Country of Origin', user?.country],
                ['Alternate User ID', user?.altUserId],
                ['Name of Service', user?.service],
                ['Referred Date', user?.referredDate]
              ].map(([label, value]) => (
                <Typography key={label} mb={2}>
                  <strong style={{ fontSize: '12px', color: '#7f7f7f' }}>{label}:</strong> <span style={{ fontSize: '12px' }}>{value}</span>
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
