/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  List,
  ListItem,
} from '@material-ui/core';
import api from '../../apis';
import messageTypes from '../../enums/messageTypes';
import CustomAvatar from '../../components/Avatar';
import { convertContent } from '../../utils/convertContent';
import { DetailUsersayStyled } from './index.style';

export default function DetailUsersayDialog({
  open,
  chooseUsersayId,
  handleClose,
  campaignId,
  senderId,
}) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [standardMessages, setStandardMessages] = useState([]);

  const fetchRelationMessages = async () => {
    const { data } = await api.message.getRelationMessages({
      campaignId,
      msgId: chooseUsersayId,
      userId: senderId,
    });
    if (data.status) setMessages(data.result.messages);
  };

  useEffect(() => {
    if (chooseUsersayId && campaignId && senderId)
      fetchRelationMessages({
        campaignId,
        msgId: chooseUsersayId,
        userId: senderId,
      });
  }, [chooseUsersayId, campaignId, senderId]);

  useEffect(() => {
    if (messages.length) {
      setStandardMessages(
        messages.map((message) => {
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

  const MessageItem = ({ message, type, text, elements }) => {
    switch (type) {
      case messageTypes.TEXT:
        return (
          <div
            className={
              message.sender.user ? ' messageItem messageClient' : 'messageItem'
            }
            dangerouslySetInnerHTML={convertContent(text)}
          />
        );
      case messageTypes.OPTION:
        return (
          <div className="messageItem">
            {elements &&
              elements.map((option) => (
                <div key={option.value}>
                  {option.label}: {option.value}
                </div>
              ))}
          </div>
        );
      default:
        return '';
    }
  };

  const ListItemCustom = ({ message, messageType, text, elements }) => {
    return (
      <ListItem>
        {message.sender.user ? (
          <CustomAvatar name="N" number="1" />
        ) : (
          <CustomAvatar avatar="/images/chatbot.jpg" />
        )}
        <MessageItem
          message={message}
          type={messageType}
          text={text}
          elements={elements}
        />
      </ListItem>
    );
  };

  const getMessageText = (message, index) => (
    <ListItemCustom
      message={message}
      messageType={messageTypes.TEXT}
      text={message.content && message.content.text}
      key={index}
    />
  );

  const getMessageAttachmentByType = ({ attachment, message, index }) => {
    const {
      type,
      payload: { elements },
    } = attachment;

    switch (type) {
      case messageTypes.OPTION:
        return (
          <ListItemCustom
            key={index}
            message={message}
            messageType={messageTypes.OPTION}
            elements={elements}
          />
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
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DetailUsersayStyled>
        <DialogTitle>{t('detailUsersay')}</DialogTitle>
        <DialogContent>
          <List className="list">
            {standardMessages.map((message, index) =>
              getMessage(message, index),
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('close')}</Button>
        </DialogActions>
      </DetailUsersayStyled>
    </Dialog>
  );
}
