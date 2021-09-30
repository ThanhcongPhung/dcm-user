/* eslint-disable react/no-danger */
import React from 'react';
import { Tooltip, Button } from '@material-ui/core';
import messageTypes from '../../../enums/messageTypes';
import { convertContent } from '../../../utils/convertContent';

export default function MessageItem({
  today,
  message,
  type,
  text,
  elements,
  sendMessage,
}) {
  const handleOption = (value) => sendMessage({ text: value });

  switch (type) {
    case messageTypes.TEXT:
      return (
        <Tooltip
          title={today(message.updatedAt).time || today(message.updatedAt).day}
          placement="right"
        >
          <div
            className={message.sender.user ? 'messageClient' : 'messageServer'}
            dangerouslySetInnerHTML={convertContent(text)}
          />
        </Tooltip>
      );
    case messageTypes.OPTION:
      return (
        <>
          <Tooltip
            title={
              today(message.updatedAt).time || today(message.updatedAt).day
            }
            placement="right"
          >
            <div className="messageServer">
              {elements &&
                elements.map((option) => (
                  <div key={option.value}>
                    {option.label}: {option.value}
                  </div>
                ))}
            </div>
          </Tooltip>
          <div className="buttonContent">
            {elements &&
              elements.map((option) => (
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
}
