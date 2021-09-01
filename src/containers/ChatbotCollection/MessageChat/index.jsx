/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import Moment from 'moment';
import { v4 as uuidV4 } from 'uuid';
import { useSelector } from 'react-redux';
import { Card, Divider } from '@material-ui/core';
import MessageHeader from './MessageHeader';
import MessageContent from './MessageContent';
import MessageInput from './MessageInput';
import apis from '../../../apis';

const MessageChat = ({ campaign }) => {
  const [messages, setMessages] = useState([]);
  const [totalMessage, setTotalMessage] = useState(0);
  const [isTopScroll, setIsTopScroll] = useState(false);
  const [endScroll, setEndScroll] = useState(0);
  const [scrollBottom, setScrollBottom] = useState(0);
  const { user } = useSelector((state) => state.auth);

  const limit = 20;
  const currentCampaign = useRef(campaign);

  const onSetMessages = (value) => setMessages(value);

  const fetchMessages = async () => {
    const { data } = await apis.message.getMessages();
    if (data.status) {
      setMessages(data.result.messages.reverse());
      setTotalMessage(data.result.metadata.total);
    }
  };

  const sendMessage = (message) => {
    const msg = {
      appId: currentCampaign.current.appId,
      message: {
        ...message,
        msgId: uuidV4(),
      },
    };
    const joinMsg = {
      id: msg.message.msgId,
      content: { text: msg.message.text },
      sender: { user: user.ssoUserId },
      campaignId: currentCampaign.id,
      isFirst: false,
    };
    setMessages((prev) => [...prev, joinMsg]);
    setIsTopScroll(false);
    setEndScroll(0);
  };

  const scrollMessage = async (element) => {
    const { scrollHeight, scrollTop, clientHeight } = element;
    setEndScroll(scrollHeight - scrollTop - clientHeight);

    if (scrollTop === 0 && messages.length && messages.length < totalMessage) {
      setIsTopScroll(true);
      setScrollBottom(scrollHeight);
      const messageId = messages[0].id;
      const { data } = await apis.message.getSkipMessage({
        appId: currentCampaign.current.appId,
        ssoUserId: user.ssoUserId,
        messageId,
        limit,
        campaignId: currentCampaign.current.id,
      });
      if (data.status)
        setMessages(data.result.messages.reverse().concat(messages));
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
    currentCampaign.current = campaign;
  }, [campaign]);

  return (
    <Card padding={16} margin={0} className="message-chat box-shadow-standard">
      <MessageHeader campaign={campaign} />
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
      />
      <MessageInput sendMessage={sendMessage} />
    </Card>
  );
};

export default MessageChat;
