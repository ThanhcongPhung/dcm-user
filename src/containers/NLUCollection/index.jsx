/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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

  if (!campaign || !socket) {
    return <CircularProgress />;
  }

  const validInsideRoom = room && status && status.indexOf('[INSIDE_ROOM]') >= 0;
  return (
    <NLUCollectionStyled>
       {status === USER_STATUS.CONNECTED && (
        <Typography variant="h6" className="text">
          {t('accountConnectedCampaign')}
        </Typography>
      )}
      {status !== USER_STATUS.CONNECTED && validInsideRoom && <ChatRoom />}
      {status !== USER_STATUS.CONNECTED && !validInsideRoom && <WaitingRoom campaign={campaign} />}
    </NLUCollectionStyled>
  );
}
