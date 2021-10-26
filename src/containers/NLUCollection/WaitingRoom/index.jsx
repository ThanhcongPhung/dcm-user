import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import CampaignInfo from './CampaignInfo';
import FindPartner from './FindPartner';

import { WaitingRoomStyled } from './index.style';

const WaitingRoom = ({ campaign }) => {
  return (
    <WaitingRoomStyled>
      <Grid className="content" container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Paper className="item">
            <CampaignInfo campaign={campaign} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Paper className="item">
            <FindPartner />
          </Paper>
        </Grid>
      </Grid>
    </WaitingRoomStyled>
  );
};

export default WaitingRoom;
