import React from 'react';
import CollectAudioRoomContainer from '../containers/CollectASRCampaign/CollectAudioRoom';

export default function CollectASRRoom({ socket }) {
  return <CollectAudioRoomContainer socket={socket} />;
}
