import React, { useState } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import GuideModal from './GuideModal';
import { FindPartnerStyled } from './index.style';

export default function FindPartner() {
  const { t } = useTranslation();
  const [openGuide, setOpenGuide] = useState(false);

  const handleOpenGuide = () => {
    setOpenGuide(true);
  };

  const handleCloseGuide = () => {
    setOpenGuide(false);
  };

  return (
    <FindPartnerStyled>
      <Box display="flex" p={1}>
        <Box p={1} flexGrow={1}>
          <Typography gutterBottom variant="h5" component="h2">
            {t('findRoom')}
          </Typography>
        </Box>
        <Box p={1}>
          <Button variant="outlined" color="primary" onClick={handleOpenGuide}>
            {t('guide')}
          </Button>
        </Box>
      </Box>
      <Box
        display="flex"
        p={1}
        flexGrow={1}
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Button variant="contained" color="primary">
          {t('start')}
        </Button>
      </Box>
      <GuideModal open={openGuide} handleClose={handleCloseGuide} />
    </FindPartnerStyled>
  );
}
