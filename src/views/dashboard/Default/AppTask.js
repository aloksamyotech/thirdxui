import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Card,
  Box,
  Stack,
  Divider,
  Typography,
  TextField,
  Checkbox,
  MenuItem,
  IconButton,
  Select,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Switch,
  Button,
  FormControlLabel
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Iconify from '../../../ui-component/iconify';
import { urls } from 'common/urls';
import { getApi, updateApi, updateApiPatch } from 'common/apiClient';
import AddIcon from '@mui/icons-material/Add';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

AppTasks.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array
};

export default function AppTasks({ title, subheader, list = [], ...other }) {
  const { control } = useForm({
    defaultValues: {
      taskCompleted: ['2']
    }
  });

  const [openAddForm, setOpenAddForm] = useState(false);
  const [adminList, setAdminList] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [range, setRange] = useState('This Year');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTask, setDeleteTask] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const limit = 10;
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

      await updateApi(urls.dashboard.edittask.replace(':id', selectedTaskId), payload);
      fetchTasks();
      setOpenAddForm(false);
      setTask(initialTaskState);
      setEditMode(false);
      setSelectedTaskId(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const queryParams = {
        name: search,
        range: range?.toLowerCase().replace(/\s/g, '-'),
        page,
        limit
      };

      const queryString = new URLSearchParams(queryParams).toString();
      const res = await getApi(`${urls.dashboard.getAllTasksWithPagination}?${queryString}`);
      const allTasks = res?.data?.data;
      const formattedTasks = allTasks?.map((item) => ({
        id: item?._id,
        date: item?.createdAt
          ? new Date(item.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })
          : '',
        label: item?.details || '',
        assignedTo: item?.assignedTo?.name || 'N/A',
        dueDate: item?.dueDate
          ? new Date(item.dueDate).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })
          : '',
        isCompleted: item?.isCompleted || false,
        notification: item?.notification || false
      }));
      setMyTasks(formattedTasks);
    } catch (err) {
      console.error('Error fetching task:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, range, page]);
  useEffect(() => {
    if (location.state?.taskAdded) {
      fetchTasks();
    }
  }, [location.state]);

  const handleDelete = (taskId) => {
    setDeleteTask(taskId);
    setConfirmOpen(true);
  };
  const handleConfirmDelete = async (taskId) => {
    try {
      await updateApiPatch(urls.dashboard.deleteTask.replace(':id', taskId));
      await fetchTasks();
      setConfirmOpen(false);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = myTasks.find((t) => t.id === taskId);

    const assignedToId =
      typeof taskToEdit.assignedTo === 'object'
        ? taskToEdit.assignedTo._id
        : adminList.find((admin) => admin.name.trim().toLowerCase() === taskToEdit.assignedTo.trim().toLowerCase())?._id;

    const matchedAdmin = adminList.find((admin) => admin._id === assignedToId);

    setTask({
      details: taskToEdit?.label || '',
      assignedTo: assignedToId || '',
      dueDate: taskToEdit?.dueDate ? taskToEdit.dueDate.split('T')[0] : '',
      isCompleted: taskToEdit?.isCompleted || false,
      notification: taskToEdit?.notification || false
    });

    setSelectedAdmin(matchedAdmin || null);
    setSelectedTaskId(taskId);
    setEditMode(true);
    setOpenAddForm(true);
  };
  const handleClose = () => {
    setOpenAddForm(false);
  };
  return (
    <>
      <Box
        sx={{
          height: '430px',
          bgcolor: '#fff',
          borderRadius: 2,
          boxShadow: '0 1px 6px rgba(0,0,0,0.1)'
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
          sx={{ mb: 2, p: 2 }}
        >
          <Typography variant="h5" fontWeight={500} fontSize={14}>
            My Task
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Select
              value={range}
              size="small"
              onChange={(e) => {
                setPage(1);
                setRange(e.target.value);
              }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <MenuItem value="This Week">This Week</MenuItem>
              <MenuItem value="This Month">This Month</MenuItem>
              <MenuItem value="This Year">This Year</MenuItem>
            </Select>
            <TextField
              variant="outlined"
              placeholder="Search"
              size="small"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              sx={{
                maxWidth: 120,
                '& input::placeholder': {
                  fontSize: '12px',
                  color: 'black',
                  opacity: 1
                }
              }}
            />
          </Stack>
        </Stack>

        <Divider />

        <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
          <Controller
            name="taskCompleted"
            control={control}
            render={({ field }) => {
              const onSelected = (taskId) =>
                field.value.includes(taskId) ? field.value.filter((id) => id !== taskId) : [...field.value, taskId];

              if (myTasks.length === 0) {
                return (
                  <Stack alignItems="center" justifyContent="center" sx={{ py: 5 }}>
                    <Typography variant="body2" color="text.secondary">
                      No tasks found in this range
                    </Typography>
                  </Stack>
                );
              }

              return (
                <>
                  {myTasks.map((task) => (
                    <div key={task.id}>
                      <TaskItem
                        task={task}
                        checked={field.value.includes(task.id)}
                        onChange={() => field.onChange(onSelected(task.id))}
                        onEdit={() => handleEditTask(task.id)}
                        onDelete={() => handleDelete(task.id)}
                      />
                      <Divider />
                    </div>
                  ))}
                </>
              );
            }}
          />
        </Box>
      </Box>

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
        <DialogTitle
          sx={{
            px: 3,
            py: 2,
            borderBottom: '1px solid #eee',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6">Edit Task</Typography>

          <IconButton onClick={handleClose} size="small" onPointerDown={(e) => e.stopPropagation()}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3, marginTop: '10px' }}>
          <Stack spacing={3} sx={{ marginTop: '20px' }}>
            <TextField
              fullWidth
              placeholder="Send Email Confirmation"
              label="Details"
              value={task.details}
              onChange={handleChange('details')}
              size="small"
              onPointerDown={(e) => e.stopPropagation()}
            />
            <TextField
              select
              fullWidth
              label="Assigned To"
              value={task.assignedTo}
              onChange={(e) => setTask((prev) => ({ ...prev, assignedTo: e.target.value }))}
              size="small"
              onPointerDown={(e) => e.stopPropagation()}
            >
              {adminList.map((admin) => (
                <MenuItem key={admin._id} value={admin._id}>
                  {admin.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              type="date"
              label="Due Date"
              value={task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''}
              onChange={handleChange('dueDate')}
              size="small"
              InputLabelProps={{ shrink: true }}
              onPointerDown={(e) => e.stopPropagation()}
            />

            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography fontWeight={600}>Completed</Typography>
                  <Switch checked={task.isCompleted} onChange={handleSwitch('isCompleted')} onPointerDown={(e) => e.stopPropagation()} />
                </Stack>
              </Grid>
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography fontWeight={600}>Send Notification</Typography>
                  <Switch checked={task.notification} onChange={handleSwitch('notification')} onPointerDown={(e) => e.stopPropagation()} />
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>

        <Box sx={{ backgroundColor: '#fafafa', p: 2, borderTop: '1px solid #eee' }}>
          <Button
            fullWidth
            onClick={handleSubmit}
            startIcon={<AddIcon />}
            onPointerDown={(e) => e.stopPropagation()}
            sx={{
              backgroundColor: '#1976d2',
              color: '#fff',
              borderRadius: 1,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#1565c0'
              }
            }}
          >
            Update
          </Button>
        </Box>
      </Dialog>
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        maxWidth={false}
        PaperProps={{
          sx: { width: 400, borderRadius: 5 }
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
            <Iconify icon={'eva:trash-2-outline'} />
          </IconButton>
        </Box>

        <DialogTitle sx={{ textAlign: 'center', fontWeight: 600, fontSize: 20, color: '#053046' }}>Are you sure?</DialogTitle>

        <DialogContent>
          <Typography align="center" sx={{ fontSize: 14, color: '#0a344a', mb: '-9px' }}>
            You want to delete this task.
            <br />
            This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            onClick={() => setConfirmOpen(false)}
            variant="outlined"
            onPointerDown={(e) => e.stopPropagation()}
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
            onClick={() => handleConfirmDelete(deleteTask)}
            variant="contained"
            onPointerDown={(e) => e.stopPropagation()}
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
    </>
  );
}

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  task: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string
  })
};
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB');
};
function TaskItem({ task, checked, onChange, onEdit, onDelete }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        px: 2,
        py: 0.75,
        ...(checked && {
          color: 'text.disabled',
          textDecoration: 'line-through'
        })
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', minWidth: 0 }}>
        <FormControlLabel
          sx={{ m: 0, flex: 1 }}
          control={<Checkbox checked={checked} onChange={onChange} onPointerDown={(e) => e.stopPropagation()} />}
          label={
            <Typography
              variant="body2"
              sx={{
                m: 0,
                color: '#26262680',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              Call due for {task?.assignedTo} on <strong>{formatDate(task?.dueDate)}</strong>
            </Typography>
          }
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <IconButton size="large" color="inherit" sx={{ opacity: 0.5 }} onClick={onEdit} onPointerDown={(e) => e.stopPropagation()}>
          <Iconify icon={'material-symbols:edit-outline'} />
        </IconButton>
        <IconButton size="large" color="error" onClick={onDelete} onPointerDown={(e) => e.stopPropagation()}>
          <Iconify icon={'eva:trash-2-outline'} />
        </IconButton>
      </Box>
    </Stack>
  );
}
