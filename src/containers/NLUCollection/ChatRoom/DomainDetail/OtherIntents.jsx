import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Paper, Typography } from '@material-ui/core';
import IntentCard from './IntentCard';
import { OtherIntentsStyled } from './index.style';

export default function OtherIntents() {
  const { t } = useTranslation();
  const { room, role } = useSelector((state) => state.nlu);

  const isValidOtherIntents =
    room &&
    room.otherIntents &&
    Array.isArray(room.otherIntents) &&
    room.otherIntents.length;
  return (
    <OtherIntentsStyled>
      {!isValidOtherIntents && (
        <Typography variant="h6" gutterBottom className="primaryText">
          {t('emptyData')}
        </Typography>
      )}
      {isValidOtherIntents &&
        room.otherIntents.map((el) => {
          return (
            <Paper className="card">
              <IntentCard intent={el} role={role} />
            </Paper>
          );
        })}
    </OtherIntentsStyled>
  );
}
