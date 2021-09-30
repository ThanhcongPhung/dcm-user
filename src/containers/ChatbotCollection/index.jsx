import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import api from '../../apis';
import MessageChat from './MessageChat';
import { ChatbotCollectionStyled } from './index.style';

export default function ChatBot() {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState();

  const fetchCampaign = async () => {
    const { data } = await api.campaign.getCampaign(campaignId);
    if (data.status) setCampaign(data.result);
  };

  useEffect(() => {
    if (campaignId) fetchCampaign();
  }, [campaignId]);

  return (
    <ChatbotCollectionStyled>
      <Grid item xs={12} sm={12} md={6} ld={6} xl={6} className="gridItem">
        <MessageChat campaign={campaign} />
      </Grid>
    </ChatbotCollectionStyled>
  );
}
