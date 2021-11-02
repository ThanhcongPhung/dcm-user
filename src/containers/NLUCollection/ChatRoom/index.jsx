/* eslint-disable react/jsx-wrap-multilines */
import React, { useRef, useEffect, useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Conversation from './Conversation';
import DomainDetail from './DomainDetail';
import MissionCompleteDialog from '../../../components/Dialog/ConfirmDialog';
import ConfirmTimerContent from '../../../components/ConfirmTimerContentNLU';
import {
  USER_STATUS,
  SOCKET_EVENT,
  LIMIT_CONFIRM_TIME,
} from '../../../constants/nlu';
import actions from '../../../redux/actions';
import { ChatRoomStyled } from './index.style';

function ChatRoom({ campaign }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { status, socket } = useSelector((state) => state.nlu);
  const [openMissionComplete, setOpenMissionComplete] = useState(false);
  const [timerConfirm, setTimerConfirm] = useState(LIMIT_CONFIRM_TIME);

  const intervalConfirmId = useRef();

  const handleAgree = () => {
    setOpenMissionComplete(false);
    dispatch(actions.nlu.userDisconnect());
  };

  useEffect(() => {
    if (status === USER_STATUS.MISSION_COMPLETE) {
      clearInterval(intervalConfirmId.current);
      intervalConfirmId.current = setInterval(() => {
        setTimerConfirm((prev) => prev - 1);
      }, [1000]);
      setOpenMissionComplete(true);
    }
  }, [status]);

  useEffect(() => {
    if (timerConfirm === 0) handleAgree();
  }, [timerConfirm]);

  useEffect(() => {
    return () => {
      clearInterval(intervalConfirmId.current);
      dispatch(actions.nlu.userLeaveRoom());
      const data = JSON.stringify({
        type: SOCKET_EVENT.USER_LEAVE_ROOM,
        data: {},
      });
      socket.send(data);
    };
  }, []);

  return (
    <ChatRoomStyled>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
          <Paper className="paper">
            <Conversation campaign={campaign} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <Paper className="paper">
            <DomainDetail />
          </Paper>
        </Grid>
      </Grid>
      <MissionCompleteDialog
        open={openMissionComplete}
        title={t('missionCompleteTitle')}
        content={
          <ConfirmTimerContent
            timer={timerConfirm}
            content={t('missionCompleteDesc')}
          />
        }
        handleConfirm={handleAgree}
        disableClose
      />
    </ChatRoomStyled>
  );
}

export default ChatRoom;
