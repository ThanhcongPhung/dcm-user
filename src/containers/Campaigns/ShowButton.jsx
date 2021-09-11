import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CAMPAIGN_STATUS, CAMPAIGN_TYPE } from '../../constants';
import { ShowButtonStyled } from './index.style';

export default function ShowButton({
  campaignId,
  status,
  participants,
  userId,
  handleJoinCampaign,
  handleLeaveCampaign,
  campaignType,
}) {
  const history = useHistory();
  const { t } = useTranslation();
  const participantStatus = participants.find((item) => item.userId === userId);

  const handleContinue = () => {
    switch (campaignType) {
      case CAMPAIGN_TYPE.CHATBOT_USECASE:
      case CAMPAIGN_TYPE.CHATBOT_INTENT:
        history.push(`/campaigns/${campaignId}/chatbot`);
        break;
      default:
    }
  };
  const handleShowProgress = () => history.push(`/${campaignId}/result`);

  const isNonParticipate = () => {
    const campaignStatus = [CAMPAIGN_STATUS.WAITING, CAMPAIGN_STATUS.RUNNING];
    return !participantStatus && campaignStatus.includes(status);
  };

  const NonParticipantButton = () => (
    <Button
      variant="contained"
      color="primary"
      onClick={() => handleJoinCampaign(campaignId, status)}
    >
      {t('participate')}
    </Button>
  );

  const ParticipantButton = () => {
    return (
      <ShowButtonStyled>
        {status === CAMPAIGN_STATUS.WAITING && (
          <Typography gutterBottom variant="body1" color="error">
            {t('waitingCampaign')}
          </Typography>
        )}
        {status === CAMPAIGN_STATUS.RUNNING && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleContinue(campaignId, userId)}
            >
              {t('continue')}
            </Button>
            <Button
              variant="contained"
              className="button buttonExit"
              onClick={() => handleLeaveCampaign(campaignId)}
            >
              {t('leave')}
            </Button>
          </>
        )}
        {[CAMPAIGN_STATUS.RUNNING, CAMPAIGN_STATUS.END].includes(status) && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleShowProgress(campaignId)}
          >
            {t('progress')}
          </Button>
        )}
      </ShowButtonStyled>
    );
  };

  return (
    <>
      {participantStatus && <ParticipantButton />}
      {isNonParticipate() && <NonParticipantButton />}
    </>
  );
}
