import React, { useEffect, useState } from 'react';
import RecorderJS from 'recorder-js';
import Button from '@material-ui/core/Button';
import { Mic, Stop } from '@material-ui/icons';
import { getAudioStream, exportBuffer } from './Audio';

export default function Recorder(props) {
  const {
    roomID,
    socket,
    username,
    setIsRecording,
    setBlob,
    setAudio,
    disabled,
    isRecording,
  } = props;
  const [stream, setStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [originalSampleRate, setOriginalSampleRate] = useState(44100);

  useEffect(() => {
    (async () => {
      let stream;
      try {
        stream = await getAudioStream();
      } catch (error) {
        console.log(error);
      }
      setStream(stream);
    })();
  }, []);

  const startRecord = () => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    setOriginalSampleRate(audioContext.sampleRate);
    const recorderObj = new RecorderJS(audioContext);
    recorderObj.init(stream);
    setIsRecording(true);
    setRecorder(recorderObj);
    recorderObj.start();
    if (socket) {
      socket.emit('Recording', { roomID, username });
    }
  };

  const stopRecord = async () => {
    const { buffer } = await recorder.stop();
    const blob = exportBuffer(buffer[0], originalSampleRate);
    const blobURL = window.URL.createObjectURL(blob);
    setIsRecording(false);
    setBlob(blob);
    setAudio(blobURL);
    if (socket) {
      socket.emit('Done Recording', { roomID, username });
    }
  };

  return (
    <div className="button-listen">
      <div className="primary-button">
        <Button
          className="record"
          type="button"
          disabled={disabled}
          onClick={() => {
            isRecording ? stopRecord() : startRecord();
          }}
        >
          {isRecording ? <Stop /> : <Mic />}
        </Button>
        <div className="primary-button background" />
      </div>
    </div>
  );
}
