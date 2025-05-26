/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import DeleteIcon from '@mui/icons-material/Delete';
import { urls } from 'common/urls';
import { updateApi } from 'common/apiClient';
import toast from 'react-hot-toast';

const OptionsPopover = ({ anchorEl, open, onClose, data }) => {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmArchiveOpen, setConfirmArchiveOpen] = useState(false);

  const handleOptionClick = (label) => {
    if (label === 'Edit') {
      if (data?.role === 'volunteer') {
        navigate('/add-volunteer', { state: { ...data, isEdit: true } });
      } else {
        navigate('/add-serviceuser', { state: data });
      }
      onClose();
    } else if (label === 'Delete') {
      setConfirmOpen(true);
    } else if (label === 'Archive') {
      setConfirmArchiveOpen(true);
    } else {
      onClose();
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await updateApi(`${urls.serviceuser.deleteUser}/${data?._id}`);
      setConfirmOpen(false);
      onClose();
        if (data?.role === 'volunteer') {
        toast.success('Volunteer user Deleted successfully!');
        navigate('/volunteer');
      } else {
        toast.success('Service user Deleted successfully!');
        navigate('/people');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete the user.');
    }
  };

  const handleConfirmArchive = async () => {
    try {
      await updateApi(`${urls.serviceuser.archive}/${data?._id}`);
      setConfirmArchiveOpen(false);
      onClose();
       if (data?.role === 'volunteer') {
        toast.success('Volunteer user archived successfully!');
        navigate('/volunteer');
      } else {
        toast.success('Service user archived successfully!');
        navigate('/people');
      }
    } catch (error) {
      console.error('Error archiving user:', error);
      toast.error('Failed to archive the user.');
    }
  };

  const options = [
    { label: 'Edit', icon: <EditIcon /> },
    { label: 'Archive', icon: <ArchiveIcon /> },
    { label: 'Merge', icon: <MergeTypeIcon /> },
    { label: 'Delete', icon: <DeleteIcon /> }
  ];

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
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

     
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle sx={{ fontWeight: 'bold', color: 'red' }}>⚠️ Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmArchiveOpen} onClose={() => setConfirmArchiveOpen(false)}>
        <DialogTitle sx={{ fontWeight: 'bold', color: 'orange' }}>📦 Archive</DialogTitle>
        <DialogContent>
          Are you sure you want to archive?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmArchiveOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirmArchive} color="warning" variant="contained">
            Archive
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OptionsPopover;
