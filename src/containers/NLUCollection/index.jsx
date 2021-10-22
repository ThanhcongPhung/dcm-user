/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FindPartner from './FindPartner';
import { NLUCollectionStyled } from './index.style';
import api from '../../apis';

export default function NLUCollection() {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState();

  const fetchCampaign = async () => {
    const { data } = await api.campaign.getCampaign(campaignId);
    if (data.status) setCampaign(data.result);
  };

  useEffect(() => {
    if (campaignId) fetchCampaign();
  }, []);

  return (
    <NLUCollectionStyled>
      <FindPartner campaign={campaign} />
    </NLUCollectionStyled>
  );
}
