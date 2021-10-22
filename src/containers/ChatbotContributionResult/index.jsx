import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Paper, Typography, Link, TablePagination } from '@material-ui/core';
import ResultSearch from './ResultSearch';
import ResultTable from './ResultTable';
import api from '../../apis';
import { PAGINATION } from '../../constants';
import { ContributionResultStyled } from './index.style';

export default function ChatbotContributorResult() {
  const { campaignId } = useParams();
  const [allIntents, setAllIntents] = useState([]);
  const [intents, setIntents] = useState([]);
  const [userSays, setUserSays] = useState({});
  const [campaign, setCampaign] = useState();
  const [reviewSearch, setReviewSearch] = useState({
    userSay: '',
    intentNames: [],
    status: 'total',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const { t } = useTranslation();

  const onSetUserSays = (value) => setUserSays(value);

  const fetchUserSays = async (fields) => {
    setIsLoading(true);
    const { userSaySearch, status, intentNames } = fields;
    const { data } = await api.chatbotReview.getUserSays({
      search: userSaySearch,
      campaignId,
      intentNames,
      status: status && status !== 'total' ? status : '',
      sort: 'createdAt_desc',
      type: 'FILTER',
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

  const fetchCampaignAllIntents = async () => {
    const { data } = await api.campaign.getIntents(campaignId);
    if (data.status) setAllIntents(data.result.intents);
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
    }
  }, []);

  return (
    <ContributionResultStyled>
      <Paper className="container">
        <div className="header">
          <Typography variant="h5" className="headTitle">
            {`${t('contributionResult')}: `}
            <Link
              href={`/campaigns/${campaignId}`}
              color="inherit"
              underline="none"
            >
              {campaign && campaign.name}
            </Link>
          </Typography>
        </div>
        <div className="userSearch">
          <ResultSearch
            onHandleKeyNameSearch={onHandleKeyNameSearch}
            intents={intents}
            handleAutocompleteSearch={handleAutocompleteSearch}
            handleSelectSearch={handleSelectSearch}
            reviewSearch={reviewSearch}
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
