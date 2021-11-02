import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Checkbox,
  CircularProgress,
} from '@material-ui/core';
import {
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon,
} from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SelectIntentDialog = ({
  open,
  message: content,
  intents,
  onSend,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const handleChange = ({ name, value }) => {
    if (name === 'text') {
      setErrorMessage({ ...errorMessage, text: null });
      setMessage({
        ...message,
        content: { ...(message.content || {}), text: value },
      });
      return;
    }
    setErrorMessage({ ...errorMessage, [name]: null });
    setMessage({ ...message, [name]: value });
  };

  const validateTextChat = () => {
    const {
      intent,
      content: { text },
    } = message;
    const error = {};
    if (!text || !text.trim()) error.text = 'requiredField';
    if (!intent) error.intent = 'requiredField';
    if (error && Object.keys(error).length > 0) {
      setErrorMessage({ ...error });
      return false;
    }
    return true;
  };

  const handleBeforeSend = () => {
    if (!validateTextChat()) return;
    onSend(message);
    setMessage({});
  };

  useEffect(() => {
    if (content) setMessage({ ...message, content });
  }, [content]);

  if (!message || !message.content) {
    return <CircularProgress />;
  }

  return (
    <Dialog open={open} fullWidth disableBackdropClick>
      <DialogTitle>{t('confirmIntent')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('confirmIntentAndSlot')}</DialogContentText>
        <Box
          mb={2}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            label={t('textChat')}
            size="small"
            variant="outlined"
            fullWidth
            value={message && message.content && message.content.text}
            onChange={(e) => {
              handleChange({ name: 'text', value: e.target.value });
            }}
            error={errorMessage && errorMessage.text}
            helperText={
              errorMessage && errorMessage.text && t(errorMessage.text)
            }
          />
        </Box>
        <Box mb={2}>
          <Autocomplete
            size="small"
            options={intents}
            getOptionLabel={(option) => option.name}
            value={message && message.intent}
            onChange={(e, newValue) => {
              handleChange({ name: 'intent', value: newValue });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('selectIntent')}
                variant="outlined"
                error={errorMessage && errorMessage.intent}
                helperText={
                  errorMessage && errorMessage.intent && t(errorMessage.intent)
                }
              />
            )}
          />
        </Box>
        <Box>
          <Autocomplete
            size="small"
            multiple
            options={(message && message.intent && message.intent.slots) || []}
            getOptionLabel={(option) => option.name}
            onChange={(e, newValue) => {
              handleChange({ name: 'slots', value: newValue });
            }}
            renderOption={(option, { selected }) => (
              <>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label={t('selectSlot')}
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{t('cancel')}</Button>
        <Button onClick={handleBeforeSend}>{t('send')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectIntentDialog;
