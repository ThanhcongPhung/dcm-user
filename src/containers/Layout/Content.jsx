import React from 'react';
import { IconButton, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { ContentStyled } from './index.style';

export default function Content({
  children,
  handleSidebarToggle,
  isShowSideBar,
}) {
  return (
    <ContentStyled>
      {isShowSideBar && (
        <Hidden smDown>
          <IconButton onClick={handleSidebarToggle} className="menu-icon">
            <MenuIcon />
          </IconButton>
        </Hidden>
      )}
      {children}
    </ContentStyled>
  );
}
