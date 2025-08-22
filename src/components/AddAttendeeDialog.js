/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Box,
  Button,
  TextField,
  Autocomplete,
  Typography,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getApi, postApi } from 'common/apiClient';
import { urls } from 'common/urls';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export default function AddAttendeeDialog({ open, onClose, sessionId, fetchpeopleAttendee }) {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate= useNavigate();

  const fetchAvailableUsers = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (searchQuery && searchQuery !== '') {
        queryParams.append('search', searchQuery);
      }
      queryParams.append('role', 'service_user');

      const response = await getApi(`${urls.serviceuser.fetchWithPagination}?${queryParams.toString()}`);
      const allUser = response?.data?.data || [];
      const formattedUsers = allUser.map((user) => ({
        id: user?._id,
        name: `${user?.personalInfo?.firstName || ''} ${user?.personalInfo?.lastName || ''}`
      }));
      setRows(formattedUsers);
    } catch (error) {
      toast.error('Failed to load available users');
    }
  };

  useEffect(() => {
    fetchAvailableUsers();
  }, [searchQuery, open]);

  const handleSubmit = async () => {
    if (!selectedUserId) {
      toast.error('Please select a user!');
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        sessionId: sessionId,
        userId: selectedUserId
      };

      const response = await postApi(urls.attendees.create, payload);

      if (response.success) {
        toast.success('Attendee added successfully');
        setSelectedUserId('');
        fetchpeopleAttendee();
        setSearchQuery('');
        onClose();
      } else {
        toast.error(response.data.message || 'Failed to add attendee');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error while adding attendee');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        setSearchQuery('');
      }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Typography fontWeight="bold">Add An Attendee</Typography>
          <AddCircleIcon
            sx={{ color: 'green', cursor: 'pointer' }}
            onClick={() => navigate('/add-serviceuser', { state: { sessionId: sessionId } })}
          />
        </Box>
        <IconButton
          aria-label="close"
          onClick={() => {
            onClose();
            setSearchQuery('');
          }}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={9}>
            <Autocomplete
              size="small"
              options={rows}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => {
                setSelectedUserId(value ? value.id : '');
              }}
              onInputChange={(_, newInputValue) => setSearchQuery(newInputValue)}
              renderInput={(params) => <TextField {...params} label="Select Attendee" />}
              defaultValue={null}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#042E4C',
                px: 2,
                py: 1,
                borderRadius: 2
              }}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'SUBMIT'}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
