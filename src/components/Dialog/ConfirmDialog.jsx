import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  Button,
} from '@material-ui/core';

const ConfirmDialog = ({
  open,
  title,
  content,
  handleClose,
  handleConfirm,
  disableClose,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={!disableClose && handleClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {!disableClose && (
          <Button variant="outlined" color="primary" onClick={handleClose}>
            {t('cancel')}
          </Button>
        )}
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          {t('agree')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
