/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
  ListItemIcon,
  CircularProgress,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { FormatQuote as FormatQuoteIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { AnswerHintCardStyled } from './index.style';

function Hints({ hints }) {
  return (
    <AnswerHintCardStyled>
      <List dense>
        {hints.map((hint, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <FormatQuoteIcon />
            </ListItemIcon>
            <ListItemText primary={hint} />
          </ListItem>
        ))}
      </List>
    </AnswerHintCardStyled>
  );
}

function IntentCard() {
  const { t } = useTranslation();
  const [answerHints, setAnswerHints] = useState();
  const [answerHintSelect, setAnswerHintSelect] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible((prev) => !prev);
  };

  const fetchAnswerHints = async () => {
    setAnswerHints([]);
  };

  useEffect(() => {
    fetchAnswerHints();
  }, []);

  if (!answerHints) return <CircularProgress />;
  return (
    <Paper>
      <AnswerHintCardStyled>
        {isVisible && (
          <div className="contentContainer">
            <div className="contentHeader" onClick={handleToggle} />
            <div className="contentBox">
              <Typography variant="h6" className="primaryText">
                {t('searchInfo')}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                className="secondaryText"
              >
                {t('searchInfoDesc')}
              </Typography>
              <Autocomplete
                size="small"
                options={answerHints}
                getOptionLabel={(option) => option.name}
                onChange={(e, newValue) => {
                  setAnswerHintSelect(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('referHere')}
                    variant="outlined"
                  />
                )}
              />
              {answerHintSelect && <Hints hints={answerHintSelect.answers} />}
            </div>
          </div>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="btn"
          onClick={handleToggle}
        >
          {t('search')}
        </Button>
      </AnswerHintCardStyled>
    </Paper>
  );
}

export default IntentCard;
