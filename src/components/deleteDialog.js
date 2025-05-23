import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const CommonConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = '⚠️ Delete',
  content = 'Are you sure you want to delete this item?',
  confirmText = 'Delete',
  cancelText = 'Cancel'
}) => {
  return (
    <Dialog open={open} onClose={onClose} 
    BackdropProps={{
    sx: {
      backgroundColor: 'transparent',      
       
    },
  }}
  PaperProps={{
    sx: {
      boxShadow: '0 0 20px rgba(0,0,0,0.1)', 
    },
  }}
    >
      <DialogTitle sx={{ fontWeight: 'bold', color: 'red' }}>
        {title}
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          {cancelText}
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonConfirmDialog;
