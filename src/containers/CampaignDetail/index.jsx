import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Detail from './Detail';
import Participants from './Participants';

export default function CampaignDetail() {
  const { campaignId } = useParams();

  return (
    <Grid container className="campaign-detail-container" spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
        <Detail campaignId={campaignId} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
        <Participants campaignId={campaignId} />
      </Grid>
    </Grid>
  );
}
