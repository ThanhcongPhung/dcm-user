import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Divider, Tabs, Tab, Box } from '@material-ui/core';
import Card from '../../../components/Card';
import Usecase from './Usecase';
import Intent from './Intent';
import { CAMPAIGN_TYPE } from '../../../constants';

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

export default function ChatbotInfo({ campaignType, usecase, intents }) {
  const [tabValue, setTabValue] = useState(0);
  const { t } = useTranslation();

  return (
    <Card padding={16} flexDirection="column" className="chatbotInfo">
      <Grid container>
        <Grid item xs>
          <Tabs
            indicatorColor="primary"
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {campaignType === CAMPAIGN_TYPE.CHATBOT_USECASE && (
              <Tab label={t('usecase')} {...a11yProps(0)} />
            )}
            {campaignType === CAMPAIGN_TYPE.CHATBOT_INTENT && (
              <Tab label={t('intent')} {...a11yProps(0)} />
            )}
            <Tab label={t('progress')} {...a11yProps(1)} />
          </Tabs>
        </Grid>
      </Grid>
      <Divider />
      <TabPanel value={tabValue} index={0} className="tabPanel">
        {campaignType === CAMPAIGN_TYPE.CHATBOT_USECASE && (
          <Usecase usecase={usecase} intents={intents} />
        )}
        {campaignType === CAMPAIGN_TYPE.CHATBOT_INTENT && (
          <Intent intents={intents} />
        )}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <div>Progress</div>
      </TabPanel>
    </Card>
  );
}
