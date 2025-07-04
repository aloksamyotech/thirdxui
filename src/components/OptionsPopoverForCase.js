// components/OptionsPopoverForCase.jsx

import { Popover, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconTrash, IconPencil } from '@tabler/icons';

const options = [
  { label: 'Edit', icon: <EditIcon /> },
  { label: 'Archive', icon: <ArchiveIcon /> },
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
const OptionsPopoverForCase = ({ open, anchorEl, onClose, onOptionClick }) => (
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
          onClick={() => {
            onOptionClick(option.label);
            onClose(); // Close the popover after click
          }}
          sx={{
            color: option.label === 'Delete' ? '#F44336' : 'inherit'
          }}
        >
          <ListItemIcon>{option.icon}</ListItemIcon>
          <ListItemText primary={option.label} />
        </ListItem>
      ))}
    </List>
  </Popover>
);

export default OptionsPopoverForCase;
