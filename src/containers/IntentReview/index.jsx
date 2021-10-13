import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Paper, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import DateTimeRangePicker from '../../components/DateTimeRangePicker';
import ReviewSearch from './ReviewSearch';
import ReviewTable from './ReviewTable';
import api from '../../apis';
import { PAGINATION } from '../../constants';
import { IntentReviewStyled } from './index.style';

const week = [
  moment().startOf('day').subtract(1, 'week').add(1, 'day'),
  moment().endOf('day'),
];

export default function IntentReview() {
  const { campaignId } = useParams();
  const [range, setRange] = useState(week);
  const [intents, setIntents] = useState([]);
  const [userSays, setUserSays] = useState({});
  const [campaign, setCampaign] = useState();
  const [reviewSearch, setReviewSearch] = useState({
    userSay: '',
    intentIds: [],
    status: 'total',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGINATION.TABLE_REVIEW,
    totalPages: 1,
  });

  const { t } = useTranslation();

  const onSetUserSays = (value) => setUserSays(value);

  const fetchUserSays = async (fields) => {
    setIsLoading(true);
    const { offset, userSaySearch, intentId, status } = fields;
    const { data } = await api.chatbotReview.getUerSays({
      offset,
      search: userSaySearch,
      campaignId,
      intentId: intentId && intentId !== 'total' ? intentId : '',
      status: status && status !== 'total' ? status : '',
      range,
      limit: pagination.limit,
      sort: 'createdAt_desc',
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
      setUserSays(objectUsersays);
      setPagination((prev) => ({
        ...prev,
        totalPages: Math.ceil(data.result.metadata.total / pagination.limit),
      }));
    }
  };

  const fetchCampaign = async () => {
    const { data } = await api.campaign.getCampaign(campaignId);
    if (data.status) setCampaign(data.result);
  };

  const fetchIntents = async () => {
    const { data } = await api.chatbot.getIntents(campaignId);
    if (data.status) setIntents(data.result);
  };

  const handleChangePagination = (e, value) =>
    setPagination((prev) => ({ ...prev, page: value }));

  const onSetDateTimeRange = (changeRange) => setRange(changeRange);

  const onHandleKeyNameSearch = (searchValue) => {
    setReviewSearch((prev) => ({ ...prev, userSay: searchValue }));
    fetchUserSays({ userSaySearch: searchValue });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleAutocompleteSearch = (name) => (event, values) => {
    setReviewSearch((prev) => ({ ...prev, [name]: values }));
    fetchUserSays({ ...reviewSearch, [name]: values });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSelectSearch = (e) => {
    setReviewSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    fetchUserSays({ ...reviewSearch, [e.target.name]: e.target.value });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  useEffect(() => {
    if (campaignId) {
      fetchCampaign();
      fetchIntents();
      fetchUserSays(reviewSearch);
    }
  }, []);

  return (
    <IntentReviewStyled>
      <Paper className="container">
        <div className="header">
          <Typography variant="h5" className="headTitle">
            {`${t('campaignReview')}: `} {campaign && campaign.name}
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
          />
        </div>
        <div className="userTable">
          <ReviewTable
            userSays={userSays}
            onSetUserSays={onSetUserSays}
            isLoading={isLoading}
            pagination={pagination}
            intents={intents}
          />
        </div>
        <div className="pagination">
          <Pagination
            page={pagination.page}
            count={pagination.totalPages}
            onChange={handleChangePagination}
          />
        </div>
      </Paper>
    </IntentReviewStyled>
  );
}
