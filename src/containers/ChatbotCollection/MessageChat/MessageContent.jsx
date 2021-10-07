/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/no-danger */
import React, { useState, useEffect, useContext } from 'react';
import {
  List,
  ListItemText,
  Tooltip,
  Typography,
  Icon,
  ListItemAvatar,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CustomAvatar from '../../../components/Avatar';
import ListItemCustom from './ListItem';
import messageTypes from '../../../enums/messageTypes';
import { MessageContentStyle } from './index.style';
import EditIntentDialog from './EditIntentDialog';
import MessageItem from './MessageItem';
import api from '../../../apis';
import { MessageContext } from '../index';

export default function MessageContent({
  intents,
  scrollMessage,
  scrollBottom,
  setIsChangeScroll,
}) {
  const [standardMessages, setStandardMessages] = useState([]);
  const { messages, onSetMessages, handleSendMessage, isTopScroll, endScroll } =
    useContext(MessageContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (Object.values(messages).length) {
      setStandardMessages(
        Object.values(messages).map((message) => {
          const hasNotPayload =
            message.content &&
            message.content.attachment &&
            !message.content.attachment.payload;
          if (hasNotPayload)
            return {
              ...message,
              content: {
                ...message.content,
                attachment: { ...message.content.attachment, payload: {} },
              },
            };
          return message;
        }),
      );
    }
  }, [messages]);

  useEffect(() => {
    const objDiv = document.getElementById('messageList');
    if (endScroll <= 0) objDiv.scrollTop = objDiv.scrollHeight;
    if (isTopScroll) objDiv.scrollTop = objDiv.scrollHeight - scrollBottom;
  });

  const handleShowEditMessage = (messageId) => {
    if (messages[messageId]) {
      setIsChangeScroll(false);
      const tempMessages = messages;
      tempMessages[messageId].isShowEdit = true;
      onSetMessages({ ...tempMessages });
    }
  };

  const handleCloseEditMessage = (messageId) => {
    if (messages[messageId]) {
      setIsChangeScroll(true);
      const tempMessages = messages;
      tempMessages[messageId].isShowEdit = false;
      onSetMessages({ ...tempMessages });
    }
  };

  const onHandleEditMessage = async (messageId, userSay, intentName) => {
    if (messages[messageId]) {
      setIsChangeScroll(true);
      const tempMessages = messages;
      tempMessages[messageId].nlu = {
        ...tempMessages[messageId].nlu,
        name: intentName,
      };
      tempMessages[messageId].content = { text: userSay };

      tempMessages[messageId].isShowEdit = false;
      await api.message.updateMessage({
        messageId,
        content: { text: userSay },
        nlu: { name: intentName },
      });
      onSetMessages({ ...tempMessages });
    }
  };

  const getIntentDisplayName = (intentName) => {
    if (!intentName) return null;
    const intent = intents.find((intentItem) => intentItem.name === intentName);
    return intent ? intent.displayName : null;
  };

  const ListItemUser = ({ message, messageType, text, url }) => (
    <>
      <ListItemAvatar className="avatarWrapper client">
        <div className="listItemContent">
          <div className="responseContent">
            <Tooltip title={t('editInfo')} placement="top">
              <Icon
                className="icon"
                color="primary"
                onClick={() => handleShowEditMessage(message.id)}
              >
                edit
              </Icon>
            </Tooltip>
          </div>
          <ListItemText
            primary={
              <MessageItem
                message={message}
                type={messageType}
                text={text}
                url={url}
                sendMessage={handleSendMessage}
              />
            }
          />
        </div>
      </ListItemAvatar>
      <div className="intent">
        <Typography
          className="infoIntent"
          variant="caption"
          display="block"
          gutterBottom
        >
          {`${t('intent')}: `}
          {(message.nlu &&
            message.nlu.name &&
            getIntentDisplayName(message.nlu.name)) ||
            t('noData')}
        </Typography>
      </div>
      <EditIntentDialog
        open={!!message.isShowEdit}
        messageId={message.id}
        intentName={message.nlu && message.nlu.name}
        handleClose={handleCloseEditMessage}
        onHandleEdit={onHandleEditMessage}
        text={text}
        intents={intents}
      />
    </>
  );

  const ListItemBot = ({ message, messageType, text, elements }) => {
    return (
      <ListItemAvatar className="avatarWrapper bot">
        <>
          <CustomAvatar avatar="/images/chatbot.jpg" />
          <div className="listItemContent">
            <ListItemText
              primary={
                <MessageItem
                  message={message}
                  type={messageType}
                  text={text}
                  elements={elements}
                  sendMessage={handleSendMessage}
                />
              }
            />
          </div>
        </>
      </ListItemAvatar>
    );
  };

  const getMessageText = (message, index) => (
    <ListItemCustom key={index} message={message}>
      {message.sender.user ? (
        <ListItemUser
          message={message}
          messageType={messageTypes.TEXT}
          text={message.content && message.content.text}
        />
      ) : (
        <ListItemBot
          message={message}
          messageType={messageTypes.TEXT}
          text={message.content && message.content.text}
        />
      )}
    </ListItemCustom>
  );

  const getMessageAttachmentByType = ({ attachment, message, index }) => {
    const {
      type,
      payload: { url, elements },
    } = attachment;

    switch (type) {
      case messageTypes.OPTION:
        return (
          <ListItemCustom key={index} message={message}>
            {message.sender.user ? (
              <ListItemUser
                message={message}
                messageType={messageTypes.OPTION}
                url={url}
              />
            ) : (
              <ListItemBot
                message={message}
                messageType={messageTypes.OPTION}
                elements={elements}
              />
            )}
          </ListItemCustom>
        );
      default:
        return '';
    }
  };

  const getMessage = (message, index) => {
    if (message.content) {
      const { text, attachment, attachments } = message.content;
      if (text && !attachment && !attachments)
        return getMessageText(message, index);
      if (attachment)
        return getMessageAttachmentByType({ attachment, message, text, index });
      if (attachments) {
        // eslint-disable-next-line no-restricted-syntax
        for (const attach of attachments) {
          return getMessageAttachmentByType({
            attachment: attach,
            message,
            text,
            index,
          });
        }
      }
    }
    return '';
  };

  return (
    <MessageContentStyle
      onScroll={(e) => scrollMessage(e.target)}
      id="messageList"
    >
      <List className="list">
        {standardMessages.map((message, index) => getMessage(message, index))}
      </List>
    </MessageContentStyle>
  );
}
