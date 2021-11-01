import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Paper, Typography, Link, TablePagination } from '@material-ui/core';
import DateTimeRangePicker from '../../components/DateTimeRangePicker';
import ReviewSearch from './ReviewSearch';
import ReviewTable from './ReviewTable';
import api from '../../apis';
import { PAGINATION } from '../../constants';
import { IntentReviewStyled } from './index.style';

const week = [
  moment().startOf('day').subtract(1, 'month'),
  moment().endOf('day'),
];

export default function IntentReview() {
  const { campaignId } = useParams();
  const [range, setRange] = useState(week);
  const [allIntents, setAllIntents] = useState([]);
  const [intents, setIntents] = useState([]);
  const [userSays, setUserSays] = useState({});
  const [campaign, setCampaign] = useState();
  const [reviewSearch, setReviewSearch] = useState({
    usecaseId: 'total',
    userSay: '',
    intentNames: [],
    status: 'total',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [usecases, setUsecases] = useState([]);

  const { t } = useTranslation();

  const onSetUserSays = (value) => setUserSays(value);

  const fetchUserSays = async (fields) => {
    setIsLoading(true);
    const { userSaySearch, status, intentNames, dateRange, usecaseId } = fields;
    const { data } = await api.chatbotReview.getUserSays({
      search: userSaySearch,
      campaignId,
      intentNames,
      status: status && status !== 'total' ? status : '',
      range: dateRange || range,
      sort: 'createdAt_desc',
      type: 'FILTER',
      usecaseId: usecaseId && usecaseId !== 'total' ? usecaseId : '',
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
    if (data.status) setCampaign(data.result);
  };

  const fetchUsecases = async () => {
    const { data } = await api.chatbot.getUsecases(campaignId);
    if (data.status) setUsecases(data.result);
  };

  const fetchIntents = async (usecaseId) => {
    const { data } = await api.chatbot.getIntents(campaignId, usecaseId);
    if (data.status) setIntents(data.result);
  };

  const fetchCampaignAllIntents = async () => {
    const { data } = await api.campaign.getIntents(campaignId);
    if (data.status) setAllIntents(data.result.intents);
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
    setReviewSearch((prev) => ({ ...prev, values }));
    fetchUserSays({ ...reviewSearch, intentNames });
    setPage(0);
  };

  const handleSelectSearch = (e) => {
    setReviewSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    fetchUserSays({ ...reviewSearch, [e.target.name]: e.target.value });
    setPage(0);
  };

  const handleUsecaseSearch = (e) => {
    setReviewSearch((prev) => ({ ...prev, usecaseId: e.target.value }));
    fetchUserSays({ ...reviewSearch, usecaseId: e.target.value });
    if (e.target.value === 'total') {
      setIntents([]);
    } else {
      fetchIntents(e.target.value);
    }
    setPage(0);
  };

  useEffect(() => {
    if (campaignId) {
      fetchCampaign();
      fetchUsecases();
      fetchUserSays(reviewSearch);
      fetchCampaignAllIntents();
    }
  }, []);

  return (
    <IntentReviewStyled>
      <Paper className="container">
        <div className="header">
          <Typography variant="h5" className="headTitle">
            {`${t('campaignReview')}: `}
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
          <ReviewSearch
            onHandleKeyNameSearch={onHandleKeyNameSearch}
            intents={intents}
            handleAutocompleteSearch={handleAutocompleteSearch}
            handleSelectSearch={handleSelectSearch}
            reviewSearch={reviewSearch}
            campaignType={campaign && campaign.campaignType}
            usecases={usecases}
            handleUsecaseSearch={handleUsecaseSearch}
          />
        </div>
        <div className="userTable">
          <ReviewTable
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
    </IntentReviewStyled>
  );
}
