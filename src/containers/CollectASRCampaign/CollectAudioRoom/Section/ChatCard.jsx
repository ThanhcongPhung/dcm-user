import React, { useRef, useState } from 'react';
import { IconButton, TextField } from '@material-ui/core';
import {
  Close,
  PlayArrow,
  Send,
  Stop,
  ThumbDown,
  ThumbUp,
} from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import api from '../../../../apis';

export default function ChatCard(props) {
  const { setListAudio, username, socket, audioIndex, chatroomID, listAudio } =
    props;
  const { sender, audioLink, transcript, audioID, userID, isLike } =
    listAudio[audioIndex];
  let isSentByCurrentUser = false;
  const [edit, setEdit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expenseTranscript, setExpenseTranscript] = useState(transcript);
  const textInput = useRef();
  const audioRef = useRef(null);

  const { t } = useTranslation();

  const editText = () => setEdit(true);

  if (sender === username) isSentByCurrentUser = true;

  const toggleIsPlaying = () => {
    const { current: audio } = audioRef;
    const status = !isPlaying;
    if (status) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(status);
  };

  const updateTranscript = async () => {
    const { value } = textInput.current;
    setExpenseTranscript(value);
    textInput.current.defaultValue = value;
    const body = { userID, audioID, transcript: value, isValid: false };
    const { data } = await api.collectASR.updateTranscript(body);
    if (data.status) {
      // setEdit(false);
      // const audioArray = [...listAudio];
      // audioArray.splice(audioIndex, 1, {
      //   userID,
      //   sender,
      //   audioLink,
      //   transcript: res.data.audioUpdated.transcript,
      //   audioID,
      // });
      // const newTranscript = res.data.audioUpdated.transcript;
      // setListAudio(audioArray);
      // if (socket) {
      //   socket.emit('update transcript', {
      //     chatroomID,
      //     sender,
      //     newTranscript,
      //     audioIndex,
      //   });
      // }
    }
  };

  const updateLikeState = async () => {
    const body = {
      userID,
      audioID,
      isLike: true,
      upVoteTime: new Date(),
      transcript: expenseTranscript,
    };
    const { data } = await api.collectASR.updateUserLike(body);
    if (data.status) {
      // setEdit(false);
      // const audioArray = [...listAudio];
      // audioArray.splice(audioIndex, 1, {
      //   userID,
      //   sender,
      //   audioLink,
      //   isLike,
      //   audioID,
      // });
      // const newIsLikeState = res.data.audioUpdated.isLike;
      // setListAudio(audioArray);
      // if (socket) {
      //   socket.emit('update like state', {
      //     chatroomID,
      //     sender,
      //     newIsLikeState,
      //     audioIndex,
      //   });
      // }
    }
  };
  const renderEditView = () => {
    return (
      <div className="edit-text">
        <TextField
          id="full-width-text-field"
          className="textFieldStyle"
          type="text"
          inputRef={textInput}
          multiline
          rows={3}
          fullWidth
          label={t('content')}
          defaultValue={expenseTranscript}
          variant="outlined"
        />
        <div className="double-button">
          <IconButton
            onClick={() => setEdit(false)}
            type="button"
            className="cancel"
          >
            <Close />
          </IconButton>
          <IconButton
            onClick={() => updateTranscript()}
            type="button"
            className="send"
          >
            <Send />
          </IconButton>
        </div>
      </div>
    );
  };
  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd" id="a">
      <div className="check-button1" id="b">
        <IconButton onClick={toggleIsPlaying}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio
            id="ad"
            preload="auto"
            onEnded={toggleIsPlaying}
            ref={audioRef}
          >
            <source src={audioLink} type="audio/wav" />
          </audio>
          {isPlaying ? (
            <Stop fontSize="small" />
          ) : (
            <PlayArrow fontSize="small" />
          )}
        </IconButton>
        <IconButton onClick={() => updateLikeState()}>
          {!isLike ? (
            <ThumbUp className="iconFontSize" color="disabled" />
          ) : (
            <ThumbUp className="iconFontSize" color="primary" />
          )}
        </IconButton>
        <IconButton onClick={editText}>
          <ThumbDown className="iconFontSize" color="disabled" />
        </IconButton>
      </div>
      <div className="audio-text">
        <div className="message-area">
          <div className="text-username">
            <div className="text-checkButton1">
              <div className="messageBox backgroundLight">
                {edit ? (
                  renderEditView()
                ) : (
                  <span className="messageText colorWhite">
                    {expenseTranscript === '' ? '...' : expenseTranscript}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart" id="c">
      <div className="message-area">
        <div className="text-username">
          <span className="useName">{sender}</span>
          <div className="audio-text">
            <div className="text-checkButton">
              <div className="messageBox backgroundBlue">
                {edit ? (
                  renderEditView()
                ) : (
                  <span className="messageText colorWhite">
                    {expenseTranscript === '' ? '...' : expenseTranscript}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="check-button" id="d">
          <IconButton onClick={() => updateLikeState()}>
            {!isLike ? (
              <ThumbUp className="iconFontSize" color="disabled" />
            ) : (
              <ThumbUp className="iconFontSize" color="primary" />
            )}
          </IconButton>
          <IconButton onClick={editText}>
            <ThumbDown color="disabled" className="iconFontSize" />
          </IconButton>
          <IconButton onClick={toggleIsPlaying}>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio
              id="ad"
              preload="auto"
              onEnded={toggleIsPlaying}
              ref={audioRef}
            >
              <source src={audioLink} type="audio/wav" />
            </audio>
            {isPlaying ? (
              <Stop fontSize="small" />
            ) : (
              <PlayArrow fontSize="small" />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );
}
