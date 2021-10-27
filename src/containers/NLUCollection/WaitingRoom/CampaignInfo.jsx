import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'moment';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  CardMedia,
  CardContent,
  Tooltip,
  Link,
} from '@material-ui/core';
import ShowActions from '../../../components/ShowActions';
import api from '../../../apis';
import { CampaignInfoStyled } from './index.style';

export default function CampaignInfo({ campaign }) {
  const history = useHistory();

  const [services, setServices] = useState([]);
  const { t } = useTranslation();

  const fetchServices = async () => {
    const { data } = await api.service.getServices({});
    if (data.status) setServices(data.result.services);
  };

  const getServiceName = (id) => {
    const element = services.find((item) => item.id === id);
    if (element) return t(element.name);
    return null;
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (!campaign) return <div />;

  return (
    <CampaignInfoStyled>
      <Link href={`/campaigns/${campaign.id}`}>
        <CardMedia
          className="cardMedia"
          image={campaign.image || '/images/default-image.jpg'}
          title={campaign.name}
        />
      </Link>
      <CardContent>
        <Tooltip title={campaign.name}>
          <Typography
            variant="h6"
            component="h6"
            noWrap
            gutterBottom
            className="campaignName"
            onClick={() => history.push(`/campaigns/${campaign.id}`)}
          >
            {campaign.name}
          </Typography>
        </Tooltip>
        <div>
          <Typography variant="body1">
            {`${t('status')}: ${t(campaign.status)}`}
          </Typography>
          <Typography variant="body1">
            {`${t('campaignVisibility')}:  ${t(campaign.campaignVisibility)}`}
          </Typography>
          <Typography variant="body1">
            {`${t('time')}: ${
              campaign.startTime &&
              Moment(campaign.timeStart).format('DD/MM/YYYY')
            } -  ${
              campaign.endTime && Moment(campaign.timeEnd).format('DD/MM/YYYY')
            }
                      `}
          </Typography>
          <Typography variant="body1">
            {`${t('collectDataService')}: `}
            {t(getServiceName(campaign.serviceId))}
          </Typography>
          <Typography variant="body1">
            {`${t('campaignAction')}: `}
            <ShowActions actions={campaign && campaign.actions} />
          </Typography>
        </div>
      </CardContent>
    </CampaignInfoStyled>
  );
}
