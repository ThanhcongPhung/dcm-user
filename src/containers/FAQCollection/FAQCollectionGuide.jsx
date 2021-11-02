import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Divider, Tabs, Tab, Box, Button, Typography } from '@material-ui/core';
import { FAQ_ACTION } from '../../constants';
import { GuideReviewStyled } from './index.style';

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabPanel-${index}`,
});

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    hidden={value !== index}
    id={`simple-tabPanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && <Box p={1}>{children}</Box>}
  </div>
);

export default function FAQCollectionGuide({
  campaignActions,
  pageType,
  campaignId,
}) {
  const history = useHistory();
  const [tabValue, setTabValue] = useState(0);
  const { t } = useTranslation();

  const validTextCollection =
    campaignActions && campaignActions.some((item) => item === FAQ_ACTION.TEXT);

  const validVoiceCollection =
    campaignActions &&
    campaignActions.some((item) => item === FAQ_ACTION.VOICE);

  return (
    <GuideReviewStyled>
      <Tabs
        indicatorColor="primary"
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {validTextCollection && <Tab label={t('text')} {...a11yProps(1)} />}
        {validVoiceCollection && <Tab label={t('voice')} {...a11yProps(1)} />}
      </Tabs>
      <Divider />
      <div className="guideInfo">
        <TabPanel value={tabValue} index={0}>
          <Typography variant="body1" gutterBottom>
            {pageType === 'contribute' && t('FAQTextReviewGuide')}
            {pageType === 'review' && t('FAQTextCollectionGuide')}
          </Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Typography variant="body1" gutterBottom>
            {pageType === 'contribute' && t('FAQVoiceCollectionGuide')}
            {pageType === 'review' && t('FAQVoiceReviewGuide')}
          </Typography>
        </TabPanel>
      </div>
      <div className="buttonGroup">
        {validTextCollection && pageType === 'contribute' && (
          <Button
            variant="contained"
            className="button"
            color="primary"
            onClick={() =>
              history.push(`/campaigns/${campaignId}/faq/contribute/text`)
            }
          >
            {t('textCollection')}
          </Button>
        )}
        {validVoiceCollection && pageType === 'contribute' && (
          <Button
            variant="contained"
            className="button"
            color="primary"
            onClick={() =>
              history.push(`/campaigns/${campaignId}/faq/contribute/voice`)
            }
          >
            {t('voiceCollection')}
          </Button>
        )}
        {validTextCollection && pageType === 'review' && (
          <Button
            variant="contained"
            className="button"
            color="primary"
            onClick={() =>
              history.push(`/campaigns/${campaignId}/faq/review/text`)
            }
          >
            {t('textReview')}
          </Button>
        )}
        {validVoiceCollection && pageType === 'review' && (
          <Button variant="contained" className="button" color="primary">
            {t('voiceReview')}
          </Button>
        )}
      </div>
    </GuideReviewStyled>
  );
}
