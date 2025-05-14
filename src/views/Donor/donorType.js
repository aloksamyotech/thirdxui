import React, { useState } from 'react';
import { Dialog, DialogContent, Typography, Grid, IconButton, Paper, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from 'react-router-dom';

const DonorTypeDialog = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    onClose();
    if (type === 'individual') {
      navigate('/add-donor');
    } else if (type === 'company') {
      navigate('/add-donorCompany', { state: { subRole: 'donar_company' } });
    } else if (type === 'group') {
      navigate('/add-donorCompany', { state: { subRole: 'donar_group' } });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ textAlign: 'center', p: 4 }}>
        <Typography variant="h5" mb={3}>
          Please choose the donor type you would like to add
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Paper
              onClick={() => handleSelect('individual')}
              sx={{
                p: '10px',
                textAlign: 'center',
                cursor: 'pointer',
                border: '1px solid',
                borderColor: 'grey.400',
                borderRadius: 2,
                minWidth: 100
              }}
            >
              <IconButton>
                <PersonIcon fontSize="large" sx={{ color: 'black' }} />
              </IconButton>
              <Typography>Individual</Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper
              onClick={() => handleSelect('company')}
              sx={{
                p: '10px',
                textAlign: 'center',
                cursor: 'pointer',
                border: '1px solid',
                borderColor: 'grey.400',
                borderRadius: 2,
                minWidth: 100
              }}
            >
              <IconButton>
                <BusinessIcon fontSize="large" sx={{ color: 'black' }} />
              </IconButton>
              <Typography>Company</Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper
              onClick={() => handleSelect('group')}
              sx={{
                p: '10px',
                textAlign: 'center',
                cursor: 'pointer',
                border: '1px solid',
                borderColor: 'grey.400',
                borderRadius: 2,
                minWidth: 100
              }}
            >
              <IconButton>
                <GroupsIcon fontSize="large" sx={{ color: 'black' }} />
              </IconButton>
              <Typography>Group</Typography>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DonorTypeDialog;
