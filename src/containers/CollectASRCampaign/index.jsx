import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ConfirmModal from './Section/ConfirmModal';
import ReadyButton from './Section/ReadyButton';
import OpenChatSound from './Asset/goes-without-saying-608.mp3';
import { CollectASRStyled } from './index.style';

export default function ValidAudioCampaign({ socket }) {
  const { user } = useSelector((state) => state.auth);
  const [roomLink, setRoomLink] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [promptStatus, setPromptStatus] = useState(0);
  const [promptDuration, setPromptDuration] = useState(10);
  const [matchFound, setMatchFound] = useState(false);
  const [readyStatus, setReadyStatus] = useState(false);
  const [inputType, setInputType] = useState('audio');

  const contentType = useRef('');
  const role = useRef('');

  const { t } = useTranslation();

  const openChatSound = new Audio(OpenChatSound);

  const handleConfirmPromptModal = () => {
    const userID = user.userId;
    const username = user.name;
    const socketID = socket.id;
    socket.emit('confirm prompt', { socketID, userID, username, inputType });
  };

  const handleDenyPromptModal = () => {
    setMatchFound(false);
    setReadyStatus(false);

    const userID = user.userId;
    const username = user.name;
    const socketID = socket.id;
    socket.emit('cancel prompt', { socketID, userID, username, inputType });
  };

  const readySignal = () => {
    if (socket) {
      setReadyStatus(true);
      const userID = user.userId;
      const username = user.name;
      const socketID = socket.id;
      socket.emit('ready', { socketID, userID, username, inputType });
    }
  };

  const cancelReadySignal = () => {
    if (socket) {
      setReadyStatus(false);
      const userID = user.userId;
      const username = user.name;
      const socketID = socket.id;
      socket.emit('cancel ready', { socketID, userID, username, inputType });
    }
  };
  useEffect(() => {
    if (socket) {
      socket.on('match', ({ client, servant, roomType }) => {
        let yourRole = '';
        if (user && client.userID === user.userId) yourRole = 'client';
        if (user && servant.userID === user.userId) yourRole = 'servant';
        console.log(
          `Found match! You are ${yourRole}. Your room type is ${roomType}`,
        );
        role.current = yourRole;
        openChatSound.play();

        contentType.current = roomType;
        setMatchFound(true);
      });
    }
    return () => {
      if (socket) {
        socket.off('match');
      }
    };
  });

  return (
    <CollectASRStyled>
      <>
        {redirect && <Redirect to={roomLink} userRole={role.current} />}
        <div className="container">
          <div className="box">
            <div className="column-title">
              <h1 className="style-title">{t('record')}</h1>
              <h1 className="style-title1">
                {t('conversationChatVoiceWithScenario')}
              </h1>
              <p className="content-hover">
                {t('asrCollectCampaignDescription')}
              </p>
              <a
                href="https://docs.google.com/document/d/10tzuTHFk-rc4q8PvEFvNTjivV4KE-Fhc02kN_62k_f0/edit"
                className="guide"
                target="_blank"
                rel="noreferrer"
              >
                {t('guide')}
              </a>
            </div>
            <div className="column-cta">
              <ReadyButton
                readyStatus={readyStatus}
                readySignal={readySignal}
                cancelReadySignal={cancelReadySignal}
              />
            </div>
          </div>
        </div>
        <div>
          <Grid container>
            <Grid item>
              <ConfirmModal
                socket={socket}
                visible={matchFound}
                roomType={contentType.current}
                promptStatus={promptStatus}
                promptDuration={promptDuration}
                setPromptStatus={setPromptStatus}
                handleOk={handleConfirmPromptModal}
                handleCancel={handleDenyPromptModal}
              />
            </Grid>
          </Grid>
        </div>
      </>
    </CollectASRStyled>
  );
}
