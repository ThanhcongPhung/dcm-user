import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Paper, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import api from '../../apis';
import ValidRoom from './ValidRoom';
import { ValidAudioStyled } from './index.style';

export default function ValidAudioCampaign() {
  const { campaignId } = useParams();
  const [validRoom, setValidRoom] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();
  const { t } = useTranslation();

  const fetchValidAudioCamp = async () => {
    const { data } = await api.validAudio.getValidAudio(campaignId);
    if (data.status) {
      setValidRoom(data.result.validRoomList);
    }
  };

  useEffect(() => {
    if (campaignId) fetchValidAudioCamp();
  }, []);

  return (
    <ValidAudioStyled>
      <Paper className="validRoomPaper">
        <div className="header">
          <Typography gutterBottom variant="h4" className="title-page">
            {t('validRoomList')}
          </Typography>
        </div>
        <ValidRoom
          campaignId={campaignId}
          validRoom={validRoom}
          user={user}
          history={history}
        />
      </Paper>
    </ValidAudioStyled>
  );
}
