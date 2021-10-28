import styled from 'styled-components';
import { FEATURE_COLOR } from '../../../styles/configs';

const ValidAudioRoomStyled = styled.div`
  .validRoomContainer {
    display: flex;
    width: 100%;
    height: 78vh;
  }
  .audioListWrapper {
    padding: 10px;
    height: 100%;
  }
  .audioInfo {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    margin-top: 10px;
    justify-content: space-between;
  }
  .audioInfo:hover {
    background-color: ${FEATURE_COLOR.havelockBlue};
    color: ${FEATURE_COLOR.white};
  }
  .active {
    background-color: ${FEATURE_COLOR.havelockBlue};
    color: ${FEATURE_COLOR.white};
  }
  .audioMenuList {
    flex: 3.5;
    position: sticky;
    top: 50px;
    overflow-y: auto;
  }
  .audioName {
    font-weight: 500;
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
`;

const ValidAudioPanelStyled = styled.div`
  flex: 8.5;
  .validAudioWrapper {
    display: flex;
    flex-direction: column;
    padding: 10px;
    height: 100%;
    position: relative;
  }
  .headerChatAudio {
    display: flex;
    align-items: center;
    height: 50px;
    justify-content: space-between;
    background-color: ${FEATURE_COLOR.havelockBlue};
  }
  .form-radio {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .tableFormat {
    width: 70%;
    height: 200px;
    overflow-y: auto;
  }
  .list-audio-selection {
    display: flex;
    justify-content: center;
    width: 50%;
    background-color: ${FEATURE_COLOR.white};
    overflow-y: scroll;
    height: 200px;
    padding: 10px;
  }
  .showText {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .button-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  button.skip {
    display: flex;
    cursor: pointer;

    border-radius: 50px;
    width: 160px;
    height: 40px;

    font-family: Open Sans, sans-serif;
    font-weight: 600;

    font-size: 0.9rem;
    align-items: center;
    justify-content: center;
    background-color: ${FEATURE_COLOR.white};
    color: ${FEATURE_COLOR.black};
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  button.skip:hover {
    border: 1px solid ${FEATURE_COLOR.black};
  }
  button.vote-button {
    border: none;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 1px;
    z-index: 2;
    background: ${FEATURE_COLOR.white};
    width: 100px;
    height: 46px;
    margin: 0 10px;
  }
  .yes {
    box-shadow: 0 5px 10px rgba(89, 203, 193, 0.3);
  }
  .yes:hover,
  .yes:active {
    background: ${FEATURE_COLOR.voteYes};
    box-shadow: 0 5px 10px rgba(89, 203, 193, 0.7);
    color: ${FEATURE_COLOR.white};
  }
  .yes:hover path {
    fill: ${FEATURE_COLOR.white};
  }
  .no {
    box-shadow: 0 5px 10px rgba(255, 79, 94, 0.2);
  }
  .no:hover,
  .no:active path {
    background: ${FEATURE_COLOR.voteNo};
    box-shadow: 0 5px 10px rgba(255, 79, 94, 0.6);
    color: ${FEATURE_COLOR.white};
  }
  .no:hover path {
    fill: ${FEATURE_COLOR.white};
  }
  .textWrapper {
    display: flex;
    justify-content: center;
  }
  .textField {
    width: 60%;
    background-color: ${FEATURE_COLOR.white};
    border-radius: 10px;
  }
  .buttonFill {
    color: ${FEATURE_COLOR.white};
  }
  .headerTable1 {
    width: 10vh;
  }
  .headerTable2 {
    width: 70vh;
  }
  .headerTable3 {
    width: 20vh;
  }
`;
const AudioPlayerStyled = styled.div`
  .audioPlayerWrapper {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .player {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    width: 50%;
    background-color: ${FEATURE_COLOR.oceanGreen};
  }
  .controls {
    flex-grow: 1;
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .playerButton {
    color: ${FEATURE_COLOR.white};
    font-size: 3em;
    display: block;
    height: 75px;
    width: 75px;
    border-radius: 50%;
  }
  .bar {
    user-select: none;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .bar__time {
    color: ${FEATURE_COLOR.white};
    font-size: 16px;
  }
  .bar__progress {
    flex: 1;
    border-radius: 5px;
    margin: 0 20px;
    height: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .bar__progress__knob {
    position: relative;
    height: 16px;
    width: 16px;
    border: 1.5px solid ${FEATURE_COLOR.white};
    border-radius: 50%;
    background-color: ${FEATURE_COLOR.buttercup};
  }
`;

export { ValidAudioRoomStyled, ValidAudioPanelStyled, AudioPlayerStyled };
