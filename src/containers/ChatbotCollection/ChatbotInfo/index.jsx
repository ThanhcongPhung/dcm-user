import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Divider,
  Tabs,
  Tab,
  Box,
  Tooltip,
  Icon,
  Menu,
  MenuItem,
} from '@material-ui/core';
import Card from '../../../components/Card';
import Usecase from './Usecase';
import Intent from './Intent';
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog';
import { CAMPAIGN_TYPE } from '../../../constants';
import api from '../../../apis';

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

export default function ChatbotInfo({
  campaignId,
  campaignType,
  usecase,
  intents,
  onSetUsecase,
  onSetIntents,
  handleEndChat,
}) {
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [usecaseList, setUsecaseList] = useState([]);
  const [convertUsecaseId, setConvertUsecaseId] = useState(null);
  const { t } = useTranslation();

  const fetchUsecases = async () => {
    const { data } = await api.chatbot.getUsecases(campaignId);
    if (data.status) setUsecaseList(data.result);
  };

  const fetchUsecase = async (usecaseId) => {
    const { data } = await api.chatbot.getUsecase(campaignId, usecaseId);
    if (data.status) {
      const newUsecase = data.result;
      onSetUsecase(newUsecase);
      const newIntents = (newUsecase && newUsecase.intents) || [];
      onSetIntents(newIntents);
    }
  };

  const handleConfirmConvertUsecase = (usecaseId) =>
    setConvertUsecaseId(usecaseId);

  const handleCancelConvertUsecase = () => {
    setConvertUsecaseId(null);
    setAnchorEl(null);
  };

  const handleConvertUsecase = () => {
    handleEndChat();
    fetchUsecase(convertUsecaseId);
    handleCancelConvertUsecase();
  };

  useEffect(() => {
    if (campaignType === CAMPAIGN_TYPE.CHATBOT_USECASE) fetchUsecases();
  }, [campaignType]);

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
        {campaignType === CAMPAIGN_TYPE.CHATBOT_USECASE && (
          <Grid item xs className="buttonConvertWrapper">
            <Tooltip title={t('convertUsecase')} placement="top">
              <Icon
                className="icon"
                color="primary"
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                swap_horiz
              </Icon>
            </Tooltip>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              {usecaseList &&
                usecaseList.map((usecaseItem) => (
                  <MenuItem
                    key={usecaseItem.id}
                    value={usecaseItem.id}
                    onClick={() => handleConfirmConvertUsecase(usecaseItem.id)}
                  >
                    {usecaseItem.name}
                  </MenuItem>
                ))}
            </Menu>
          </Grid>
        )}
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
      <ConfirmDialog
        open={!!convertUsecaseId}
        title={t('confirm')}
        content={t('confirmConvertUsecase')}
        handleClose={handleCancelConvertUsecase}
        handleConfirm={handleConvertUsecase}
      />
    </Card>
  );
}
