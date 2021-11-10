import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Button,
  Card,
  Grid,
  IconButton,
  Modal,
  Snackbar,
  Tooltip,
} from '@material-ui/core';
import { ExitToApp, MoreVert, ThumbDown, ThumbUp } from '@material-ui/icons';
import { v4 as uuidV4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import api from '../../../apis';
import NewMessage from '../Asset/to-the-point-568.mp3';
import ChatCard from './Section/ChatCard';
import AudioRecordScreen from './Section/AudioRecordScreen';
import { CollectAudioRoomStyled } from './index.style';
import LoadingDots from './Section/LoadingDots';
import Scenario from './Section/Scenario';

export default function CollectAudioRoom({ socket }) {
  const { campaignId, roomId } = useParams();
  const history = useHistory();
  const canvasRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const [recordRoom, setRecordRoom] = useState();
  const [userRole, setUserRole] = useState('');
  const [sendLoading, setSendLoading] = useState(false);
  const [audioHistory, setAudioHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [joinLeave] = useState('');
  const [roomName, setRoomName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { enqueueSnackbar } = useSnackbar();
  const { vertical, horizontal, open } = state;
  const newMessage = new Audio(NewMessage);
  const userName = user.name;

  const { t } = useTranslation();

  const fetchRecordRoom = async () => {
    const { data } = await api.collectASR.getRecordRoom(roomId);
    if (data.status) {
      const { userId } = user;
      const roomFound = data.result;
      console.log(roomFound);
      const audios = roomFound.audioList;
      if (userId === roomFound.userId1) setUserRole('client');
      if (userId === roomFound.userId2) setUserRole('servant');
      const tempAudioList = [];
      audios.map((audio) => {
        const audioObj = {
          userID: audio.userId,
          sender: audio.speakerName,
          audioLink: audio.audioLink,
          transcript: audio.transcript.manualTranscript[0].newScript,
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
  const handleOk = () => {
    setIsModalVisible(false);
    history.push(`/campaigns/${campaignId}/collect-audio`);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    if (socket) {
      socket.on('user recording', ({ username }) => {
        if (user !== null) {
          if (username !== user.name) {
            setMessage(`${username} ${t('recording')}`);
          }
        }
      });

      socket.on('user done recording', ({ username }) => {
        if (user !== null) {
          if (username !== user.name) {
            setMessage(`${username} ${t('finishRecordAndSend')}`);
          }
        }
      });
      socket.on('getting transcript', ({ username }) => {
        if (user !== null) {
          if (username !== userName) {
            setMessage(`${username} ${t('sendingMessage')}`);
            setSendLoading(true);
          }
        }
      });

      socket.on('repeat', ({ username }) => {
        if (user !== null) {
          if (username !== user.name) {
            setMessage(`${username} ${t('deletedRecording')}`);
          }
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('user recording');
        socket.off('user done recording');
        socket.off('getting transcript');
        socket.off('repeat');
      }
    };
  });

  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', { roomId, userName });
    }

    return () => {
      if (socket) {
        socket.emit('leaveRoom', { roomId, userName });
      }
    };
  }, [socket, roomId, userName]);

  useEffect(() => {
    if (socket) {
      socket.on('newAudioURL', (data) => {
        newMessage.play();
        const newHistory = [...audioHistory];
        newHistory.push(data);
        setAudioHistory(newHistory);
        setMessage('');
        setSendLoading(false);
      });
    }
    return () => {
      if (socket) socket.off('newAudioURL');
    };
  });

  useEffect(() => {
    if (socket) {
      socket.on('joinRoom announce', (data) => {
        if (user !== null) {
          if (data.userName !== user.name) {
            enqueueSnackbar(`${data.userName} ${t('joinedRoom')}`, {
              variant: 'success',
            });
          }
        }
      });

      socket.on('leaveRoom announce', (data) => {
        if (user !== null) {
          if (data.userName !== user.name) {
            enqueueSnackbar(`${data.userName} ${t('leftRoom')}`, {
              variant: 'warning',
            });
          }
        }
      });
    }
    return () => {
      if (socket) {
        socket.off('joinRoom announce');
        socket.off('leaveRoom announce');
      }
    };
  });

  useEffect(() => {
    if (socket) {
      socket.on('change like state', ({ username, isLike, index }) => {
        setAudioHistory(
          audioHistory.map((item, id) => {
            if (id === index) return { ...item, isLike, fixBy: username };
            return item;
          }),
        );
      });
    }
  }, [audioHistory, socket]);

  useEffect(() => {
    if (roomId) fetchRecordRoom();
  }, [roomId]);

  return (
    <CollectAudioRoomStyled>
      <div className="audio-chat box-shadow-standard">
        <Grid container>
          <Grid item xs={12} sm={12} md={8}>
            <Card className="header-chat-audio">
              <Button
                onClick={() => setIsModalVisible(true)}
                disabled={audioHistory.length <= 5}
              >
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
              username={userName}
              socket={socket}
              user={user}
              chatroomID={roomId}
            />
            <div className="infinite-container" id="fill">
              <div className="messages">
                {audioHistory.map((audioHis, index) => (
                  <ChatCard
                    key={uuidV4()}
                    username={userName}
                    listAudio={audioHistory}
                    setListAudio={setAudioHistory}
                    audioIndex={index}
                    socket={socket}
                    chatroomID={roomId}
                  />
                ))}
                {sendLoading && (
                  <div className="messageContainer justifyStart" id="c">
                    <div className="message-area">
                      <div className="text-username">
                        <div className="audio-text">
                          <div className="text-checkButton">
                            <div className="messageBox backgroundBlue-loading">
                              <LoadingDots />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} className="gridStyleRight">
            <div className="scenarioStyle">
              <Grid container className="gridStyleScenario">
                <Scenario recordRoom={recordRoom} userRole={userRole} />
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Modal disableBackdropClick open={isModalVisible}>
          <div className="modalDisplay">
            <p>{t('confirmLeaveThisRoom')}</p>
            <Button variant="contained" color="default" onClick={handleCancel}>
              {t('stayRoom')}
            </Button>
            <Button
              variant="contained"
              className="buttonLeave"
              onClick={handleOk}
            >
              {t('leaveRoom')}
            </Button>
          </div>
        </Modal>
      </div>
    </CollectAudioRoomStyled>
  );
}
