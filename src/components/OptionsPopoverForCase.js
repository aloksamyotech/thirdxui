// components/OptionsPopoverForCase.jsx

import {
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';

const options = [
  { label: 'Edit', icon: <EditIcon /> },
  { label: 'Archive', icon: <ArchiveIcon /> },
  { label: 'Delete', icon: <DeleteIcon /> }
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
