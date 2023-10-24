import React, { useState } from 'react';
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


function SILConfirmModal({setModalOpen, confirmMsg="Are you sure you want to proceed with this action?", handlePayBalanceAmount}) {
    const [open, setOpen] = useState(true); 
  
    const handleClose = () => {
      setOpen(false);
      setModalOpen(false)
      handlePayBalanceAmount(false);
    };
  
    // Handle confirmation action
    const handleConfirm = () => {
      // Perform your action here
      // You can put your logic here to handle the confirmation
      // For example, delete an item or proceed with an action.
      setOpen(false);
      setModalOpen(false)
      handlePayBalanceAmount(true);
    };
  
    return (
      <>
        <Dialog open={open} onClose={handleClose} className="sil-confirm-modal">
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            {confirmMsg}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirm} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  export default SILConfirmModal;