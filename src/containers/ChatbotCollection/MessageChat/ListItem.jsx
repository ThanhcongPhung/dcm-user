import React from 'react';
import Moment from 'moment';
import { ListItem, Typography } from '@material-ui/core';
import { ListItemStyled } from './index.style';

export default function ListItemCustom({ message, children }) {
  return (
    <ListItemStyled>
      {message && message.isFirst && (
        <Typography align="center">
          {message.createdAt &&
            Moment(message.createdAt).format('DD.MM.YYYY HH:mm')}
        </Typography>
      )}
      <ListItem className="listItem">{children}</ListItem>
    </ListItemStyled>
  );
}
