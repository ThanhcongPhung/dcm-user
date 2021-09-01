import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';

export default function CommentDialog({
  open,
  messageId,
  handleClose,
  onHandleComment,
  elements,
  personalizeText,
  text,
  valueComment,
}) {
  const [comment, setComment] = useState('');
  const { t } = useTranslation();
  useEffect(() => {
    if (valueComment) setComment(valueComment);
  }, []);

  return (
    <Dialog open={open} onClose={() => handleClose(messageId)} fullWidth>
      <DialogTitle>{t('commentMessage')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('actionBot')}:</DialogContentText>
        {text && <Typography variant="body2">{text}</Typography>}
        {personalizeText && (
          <Typography variant="body2">{personalizeText}</Typography>
        )}
        {elements &&
          elements.map((option) => (
            <Typography variant="body2">
              {option.label}: {option.value}
            </Typography>
          ))}
      </DialogContent>
      <DialogContent>
        <TextField
          multiline
          fullWidth
          variant="outlined"
          rowsMax={3}
          value={comment}
          placeholder={t('enterComment')}
          onChange={(e) => setComment(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => handleClose(messageId)}>
          {t('cancel')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onHandleComment(comment, messageId)}
        >
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
