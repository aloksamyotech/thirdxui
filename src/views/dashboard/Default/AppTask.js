import PropTypes from 'prop-types';
import { useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
// @mui
import { Card, Stack, Divider, TextField, Checkbox, MenuItem, IconButton, Select, Typography, CardHeader, FormControlLabel } from '@mui/material';
// components

import Iconify from '../../../ui-component/iconify';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

// ----------------------------------------------------------------------

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

  return (
    <Card {...other} sx={{height:'350px'}}>
      <CardHeader title={title} subheader={subheader}
        action={
          <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '0px' }}>
            <Stack direction="row" spacing={1}>
              <Select value="This Week" size="small">
                <MenuItem value="This Week">This Week</MenuItem>
                <MenuItem value="This Month">This Month</MenuItem>
                <MenuItem value="This Year">This Year</MenuItem>
              </Select>
              <TextField variant="outlined" placeholder="search" size="small" />
            </Stack>
          </Stack>
        } />
      <Divider />
      <Controller
        name="taskCompleted"
        control={control}
        render={({ field }) => {
          const onSelected = (task) =>
            field.value.includes(task) ? field.value.filter((value) => value !== task) : [...field.value, task];

          return (
            <>
              {list.map((task) => (
                <>
                  <TaskItem
                    key={task.id}
                    task={task}
                    // checked={field.value.includes(task.id)}
                    onChange={() => field.onChange(onSelected(task.id))}
                  />
                  <Divider />
                </>
              ))}
            </>
          );
        }}
      />
    </Card>
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

  const handleMarkComplete = () => {
    handleCloseMenu();
    console.log('MARK COMPLETE', task.id);
  };

  const handleShare = () => {
    handleCloseMenu();
    console.log('SHARE', task.id);
  };

  const handleEdit = () => {
    handleCloseMenu();
    console.log('EDIT', task.id);
  };

  const handleDelete = () => {
    handleCloseMenu();
    console.log('DELETE', task.id);
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
      <IconButton size="large" color="error" sx={{ opacity: 0.5 }} onClick={handleOpenMenu}>
        <Iconify icon={'eva:trash-2-outline'} />
      </IconButton>

      {/* <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75
            }
          }
        }}
      >
        <MenuItem onClick={handleMarkComplete}>
          <Iconify icon={'eva:checkmark-circle-2-fill'} sx={{ mr: 2 }} />
          Mark Complete
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon={'eva:share-fill'} sx={{ mr: 2 }} />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover> */}
    </Stack>
  );
}
