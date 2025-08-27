import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Stack, Switch, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, Autocomplete } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { postApi, getApi, updateApi } from 'common/apiClient';
import toast from 'react-hot-toast';
import { urls } from 'common/urls';
const AddTaskDialog = ({ open, handleClose, onClose, fetchTimeLineData,userId }) => {
  const [adminList, setAdminList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const initialTaskState = {
    details: '',
    assignedTo: '',
    dueDate: '',
    isCompleted: false,
    notification: false
  };

  const [task, setTask] = useState(initialTaskState);
  useEffect(() => {
    const fetchAdminslist = async () => {
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
    fetchAdminslist();
  }, []);

  const handleChange = (field) => (e) => {
    setTask({ ...task, [field]: e.target.value });
  };

  const handleSwitch = (field) => (e) => {
    setTask({ ...task, [field]: e.target.checked });
  };

  const handleSubmit = async () => {
    setIsloading(true);
    try {
      const payload = {
        ...task,
        assignedTo: task.assignedTo
      };

      const response = await postApi(urls.dashboard.createTask, payload);
      if (response.success == true) {
        const body = {
          taskId: response?.data?._id
        };
        const taskResponse = await postApi(urls.timeline.taskCreate.replace(':id', userId), body);
      }
      setTask(initialTaskState);
      handleClose();
      fetchTimeLineData();
      setIsloading(false);
    } catch (error) {
      console.error('Error saving task:', error);
      setIsloading(false);
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
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
          <Typography variant="h6">{'Create a Task'}</Typography>
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
                value={task?.details}
                onChange={handleChange('details')}
                size="small"
              />
            </div>

            <div>
              <Typography fontWeight={600} mb={1}>
                Assigned To
              </Typography>

              <Autocomplete
                size="small"
                options={adminList}
                getOptionLabel={(option) => option?.name || ''}
                isOptionEqualToValue={(option, value) => option._id === value._id}
                value={adminList.find((admin) => admin._id === task.assignedTo) || null}
                onChange={(event, value) => {
                  setTask((prev) => ({ ...prev, assignedTo: value ? value._id : '' }));
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>

            <TextField
              type="date"
              value={task?.dueDate}
              onChange={handleChange('dueDate')}
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{ width: '50%' }}
              inputProps={{
                style: {
                  cursor: 'pointer'
                }
              }}
            />

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
            disabled={isLoading}
            sx={{
              backgroundColor: '#1976d2',
              color: '#fff',
              borderRadius: 1,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#1565c0'
              },
              '&.Mui-disabled': {
                backgroundColor: '#90caf9',
                color: '#fff'
              }
            }}
          >
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default AddTaskDialog;
