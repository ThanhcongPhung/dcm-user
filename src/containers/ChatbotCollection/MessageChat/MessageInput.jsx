import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TextField,
  InputAdornment,
  IconButton,
  Popover,
  Tooltip,
  Icon,
} from '@material-ui/core';
import { EmojiEmotions } from '@material-ui/icons';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { MessageInputStyle } from './index.style';

export default function MessageInput({ sendMessage }) {
  const [text, setText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const { t } = useTranslation();

  const handleSendMessage = async () => {
    if (!text) return;
    sendMessage({ text });
    setText('');
  };

  const handleKeyPress = (e) => {
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const emojiMart = (
    <Picker
      title={t('pickEmoji')}
      emoji="point_up"
      color="#000034"
      onSelect={(emoji) => setText(text + emoji.native)}
    />
  );

  return (
    <MessageInputStyle>
      <TextField
        multiline
        rowsMax={2}
        variant="outlined"
        className="textInput"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <EmojiEmotions color="primary" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {emojiMart}
      </Popover>
      <div className="iconWrap">
        <Tooltip title={t('sendMessage')} placement="top">
          <Icon className="icon" color="primary" onClick={handleSendMessage}>
            send
          </Icon>
        </Tooltip>
      </div>
    </MessageInputStyle>
  );
}
