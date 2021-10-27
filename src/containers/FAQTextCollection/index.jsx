import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Paper,
  Button,
  TextField,
  IconButton,
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { validateUserSay, normalizeString } from './validUserSay';
import apis from '../../apis';
import { ContentStyled } from './index.style';

export default function TextContribute() {
  const { campaignId } = useParams();
  const [intent, setIntent] = useState({});
  const [processedIntent, setProcessedIntent] = useState('');
  const [userSays, setUserSays] = useState([{ userSay: '', id: uuidv4() }]);

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleAddField = async () => {
    const temp = [...userSays, { id: uuidv4(), userSay: '', error: false }];
    await setUserSays(temp);
  };

  const handleRemoveFields = async (inputField) => {
    const values = [...userSays];
    values.splice(
      values.findIndex((value) => value.id === inputField.id),
      1,
    );
    await setUserSays(values);
  };

  const handleChangeUserSay = async (id, event) => {
    const newInputFields = userSays.map((i) => {
      const item = i;
      if (id === i.id) {
        item.userSay = event.target.value;
        item.error = !!validateUserSay(event.target.value, processedIntent);
      }
      return item;
    });

    await setUserSays(newInputFields);
  };

  const fetchRandomIntent = async () => {
    const { data } = await apis.faqIntent.getRandomIntents(campaignId);
    if (data.status) {
      const intents = data.result;
      setIntent(intents[0]);
      setProcessedIntent(normalizeString(intents[0].intent));
    }
  };

  const resetData = () => {
    fetchRandomIntent();
    setUserSays([{ userSay: '', id: uuidv4(), error: false }]);
  };

  const handleNext = async () => {
    const validSentences = userSays.filter(
      (sent) => sent.userSay !== '' && !sent.error,
    );
    if (validSentences.length > 0) {
      const { data } = await apis.faqCampaign.contributeSimilarSentence({
        campaignId,
        intentId: intent.id,
        userSays: validSentences.map((us) => us.userSay),
      });
      if (data.status) {
        enqueueSnackbar(
          `${t('youHaveContributedMore')} ${validSentences.length} ${t(
            'sentence',
          )}`,
          { variant: 'success' },
        );
        resetData();
      }
    } else {
      enqueueSnackbar(t('atLeastOneSentenceValid'), { variant: 'error' });
    }
  };

  useEffect(() => {
    if (campaignId) {
      fetchRandomIntent();
    }
  }, []);

  return (
    <ContentStyled>
      <Paper className="contribute-container">
        <div className="header">
          <Typography variant="h5" className="headTitle">
            {t('sentenceSimilar')}
          </Typography>
          <div className="headButtons">
            <Typography>{t('guide')}</Typography>
          </div>
        </div>
        <hr />
        <div>
          <Typography variant="h5" align="center" className="intent">
            {intent.intent}
          </Typography>
          {userSays &&
            userSays.map((inputField) => (
              <div key={inputField.id} className="dynamic-row">
                <TextField
                  inputProps={{ 'aria-label': 'naked' }}
                  variant="outlined"
                  value={inputField.userSay}
                  onChange={(e) => handleChangeUserSay(inputField.id, e)}
                  placeholder={t('enterSentenceSimilar')}
                  margin="normal"
                  className="dynamic-input"
                  error={inputField.error}
                  helperText={inputField.error && t('sameOriginalSentence')}
                />
                {userSays.length > 1 && (
                  <IconButton
                    onClick={() => handleRemoveFields(inputField)}
                    className="icon-btn"
                  >
                    <RemoveIcon />
                  </IconButton>
                )}
                <IconButton onClick={handleAddField} className="icon-btn">
                  <AddIcon />
                </IconButton>
              </div>
            ))}
        </div>
        <div className="btn-group">
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={handleNext}
          >
            {t('next')}
          </Button>
        </div>
      </Paper>
    </ContentStyled>
  );
}
