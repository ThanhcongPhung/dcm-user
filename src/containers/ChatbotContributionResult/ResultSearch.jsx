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
import { REVIEW_RESULT_STATUS } from '../../constants';
import { ResultSearchStyled } from './index.style';

export default function ResultSearch({
  intents,
  onHandleKeyNameSearch,
  reviewSearch,
  handleAutocompleteSearch,
  handleSelectSearch,
}) {
  const { t } = useTranslation();

  return (
    <ResultSearchStyled>
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
    </ResultSearchStyled>
  );
}
