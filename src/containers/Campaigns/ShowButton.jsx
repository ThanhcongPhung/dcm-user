import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CAMPAIGN_STATUS, PARTICIPATION_STATUS } from '../../constants';
import { ShowButtonStyled } from './index.style';

export default function ShowButton({
  campaign,
  userId,
  handleJoinCampaign,
  handleAcceptInvitation,
  handleLeaveCampaign,
  handleCollectData,
}) {
  const { id: campaignId, status, participants, campaignType } = campaign;
  const history = useHistory();
  const { t } = useTranslation();
  const participantStatus = participants.find((item) => item.userId === userId);

  const handleShowProgress = () => history.push(`/${campaignId}/result`);

  const isShowParticipateButton = () => {
    const campaignStatus = [CAMPAIGN_STATUS.WAITING, CAMPAIGN_STATUS.RUNNING];
    return !participantStatus && campaignStatus.includes(status);
  };

  const isShowAcceptInvitationButton = () =>
    participantStatus &&
    participantStatus.status === PARTICIPATION_STATUS.INVITED;

  const isShowCollectionButton = () =>
    participantStatus &&
    participantStatus.status === PARTICIPATION_STATUS.JOINED;

  const ParticipateButton = () => (
    <Button
      variant="contained"
      color="primary"
      onClick={() => handleJoinCampaign(campaignId, campaignType, status)}
    >
      {t('participate')}
    </Button>
  );

  const AcceptInvitationButton = () => {
    return (
      <ShowButtonStyled>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            handleAcceptInvitation(campaignId, campaignType, status)
          }
        >
          {t('acceptInvitation')}
        </Button>
      </ShowButtonStyled>
    );
  };

  const CollectionButton = () => {
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
              onClick={() => handleCollectData({ campaignId, campaignType })}
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
      {isShowCollectionButton() && <CollectionButton />}
      {isShowParticipateButton() && <ParticipateButton />}
      {isShowAcceptInvitationButton() && <AcceptInvitationButton />}
    </>
  );
}
