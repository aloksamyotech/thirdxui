import { IconTrash } from '@tabler/icons';
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, IconButton } from '@mui/material';

const CommonConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  content = 'You want to delete this profile "Name". This action can not be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel'
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 600, fontSize: 20, color: '#053046' }}>{title}</DialogTitle>
      <DialogContent>
        <Typography align="center" sx={{ fontSize: 14, color: '#0a344a', mb: '-9px' }}>
          {content}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: '#FF5C5C',
            borderColor: '#FF5C5C',
            textTransform: 'uppercase',
            fontWeight: 480,
            width: 120
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
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
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonConfirmDialog;
