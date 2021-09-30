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
  IconButton,
  Grid,
  Tooltip,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import { Autocomplete } from '@material-ui/lab';
import { EditIntentStyled } from './index.style';

export default function EditIntentDialog({
  open,
  messageId,
  handleClose,
  onHandleEdit,
  text,
  intent,
  intents,
}) {
  const [userSay, setUserSay] = useState('');
  const [changeIntent, setChangeIntent] = useState({ id: '', displayName: '' });
  const [isEdit, setIsEdit] = useState();

  const { t } = useTranslation();

  const handleChooseIntent = (newValue) => {
    if (newValue) {
      setChangeIntent(newValue);
      setIsEdit(false);
    }
  };

  useEffect(() => {
    if (text) setUserSay(text);
    if (intent) setChangeIntent(intent);
  }, []);

  return (
    <Dialog open={open} onClose={() => handleClose(messageId)} fullWidth>
      <DialogTitle>{t('editIntentInfo')}</DialogTitle>
      <DialogContent>
        <EditIntentStyled>
          <Grid container spacing={2}>
            <Grid item xs={2} className="label">
              <Typography variant="body2">{t('userSay')}</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                variant="outlined"
                fullWidth
                maxRows={3}
                value={userSay}
                onChange={(e) => setUserSay(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={2} className="label">
              <Typography variant="body2" className="intentText">
                {t('intent')}
              </Typography>
            </Grid>
            <Grid item xs={10} className="intent">
              <Typography variant="body2" className="intentText">
                {changeIntent.displayName || t('noData')}
              </Typography>
              {!isEdit && (
                <Tooltip title={t('edit')}>
                  <IconButton onClick={() => setIsEdit(true)}>
                    <Edit color="primary" />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
          </Grid>
          {isEdit && (
            <Grid container spacing={2}>
              <Grid item xs={2} className="label" />
              <Grid item xs={9} className="intent">
                <Autocomplete
                  fullWidth
                  getOptionLabel={(option) => option.displayName}
                  options={intents.filter(
                    (item) => item.id !== changeIntent.id,
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder={t('searchIntent')}
                    />
                  )}
                  onChange={(e, newValue) => handleChooseIntent(newValue)}
                />
              </Grid>
              <Grid item xs={1} className="labelIcon">
                <Tooltip title={t('cancel')}>
                  <IconButton onClick={() => setIsEdit(false)}>
                    <ClearOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          )}
        </EditIntentStyled>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => handleClose(messageId)}>
          {t('cancel')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onHandleEdit(messageId, userSay, changeIntent.name)}
        >
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
