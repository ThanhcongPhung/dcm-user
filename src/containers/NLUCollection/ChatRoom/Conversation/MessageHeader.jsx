/* eslint-disable no-console */
import React from 'react';
import { Link, Avatar, Typography } from '@material-ui/core';
import { MessageHeaderStyled } from './index.style';

export default function MessageHeader({ campaign }) {
  return (
    <MessageHeaderStyled>
      <div className="headerTitle">
        <Link
          href={`/campaigns/${campaign.id}`}
          color="inherit"
          underline="none"
        >
          <Avatar
            className="image"
            src={campaign && campaign.image}
            title={campaign && campaign.name}
          />
        </Link>
        <Link
          href={`/campaigns/${campaign.id}`}
          color="inherit"
          underline="none"
        >
          <Typography variant="h6" noWrap className="title">
            {campaign && campaign.name}
          </Typography>
        </Link>
      </div>
    </MessageHeaderStyled>
  );
}
