import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconTrash, IconPencil } from '@tabler/icons';
import {
  Box,
  Typography,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import DeleteIcon from '@mui/icons-material/Delete';
import { urls } from 'common/urls';
import { updateApi } from 'common/apiClient';
import toast from 'react-hot-toast';

const OptionsPopoverDonor = ({ anchorEl, open, onClose, data }) => {
  const userId = data?._id;

  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmArchiveOpen, setConfirmArchiveOpen] = useState(false);
  const [archiveReason, setArchiveReason] = useState('');

  const handleOptionClick = (label) => {
    if (label === 'Edit') {
      switch (data?.subRole) {
        case 'donar_individual':
          navigate('/add-donor', { state: { ...data, isEdit: true } });
          break;
        case 'donar_company':
          navigate('/add-donorCompany', { state: { ...data, isEdit: true } });
          break;
        case 'donar_group':
          navigate('/add-donorCompany', { state: { ...data, isEdit: true } });
          break;
        default:
          toast.error('Unknown donor type');
          return;
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
      await updateApi(urls.serviceuser.deleteUser.replace(':userId', userId));
      toast.success('Donor user deleted successfully!');
      setConfirmOpen(false);
      onClose();
      navigate('/donor');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete the user.');
    }
  };

  const handleConfirmArchive = async () => {
    try {
      await updateApi(`${urls.serviceuser.archive}/${data?._id}`, {
        archiveReason: archiveReason
      });
      toast.success('Donor user archived successfully!');
      setConfirmArchiveOpen(false);
      onClose();
      navigate('/donor');
    } catch (error) {
      console.error('Error archiving user:', error);
      toast.error('Failed to archive the user.');
    }
  };

  const options = [
    { label: 'Edit', icon: <EditIcon /> },
    // { label: 'Archive', icon: <ArchiveIcon /> },
    // { label: 'Merge', icon: <MergeTypeIcon /> },
    {
      label: 'Delete',
      icon: (
        <Box component="span" sx={{ color: '#F44336', display: 'flex' }}>
          <IconTrash size={20} />
        </Box>
      )
    }
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
            <ListItem
              button
              key={option.label}
              onClick={() => handleOptionClick(option.label)}
              sx={{
                color: option.label === 'Delete' ? '#F44336' : 'inherit',
                '& .MuiListItemText-root .MuiListItemText-primary': {
                  color: option.label === 'Delete' ? '#F44336' : 'inherit'
                }
              }}
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primary={option.label} sx={{ color: option.label === 'Delete' ? '#F44336' : 'inherit' }} />
            </ListItem>
          ))}
        </List>
      </Popover>

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        maxWidth={false}
        PaperProps={{
          sx: { width: 400, borderRadius: 5 }
        }}
      >
        <Box sx={{ textAlign: 'center', pt: 3, borderRadius: '4px' }}>
          <IconButton
            disableRipple
            sx={{
              backgroundColor: '#FFE8E6',
              color: '#FF5C5C',
              pointerEvents: 'none',
              '&:hover': { backgroundColor: '#FFE8E6' }
            }}
          >
            <IconTrash fontSize="small" />
          </IconButton>
        </Box>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 600, fontSize: 20, color: '#053046' }}>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography align="center" sx={{ fontSize: 14, color: '#0a344a', mb: '-9px' }}>
            You want to delete this profile {'"Name"'}. <br />
            This action can not be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            onClick={() => setConfirmOpen(false)}
            variant="outlined"
            sx={{
              color: '#FF5C5C',
              borderColor: '#FF5C5C',
              textTransform: 'uppercase',
              fontWeight: 480,
              width: 120
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              backgroundColor: '#053046',
              color: '#efeceb',
              textTransform: 'uppercase',
              fontWeight: 380,
              width: 120,
              '&:hover': { backgroundColor: '#053046' }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmArchiveOpen}
        onClose={() => setConfirmArchiveOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
            width: 400
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, textAlign: 'left', pb: 1 }}>Archive Reason</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl size="small" sx={{ flexGrow: 1 }}>
              <InputLabel>Reason</InputLabel>
              <Select
                value={archiveReason}
                onChange={(e) => setArchiveReason(e.target.value)}
                label="Reason"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 200,
                      zIndex: 1300
                    }
                  }
                }}
                sx={{
                  backgroundColor: '#f4f2ff',
                  borderRadius: 1
                }}
              >
                <MenuItem value="Deceased">Deceased</MenuItem>
                <MenuItem value="Gone away">Gone away</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={handleConfirmArchive}
              sx={{
                backgroundColor: '#6366f1',
                textTransform: 'uppercase',
                fontWeight: 500,
                px: 3,
                height: 40,
                whiteSpace: 'nowrap',
                minWidth: 100,
                '&:hover': {
                  backgroundColor: '#4f46e5'
                }
              }}
            >
              Archive
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OptionsPopoverDonor;
