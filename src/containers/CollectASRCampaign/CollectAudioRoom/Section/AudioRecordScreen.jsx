import React, { useEffect, useRef, useState } from 'react';
import { Button, Grid, Tooltip } from '@material-ui/core';
import { PlayArrow, Refresh, Stop } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import Wave from './Wave';
import Recorder from './Speaker/Recorder';

export default function AudioRecordScreen(props) {
  const { socket, canvasRef, chatroomID, username } = props;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [blob, setBlob] = useState(null);
  const [audioLink, setAudioLink] = useState('');
  const [duration, setDuration] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [value, setValue] = useState('');

  const { t } = useTranslation();

  useEffect(() => {
    const canvasObj = canvasRef.current;
    const wave = new Wave(canvasObj);
    wave.idle();
    if (wave) {
      // eslint-disable-next-line no-unused-expressions
      isRecording ? wave.play() : wave.idle();
    }
    return () => {
      if (wave) {
        wave.idle();
      }
    };
  });

  useEffect(() => {
    const { current: audioObj } = audioRef;
    if (audioObj !== null) {
      audioObj.onloadedmetadata = () => {
        setDuration(audioObj.duration.toFixed(0));
      };
    }
  });

  const toggleIsPlaying = () => {
    const { current: audioObj } = audioRef;
    const status = !isPlaying;
    if (status) {
      audioObj.play();
    } else {
      audioObj.pause();
      audioObj.currentTime = 0;
    }
    setIsPlaying(status);
  };

  const onRerecord = () => {
    setAudio(null);
    setValue(null);
    setDisabled(false);
    if (socket) {
      socket.emit('Re record', { chatroomID, username });
    }
  };

  const renderAudio = (linkAudio) => {
    if (linkAudio !== null) {
      return (
        <div className="pill">
          <div className="pill done">
            <div className="pill done contents">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <audio preload="auto" onEnded={toggleIsPlaying} ref={audioRef}>
                <source src={linkAudio} type="audio/wav" />
              </audio>
              <Tooltip arrow title={t('listenAudioAgain')}>
                <Button
                  className="play"
                  type="button"
                  onClick={toggleIsPlaying}
                >
                  {isPlaying ? <Stop /> : <PlayArrow />}
                </Button>
              </Tooltip>
              {isPlaying ? (
                <div className="placeholder" />
              ) : (
                <>
                  <Tooltip arrow title={t('reRecord')}>
                    <Button
                      className="redo"
                      type="button"
                      onClick={onRerecord}
                      disabled={disabled}
                    >
                      <Refresh />
                    </Button>
                  </Tooltip>
                </>
              )}
            </div>
          </div>
        </div>
      );
    }
    return '';
  };

  return (
    <div>
      <Grid container justify="center" className="gridStyleLeft">
        <div className="button-listen">
          <div className="primary-buttons">
            <canvas className="primary-buttons canvas" ref={canvasRef} />
            {renderAudio(audio)}
            <Recorder
              isRecording={isRecording}
              setAudio={setAudio}
              setBlob={setBlob}
              setIsRecording={setIsRecording}
              socket={socket}
              roomID={chatroomID}
              username={username}
              disabled={disabled}
              setDisable={setDisabled}
            />
          </div>
        </div>
      </Grid>
    </div>
  );
}
