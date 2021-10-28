import React, { useEffect, useRef, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/all';
import { Button } from '@material-ui/core';
import TimeBar from './TimeBar';
import { AudioPlayerStyled } from './index.style';

export default function AudioPlayer({
  audioLink,
  playing,
  setPlaying,
  setHasPlayed,
}) {
  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState();
  const [clickedTime, setClickedTime] = useState();
  const [percentage, setPercentage] = useState();
  const audioRef = useRef();

  const play = () => {
    const audio = audioRef.current;
    const prevValue = playing;
    setPlaying(!prevValue);
    if (!prevValue) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const hasPlayed1 = () => {
    setHasPlayed(true);
    setPlaying(false);
  };
  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;
    setPercentage(+percent);
    setCurTime(time);
  };

  useEffect(() => {
    if (curTime === duration) {
      play();
      setPercentage(0);
    }
  }, [curTime]);

  useEffect(() => {
    const audio = audioRef.current;

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    }
  });

  return (
    <AudioPlayerStyled>
      <div className="audioPlayerWrapper">
        <div className="player">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio
            src={audioLink}
            ref={audioRef}
            onEnded={hasPlayed1}
            onTimeUpdate={getCurrDuration}
            onLoadedData={(e) => {
              setDuration(e.currentTarget.duration);
              setCurTime(e.currentTarget.currentTime);
            }}
            preload="auto"
          />
          <div className="controls">
            <Button className="playerButton" onClick={play}>
              {playing ? <FaPause /> : <FaPlay />}
            </Button>
            <TimeBar
              curTime={curTime}
              duration={duration}
              onTimeUpdate={(time) => setClickedTime(time)}
              curPercentage={percentage}
            />
          </div>
        </div>
      </div>
    </AudioPlayerStyled>
  );
}
