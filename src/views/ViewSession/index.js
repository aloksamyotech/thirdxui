import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Divider,
  TextField,
  Stack,
  Tooltip,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { updateApi, updateApiPatch } from 'common/apiClient';
import { urls } from 'common/urls';
import toast from 'react-hot-toast';
import { IconTrash } from '@tabler/icons';

const columns = [
  { field: 'country', headerName: 'Location', flex: 1 },
  {
    field: 'serviceUser',
    headerName: 'Service Lead',
    flex: 1,
    valueGetter: (params) => {
      const user = params.row.serviceuser;
      return user ? `${user?.personalInfo?.firstName || ''} ${user?.personalInfo?.lastName || ''}`.trim() || '-' : '-';
    }
  },
  {
    field: 'serviceName',
    headerName: 'Service Type',
    flex: 1,
    valueGetter: (params) => params.row.serviceId?.serviceType?.name || '-'
  },
  {
    field: 'date',
    headerName: 'Date',
    flex: 1,
    valueFormatter: (params) => {
      if (!params.value) return '';
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      return new Date(params.value).toLocaleDateString(undefined, options);
    }
  },
  { field: 'time', headerName: 'Time', flex: 1 }
];

const UserProfile = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const location = useLocation();
  const session = location?.state?.session;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleClose();
  };

  const handleArchiveClick = () => {
    setArchiveDialogOpen(true);
    handleClose();
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      await updateApiPatch(urls.session.delete.replace(':id', sessionId));
      toast.success('Session deleted successfully!');
      navigate('/services');
    } catch (error) {
      toast.error('Failed to delete session.');
    }
  };

  const handleArchiveSession = async (sessionId) => {
    try {
      await updateApi(urls.session.archieve.replace(':sessionId', sessionId));
      toast.success('Session archived successfully!');
      navigate('/services');
    } catch (error) {
      toast.error('Failed to archive session.');
    }
  };

  const handleEditSession = () => {
    navigate('/add-session', { state: { session } });
    handleClose();
  };

  const open = Boolean(anchorEl);
  const sessionRows = session ? [session] : [];

  return (
    <>
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={() => navigate('/view-service', { state: { serviceId: session?.serviceId?._id } })}>
              <KeyboardBackspaceIcon sx={{ fontSize: 20, color: 'black' }} />
            </IconButton>
            <Typography variant="h5" fontWeight="bold">
              {session?.serviceId?.name || 'Session Details'}
            </Typography>
          </Stack>
          <Button
            variant="contained"
            size="small"
            sx={{ textTransform: 'none', backgroundColor: '#1B4B66' }}
            onClick={() => navigate('/attendees', { state: { session } })}
          >
            View Attendees List
          </Button>
        </Stack>
      </Box>

      <Box sx={{ height: 'auto', width: '100%', background: '#ffff' }}>
        {session ? (
          <DataGrid
            rows={sessionRows}
            columns={columns}
            pageSize={1}
            rowsPerPageOptions={[1]}
            disableSelectionOnClick
            hideFooter
            sx={{
              border: '1px solid #e0e0e0',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5',
                fontWeight: 'bold'
              }
            }}
            getRowId={(row) => row._id}
          />
        ) : (
          <Typography>Loading session details...</Typography>
        )}
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="flex-end" mt={2}>
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            mb: 1,
            borderRadius: '6px',
            fontSize: '10px',
            backgroundColor: '#009fc7'
          }}
        >
          MANAGE
        </Button>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            }
          }
        }}
      >
        <MenuItem onClick={handleEditSession}>
          <EditIcon sx={{ mr: 1, fontSize: 20 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleArchiveClick}>
          <ArchiveIcon sx={{ mr: 1, fontSize: 20 }} />
          Archive
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1, fontSize: 20, color: 'error.main' }} />
          Delete
        </MenuItem>
      </Menu>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth={false}
        PaperProps={{
          sx: { width: 400, borderRadius: 2 }
        }}
      >
        <Box sx={{ textAlign: 'center', pt: 3 }}>
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
            You want to delete this session. <br />
            This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
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
            onClick={() => {
              handleDeleteSession(session?._id);
              setDeleteDialogOpen(false);
            }}
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

      <Dialog open={archiveDialogOpen} onClose={() => setArchiveDialogOpen(false)} aria-labelledby="archive-dialog-title">
        <DialogTitle sx={{ fontWeight: 'bold', color: 'orange' }}>📦 Archive</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to archive this session?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setArchiveDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleArchiveSession(session?._id);
              setArchiveDialogOpen(false);
            }}
            color="warning"
            variant="contained"
          >
            Archive
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserProfile;
