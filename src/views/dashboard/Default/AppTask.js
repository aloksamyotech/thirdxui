import PropTypes from 'prop-types';
import { useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
// @mui
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
  CardHeader,
  FormControlLabel
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Iconify from '../../../ui-component/iconify';
import { urls } from 'common/urls';
import { getApi } from 'common/apiClient';
import { useEffect } from 'react';

AppTasks.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired
};
export default function AppTasks({ title, subheader, list, ...other }) {
  const { control } = useForm({
    defaultValues: {
      taskCompleted: ['2']
    }
  });

  const [myTasks, setMyTasks] = useState([]);
  const [search, setSearch] = useState(''); 

  const myTask = async () => {
    const task = await getApi(urls.dashboard.getmyTasks);
    const allTasks = task?.data?.allTask;
    const formattedtasks = allTasks?.map((item, index) => ({
      id: item?._id,
      date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '',
      label: item.details || '',
    }));

    setMyTasks(formattedtasks);
  };

  useEffect(() => {
    myTask();
  }, []);

  const filteredTasks = myTasks.filter((task) =>
    task.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        height: '400px',
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
        sx={{ p: 2 }}
      >
        <Typography variant="h5" fontWeight={600}>
          My Task
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Select value="This Week" size="small">
            <MenuItem value="This Week">This Week</MenuItem>
            <MenuItem value="This Month">This Month</MenuItem>
            <MenuItem value="This Year">This Year</MenuItem>
          </Select>
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            sx={{ maxWidth: 120 }}
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              )
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
            const onSelected = (task) =>
              field.value.includes(task)
                ? field.value.filter((value) => value !== task)
                : [...field.value, task];

            return (
              <>
                {filteredTasks.map((task) => (
                  <div key={task.id}>
                    <TaskItem
                      task={task}
                      checked={field.value.includes(task.id)}
                      onChange={() => field.onChange(onSelected(task.id))}
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
  );
}

// ----------------------------------------------------------------------

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  task: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string
  })
};

function TaskItem({ task, checked, onChange }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <Stack
      direction="row"
      sx={{
        px: 2,
        py: 0.75,
        ...(checked && {
          color: 'text.disabled',
          textDecoration: 'line-through'
        })
      }}
    >
      <FormControlLabel control={<Checkbox checked={checked} onChange={onChange} />} label={task.label} sx={{ flexGrow: 1, m: 0 }} />

      <IconButton size="large" color="inherit" sx={{ opacity: 0.5 }} onClick={handleOpenMenu}>
        <Iconify icon={'eva:edit-fill'} />
      </IconButton>
      <IconButton size="large" color="error" onClick={handleOpenMenu}>
        <Iconify icon={'eva:trash-2-outline'} />
      </IconButton>
    </Stack>
    
  );
}
