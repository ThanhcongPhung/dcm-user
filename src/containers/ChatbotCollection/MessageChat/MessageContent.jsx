/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import sanitizeHtml from 'sanitize-html';
import {
  List,
  ListItemText,
  Tooltip,
  Typography,
  Icon,
  ListItemAvatar,
  Button,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CustomAvatar from '../../../components/Avatar';
import ListItemCustom from './ListItem';
import messageTypes from '../../../enums/messageTypes';
import { MessageContentStyle } from './index.style';
import CommentDialog from './CommentDialog';

export default function MessageContent({
  messages,
  onSetMessages,
  sendMessage,
  user,
  today,
  scrollMessage,
  endScroll,
  isTopScroll,
  scrollBottom,
}) {
  const [standardMessages, setStandardMessages] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (messages.length) {
      console.log('change');
      setStandardMessages(
        messages.map((message) => {
          if (
            message.content &&
            message.content.attachment &&
            !message.content.attachment.payload
          )
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

  const handleChangeConfirm = (message) => {
    const index = messages.findIndex((item) => item.id === message.id);
    if (index >= 0) {
      const tempMessages = messages;
      tempMessages[index].isConfirm = !messages[index].isConfirm;
      onSetMessages([...tempMessages]);
    }
  };

  const handleShowComment = (message) => {
    const index = messages.findIndex((item) => item.id === message.id);
    if (index >= 0) {
      const tempMessages = messages;
      tempMessages[index].isShowComment = !messages[index].isShowComment;
      onSetMessages([...tempMessages]);
    }
  };

  const handleCloseComment = (messageId) => {
    const index = messages.findIndex((item) => item.id === messageId);
    if (index >= 0) {
      const tempMessages = messages;
      tempMessages[index].isShowComment = false;
      onSetMessages([...tempMessages]);
    }
  };
  const onHandleComment = (comment, messageId) => {
    const index = messages.findIndex((item) => item.id === messageId);
    if (index >= 0) {
      const tempMessages = messages;
      tempMessages[index].textComment = comment;
      tempMessages[index].isShowComment = false;
      onSetMessages([...tempMessages]);
    }
  };

  const convertMessage = (value) => ({
    __html: sanitizeHtml(
      value.replace(
        /(\b(https?|):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi,
        "<a href='$1' style='color: #0000FF' target='_blank'>$1</a>",
      ),
    ),
  });

  const handleOption = (value) => sendMessage({ text: value });

  const getMessageItem = ({
    message,
    type,
    text,
    elements,
    personalizeText,
  }) => {
    switch (type) {
      case messageTypes.TEXT:
        return (
          <Tooltip
            title={
              today(message.updatedAt).time || today(message.updatedAt).day
            }
            placement="left"
          >
            {message.sender.user ? (
              <div
                className="messageClient"
                dangerouslySetInnerHTML={text && convertMessage(text)}
              />
            ) : (
              <div
                className="messageServer"
                dangerouslySetInnerHTML={text && convertMessage(text)}
              />
            )}
          </Tooltip>
        );
      case messageTypes.PERSONALIZE_TEXT:
        return (
          <Tooltip
            title={
              today(message.updatedAt).time || today(message.updatedAt).day
            }
            placement="left"
          >
            {message.sender.user ? (
              <div
                className="messageClient"
                dangerouslySetInnerHTML={convertMessage(personalizeText)}
              />
            ) : (
              <div
                className="messageServer"
                dangerouslySetInnerHTML={convertMessage(personalizeText)}
              />
            )}
          </Tooltip>
        );
      case messageTypes.OPTION:
        return (
          <>
            <Tooltip
              title={
                today(message.updatedAt).time || today(message.updatedAt).day
              }
              placement="left"
            >
              <div className="messageServer">
                {elements.map((option) => (
                  <div key={option.value}>
                    {option.label}: {option.value}
                  </div>
                ))}
              </div>
            </Tooltip>
            <div className="buttonContent">
              {elements.map((option) => (
                <Button
                  className="option"
                  key={option.value}
                  onClick={() => handleOption(option.value)}
                  color="primary"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </>
        );
      default:
        return '';
    }
  };

  const ListItemUser = ({
    message,
    messageType,
    text,
    personalizeText,
    url,
  }) => (
    <ListItemAvatar className="avatarWrapper client">
      <div className="listItemContent">
        <ListItemText
          primary={getMessageItem({
            message,
            type: messageType,
            text,
            personalizeText,
            url,
          })}
        />
      </div>
      <CustomAvatar
        avatar={user.avatar}
        name={user.name}
        number={Moment(user.createdAt).valueOf()}
      />
    </ListItemAvatar>
  );

  const ListItemBot = ({
    message,
    messageType,
    text,
    personalizeText,
    elements,
  }) => {
    return (
      <>
        <ListItemAvatar className="avatarWrapper bot">
          <CustomAvatar
            avatar={`${process.env.PUBLIC_URL}/images/chatbot-icon.svg`}
            number={Moment(user.createdAt).valueOf()}
          />
          <div className="listItemContent">
            <ListItemText
              primary={getMessageItem({
                message,
                type: messageType,
                text,
                personalizeText,
                elements,
              })}
            />
            <div className="responseContent">
              <div
                className="heartContainer"
                onClick={() => handleChangeConfirm(message)}
              >
                {message.isConfirm ? (
                  <Tooltip title={t('answerConfirm')} placement="top">
                    <Icon className="icon" color="error">
                      favorite
                    </Icon>
                  </Tooltip>
                ) : (
                  <Tooltip title={t('dropHeartConfirm')} placement="top">
                    <Icon className="icon" color="primary">
                      favorite_border
                    </Icon>
                  </Tooltip>
                )}
              </div>
              <Tooltip title={t('comment')} placement="top">
                <Icon
                  className="icon"
                  color="primary"
                  onClick={() => handleShowComment(message)}
                >
                  rate_review
                </Icon>
              </Tooltip>
            </div>
          </div>
        </ListItemAvatar>
        {message.textComment && !message.isShowComment && (
          <div className="comment">
            <Typography
              className="text-comment"
              variant="caption"
              display="block"
              gutterBottom
            >
              {message.textComment}
            </Typography>
          </div>
        )}
        <CommentDialog
          open={message.isShowComment}
          messageId={message.id}
          handleClose={handleCloseComment}
          onHandleComment={onHandleComment}
          elements={elements}
          personalizeText={personalizeText}
          text={text}
          valueComment={message.textComment}
        />
      </>
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
      payload: { url, elements, content: personalizeText },
    } = attachment;

    switch (type) {
      case messageTypes.PERSONALIZE_TEXT:
        return (
          <ListItemCustom key={index} message={message}>
            {message.sender.user ? (
              <ListItemUser
                message={message}
                messageType={messageTypes.PERSONALIZE_TEXT}
                personalizeText={personalizeText}
              />
            ) : (
              <ListItemBot
                message={message}
                messageType={messageTypes.PERSONALIZE_TEXT}
                personalizeText={personalizeText}
              />
            )}
          </ListItemCustom>
        );
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
    }
    return '';
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
    <MessageContentStyle>
      <div
        className="wrapper"
        id="messageList"
        onScroll={(e) => scrollMessage(e.target)}
      >
        <List className="list">
          {standardMessages.map((message, index) => getMessage(message, index))}
        </List>
      </div>
    </MessageContentStyle>
  );
}
