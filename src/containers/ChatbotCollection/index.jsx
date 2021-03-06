/* eslint-disable import/no-cycle */
import React, { useEffect, useState, useRef, createContext } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import camelCase from 'camelcase-keys';
import { v4 as uuidV4 } from 'uuid';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import MessageChat from './MessageChat';
import ChatbotInfo from './ChatbotInfo';
import ConfirmDialog from '../../components/Dialog/ConfirmDialog';
import api from '../../apis';
import { WS_LIVECHAT_URL } from '../../configs';
import { chatTypes } from '../../constants/websocket';
import { ChatbotCollectionStyled } from './index.style';

export const MessageContext = createContext();

export default function ChatBotCollection() {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState();
  const [messages, setMessages] = useState({});
  const [messageId, setMessageId] = useState();
  const [isTopScroll, setIsTopScroll] = useState(false);
  const [endScroll, setEndScroll] = useState(0);
  const [usecase, setUsecase] = useState({});
  const [intents, setIntents] = useState([]);
  const [isChangeResult, setIsChangeResult] = useState(false);
  const [isEndChat, setIsEndChat] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const rws = useRef(null);
  const currentCampaign = useRef(campaign);
  const currentMessageId = useRef(messageId);
  const currentMessages = useRef(messages);
  const currentUsecase = useRef(usecase);

  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const onSetMessages = (value) => setMessages(value);
  const onSetUsecase = (value) => setUsecase(value);
  const onSetIntents = (value) => setIntents(value);

  const fetchChatInfo = async () => {
    const { data } = await api.chatbot.getChatInfo(campaignId);
    if (data.status) {
      const { usecase: detailUsecase, intents: detailIntents } = data.result;
      if (detailUsecase) {
        onSetUsecase(detailUsecase);
        onSetIntents(detailUsecase.intents || []);
      }
      if (detailIntents) onSetIntents(detailIntents);
    }
  };

  const fetchCampaign = async () => {
    const { data } = await api.campaign.getCampaign(campaignId);
    if (data.status) setCampaign(data.result);
  };

  const fetchResultChat = async () => {
    setIsChangeResult(false);
    const usecaseId = currentUsecase.current && currentUsecase.current.id;
    const { data } = await api.chatbot.getResultChat(campaignId, usecaseId);
    if (data.status) setIntents(data.result);
  };

  const createMessage = async (msg) => {
    const { data } = await api.message.createMessage(msg);
    if (data.status) {
      const message = data.result;
      setMessages((prev) => ({ ...prev, [message.id]: message }));
      return message;
    }
    return null;
  };

  const updateMessage = async ({ msgId, sessionId, nlu }) => {
    const { data } = await api.message.updateMessage({
      messageId: msgId,
      sessionId,
      nlu,
    });
    if (data.status) {
      setIsChangeResult(true);
      const tempMessages = currentMessages.current;
      tempMessages[msgId] = data.result;
      onSetMessages({ ...tempMessages });
    }
  };

  const handleSendMessage = async (content) => {
    const msg = {
      type: chatTypes.CHAT,
      appId: campaign.appId,
      message: { ...content, msgId: uuidV4() },
    };
    const newMessage = {
      content: { text: msg.message.text },
      sender: { user: user.userId },
      campaignId: campaign.id,
      usecaseId: currentUsecase.current && currentUsecase.current.id,
    };
    const message = await createMessage(newMessage);
    setIsTopScroll(false);
    setEndScroll(0);
    if (message && message.id) {
      setMessageId(message.id);
      rws.current.send(JSON.stringify(msg));
    }
  };

  const handleEndChat = () => {
    const msg = { type: chatTypes.END_SESSION };
    rws.current.send(JSON.stringify(msg));
    setIsEndChat(false);
  };

  const handleConfirmEndChat = () => setIsEndChat(true);

  useEffect(() => {
    if (isChangeResult) fetchResultChat();
  }, [isChangeResult]);

  useEffect(() => {
    if (campaign && campaign.appId) {
      rws.current = new WebSocket(WS_LIVECHAT_URL);
      let pingInterval;
      rws.current.onopen = () => {
        pingInterval = setInterval(() => {
          rws.current.send(JSON.stringify({ type: chatTypes.PING }));
        }, 10000);
        rws.current.send(
          JSON.stringify({
            type: chatTypes.INIT,
            appId: campaign.appId,
            apiKey: campaign.apiKey,
            sender: { id: user.userId, name: user.name },
          }),
        );
      };
      rws.current.onmessage = (e) => {
        const responseData = camelCase(JSON.parse(e.data), { deep: true });
        const { type, status, sessionId, data } = responseData;
        switch (type) {
          case chatTypes.AGENT_INIT:
            break;
          case chatTypes.CHAT: {
            if (!status) break;
            const nlu = (data.nlu && data.nlu.intent) || '';
            if (currentMessageId.current) {
              updateMessage({
                sessionId,
                msgId: currentMessageId.current,
                nlu,
              });
              setMessageId();
            }
            const joinMsg = {
              content: data.message,
              sender: data.sender,
              receiver: { user: user.userId },
              campaignId: currentCampaign.current.id,
              nlu,
              sessionId,
              isFirst: data.isFirst,
              messageId: data.msgId,
              usecaseId: currentUsecase.current && currentUsecase.current.id,
            };
            createMessage(joinMsg);
            setIsTopScroll(false);
            setEndScroll(0);
            break;
          }
          case chatTypes.END_SESSION: {
            if (status) {
              enqueueSnackbar(t('endSessionSuccess'), {
                variant: 'success',
              });
            } else {
              enqueueSnackbar(t('endSessionFailure'), {
                variant: 'error',
              });
            }
            break;
          }
          default:
            break;
        }
      };
      rws.current.onclose = () => clearInterval(pingInterval);
    }
  }, [campaign]);

  useEffect(() => {
    if (campaignId) {
      fetchCampaign();
      fetchChatInfo();
    }
  }, [campaignId]);

  useEffect(() => {
    currentCampaign.current = campaign;
  }, [campaign]);

  useEffect(() => {
    currentUsecase.current = usecase;
  }, [usecase]);

  useEffect(() => {
    currentMessageId.current = messageId;
  }, [messageId]);

  useEffect(() => {
    currentMessages.current = messages;
  }, [messages]);

  useEffect(() => {
    return () => rws.current.close();
  }, []);

  const msgContextValue = {
    campaign,
    messages,
    onSetMessages,
    handleSendMessage,
    isTopScroll,
    setIsTopScroll,
    endScroll,
    setEndScroll,
    handleConfirmEndChat,
    campaignId,
    usecaseId: currentUsecase.current && currentUsecase.current.id,
    setIsChangeResult,
  };

  return (
    <ChatbotCollectionStyled>
      <MessageContext.Provider value={msgContextValue}>
        <Grid item xs={12} sm={12} md={6} ld={6} xl={6} className="gridItem">
          <MessageChat />
        </Grid>
        <Grid item xs={12} sm={12} md={6} ld={6} xl={6} className="gridItem">
          <ChatbotInfo
            campaignId={campaignId}
            campaignType={campaign && campaign.campaignType}
            usecase={usecase}
            intents={intents}
            onSetUsecase={onSetUsecase}
            onSetIntents={onSetIntents}
            handleEndChat={handleEndChat}
          />
        </Grid>
      </MessageContext.Provider>
      <ConfirmDialog
        open={isEndChat}
        title={t('confirm')}
        content={t('confirmEndChat')}
        handleClose={() => setIsEndChat(false)}
        handleConfirm={handleEndChat}
      />
    </ChatbotCollectionStyled>
  );
}
