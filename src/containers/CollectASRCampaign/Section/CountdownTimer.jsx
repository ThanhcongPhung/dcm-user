import React from 'react';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useTranslation } from 'react-i18next';
import { CountdownTimerStyled } from './index.style';

export default function CountdownTimer(props) {
  const { isPlaying, duration, handleTimeout } = props;
  const { t } = useTranslation();

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">{t('missed')}</div>;
    }

    return (
      <div className="timer">
        <div className="text">{t('countdown')}</div>
        <div className="value">{remainingTime}</div>
      </div>
    );
  };

  return (
    <CountdownTimerStyled>
      <div className="countdown">
        <CountdownCircleTimer
          onComplete={() => {
            handleTimeout();
          }}
          isPlaying={isPlaying}
          duration={duration}
          /* eslint-disable-next-line react/no-children-prop */
          children={renderTime}
          colors={[
            ['#004777', 0.33],
            ['#F7B801', 0.33],
            ['#A30000', 0.33],
          ]}
        />
      </div>
    </CountdownTimerStyled>
  );
}
