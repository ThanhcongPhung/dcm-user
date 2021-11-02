import { Box, Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AnswerHintCard from './AnswerHintCard';
import { USER_ROLE } from '../../../../constants/nlu';
import MainIntent from './MainIntent';
import OtherIntents from './OtherIntents';
import { DomainDetailStyled } from './index.style';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2} pb={4}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function DomainDetail() {
  const { t } = useTranslation();
  const { role } = useSelector((state) => state.nlu);
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <DomainDetailStyled>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        variant="fullWidth"
      >
        <Tab label={t('mainIntent')} />
        <Tab label={t('otherIntent')} />
      </Tabs>
      <TabPanel value={tab} index={0} className="tabContent">
        <MainIntent />
      </TabPanel>
      <TabPanel value={tab} index={1} className="tabContent">
        <OtherIntents />
      </TabPanel>
      {role === USER_ROLE.AGENT && <AnswerHintCard />}
    </DomainDetailStyled>
  );
}
