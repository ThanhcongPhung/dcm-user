import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Tooltip,
  Badge,
  Divider,
  TablePagination,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import { MAX_ITEMS_SMALL, RESULT_STATUS } from '../../../constants';
import { IntentStyled } from './index.style';

const Intent = ({ intents }) => {
  const [progressIntents, setProgressIntents] = useState([]);
  const [chatIntents, setChatIntents] = useState([]);
  const [progressPage, setProgressPage] = useState(0);
  const [chatPage, setChatPage] = useState(0);

  const { t } = useTranslation();

  const handleChangeProgressPage = (e, value) => setProgressPage(value);
  const handleChangeChatPage = (e, value) => setChatPage(value);

  useEffect(() => {
    if (intents.length) {
      setChatIntents(
        intents.filter((item) => item.status !== RESULT_STATUS.PROGRESS),
      );
      setProgressIntents(
        intents.filter((item) => item.status === RESULT_STATUS.PROGRESS),
      );
    }
  }, [intents]);

  return (
    <IntentStyled>
      <div className="intentWrap">
        <Typography variant="h6" align="center" gutterBottom>
          {`${t('intentDiscussion')} (${progressIntents.length})`}
        </Typography>
        {progressIntents &&
          progressIntents
            .slice(
              progressPage * MAX_ITEMS_SMALL,
              progressPage * MAX_ITEMS_SMALL + MAX_ITEMS_SMALL,
            )
            .map((item, index) => (
              <div key={item.name} className="intentItem">
                <Typography variant="body2" className="displayIntent">
                  {`${progressPage * MAX_ITEMS_SMALL + index + 1}. ${
                    item.displayName
                  }`}
                </Typography>
                <div className="numberDetail">
                  <Tooltip title={t('totalDiscussionUserSay')} placement="top">
                    <Badge badgeContent={item.userSayNumber} color="primary">
                      <MailIcon color="primary" />
                    </Badge>
                  </Tooltip>
                </div>
              </div>
            ))}
        {progressIntents && progressIntents.length > MAX_ITEMS_SMALL && (
          <TablePagination
            rowsPerPageOptions={[]}
            count={progressIntents.length}
            rowsPerPage={MAX_ITEMS_SMALL}
            page={progressPage}
            onPageChange={handleChangeProgressPage}
            className="tablePagination"
          />
        )}
      </div>
      <Divider />
      <div className="intentWrap">
        <Typography variant="h6" align="center" gutterBottom>
          {`${t('intentQuestion')} (${chatIntents.length})`}
        </Typography>
        {chatIntents &&
          chatIntents
            .slice(
              chatPage * MAX_ITEMS_SMALL,
              chatPage * MAX_ITEMS_SMALL + MAX_ITEMS_SMALL,
            )
            .map((item, index) => (
              <div key={item.name} className="intentItem">
                <Typography variant="body2">
                  {`${chatPage * MAX_ITEMS_SMALL + index + 1}. ${
                    item.displayName
                  }`}
                </Typography>
              </div>
            ))}
        {chatIntents && chatIntents.length > MAX_ITEMS_SMALL && (
          <TablePagination
            rowsPerPageOptions={[]}
            count={chatIntents.length}
            rowsPerPage={MAX_ITEMS_SMALL}
            page={chatPage}
            onPageChange={handleChangeChatPage}
            className="tablePagination"
          />
        )}
      </div>
    </IntentStyled>
  );
};

export default Intent;
