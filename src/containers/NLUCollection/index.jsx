/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { CircularProgress, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import WaitingRoom from './WaitingRoom';
import ChatRoom from './ChatRoom';
import api from '../../apis';
import { WS_NLU_URL } from '../../configs';
import { SOCKET_EVENT, USER_STATUS, USER_ROLE } from '../../constants/nlu';
import actions from '../../redux/actions';
import { NLUCollectionStyled } from './index.style';

export default function NLUCollection() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { campaignId } = useParams();
  const dispatch = useDispatch();
  const [campaign, setCampaign] = useState();

  const { user } = useSelector((state) => state.auth);
  const { socket, status, room } = useSelector((state) => state.nlu);

  const fetchCampaign = async () => {
    const { data } = await api.campaign.getCampaign(campaignId);
    if (data.status) setCampaign(data.result);
  };

  const handleConnectSocket = () => {
    const ws = new WebSocket(WS_NLU_URL);
    if (ws) {
      dispatch(actions.nlu.updateSocket(ws));
      ws.onopen = () => {
        const data = JSON.stringify({
          type: SOCKET_EVENT.USER_SEND_INFOR,
          data: { user, campaignId },
        });
        ws.send(data);
      };
      ws.onmessage = (message) => {
        const { type, data } = JSON.parse(message.data);
        switch (type) {
          case SOCKET_EVENT.SERVER_SEND_CONFIRM_PROMPT: {
            dispatch(
              actions.nlu.updateUserStatus(USER_STATUS.CONFIRM_JOIN_ROOM, {
                promptId: data.promptId,
              }),
            );
            break;
          }
          case SOCKET_EVENT.SERVER_SEND_WAITING_PARTNER_CONFIRM: {
            dispatch(
              actions.nlu.updateUserStatus(USER_STATUS.WAITING_PARTNER_CONFIRM),
            );
            break;
          }
          case SOCKET_EVENT.SERVER_SEND_USER_DECLINE_JOIN_ROOM: {
            dispatch(
              actions.nlu.updateUserStatus(USER_STATUS.PARTNER_DECLINE_CONFIRM),
            );
            break;
          }
          case SOCKET_EVENT.SERVER_SEND_ROOM_INFO: {
            const { room: roomInfo, intents } = data;
            dispatch(actions.nlu.updateIntents(intents));
            const role =
              roomInfo.client === user.email
                ? USER_ROLE.CLIENT
                : USER_ROLE.AGENT;
            dispatch(actions.nlu.updateRoom(roomInfo, role));
            break;
          }
          case SOCKET_EVENT.SERVER_SEND_USER_CONNECTED: {
            dispatch(actions.nlu.updateUserStatus(USER_STATUS.CONNECTED));
            break;
          }
          case SOCKET_EVENT.SERVER_SEND_MESSAGE_FROM_USER: {
            const { message: newMsg } = data;
            dispatch(actions.nlu.addNewMessage(newMsg));
            break;
          }
          case SOCKET_EVENT.SERVER_SEND_CONFIRM_INTENT_MSG: {
            const { message: newMsg, countError, error } = data;
            if (error) {
              enqueueSnackbar(t(error), { variant: 'error' });
            }
            dispatch(
              actions.nlu.confirmIntentNewMessage({
                message: newMsg,
                countError,
                error,
              }),
            );
            break;
          }
          case SOCKET_EVENT.SERVER_SEND_CONFIRM_SLOT_MSG: {
            const { countError, error } = data;
            if (error) {
              enqueueSnackbar(t(error), { variant: 'error' });
            }
            dispatch(actions.nlu.confirmSlotNewMessage({ countError, error }));
            break;
          }
          case SOCKET_EVENT.SERVER_SEND_REMOVE_CURRENT_MSG: {
            const { error } = data;
            if (error) {
              enqueueSnackbar(t(error), { variant: 'error' });
            }
            dispatch(actions.nlu.removeCurrentMessage({ error }));
            break;
          }
          case SOCKET_EVENT.SERVER_SEND_UPDATE_SLOTS_MAIN_INTENT: {
            const { slots, intentId } = data;
            dispatch(actions.nlu.updateSlotsMainIntent(slots, intentId));
            break;
          }
          case SOCKET_EVENT.SERVER_SEND_UPDATE_SLOTS_OTHER_INTENT: {
            const { slots, intentId } = data;
            dispatch(actions.nlu.updateSlotsOtherIntent(slots, intentId));
            break;
          }
          case SOCKET_EVENT.SERVER_SEND_ADD_OTHER_INTENT: {
            const { intent } = data;
            dispatch(actions.nlu.addOtherIntent(intent));
            break;
          }
          case SOCKET_EVENT.SERVER_SEND_MISSION_COMPLETE: {
            dispatch(actions.nlu.missionComplete());
            break;
          }
          case SOCKET_EVENT.USER_DISCONNECT: {
            enqueueSnackbar(t('userDisconnect'), { variant: 'error' });
            dispatch(actions.nlu.userDisconnect());
            break;
          }
          case SOCKET_EVENT.USER_LEAVE_ROOM: {
            enqueueSnackbar(t('userLeaveRoom'), { variant: 'error' });
            dispatch(actions.nlu.userDisconnect());
            break;
          }
          case SOCKET_EVENT.SERVER_SEND_MESSAGE_CONFIRM_COMPLETE: {
            enqueueSnackbar(t('agentConfirmComplete'), { variant: 'success' });
            dispatch(actions.nlu.updateUserStatus(USER_STATUS.IN_ROOM));
            break;
          }
          default:
        }
      };
    }
  };

  useEffect(() => {
    if (campaignId) {
      fetchCampaign();
      handleConnectSocket();
    }
  }, [campaignId]);

  useEffect(() => {
    return () => {
      dispatch(actions.nlu.removeAll());
    };
  }, []);

  if (
    !campaign ||
    !socket ||
    status === USER_STATUS.OUTSIDE_ROOM_SERVER_HANDLING
  ) {
    return <CircularProgress />;
  }

  const validInsideRoom =
    room && status && status.indexOf('[INSIDE_ROOM]') >= 0;

  return (
    <NLUCollectionStyled>
      {status === USER_STATUS.CONNECTED && (
        <Typography variant="h6" className="text">
          {t('accountConnectedCampaign')}
        </Typography>
      )}
      {status !== USER_STATUS.CONNECTED && validInsideRoom && (
        <ChatRoom campaign={campaign} />
      )}
      {status !== USER_STATUS.CONNECTED && !validInsideRoom && (
        <WaitingRoom campaign={campaign} />
      )}
    </NLUCollectionStyled>
  );
}
