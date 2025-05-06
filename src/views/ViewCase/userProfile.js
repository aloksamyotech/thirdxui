import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Avatar, Grid, Box } from '@mui/material';
import UserProfile from 'assets/images/profile (2).png';

export default function UserProfileDialog({ open, handleClose, user }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { width: '520px', maxWidth: '90%', height: '4' }
      }}
    >
      <DialogTitle>
        <Grid container alignItems="center" spacing={2}>
          <img src={UserProfile} alt={user.name} style={{ width: 64, height: 64, borderRadius: '50%' }} />

          <Grid item xs>
            <Typography mb={1} variant="h5">
              {user.name}
            </Typography>
            <Typography mb={1}>{user.email}</Typography>
            <Typography mb={1}>{user.phone}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography mb={1} align="right" fontWeight="bold">
              Address
            </Typography>
            <Typography mb={1} align="right">
              {user.address}
            </Typography>
            <Typography mb={1} align="right">
              {user.country}
            </Typography>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="subtitle1" gutterBottom>
          ABOUT
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography mb={1}>
              <strong>User ID:</strong> {user.userId}
            </Typography>
            <Typography mb={1}>
              <strong>Name:</strong> {user.name}
            </Typography>
            <Typography mb={1}>
              <strong>DOB:</strong> {user.dob}
            </Typography>
            <Typography mb={1}>
              <strong>Age:</strong> {user.age}
            </Typography>
            <Typography mb={1}>
              <strong>Contact:</strong> {user.phone}
            </Typography>
            <Typography mb={1}>
              <strong>Email:</strong> {user.email}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography mb={1}>
              <strong>Gender:</strong> {user.gender}
            </Typography>
            <Typography mb={1}>
              <strong>Ethnicity:</strong> {user.ethnicity}
            </Typography>
            <Typography mb={1}>
              <strong>Country of Origin:</strong> {user.country}
            </Typography>
            <Typography mb={1}>
              <strong>Alternate User ID:</strong> {user.altUserId}
            </Typography>
            <Typography mb={1}>
              <strong>Name of Service:</strong> {user.service}
            </Typography>
            <Typography mb={1}>
              <strong>Referred Date:</strong> {user.referredDate}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
