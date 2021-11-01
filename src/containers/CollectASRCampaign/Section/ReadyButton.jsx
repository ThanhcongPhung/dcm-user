import React, { useState, useRef, useEffect } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Mic, Pause } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

export default function ReadyButton(props) {
  const { readyStatus, readySignal, cancelReadySignal } = props;
  const [timer, setTimer] = useState(0);
  const increment = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!readyStatus) {
      clearInterval(increment.current);
      setTimer(0);
    }
  }, [readyStatus]);

  const ready = () => {
    readySignal();
    increment.current = setInterval(() => {
      // eslint-disable-next-line no-shadow
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const cancelReady = () => {
    cancelReadySignal();
    clearInterval(increment.current);
    setTimer(0);
  };

  const timeConverter = (seconds) => {
    const format = (val) => `0${Math.floor(val)}`.slice(-2);
    const hours = seconds / 3600;
    const minutes = (seconds % 3600) / 60;

    return [hours, minutes, seconds % 60].map(format).join(':');
  };

  return (
    <>
      <div className="primary-button">
        {!readyStatus ? (
          <Button onClick={ready} className="record" type="button">
            <Mic />
          </Button>
        ) : (
          <Button onClick={cancelReady} className="record" type="button">
            <Pause />
          </Button>
        )}
        <div className="primary-button background" />
      </div>
      {readyStatus && (
        <Grid container>
          <Grid item>{`${t('findingOthers')} ${timeConverter(timer)}`}</Grid>
        </Grid>
      )}
    </>
  );
}
