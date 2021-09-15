import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Moment from 'moment';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CircularProgress,
  CardContent,
  CardActions,
  Tooltip,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { getUrlParams } from '../../utils/object';
import api from '../../apis';
import { CAMPAIGN_STATUS, PAGINATION_LIMIT } from '../../constants';
import ShowButton from './ShowButton';
import SearchCampaign from './SearchCampaign';
import { CampaignListStyle } from './index.style';

const searchInit = {
  search: '',
  serviceId: 'total',
  status: 'total',
  parStatus: 'total',
};

export default function CampaignList() {
  const history = useHistory();
  const location = useLocation();
  const { participantStatus } = useParams();
  const { pageType } = getUrlParams(location.search);
  const [services, setServices] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [campaignSearch, setCampaignSearch] = useState(searchInit);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGINATION_LIMIT,
    totalPages: 1,
  });
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const fetchCampaigns = async (fields) => {
    setIsLoading(true);
    const { offset, search, serviceId, parStatus, status } = fields;
    const { data } = await api.campaign.getCampaigns({
      offset,
      search,
      serviceId: serviceId && serviceId !== 'total' ? serviceId : '',
      participantStatus:
        parStatus && parStatus !== 'total'
          ? parStatus.toUpperCase().replace('-', '_')
          : '',
      status: status && status !== 'total' ? status : '',
      userId: user.userId,
      limit: pagination.limit,
      sort: 'createdAt_desc',
    });
    setIsLoading(false);
    if (data.status) {
      setCampaigns(data.result.campaigns);
      setPagination((prev) => ({
        ...prev,
        totalPages: Math.ceil(data.result.metadata.total / pagination.limit),
      }));
    }
  };

  const fetchServices = async () => {
    const { data } = await api.service.getServices({});
    if (data.status) setServices(data.result.services);
  };

  const handleChangePagination = (e, value) => {
    setPagination((prev) => ({ ...prev, page: value }));
    fetchCampaigns({
      offset: (value - 1) * pagination.limit,
      parStatus: participantStatus || campaignSearch.parStatus,
      ...campaignSearch,
    });
  };

  const getServiceName = (id) => {
    const element = services.find((item) => item.id === id);
    if (element) return t(element.name);
    return null;
  };

  const handleJoinCampaign = async (campaignId, status) => {
    const { data } = await api.campaign.joinCampaign(campaignId);
    if (data.status) {
      if (status === CAMPAIGN_STATUS.WAITING) {
        fetchCampaigns({
          offset: (pagination.page - 1) * pagination.limit,
          parStatus: participantStatus,
        });
      } else {
        // TODO:
        history.push('/collect-data');
      }
      return enqueueSnackbar(t('joinCampaignSuccess'), { variant: 'success' });
    }
    return enqueueSnackbar(t('joinCampaignFailure'), { variant: 'error' });
  };
  const handleLeaveCampaign = async (campaignId) => {
    const { data } = await api.campaign.leaveCampaign(campaignId);
    if (data.status) {
      fetchCampaigns({
        offset: (pagination.page - 1) * pagination.limit,
        parStatus: participantStatus,
      });
      setPagination((prev) => ({ ...prev, page: pagination.page }));
      return enqueueSnackbar(t('leaveCampaignSuccess'), { variant: 'success' });
    }
    return enqueueSnackbar(t('leaveCampaignFailure'), { variant: 'error' });
  };

  const handleChangeSearch = (e) => {
    setCampaignSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    fetchCampaigns({ ...campaignSearch, [e.target.name]: e.target.value });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const onHandleSearchName = (searchValue) => {
    setCampaignSearch((prev) => ({ ...prev, search: searchValue }));
    fetchCampaigns({ search: searchValue });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  useEffect(() => {
    fetchServices();
    fetchCampaigns({ parStatus: participantStatus || '' });
  }, [participantStatus]);

  return (
    <CampaignListStyle>
      <Typography gutterBottom variant="h4" component="h4" align="center">
        {pageType === 'search' ? t('searchCampaign') : t('campaignList')}
      </Typography>
      {pageType === 'search' && (
        <SearchCampaign
          services={services}
          campaignSearch={campaignSearch}
          onHandleSearchName={onHandleSearchName}
          handleChangeSearch={handleChangeSearch}
        />
      )}
      <Grid container spacing={2} className="content">
        {campaigns.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={6} lg={4} xl={3}>
            <Card className="card">
              <CardMedia
                className="cardMedia"
                image={
                  item.image ||
                  `${process.env.PUBLIC_URL}/images/default-image.jpg`
                }
                title={item.name}
              />
              <CardContent>
                <Tooltip title={item.name}>
                  <Typography
                    variant="h6"
                    component="h6"
                    noWrap
                    gutterBottom
                    className="campaignName"
                  >
                    {item.name}
                  </Typography>
                </Tooltip>
                <div>
                  <Typography variant="body1">
                    {`${t('status')}: ${t(item.status)}`}
                  </Typography>
                  <Typography variant="body1">
                    {`${t('campaignVisibility')}:  ${t(
                      item.campaignVisibility,
                    )}`}
                  </Typography>
                  <Typography variant="body1">
                    {`${t('time')}: ${
                      item.startTime &&
                      Moment(item.timeStart).format('DD/MM/YYYY')
                    } -  ${
                      item.endTime && Moment(item.timeEnd).format('DD/MM/YYYY')
                    }
                      `}
                  </Typography>
                  <Typography variant="body1">
                    {`${t('collectDataService')}: `}
                    {t(getServiceName(item.serviceId))}
                  </Typography>
                  <Typography variant="body1">
                    {`${t('campaignAction')}: ${t(item.action)}`}
                  </Typography>
                </div>
              </CardContent>
              <CardActions className="cardActions">
                <ShowButton
                  userId={user.userId}
                  campaignId={item.id}
                  status={item.status}
                  participants={item.participants}
                  handleJoinCampaign={handleJoinCampaign}
                  handleLeaveCampaign={handleLeaveCampaign}
                  campaignType={item.campaignType}
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
        {!campaigns.length && !isLoading && (
          <div className="noData">
            <Typography variant="body1">{t('noData')}</Typography>
          </div>
        )}
      </Grid>
      {isLoading && (
        <div className="loader-view">
          <CircularProgress />
        </div>
      )}
      <div className="pagination">
        <Pagination
          page={pagination.page}
          count={pagination.totalPages}
          onChange={handleChangePagination}
        />
      </div>
    </CampaignListStyle>
  );
}
