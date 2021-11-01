/* eslint-disable react/no-danger */
import { List, ListItemAvatar, ListItemText, Tooltip } from '@material-ui/core';
import React from 'react';
import { MESSAGE_TYPES } from '../../../../constants';
import { convertContent } from '../../../../utils/convertContent';
import { MessageContentStyle } from './index.style';
import ListItemCustom from './ListItem';

export default function MessageContent({ messages, role }) {
  const getMessageItem = ({ message, type, text }) => {
    switch (type) {
      case MESSAGE_TYPES.TEXT:
        return (
          <Tooltip
            title={message.intent && message.intent.name}
            placement={message.sender.role === role ? 'left' : 'right'}
          >
            <div
              className={
                message.sender.role === role ? 'messageClient' : 'messageServer'
              }
              dangerouslySetInnerHTML={text && convertContent(text)}
            />
          </Tooltip>
        );
      default:
        return '';
    }
  };

  const ListItemUser = ({ message, messageType, text }) => {
    return (
      <ListItemAvatar className="avatarWrapper client">
        <div className="listItemContent">
          <ListItemText
            primary={getMessageItem({
              message,
              type: messageType,
              text,
            })}
          />
        </div>
      </ListItemAvatar>
    );
  };

  const ListItemBot = ({ message, messageType, text }) => {
    return (
      <ListItemAvatar className="avatarWrapper bot">
        <div className="listItemContent">
          <ListItemText
            primary={getMessageItem({
              message,
              type: messageType,
              text,
            })}
          />
        </div>
      </ListItemAvatar>
    );
  };

  const getMessageText = (message, index) => (
    <ListItemCustom key={index} message={message}>
      {message.sender.role === role ? (
        <ListItemUser
          message={message}
          messageType={MESSAGE_TYPES.TEXT}
          text={message.content && message.content.text}
        />
      ) : (
        <ListItemBot
          message={message}
          messageType={MESSAGE_TYPES.TEXT}
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
      case MESSAGE_TYPES.PERSONALIZE_TEXT:
        return (
          <ListItemCustom key={index} message={message}>
            {message.sender.user ? (
              <ListItemUser
                message={message}
                messageType={MESSAGE_TYPES.PERSONALIZE_TEXT}
                personalizeText={personalizeText}
              />
            ) : (
              <ListItemBot
                message={message}
                messageType={MESSAGE_TYPES.PERSONALIZE_TEXT}
                personalizeText={personalizeText}
              />
            )}
          </ListItemCustom>
        );
      case MESSAGE_TYPES.OPTION:
        return (
          <ListItemCustom key={index} message={message}>
            {message.sender.user ? (
              <ListItemUser
                message={message}
                messageType={MESSAGE_TYPES.OPTION}
                url={url}
              />
            ) : (
              <ListItemBot
                message={message}
                messageType={MESSAGE_TYPES.OPTION}
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
      <div className="wrapper" id="messageList">
        <List className="list">
          {messages.map((message, index) => getMessage(message, index))}
        </List>
      </div>
    </MessageContentStyle>
  );
}
