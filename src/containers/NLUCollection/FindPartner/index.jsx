import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import CampaignInfo from './CampaignInfo';
import { FindPartnerStyled } from './index.style';

const FindPartner = ({ campaign }) => {
  return (
    <FindPartnerStyled>
      <Grid className="content" container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Paper className="item">
            <CampaignInfo campaign={campaign} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Paper className="item"> {/* TODO */}</Paper>
        </Grid>
      </Grid>
    </FindPartnerStyled>
  );
};

export default FindPartner;
