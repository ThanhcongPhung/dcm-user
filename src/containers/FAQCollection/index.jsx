import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Grid, Paper, Typography } from '@material-ui/core';
import CampaignInfo from './CampaignInfo';
import FAQCollectionGuide from './FAQCollectionGuide';
import api from '../../apis';
import { ChatbotReviewStyled } from './index.style';

export default function FAQCollection({ pageType }) {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState();
  const { t } = useTranslation();

  const fetchCampaign = async () => {
    const { data } = await api.campaign.getCampaign(campaignId);
    if (data.status) setCampaign(data.result);
  };

  useEffect(() => {
    if (campaignId) fetchCampaign();
  }, []);

  return (
    <ChatbotReviewStyled>
      <Paper className="container">
        <div className="header">
          <Typography variant="h5" className="headTitle">
            {pageType === 'contribute' && `${t('campaignCollection')}: `}
            {pageType === 'review' && `${t('campaignReview')}: `}
            {campaign && campaign.name}
          </Typography>
        </div>
        <Grid className="content" container spacing={3}>
          <Grid item xs={6}>
            <CampaignInfo campaign={campaign} />
          </Grid>
          <Grid item xs={6}>
            <FAQCollectionGuide
              campaignActions={campaign && campaign.actions}
              campaignId={campaignId}
              pageType={pageType}
            />
          </Grid>
        </Grid>
      </Paper>
    </ChatbotReviewStyled>
  );
}
