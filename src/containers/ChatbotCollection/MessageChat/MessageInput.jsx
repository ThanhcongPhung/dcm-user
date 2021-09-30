import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Tooltip, Icon, IconButton } from '@material-ui/core';
import { MessageInputStyle } from './index.style';

export default function MessageInput({ sendMessage }) {
  const [text, setText] = useState('');

  const { t } = useTranslation();

  const handleSendMessage = async () => {
    if (!text.trim()) return;
    sendMessage({ text });
    setText('');
  };

  const handleKeyPress = (e) => {
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <MessageInputStyle>
      <div className="inputWrapper">
        <TextField
          multiline
          fullWidth
          maxRows={3}
          className="textInput"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
      <Tooltip title={t('sendMessage')} placement="bottom">
        <IconButton className="iconWrap" onClick={handleSendMessage}>
          <Icon className="icon" color="primary">
            send
          </Icon>
        </IconButton>
      </Tooltip>
    </MessageInputStyle>
  );
}
