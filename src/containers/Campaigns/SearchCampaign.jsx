import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import SearchInput from '../../components/SearchInput';
import { CAMPAIGN_STATUS, SUB_CAMPAIGN } from '../../constants';
import { SearchCampaignStyled } from './index.style';

export default function SearchCampaign({
  services,
  campaignSearch,
  onHandleSearchName,
  handleChangeSearch,
}) {
  const { t } = useTranslation();

  return (
    <SearchCampaignStyled>
      <SearchInput onHandleSearch={onHandleSearchName} title="searchCampaign" />
      <FormControl variant="outlined" className="search-information">
        <InputLabel>{t('participantStatus')}</InputLabel>
        <Select
          label={t('participantStatus')}
          name="parStatus"
          value={campaignSearch.parStatus}
          onChange={handleChangeSearch}
        >
          <MenuItem value="total">{t('total')}</MenuItem>
          {Object.keys(SUB_CAMPAIGN).map((item) => (
            <MenuItem value={item} key={item}>
              {t(item)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className="search-information">
        <InputLabel>{t('collectDataService')}</InputLabel>
        <Select
          label={t('collectDataService')}
          name="serviceId"
          value={campaignSearch.serviceId}
          onChange={handleChangeSearch}
        >
          <MenuItem value="total">{t('total')}</MenuItem>
          {services.map((serviceItem) => (
            <MenuItem value={serviceItem.id} key={serviceItem.id}>
              {serviceItem.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className="search-information">
        <InputLabel>{t('status')}</InputLabel>
        <Select
          label={t('status')}
          name="status"
          value={campaignSearch.status}
          onChange={handleChangeSearch}
        >
          <MenuItem value="total">{t('total')}</MenuItem>
          {Object.keys(CAMPAIGN_STATUS).map((value) => (
            <MenuItem value={value} key={value}>
              {t(value)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </SearchCampaignStyled>
  );
}
