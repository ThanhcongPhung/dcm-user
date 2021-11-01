import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchInput from '../../components/SearchInput';
import { CAMPAIGN_TYPE, REVIEW_RESULT_STATUS } from '../../constants';
import { ReviewSearchStyled } from './index.style';

export default function ReviewSearch({
  intents,
  onHandleKeyNameSearch,
  reviewSearch,
  handleAutocompleteSearch,
  handleSelectSearch,
  usecases,
  campaignType,
  handleUsecaseSearch,
}) {
  const { t } = useTranslation();

  return (
    <ReviewSearchStyled
      isChatbotUsecase={campaignType === CAMPAIGN_TYPE.CHATBOT_USECASE}
    >
      {campaignType === CAMPAIGN_TYPE.CHATBOT_USECASE && (
        <FormControl variant="outlined" className="search-information">
          <InputLabel>{t('usecase')}</InputLabel>
          <Select value={reviewSearch.usecaseId} onChange={handleUsecaseSearch}>
            <MenuItem value="total">{t('total')}</MenuItem>
            {usecases &&
              usecases.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {t(item.name)}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}
      <div className="search-information">
        <SearchInput
          variant="outlined"
          onHandleSearch={onHandleKeyNameSearch}
          title="userSaySearch"
        />
      </div>
      <div className="search-information">
        <Autocomplete
          multiple
          options={intents}
          getOptionLabel={(option) => option.displayName}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder={t('chooseIntents')}
              label={t('intent')}
            />
          )}
          value={reviewSearch.intentIds}
          onChange={handleAutocompleteSearch}
        />
      </div>
      <FormControl variant="outlined" className="search-information">
        <InputLabel>{t('status')}</InputLabel>
        <Select
          value={reviewSearch.status}
          name="status"
          onChange={handleSelectSearch}
        >
          <MenuItem value="total">{t('total')}</MenuItem>
          {Object.keys(REVIEW_RESULT_STATUS).map((item) => (
            <MenuItem value={item} key={item}>
              {t(item)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ReviewSearchStyled>
  );
}
