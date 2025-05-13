import React, { useState } from 'react';
import { Popover, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import DeleteIcon from '@mui/icons-material/Delete';

const OptionsPopover = ({ anchorEl, open, onClose }) => {
  const options = [
    { label: 'Edit', icon: <EditIcon /> },
    { label: 'Archive', icon: <ArchiveIcon /> },
    { label: 'Merge', icon: <MergeTypeIcon /> },
    { label: 'Delete', icon: <DeleteIcon /> }
  ];

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
    >
      <List>
        {options.map((option) => (
          <ListItem button key={option.label} onClick={() => alert(`${option.label} clicked`)}>
            <ListItemIcon>{option.icon}</ListItemIcon>
            <ListItemText primary={option.label} />
          </ListItem>
        ))}
      </List>
    </Popover>
  );
};

export default OptionsPopover;
