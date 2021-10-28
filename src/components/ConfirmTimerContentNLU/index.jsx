import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@material-ui/core';
import { convertSecondToTimeString } from '../../utils/date';

function ConfirmTimerContentNLU({ timer, content }) {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography>{content}</Typography>
      <Typography>
        {t('timeConfirm')}: <b>{convertSecondToTimeString(timer)}</b>
      </Typography>
    </Box>
  );
}
export default ConfirmTimerContentNLU;
