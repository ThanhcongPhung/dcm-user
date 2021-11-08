import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { PopupFormStyled } from './index.style';

export default function PopupForm({ title, children, openPopup, handleClose }) {
  return (
    <PopupFormStyled>
      <Dialog
        open={openPopup}
        maxWidth="md"
        fullWidth
        classes={{ paper: 'dialog-wrapper' }}
        onClose={handleClose}
      >
        <DialogTitle className="dialog-title">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </PopupFormStyled>
  );
}
