import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Divider, Tabs, Tab, Box, Button, Typography } from '@material-ui/core';
import { CAMPAIGN_TYPE } from '../../constants';
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

export default function GuideReview({ campaignType, campaignId }) {
  const history = useHistory();
  const [tabValue, setTabValue] = useState(0);
  const { t } = useTranslation();

  return (
    <GuideReviewStyled>
      <Tabs
        indicatorColor="primary"
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label={t('intent')} {...a11yProps(0)} />
        {campaignType === CAMPAIGN_TYPE.CHATBOT_USECASE && (
          <Tab label={t('session')} {...a11yProps(1)} />
        )}
      </Tabs>
      <Divider />
      <div className="guideInfo">
        <TabPanel value={tabValue} index={0}>
          <Typography variant="body1" gutterBottom>
            {t('intentCampaign')}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {t('intentReviewCorrect')}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <span className="textNote">{`${t('note')}: `}</span>
            {t('noteIntentReview')}
          </Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Typography variant="body1" gutterBottom>
            {t('usecaseCampaign')}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {t('sessionReviewCorrect')}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <span className="textNote">{`${t('note')}: `}</span>
            {t('noteSessionReview')}
          </Typography>
        </TabPanel>
      </div>
      <div className="buttonGroup">
        <Button
          variant="contained"
          className="button"
          color="primary"
          onClick={() =>
            history.push(`/campaigns/${campaignId}/chatbot/review/intent`)
          }
        >
          {t('intentReview')}
        </Button>
        {campaignType === CAMPAIGN_TYPE.CHATBOT_USECASE && (
          <Button variant="contained" className="button" color="primary">
            {t('sessionReview')}
          </Button>
        )}
      </div>
    </GuideReviewStyled>
  );
}
