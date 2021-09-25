import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import { useTranslation } from 'react-i18next';
import { convertFromRaw, EditorState } from 'draft-js';
import { Typography, Grid, CardMedia } from '@material-ui/core';
import { Editor } from 'react-draft-wysiwyg';
import Card from '../../components/Card';
import DetailCondition from './ConfirmCondition';
import api from '../../apis';
import { CampaignDetailStyle } from './index.style';

export default function CampaignDetail({ campaignId }) {
  const [campaign, setCampaign] = useState();
  const [campaignType, setCampaignType] = useState();
  const [detailCampaign, setDetailCampaign] = useState({});
  const { t } = useTranslation();

  const showAction = () =>
    campaign.actions.map((item, index) =>
      index + 1 < campaign.actions.length ? `${t(item)}, ` : `${t(item)}`,
    );

  const fetchCampaign = async () => {
    const { data } = await api.campaign.getCampaign(campaignId);
    if (data.status) {
      setCampaignType(data.result.campaignType);
      setDetailCampaign(data.result.detailCampaign);
      setCampaign({
        ...data.result,
        description: EditorState.createWithContent(
          convertFromRaw(JSON.parse(data.result.description)),
        ),
      });
    }
  };

  useEffect(() => {
    if (campaignId) fetchCampaign();
  }, []);

  if (!campaign) return <div />;
  return (
    <CampaignDetailStyle>
      <Card
        flexDirection="column"
        padding="15px 32px 0 32px"
        minHeight="70vh"
        height="100%"
        margin="0"
      >
        <Typography variant="h4" align="center" gutterBottom>
          {t('campaignInfo')}
        </Typography>
        <Grid container spacing={2} className="baseContent">
          <Grid item xs={12} sm={6}>
            <CardMedia
              className="cardMedia"
              image={
                campaign.image ||
                `${process.env.PUBLIC_URL}/images/default-image.jpg`
              }
              title={campaign.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" gutterBottom className="title">
              {`${t('campaignName')}: ${campaign.name}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {`${t('campaignVisibility')}: ${t(campaign.campaignVisibility)}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {`${t('collectDataService')}: ${
                campaign && campaign.service && campaign.service.name
              }`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {`${t('campaignAction')}: `}
              {showAction()}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {`${t('time')}: `}
              {Moment(campaign.startTime).format('DD/MM/YYYY')} -{' '}
              {Moment(campaign.endTime).format('DD/MM/YYYY')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {`${t('status')}: ${t(campaign.status)}`}
            </Typography>
          </Grid>
        </Grid>
        <div className="description">
          <Typography
            variant="h6"
            component="h6"
            gutterBottom
            className="title"
          >
            {t('campaignDescription')}
          </Typography>
          <div className="detail">
            <Editor
              toolbarHidden
              editorState={campaign.description}
              readOnly="true"
            />
          </div>
        </div>
        <DetailCondition
          detailCampaign={detailCampaign}
          campaignType={campaignType}
        />
      </Card>
    </CampaignDetailStyle>
  );
}
