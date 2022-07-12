import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IDeletingDialogProps {
  handleClose: () => void,
  handleDelete: () => void,
  open: boolean
}

export default function DeletingDialog({
  open,
  handleClose,
  handleDelete,
}: IDeletingDialogProps) {


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete an employee from the list"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          handleDelete()
          handleClose()
        }}>Yes</Button>
        <Button onClick={handleClose}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}