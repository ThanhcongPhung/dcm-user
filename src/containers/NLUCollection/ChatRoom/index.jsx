import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import Conversation from './Conversation';
import { ChatRoomStyled } from './index.style';

function ChatRoom({ campaign }) {
  return (
    <ChatRoomStyled>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
          <Paper className="paper">
            <Conversation campaign={campaign} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <Paper className="paper">{/* TODO */}</Paper>
        </Grid>
      </Grid>
    </ChatRoomStyled>
  );
}

export default ChatRoom;
