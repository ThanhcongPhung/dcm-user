import React, { useState } from 'react';
import {
  Modal,
  Paper,
  Backdrop,
  Typography,
  Box,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  Collapse,
} from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  AccessibilityNew as AccessibilityNewIcon,
  FormatQuote as FormatQuoteIcon,
} from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { GuideModalStyled } from './index.style';
import { nluGuide as nluGuideData } from '../../../../data';

function GuideList({ title, guides, key }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <List component="nav" aria-labelledby="nested-list-subheader" key={key}>
      <ListItem
        button
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ListItemIcon>
          <AccessibilityNewIcon />
        </ListItemIcon>
        <ListItemText primary={t(title)} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {guides.map((guide) => (
            <ListItem button className="nested" key={guide}>
              <ListItemIcon>
                <FormatQuoteIcon />
              </ListItemIcon>
              <ListItemText primary={t(guide)} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
}

export default function GuideModal({ open, handleClose }) {
  const { t } = useTranslation();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <GuideModalStyled>
        <Paper elevation={3} className="contentModal">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={1}
          >
            <Typography gutterBottom variant="h5" component="h2">
              {t('guide')}
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary" component="p">
            {t(nluGuideData.description)}
          </Typography>

          {['client', 'agent'].map((el) => (
            <GuideList title={el} guides={nluGuideData[el]} key={el} />
          ))}
        </Paper>
      </GuideModalStyled>
    </Modal>
  );
}
