import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { v4 as uuidV4 } from 'uuid';
import AudioPlayList from './AudioPlayList';
import ValidAudioPanel from './ValidAudioPanel';
import api from '../../../apis';
import { ValidAudioRoomStyled } from './index.style';

export default function ValidAudioRoom() {
  const { campaignId, roomId } = useParams();
  const history = useHistory();
  const [audioLink, setAudioLink] = useState('');
  const [audioList, setAudioList] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [radioValue, setRadioValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [clips, setClips] = useState([]);
  const [roomName, setRoomName] = useState('');

  const fetchValidRoom = async () => {
    const { data } = await api.validAudio.getValidRoom(roomId);
    if (data.status) {
      const audios = data.result.audioList;
      setRoomName(data.result.name);
      setAudioList(audios);
      setClips(audios);
      setCurrentChat(audios[0]);
      setSelectedIndex(0);
    }
  };

  useEffect(() => {
    if (roomId) fetchValidRoom();
  }, []);

  useEffect(() => {
    const activeAudio = clips[selectedIndex];
    setAudioLink(activeAudio && activeAudio.audioLink);
  });

  const currentAudio = (audio, i) => {
    setCurrentChat(audio);
    setSelectedIndex(i);
    setRadioValue('');
  };

  return (
    <ValidAudioRoomStyled>
      <Paper className="validRoomContainer">
        <div className="audioMenuList">
          <div className="audioListWrapper">
            {audioList.map((audio, i) => (
              <AudioPlayList
                key={uuidV4()}
                active={audio === currentChat}
                audio={audio}
                index={i}
                onClick={() => currentAudio(audio, i)}
              />
            ))}
          </div>
        </div>
        <ValidAudioPanel
          history={history}
          campaignId={campaignId}
          audioLink={audioLink}
          radioValue={radioValue}
          currentChat={currentChat}
          setRadioValue={setRadioValue}
          setSelectedIndex={setSelectedIndex}
          setCurrentChat={setCurrentChat}
          selectedIndex={selectedIndex}
          audioList={audioList}
          roomName={roomName}
        />
      </Paper>
    </ValidAudioRoomStyled>
  );
}
