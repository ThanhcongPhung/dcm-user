import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AudioPlayList({ active, audio, index, onClick }) {
  const { t } = useTranslation();

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={active ? 'audioInfo active' : 'audioInfo'}
      onClick={onClick}
    >
      <span>{`${t('sentence')} ${index + 1}`}</span>
      <span className="audioName">{audio.originTranscript}</span>
    </div>
  );
}
