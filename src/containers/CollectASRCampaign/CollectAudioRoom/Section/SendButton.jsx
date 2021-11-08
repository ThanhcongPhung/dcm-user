import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import apis from '../../../../apis';
import Loading from './Loading';
import Popup from '../../../../components/PopupForm';
import TranscriptConfirm from './TrancsriptConfirm';

export default function SendButton(props) {
  const {
    socket,
    blob,
    audio,
    userID,
    roomID,
    audioName,
    audioLink,
    username,
    audioDuration,
    disabled,
    setDisable,
    sendAudioSignal,
  } = props;
  const [openPopup, setOpenPopup] = useState(false);
  const [audioForEdit, setAudioForEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const uploadAudio = async () => {
    if (disabled) return;
    setDisable(true);
    if (socket) socket.emit('Get transcript', { roomID, username });
    setLoading(true);
    const file = new File([blob], `test.wav`, { type: 'audio/wav' });
    const destination = `asr/dev/${roomID}`;
    const formData = new FormData();
    formData.append('destination', destination);
    // formData.append('name', audioName.split('.')[0]);
    formData.append('name', 'test');
    formData.append('file', file);
    const { data } = await apis.collectASR.uploadFile(formData);
    if (data.status) {
      const { link } = data.result;
      const dataResult = await apis.collectASR.getTranscript(link);
      if (dataResult.data.status) {
        const transcript = dataResult.data.result;
        setAudioForEdit({
          botTranscript: transcript,
          manualTranscript: transcript,
          audioLink: link,
        });
        setOpenPopup(true);
        setLoading(false);
      }
    }
  };

  const onSubmitScript = async (audioInfo, resetForm) => {
    const matches = username.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu);
    const speakerId = matches.join('') + userID;
    const audioBody = {
      userID,
      roomID,
      username,
      duration: audioDuration,
      audio_link: audioInfo.audioLink,
      manualTranscript: audioInfo.manualTranscript,
      botTranscript: audioInfo.botTranscript,
      speakerId,
    };
    const { data } = await apis.collectASR.createAudio(audioBody);
    if (data.status) {
      setOpenPopup(false);
      setAudioForEdit(null);
      resetForm();
      setDisable(false);
    }
  };

  const insertButton = audio !== null && (
    <Button
      className="ASR_buttons"
      onClick={uploadAudio}
      type="button"
      disabled={disabled}
    >
      {disabled ? <Loading loading={loading} /> : t('send')}
    </Button>
  );

  return (
    <>
      {insertButton}
      <Popup
        title={t('confirmAudioScript')}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <TranscriptConfirm
          audioForEdit={audioForEdit}
          setSubmitScript={onSubmitScript}
          setOpenPopup={setOpenPopup}
          setDisable={setDisable}
        />
      </Popup>
    </>
  );
}
