/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import Moment from 'moment';
import { v4 as uuidV4 } from 'uuid';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import Card from '../../../components/Card';
import MessageHeader from './MessageHeader';
import MessageContent from './MessageContent';
import MessageInput from './MessageInput';
import apis from '../../../apis';

const MessageChat = () => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState();
  const [messages, setMessages] = useState({});
  const [totalMessage, setTotalMessage] = useState(0);
  const [isTopScroll, setIsTopScroll] = useState(false);
  const [endScroll, setEndScroll] = useState(0);
  const [scrollBottom, setScrollBottom] = useState(0);
  const [intents, setIntents] = useState([]);
  const [isChangeScroll, setIsChangeScroll] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const limit = 20;
  const currentCampaign = useRef(campaign);

  const onSetMessages = (value) => setMessages(value);

  const fetchMessages = async () => {
    const { data } = await apis.message.getMessages();
    if (data.status) {
      const reverseMessages = data.result.messages.reverse();
      const objectMessages = Object.assign(
        {},
        ...reverseMessages.map((item) => ({ [item.messageId]: item })),
      );
      setMessages(objectMessages);
      setTotalMessage(data.result.metadata.total);
    }
  };

  const fetchIntents = async () => {
    const { data } = await apis.campaign.getIntents(campaignId);
    if (data.status) setIntents(data.result.intents);
  };

  const fetchCampaign = async () => {
    const { data } = await apis.campaign.getCampaign(campaignId);
    if (data.status) setCampaign(data.result);
  };

  const sendMessage = (message) => {
    const msg = {
      appId: currentCampaign.current.appId,
      message: { ...message, msgId: uuidV4() },
    };
    const joinMsg = {
      messageId: msg.message.msgId,
      content: { text: msg.message.text },
      sender: { user: user.ssoUserId },
      campaignId: currentCampaign.id,
      isFirst: false,
    };
    setMessages((prev) => ({ ...prev, [joinMsg.messageId]: joinMsg }));
    setIsTopScroll(false);
    setEndScroll(0);
  };

  const scrollMessage = async (element) => {
    const { scrollHeight, scrollTop, clientHeight } = element;
    if (isChangeScroll) setEndScroll(scrollHeight - scrollTop - clientHeight);
    if (
      scrollTop === 0 &&
      Object.keys(messages).length &&
      Object.keys(messages).length < totalMessage
    ) {
      setIsTopScroll(true);
      setScrollBottom(scrollHeight);
      const { messageId } = Object.keys(messages)[0];
      const { data } = await apis.message.getSkipMessage({
        appId: currentCampaign.current.appId,
        ssoUserId: user.ssoUserId,
        messageId,
        limit,
        campaignId: currentCampaign.current.id,
      });
      if (data.status) {
        const reverseMessages = data.result.messages.reverse();
        const objectMessages = Object.assign(
          {},
          ...reverseMessages.map((item) => ({ [item.messageId]: item })),
          messages,
        );
        setMessages(objectMessages);
      }
    } else {
      setIsTopScroll(false);
    }
  };

  const today = (someDate) => {
    const someday = Moment(someDate);
    const day = Moment();
    if (someday.format('YYYY-MM-DD') === day.format('YYYY-MM-DD')) {
      return {
        time: someday.format('HH:mm'),
        day: someday.format('DD/MM/YY'),
        fullTime: someday.format('DD/MM/YY, HH:mm'),
      };
    }
    return {
      day: someday.format('DD/MM/YY'),
      fullTime: someday.format('DD/MM/YY, HH:mm'),
    };
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (campaignId) {
      fetchCampaign();
      fetchIntents();
    }
  }, []);

  useEffect(() => {
    currentCampaign.current = campaign;
  }, [campaign]);

  return (
    <Card padding={16} margin={0} className="messageChat">
      <MessageHeader campaign={campaign} campaignId={campaignId} />
      <Divider />
      <MessageContent
        messages={messages}
        onSetMessages={onSetMessages}
        user={user}
        isTopScroll={isTopScroll}
        endScroll={endScroll}
        scrollBottom={scrollBottom}
        today={today}
        scrollMessage={scrollMessage}
        sendMessage={sendMessage}
        intents={intents}
        setIsChangeScroll={setIsChangeScroll}
      />
      <MessageInput sendMessage={sendMessage} />
    </Card>
  );
};

export default MessageChat;
