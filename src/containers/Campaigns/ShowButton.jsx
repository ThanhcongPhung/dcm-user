import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import {
  CAMPAIGN_ROLE,
  CAMPAIGN_STATUS,
  PARTICIPATION_STATUS,
  CAMPAIGN_TYPE,
} from '../../constants';
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

  const handleShowProgress = () => {
    switch (campaignType) {
      case CAMPAIGN_TYPE.CHATBOT_USECASE:
      case CAMPAIGN_TYPE.CHATBOT_INTENT:
        history.push(`campaigns/${campaignId}/chatbot/result/contribution`);
        break;
      default:
    }
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

  const validParticipant = participants.find((item) => item.userId === userId);
  const validContributor = participants.find(
    (item) =>
      item.userId === userId &&
      item.role === CAMPAIGN_ROLE.CONTRIBUTOR &&
      item.status === PARTICIPATION_STATUS.JOINED,
  );
  const validReviewer = participants.find(
    (item) =>
      item.userId === userId &&
      item.role === CAMPAIGN_ROLE.REVIEWER &&
      item.status === PARTICIPATION_STATUS.JOINED,
  );
  const validManager = participants.find(
    (item) =>
      item.userId === userId &&
      item.role === CAMPAIGN_ROLE.MANAGER &&
      item.status === PARTICIPATION_STATUS.JOINED,
  );
  const isShowParticipateButton = () => {
    const campaignStatus = [CAMPAIGN_STATUS.WAITING, CAMPAIGN_STATUS.RUNNING];
    return !validParticipant && campaignStatus.includes(status);
  };

  return (
    <ShowButtonStyled>
      {validReviewer && (
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            handleCollectData({
              campaignId,
              campaignType,
              status,
              role: CAMPAIGN_ROLE.REVIEWER,
            })
          }
        >
          {t('dataApproval')}
        </Button>
      )}
      {validManager && (
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            handleCollectData({
              campaignId,
              campaignType,
              status,
              role: CAMPAIGN_ROLE.MANAGER,
            })
          }
        >
          {t('viewCollectionResult')}
        </Button>
      )}
      {validParticipant &&
        validParticipant.status === PARTICIPATION_STATUS.INVITED && (
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              handleAcceptInvitation({
                campaignId,
                campaignType,
                status,
                role: validParticipant && validParticipant.role,
              })
            }
          >
            {t('acceptInvitation')}
          </Button>
        )}
      {validContributor && <CollectionButton />}
      {isShowParticipateButton() && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleJoinCampaign(campaignId, campaignType, status)}
        >
          {t('participate')}
        </Button>
      )}
    </ShowButtonStyled>
  );
}
