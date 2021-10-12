import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Divider } from '@material-ui/core';
import Intent from './Intent';
import { UsecaseStyled } from './index.style';

const Usecase = ({ usecase, intents }) => {
  const { t } = useTranslation();

  return (
    <UsecaseStyled>
      <Typography variant="h6" gutterBottom align="center">
        {usecase && usecase.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <span className="title">{t('description')}: </span>
        {usecase && usecase.description}
      </Typography>
      <Divider />
      <Intent intents={intents} />
    </UsecaseStyled>
  );
};
export default Usecase;
