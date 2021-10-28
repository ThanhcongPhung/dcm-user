/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import GuideModal from './GuideModal';
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog';
import ConfirmTimerContent from '../../../components/ConfirmTimerContentNLU';
import {
  SOCKET_EVENT,
  USER_STATUS,
  LIMIT_CONFIRM_TIME,
} from '../../../constants/nlu';
import actions from '../../../redux/actions';
import { convertSecondToTimeString } from '../../../utils/date';
import { FindPartnerStyled } from './index.style';

export default function FindPartner() {
  const dispatch = useDispatch();
  const [openGuide, setOpenGuide] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerConfirm, setTimerConfirm] = useState(LIMIT_CONFIRM_TIME);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { socket, status, promptId } = useSelector((state) => state.nlu);

  const intervalId = useRef();
  const intervalConfirmId = useRef();

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenGuide = () => {
    setOpenGuide(true);
  };

  const handleCloseGuide = () => {
    setOpenGuide(false);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    clearInterval(intervalConfirmId.current);
    setTimerConfirm(LIMIT_CONFIRM_TIME);
    setOpenConfirm(false);
  };

  const handleDeclineJoinRoom = () => {
    setTimer(0);
    handleCloseConfirm();
    dispatch(actions.nlu.updateUserStatus(null));
    const data = JSON.stringify({
      type: SOCKET_EVENT.USER_DECLINE_JOIN_ROOM,
      data: { promptId },
    });
    socket.send(data);
  };

  const handleAcceptJoinRoom = () => {
    setTimer(0);
    handleCloseConfirm();
    dispatch(actions.nlu.updateUserStatus(null));
    const data = JSON.stringify({
      type: SOCKET_EVENT.USER_ACCEPT_JOIN_ROOM,
      data: { promptId },
    });
    socket.send(data);
  };

  const handleStartFind = () => {
    clearInterval(intervalId.current);
    intervalId.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, [1000]);
    dispatch(actions.nlu.updateUserStatus(USER_STATUS.FINDING_PARTNER));
    const data = JSON.stringify({
      type: SOCKET_EVENT.USER_FIND_PARTNER,
      data: {},
    });
    socket.send(data);
  };

  const handleCancelFind = () => {
    clearInterval(intervalId.current);
    setTimer(0);
    dispatch(actions.nlu.updateUserStatus(null));
    const data = JSON.stringify({
      type: SOCKET_EVENT.USER_STOP_FIND_PARTNER,
      data: {},
    });
    socket.send(data);
  };

  useEffect(() => {
    if (status === USER_STATUS.CONFIRM_JOIN_ROOM) {
      handleOpenConfirm();
      clearInterval(intervalConfirmId.current);
      intervalConfirmId.current = setInterval(() => {
        setTimerConfirm((prev) => prev - 1);
      }, [1000]);
      return;
    }

    if (status === USER_STATUS.PARTNER_DECLINE_CONFIRM) {
      enqueueSnackbar(t('partnerDeclineJoinRoom'), { variant: 'warning' });
      handleCloseConfirm();
      handleStartFind();
    }
  }, [status]);

  useEffect(() => {
    if (timerConfirm === 0) {
      enqueueSnackbar(t('limitConfirmJoinRoomTime'), { variant: 'warning' });
      handleDeclineJoinRoom();
    }
  }, [timerConfirm]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId.current);
      clearInterval(intervalConfirmId.current);
    };
  }, []);

  return (
    <FindPartnerStyled>
      <Box display="flex" p={1}>
        <Box p={1} flexGrow={1}>
          <Typography gutterBottom variant="h5" component="h2">
            {t('findRoom')}
          </Typography>
        </Box>
        <Box p={1}>
          <Button variant="outlined" color="primary" onClick={handleOpenGuide}>
            {t('guide')}
          </Button>
        </Box>
      </Box>
      <Box
        display="flex"
        p={1}
        flexGrow={1}
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        {status === USER_STATUS.FINDING_PARTNER && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={5}
            className="timeCountBox"
          >
            <CircularProgress size={100} className="circleProgress" />
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className="timeCount"
            >
              {convertSecondToTimeString(timer)}
            </Typography>
          </Box>
        )}
        {status === USER_STATUS.FINDING_PARTNER && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCancelFind}
          >
            {t('cancel')}
          </Button>
        )}
        {status === USER_STATUS.WAITING_PARTNER_CONFIRM && (
          <Button variant="contained" color="primary" disabled>
            {t('waitingPartnerConfirm')}
          </Button>
        )}
        {(!status || status === USER_STATUS.NOTHING) && (
          <Button variant="contained" color="primary" onClick={handleStartFind}>
            {t('start')}
          </Button>
        )}
      </Box>
      {openConfirm && (
        <ConfirmDialog
          title={t('joinRoom')}
          content={
            <ConfirmTimerContent
              timer={timerConfirm}
              content={t('confirmJoinRoom')}
            />
          }
          open={openConfirm}
          handleClose={handleDeclineJoinRoom}
          handleConfirm={handleAcceptJoinRoom}
        />
      )}
      <GuideModal open={openGuide} handleClose={handleCloseGuide} />
    </FindPartnerStyled>
  );
}
