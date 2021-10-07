/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Divider } from '@material-ui/core';
import Card from '../../../components/Card';
import MessageHeader from './MessageHeader';
import MessageContent from './MessageContent';
import MessageInput from './MessageInput';
import { MessageContext } from '../index';
import apis from '../../../apis';

const MessageChat = () => {
  const [totalMessage, setTotalMessage] = useState(0);
  const [scrollBottom, setScrollBottom] = useState(0);
  const [intents, setIntents] = useState([]);
  const [isChangeScroll, setIsChangeScroll] = useState(true);
  const { userId } = useSelector((state) => state.auth.user);

  const {
    campaign,
    handleSendMessage,
    messages,
    onSetMessages,
    setIsTopScroll,
    setEndScroll,
    handleEndChat,
  } = useContext(MessageContext);
  const limit = 20;

  const fetchMessages = async () => {
    const { data } = await apis.message.getMessages({
      campaignId: campaign.id,
      userId,
    });
    if (data.status) {
      const messageList = data.result.messages;
      const objectMessages = Object.assign(
        {},
        ...messageList.map((msg) => ({ [msg.id]: msg })),
      );
      onSetMessages(objectMessages);
      setTotalMessage(data.result.metadata.total);
    }
  };

  const fetchIntents = async () => {
    const { data } = await apis.campaign.getIntents(campaign.id);
    if (data.status) setIntents(data.result.intents);
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
      const { id: messageId } = Object.keys(messages)[0];
      const { data } = await apis.message.getSkipMessage({
        userId,
        messageId,
        limit,
        campaignId: campaign.id,
      });
      if (data.status) {
        const reverseMessages = data.result.messages.reverse();
        const objectMessages = Object.assign(
          {},
          ...reverseMessages.map((item) => ({ [item.id]: item })),
          messages,
        );
        onSetMessages(objectMessages);
      }
    } else {
      setIsTopScroll(false);
    }
  };

  useEffect(() => {
    if (campaign && campaign.id) {
      fetchIntents();
      fetchMessages();
    }
  }, [campaign]);

  return (
    <Card padding={16} margin={0} className="messageChat">
      <MessageHeader
        campaign={campaign}
        campaignId={campaign && campaign.id}
        handleEndChat={handleEndChat}
      />
      <Divider />
      <MessageContent
        scrollBottom={scrollBottom}
        scrollMessage={scrollMessage}
        intents={intents}
        setIsChangeScroll={setIsChangeScroll}
      />
      <MessageInput sendMessage={handleSendMessage} />
    </Card>
  );
};

export default MessageChat;
