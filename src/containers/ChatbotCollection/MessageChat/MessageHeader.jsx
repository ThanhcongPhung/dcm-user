/* eslint-disable no-console */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {
  Link,
  Menu,
  MenuItem,
  Typography,
  CardMedia,
  Tooltip,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { MessageHeaderStyled } from './index.style';

export default function MessageHeader({ campaignId, campaign }) {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const { t } = useTranslation();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleConfirmEndChat = () => {};

  return (
    <MessageHeaderStyled>
      <Link href={`/campaigns/${campaignId}`} color="inherit" underline="none">
        <CardMedia
          className="cardMedia"
          image={(campaign && campaign.image) || '/images/default-image.jpg'}
          title={campaign && campaign.name}
        />
      </Link>
      <Tooltip title={(campaign && campaign.name) || ''} placement="top">
        <Typography
          variant="h6"
          noWrap
          className="title"
          onClick={() => history.push(`/campaigns/${campaignId}`)}
        >
          {campaign && campaign.name}
        </Typography>
      </Tooltip>
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
          <Link href={`/${campaignId}/result`} color="inherit" underline="none">
            {t('viewProgress')}
          </Link>
        </MenuItem>
        <MenuItem onClick={handleConfirmEndChat}>{t('endSession')}</MenuItem>
      </Menu>
    </MessageHeaderStyled>
  );
}
