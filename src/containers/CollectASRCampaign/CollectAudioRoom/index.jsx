import React, { useEffect, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Button,
  Card,
  Grid,
  IconButton,
  Snackbar,
  Tooltip,
} from '@material-ui/core';
import { ExitToApp, MoreVert, ThumbDown, ThumbUp } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import api from '../../../apis';
import { CollectAudioRoomStyled } from './index.style';
import AudioRecordScreen from './Section/AudioRecordScreen';

export default function CollectAudioRoom({ socket }) {
  const { roomId } = useParams();
  const canvasRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const [recordRoom, setRecordRoom] = useState();
  const [userRole, setUserRole] = useState('');
  const [audioHistory, setAudioHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [joinLeave, setJointLeave] = useState('');
  const [roomName, setRoomName] = useState('');
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const { t } = useTranslation();

  const fetchRecordRoom = async () => {
    const { data } = await api.collectASR.getRecordRoom(roomId);
    if (data.status) {
      const { userId } = user;
      const roomFound = data.result;
      const audios = roomFound.audioList;
      if (userId === roomFound.userId1) setUserRole('client');
      if (userId === roomFound.userId2) setUserRole('servant');
      const tempAudioList = [];
      audios.map((audio) => {
        const audioObj = {
          userID: audio.userId,
          sender: audio.username,
          audioLink: audio.audioLink,
          transcript: audio.transcript,
          audioID: audio.id,
          isLike: audio.isLike,
        };
        return tempAudioList.push(audioObj);
      });
      setAudioHistory(tempAudioList);
      setRecordRoom(roomFound);
      setRoomName(roomFound.name);
    }
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    if (roomId) fetchRecordRoom();
  }, [roomId]);

  return (
    <CollectAudioRoomStyled>
      <div className="audio-chat box-shadow-standard">
        <Grid container>
          <Grid item xs={12} sm={12} md={8}>
            <Card className="header-chat-audio">
              <Button>
                <Tooltip title={t('leaveRoom')} placement="right">
                  {audioHistory.length < 5 ? (
                    <ExitToApp className="fillIconBlue" />
                  ) : (
                    <ExitToApp className="fillIcon" />
                  )}
                </Tooltip>
              </Button>
              <div className="roomName">{roomName}</div>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
              >
                <Tooltip title={t('noteLeaveRoom')} placement="right">
                  <MoreVert className="fillIcon" />
                </Tooltip>
              </IconButton>
            </Card>
            <div className="instruction">
              {message !== '' ? (
                message
              ) : (
                <>
                  <span>{t('click')}&nbsp;</span>
                  <ThumbUp fontSize="small" />
                  <span>&nbsp;{t('confirmAndClick')}&nbsp;</span>
                  <ThumbDown fontSize="small " />
                  <span>&nbsp;{t('editScript')}</span>
                </>
              )}
            </div>
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={open}
              onClose={handleClose}
              message={joinLeave}
              key={vertical + horizontal}
            />
            <AudioRecordScreen
              audioName={`vi${roomId}_${user.userId}_${Date.now()}.wav`}
              canvasRef={canvasRef}
              username={user.name}
              socket={socket}
              user={user}
              chatroomID={roomId}
            />
            <div className="infinite-container" id="fill">
              <div className="messages" />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} className="gridStyleRight">
            <div className="scenarioStyle">
              <Grid container className="gridStyleScenario">
                {/* TODO */}
              </Grid>
            </div>
            <div>
              <Grid container>
                <Grid item xs={12} />
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </CollectAudioRoomStyled>
  );
}
