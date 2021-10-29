import { ListItem } from '@material-ui/core';
import React from 'react';
import { ListItemStyled } from './index.style';

export default function ListItemCustom({ children }) {
  return (
    <ListItemStyled>
      <ListItem className="listItem">{children}</ListItem>
    </ListItemStyled>
  );
}
