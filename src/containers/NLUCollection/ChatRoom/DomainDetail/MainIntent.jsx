import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import IntentCard from './IntentCard';
import { USER_ROLE } from '../../../../constants/nlu';
import { MainIntentStyled } from './index.style';

export default function MainIntent() {
  const { t } = useTranslation();
  const { room, role } = useSelector((state) => state.nlu);

  if (!room || !room.domain) return <CircularProgress />;
  return (
    <MainIntentStyled>
      <Typography variant="h6" gutterBottom className="primaryText">
        {room.domain.name}
      </Typography>
      <Typography variant="body1" gutterBottom className="secondaryText">
        {role === USER_ROLE.AGENT
          ? room.domain.agentScript
          : room.domain.clientScript}
      </Typography>

      <Typography variant="body2" gutterBottom className="note">
        *{t('slotSelectedNote')}
      </Typography>
      <IntentCard intent={room.mainIntent} role={role} isMainIntent />
    </MainIntentStyled>
  );
}
