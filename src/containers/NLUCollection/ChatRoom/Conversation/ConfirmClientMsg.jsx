/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Step,
  StepLabel,
  Stepper,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import {
  FormatQuote as FormatQuoteIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
} from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { SOCKET_EVENT, USER_STATUS } from '../../../../constants/nlu';
import actions from '../../../../redux/actions';
import { renderHighlightText } from '../../../../utils/highlightText';
import { ConfirmClientMsgStyled } from './index.style';

const ConfirmIntentStep = ({ message, intents, setIntent, intent }) => {
  const { t } = useTranslation();
  return (
    <div>
      <Box mb={2}>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <FormatQuoteIcon />
            </ListItemIcon>
            <ListItemText
              primary={message && message.content && message.content.text}
            />
          </ListItem>
        </List>
      </Box>
      <Box mb={2}>
        <Autocomplete
          id="combo-box-demo"
          size="small"
          options={intents}
          getOptionLabel={(option) => option.name}
          value={intent}
          onChange={(e, newValue) => {
            setIntent(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('selectIntent')}
              variant="outlined"
            />
          )}
        />
      </Box>
    </div>
  );
};

const SelectSlotStep = ({ message, slots, setSlotsSelect, slotsSelect }) => {
  const { t } = useTranslation();
  const [currentTextSelect, setCurrentTextSelect] = useState(null);

  const handleSelectText = () => {
    const selectionObj = window.getSelection && window.getSelection();
    const value = selectionObj.toString();

    const startChar = message.content.text.indexOf(value);
    const endChar = startChar + value.length;

    const oRange = selectionObj.getRangeAt(0);
    const oRect = oRange.getBoundingClientRect();

    setCurrentTextSelect({
      start: startChar < endChar ? startChar : endChar,
      end: startChar > endChar ? startChar : endChar,
      value,
      slot: null,
      x: oRect.x,
      y: oRect.y + 25,
    });
  };

  const checkMutualChar = (a, b) => {
    return a[0] < b[1] && a[1] > b[0];
  };

  const handleClickSlot = (slot) => {
    const selectText = { ...currentTextSelect, slot };
    const { start, end } = selectText;
    const newSlotsSelect = slotsSelect.filter(
      (el) => !checkMutualChar([start, end], [el.start, el.end]),
    );

    newSlotsSelect.push({ ...selectText });
    setSlotsSelect([...newSlotsSelect]);
    setCurrentTextSelect(null);
  };

  const handleDeleteSlotsSelect = (index) => {
    const newSlotsSelect = [...slotsSelect];
    newSlotsSelect.splice(index, 1);
    setSlotsSelect([...newSlotsSelect]);
  };

  return (
    <>
      <Box mb={2}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mb={2}
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/highlightText.gif`}
            alt={t('confirmSlot')}
          />
        </Box>
        <Box ml={2}>
          <Typography variant="body1" gutterBottom>
            {t('highlightTextConfirmMsg')}
          </Typography>
        </Box>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <FormatQuoteIcon />
            </ListItemIcon>
            <ListItemText>
              <div
                onMouseUp={(e) => handleSelectText(e)}
                dangerouslySetInnerHTML={{
                  __html:
                    renderHighlightText(
                      slotsSelect,
                      message && message.content && message.content.text,
                    ) || '',
                }}
              />
            </ListItemText>
          </ListItem>
        </List>
      </Box>
      <Menu
        keepMounted
        open={Boolean(currentTextSelect)}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: currentTextSelect && currentTextSelect.y,
          left: currentTextSelect && currentTextSelect.x,
        }}
        onClose={() => {
          setCurrentTextSelect(null);
        }}
      >
        {slots &&
          Array.isArray(slots) &&
          slots
            .filter((el) => !slotsSelect.find((ele) => ele.slot.tag === el.tag))
            .map((el) => (
              <MenuItem onClick={() => handleClickSlot(el)}>{el.name}</MenuItem>
            ))}
      </Menu>
      <TableContainer elevation={0} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">{t('slotName')}</TableCell>
              <TableCell align="left">{t('value')}</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {slotsSelect.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="left">{item.slot.name}</TableCell>
                <TableCell align="left">{item.value}</TableCell>
                <TableCell align="left">
                  <DeleteOutlineOutlinedIcon
                    onClick={() => {
                      handleDeleteSlotsSelect(index);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const steps = ['confirmIntent', 'confirmSlot'];
const Steps = ({
  message,
  step,
  intents,
  slots,
  setIntentSelect,
  intentSelect,
  slotsSelect,
  setSlotsSelect,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Stepper activeStep={step}>
        {steps.map((el, index) => (
          <Step key={index}>
            <StepLabel>{t(el)}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {step === 0 ? (
        <ConfirmIntentStep
          message={message}
          intents={intents}
          intent={intentSelect}
          setIntent={setIntentSelect}
        />
      ) : (
        <SelectSlotStep
          message={message}
          slots={slots}
          slotsSelect={slotsSelect}
          setSlotsSelect={setSlotsSelect}
        />
      )}
    </div>
  );
};

export default function ConfirmClientMsg({
  room,
  socket,
  open,
  message,
  intents,
  status,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [step, setStep] = useState(0);
  const [slots, setSlots] = useState([]);
  const [intentSelect, setIntentSelect] = useState(null);
  const [slotsSelect, setSlotsSelect] = useState([]);

  useEffect(() => {
    if (status) {
      if (
        status === USER_STATUS.CONFIRM_INTENT_NEW_MESSAGE ||
        status === USER_STATUS.WAITING_CONFIRM_INTENT_NEW_MESSAGE
      ) {
        setStep(0);
        return;
      }
      if (
        status === USER_STATUS.CONFIRM_SLOT_NEW_MESSAGE ||
        status === USER_STATUS.WAITING_CONFIRM_SLOT_NEW_MESSAGE
      )
        setStep(1);
    }
  }, [status]);

  const handleSendConfirmIntent = () => {
    if (!intentSelect) return;
    dispatch(
      actions.nlu.updateUserStatus(
        USER_STATUS.WAITING_CONFIRM_INTENT_NEW_MESSAGE,
      ),
    );
    const data = JSON.stringify({
      type: SOCKET_EVENT.USER_CONFIRM_INTENT_MSG,
      data: {
        roomId: room.id,
        messageId: message.id,
        intentId: intentSelect.id,
      },
    });
    socket.send(data);
  };

  const handleSendSlotIntent = () => {
    dispatch(
      actions.nlu.updateUserStatus(
        USER_STATUS.WAITING_CONFIRM_SLOT_NEW_MESSAGE,
      ),
    );
    const data = JSON.stringify({
      type: SOCKET_EVENT.USER_CONFIRM_SLOT_MSG,
      data: {
        roomId: room.id,
        messageId: message.id,
        slots: slotsSelect,
      },
    });
    socket.send(data);
  };

  const handleSend = () => {
    if (status === USER_STATUS.CONFIRM_INTENT_NEW_MESSAGE) {
      handleSendConfirmIntent();
      return;
    }
    if (status === USER_STATUS.CONFIRM_SLOT_NEW_MESSAGE) handleSendSlotIntent();
  };

  useEffect(() => {
    if (intentSelect && intentSelect.slots) setSlots([...intentSelect.slots]);
  }, [intentSelect]);

  return (
    <Dialog open={open} fullWidth>
      <ConfirmClientMsgStyled>
        {status === USER_STATUS.WAITING_CONFIRM_SLOT_NEW_MESSAGE ||
        status === USER_STATUS.WAITING_CONFIRM_INTENT_NEW_MESSAGE ? (
          <CircularProgress />
        ) : (
          <>
            <DialogContent>
              <Steps
                message={message}
                step={step}
                intents={intents}
                slots={slots}
                setIntentSelect={setIntentSelect}
                intentSelect={intentSelect}
                slotsSelect={slotsSelect}
                setSlotsSelect={setSlotsSelect}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSend}>{t('send')}</Button>
            </DialogActions>
          </>
        )}
      </ConfirmClientMsgStyled>
    </Dialog>
  );
}
