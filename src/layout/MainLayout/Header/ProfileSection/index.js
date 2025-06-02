import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Paper,
  Popper,
  Stack,
  Switch,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  ListItem,
  IconButton,
  MenuItem
} from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import UpgradePlanCard from './UpgradePlanCard';
import User1 from 'assets/images/UserProfile.png';
import { IconLogout, IconSearch, IconSettings, IconUser } from '@tabler/icons';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { postApi, getApi, updateApi } from 'common/apiClient';
import toast from 'react-hot-toast';
import { urls } from 'common/urls';
const ProfileSection = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [adminList, setAdminList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const anchorRef = useRef(null);
  const handleLogout = async () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  const [taskList, setTaskList] = useState([]);
  const initialTaskState = {
    details: '',
    assignedTo: '',
    dueDate: '',
    isCompleted: false,
    notification: false
  };

  const [task, setTask] = useState(initialTaskState);
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await getApi(urls.login.getAllAdmin);
        const admins = response?.data?.allAdmins;
        if (Array.isArray(admins)) {
          setAdminList(admins);
        } else if (admins) {
          setAdminList([admins]);
        }
      } catch (error) {
        console.error('Error fetching admins', error);
      }
    };
    fetchAdmins();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await getApi(urls.dashboard.getmyTasks);
      const tasks = response?.data?.allTask || [];
      setTaskList(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleChange = (field) => (e) => {
    setTask({ ...task, [field]: e.target.value });
  };

  const handleSwitch = (field) => (e) => {
    setTask({ ...task, [field]: e.target.checked });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...task,
        assignedTo: task.assignedTo
      };

      if (editMode && selectedTaskId) {
        await updateApi(urls.dashboard.edittask.replace(':id', selectedTaskId), payload);
      } else {
        await postApi(urls.dashboard.createTask, payload);
      }
      fetchTask();
      setOpenAddForm(false);
      setTask(initialTaskState);
      setEditMode(false);
      setSelectedTaskId(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Stack direction="row" spacing={3} alignItems="center">
        <Chip
          sx={{
            height: '48px',
            alignItems: 'center',
            borderRadius: '27px',
            transition: 'all .2s ease-in-out',
            borderColor: 'white',
            backgroundColor: 'white',
            '&[aria-controls="menu-list-grow"], &:hover': {
              borderColor: 'white',
              background: `${'white'}!important`,
              color: 'white',
              '& svg': {
                stroke: 'white'
              }
            },
            '& .MuiChip-label': {
              lineHeight: 0
            }
          }}
          icon={
            <Avatar
              src={User1}
              sx={{
                ...theme.typography.mediumAvatar,
                margin: '8px 0 8px 8px !important',
                cursor: 'pointer'
              }}
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              color="inherit"
            />
          }
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color="primary"
        />
      </Stack>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper sx={{ width: 300 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                        Profile
                      </Typography>
                      <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                        Mark all as read
                      </Typography>
                    </Stack>
                  </Box>

                  <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 210px)', overflowX: 'hidden' }}>
                    <Box sx={{ px: 2 }}>
                      <Divider sx={{ mb: 2 }} />

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          Joe Bloggs
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          joe.bloggs@email.example
                        </Typography>
                      </Box>

                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 220,
                          minWidth: 220,
                          height: 220,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '10px',
                          p: 0,
                          mb: 2,
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%'
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5,
                            px: 0,
                            '&:hover': {
                              backgroundColor: 'transparent'
                            },
                            '&.Mui-selected': {
                              backgroundColor: 'transparent'
                            },
                            '&.Mui-selected:hover': {
                              backgroundColor: 'transparent'
                            },
                            '&:focus': {
                              backgroundColor: 'transparent'
                            },
                            '&:active': {
                              backgroundColor: 'transparent'
                            }
                          },
                          '& .MuiListItemText-root': {
                            m: 0
                          },
                          '& .MuiTypography-root': {
                            px: 0
                          }
                        }}
                      >
                        <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px`, py: 0.5, mb: 2 }}>
                          <ListItemText primary={<Typography variant="body2">Manage your Profile</Typography>} />
                        </ListItemButton>
                        <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px`, py: 0.5, mb: 2 }}>
                          <ListItemText primary={<Typography variant="body2">Manage your Notification</Typography>} />
                        </ListItemButton>
                        <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px`, py: 0.5, mb: 2 }}
                          onClick={() => {
                            setTaskDialogOpen(true);
                          }}
                        >
                          <ListItemText primary={<Typography variant="body2">Tasks</Typography>} />
                        </ListItemButton>
                        <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px`, py: 0.5, mb: 2 }}>
                          <ListItemText primary={<Typography variant="body2">Show Guides</Typography>} />
                        </ListItemButton>
                        <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px`, py: 0.5, mb: 2 }}>
                          <ListItemText primary={<Typography variant="body2">Help</Typography>} />
                        </ListItemButton>

                        <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px`, py: 0.5 }}
                          selected={selectedIndex === 4}
                          onClick={handleLogout}
                        >
                          <ListItemText primary={<Typography variant="body2">Sign Out</Typography>} />
                        </ListItemButton>
                      </List>
                    </Box>

                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Button variant="text" fullWidth sx={{ borderRadius: '8px' }}>
                        View all
                      </Button>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
      <Dialog open={taskDialogOpen} onClose={() => setTaskDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ px: 2, pt: 2, pb: 1 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="subtitle1" fontWeight={600}>
                Create New Task
              </Typography>
              <IconButton
                size="small"
                sx={{ bgcolor: 'success.main', color: 'white', '&:hover': { bgcolor: 'success.dark' } }}
                onClick={() => setOpenAddForm(true)}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>

            <Typography variant="subtitle1" fontWeight={600} sx={{ flexGrow: 1, textAlign: 'center', ml: -6 }}>
              Daily View
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1}>
              <TextField
                placeholder="Type to filter"
                size="small"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                sx={{ width: 180, bgcolor: '#f5f5f5', px: 1, py: 0.5, borderRadius: 1 }}
              />
            </Stack>
          </Stack>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 0 }}>
          <Divider />

          <List dense sx={{ maxHeight: 350, overflow: 'auto' }}>
            {taskList.map((task) => (
              <ListItem
                key={task._id}
                alignItems="flex-start"
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => {
                      setTask({
                        details: task.details,
                        assignedTo: task.assignedTo?._id || '',
                        dueDate: task.dueDate?.substring(0, 10),
                        notification: task.notification,
                        isCompleted: task.notification,
                      });
                      setSelectedTaskId(task._id);
                      setEditMode(true);
                      setOpenAddForm(true);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      <strong>Task</strong> call due for {task?.assignedTo?.userName} on <strong>{formatDate(task.dueDate)}</strong>
                    </Typography>
                  }
                  secondary={
                    task.comment && (
                      <Typography variant="caption" color="textSecondary">
                        Comment: {task.comment}
                      </Typography>
                    )
                  }
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant="text" fullWidth>
            View all
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openAddForm}
        onClose={(event, reason) => {
          if (reason === 'backdropClick') setOpenAddForm(false);
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ px: 3, py: 2, borderBottom: '1px solid #eee' }}>
          <Typography variant="h6">{editMode ? 'Edit Task' : 'Create a Task'}</Typography>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Stack spacing={3}>
            <div>
              <Typography fontWeight={600} mb={1}>
                Details
              </Typography>
              <TextField
                fullWidth
                placeholder="Send Email Confirmation"
                value={task.details}
                onChange={handleChange('details')}
                size="small"
              />
            </div>

            <div>
              <Typography fontWeight={600} mb={1}>
                Assigned To
              </Typography>
              <TextField
                select
                fullWidth
                value={task.assignedTo}
                onChange={(e) => setTask((prev) => ({ ...prev, assignedTo: e.target.value }))}
                size="small"
              >
                {adminList.map((admin) => (
                  <MenuItem key={admin._id} value={admin._id}>
                    {admin.userName}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div>
              <Typography fontWeight={600} mb={1}>
                Due Date
              </Typography>
              <TextField
                fullWidth
                type="date"
                value={task.dueDate}
                onChange={handleChange('dueDate')}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </div>

            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography fontWeight={600}>Completed</Typography>
                  <Switch checked={task.isCompleted} onChange={handleSwitch('isCompleted')} />
                </Stack>
              </Grid>

              <Grid item>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography fontWeight={600}>Send Notification For This Task</Typography>
                  <Switch checked={task.notification} onChange={handleSwitch('notification')} />
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>

        <Box
          sx={{
            backgroundColor: '#fafafa',
            p: 2,
            borderTop: '1px solid #eee'
          }}
        >
          <Button
            fullWidth
            onClick={handleSubmit}
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: '#f9f9f9',
              color: '#666',
              borderRadius: 1,
              boxShadow: 'none',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#f0f0f0'
              }
            }}
          >
            {editMode ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default ProfileSection;
