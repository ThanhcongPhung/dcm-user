/* eslint-disable no-console */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Avatar, Menu, MenuItem, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { MessageHeaderStyled } from './index.style';

export default function MessageHeader({ campaign }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { t } = useTranslation();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleConfirmEndChat = () => {};
  return (
    <MessageHeaderStyled>
      <div className="headerTitle">
        <Avatar
          className="image"
          alt="campaign name"
          src="https://infofinance.vn/wp-content/uploads/2020/01/cach-huy-dich-vu-sms-chu-dong-cua-vietcombank.png"
        />
        <Typography variant="h6" noWrap>
          {campaign && campaign.name && campaign.name}
        </Typography>
      </div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Link
            href={campaign && campaign.id && `/${campaign.id}/result-user`}
            color="inherit"
            underline="none"
          >
            {t('viewProgress')}
          </Link>
        </MenuItem>
        <MenuItem onClick={handleConfirmEndChat}>{t('endSession')}</MenuItem>
      </Menu>
    </MessageHeaderStyled>
  );
}
