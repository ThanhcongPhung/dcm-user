import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Paper, Typography, Link, TablePagination } from '@material-ui/core';
import ResultSearch from './ResultSearch';
import ResultTable from './ResultTable';
import DateTimeRangePicker from '../../components/DateTimeRangePicker';
import api from '../../apis';
import {
  PAGINATION,
  CAMPAIGN_ROLE,
  CHATBOT_RESULT_PAGE_TYPE,
  PARTICIPATION_STATUS,
} from '../../constants';
import { ContributionResultStyled } from './index.style';

const month = [
  moment().startOf('day').subtract(1, 'month').add(1, 'day'),
  moment().endOf('day'),
];

export default function ChatbotResult() {
  const { campaignId, type } = useParams();
  const [range, setRange] = useState(month);
  const [allIntents, setAllIntents] = useState([]);
  const [intents, setIntents] = useState([]);
  const [userSays, setUserSays] = useState({});
  const [campaign, setCampaign] = useState();
  const [participants, setParticipants] = useState([]);
  const [reviewSearch, setReviewSearch] = useState({
    userSay: '',
    intentNames: [],
    status: 'total',
    senderId: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const { t } = useTranslation();

  const onSetUserSays = (value) => setUserSays(value);

  const fetchUserSays = async (fields) => {
    setIsLoading(true);
    const { userSaySearch, status, intentNames, senderId, dateRange } = fields;
    const { data } = await api.chatbotReview.getUserSays({
      search: userSaySearch,
      campaignId,
      intentNames,
      range: dateRange || range,
      status: status && status !== 'total' ? status : '',
      sort: 'createdAt_desc',
      type: 'FILTER',
      senderId: senderId && senderId !== 'total' ? senderId : '',
    });
    setIsLoading(false);
    if (data.status) {
      const usersayList = data.result.usersays || [];
      const objectUsersays = Object.assign(
        {},
        ...usersayList.map((usersayItem) => ({
          [usersayItem.id]: usersayItem,
        })),
      );
      setUserSays({ ...objectUsersays });
    }
  };

  const fetchCampaign = async () => {
    const { data } = await api.campaign.getCampaign(campaignId);
    if (data.status) {
      setCampaign(data.result);
    }
  };

  const fetchIntents = async () => {
    const { data } = await api.chatbot.getIntents(campaignId);
    if (data.status) setIntents(data.result);
  };

  const fetchCampaignAllIntents = async () => {
    const { data } = await api.campaign.getIntents(campaignId);
    if (data.status) setAllIntents(data.result.intents);
  };

  const fetchParticipantCampaign = async () => {
    const { data } = await api.campaign.getParticipants(campaignId);
    if (data.status) {
      const contributors = data.result.filter(
        (item) =>
          item.role === CAMPAIGN_ROLE.CONTRIBUTOR &&
          item.status === PARTICIPATION_STATUS.JOINED,
      );
      setParticipants(contributors);
    }
  };

  const onSetDateTimeRange = (changeRange) => {
    setRange(changeRange);
    fetchUserSays({ dateRange: changeRange });
  };

  const onHandleKeyNameSearch = (searchValue) => {
    setReviewSearch((prev) => ({ ...prev, userSay: searchValue }));
    fetchUserSays({ userSaySearch: searchValue });
    setPage(0);
  };

  const handleAutocompleteSearch = (event, values) => {
    const intentNames = values.map((item) => item.name);
    setReviewSearch((prev) => ({ ...prev, intentNames: values }));
    fetchUserSays({ ...reviewSearch, intentNames });
    setPage(0);
  };

  const handleSelectSearch = (e) => {
    setReviewSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    fetchUserSays({ ...reviewSearch, [e.target.name]: e.target.value });
    setPage(0);
  };

  useEffect(() => {
    if (campaignId) {
      fetchCampaign();
      fetchIntents();
      fetchUserSays(reviewSearch);
      fetchCampaignAllIntents();
      if (type === CHATBOT_RESULT_PAGE_TYPE.MANAGE) fetchParticipantCampaign();
    }
  }, []);

  return (
    <ContributionResultStyled>
      <Paper className="container">
        <div className="header">
          <Typography variant="h5" className="headTitle">
            {type === CHATBOT_RESULT_PAGE_TYPE.CONTRIBUTION &&
              `${t('contributionResult')}: `}
            {type === CHATBOT_RESULT_PAGE_TYPE.MANAGE &&
              `${t('campaignCollectionResult')}: `}
            <Link
              href={`/campaigns/${campaignId}`}
              color="inherit"
              underline="none"
            >
              {campaign && campaign.name}
            </Link>
          </Typography>
          <DateTimeRangePicker
            defaultValue={range}
            cbChangeRange={onSetDateTimeRange}
          />
        </div>
        <div className="userSearch">
          <ResultSearch
            onHandleKeyNameSearch={onHandleKeyNameSearch}
            intents={intents}
            handleAutocompleteSearch={handleAutocompleteSearch}
            handleSelectSearch={handleSelectSearch}
            reviewSearch={reviewSearch}
            participants={participants}
            type={type}
          />
        </div>
        <div className="userTable">
          <ResultTable
            userSays={userSays}
            onSetUserSays={onSetUserSays}
            isLoading={isLoading}
            page={page}
            allIntents={allIntents}
            campaignId={campaignId}
          />
        </div>
        <div className="pagination">
          {Object.keys(userSays).length > PAGINATION.TABLE_REVIEW && (
            <TablePagination
              rowsPerPageOptions={[]}
              count={Object.keys(userSays).length}
              rowsPerPage={PAGINATION.TABLE_REVIEW}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
            />
          )}
        </div>
      </Paper>
    </ContributionResultStyled>
  );
}
