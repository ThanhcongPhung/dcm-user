import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  TextField,
  Typography,
  Grid,
} from '@material-ui/core';
import { EditCommentStyled } from './index.style';

export default function EditCommentDialog({
  open,
  handleClose,
  onHandleEdit,
  editComment,
}) {
  const [comment, setComment] = useState('');
  const { t } = useTranslation();

  const handleCloseDialog = () => {
    setComment('');
    handleClose();
  };

  const handleEditComment = () => {
    onHandleEdit(comment);
    handleClose();
    setComment('');
  };

  useEffect(() => {
    if (editComment) setComment(editComment.comment || '');
  }, [editComment]);

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth>
      <DialogTitle>{t('comment')}</DialogTitle>
      <DialogContent>
        <EditCommentStyled>
          <Grid container spacing={2}>
            <Grid item xs={3} className="gridLabel">
              <Typography variant="body2" className="label">
                {t('userSay')}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body2">
                {editComment && editComment.usersay}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3} className="gridLabel">
              <Typography variant="body2" className="label">
                {t('botIntent')}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body2">
                {(editComment && editComment.botIntent) || t('noData')}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3} className="gridLabel">
              <Typography variant="body2" className="label">
                {t('editIntent')}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body2">
                {(editComment && editComment.botIntent) || t('noData')}
              </Typography>
            </Grid>
          </Grid>
        </EditCommentStyled>
      </DialogContent>
      <DialogContent>
        <TextField
          multiline
          fullWidth
          variant="outlined"
          maxRows={3}
          value={comment}
          placeholder={t('enterComment')}
          onChange={(e) => setComment(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleCloseDialog}>
          {t('cancel')}
        </Button>
        <Button variant="contained" color="primary" onClick={handleEditComment}>
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}