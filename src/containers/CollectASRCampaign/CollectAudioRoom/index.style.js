import styled from 'styled-components';

const CollectAudioRoomStyled = styled.div`
  .audio-chat {
    margin: 10px;
    height: 78vh;
    border-radius: 10px;
  }
  .header-chat-audio {
    display: flex;
    align-items: center;
    height: 50px;
    justify-content: space-between;
    background-color: #2d88ff;
  }
  .infinite-container {
    background-color: #f9f9f9;
    border: 2px solid #dedede;
    width: 100%;
    height: calc(100vh - 60vh);
    overflow-y: scroll;
    border-radius: 10px;
    margin-top: 2rem;
  }
  .messages {
    padding: 5% 0;
    overflow: auto;
    flex: auto;
  }
  .roomName {
    color: white;
  }
  .fillIcon {
    color: white;
  }
  .fillIconBlue {
    color: blue;
  }
  .instruction {
    margin-top: 20px;
    min-height: 23px;
    font-style: italic;
    color: #4a4a4a;
    margin-bottom: 2rem;
    justify-content: center;
    align-items: center;
    display: flex;
    font-family: Open Sans, sans-serif;
    font-size: 16px;
  }
  .button-listen {
    margin-bottom: 10px;
    justify-content: center;
    margin-left: 3rem;
    margin-right: 3rem;
  }
  .primary-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .canvas {
    position: absolute;
    width: 100% !important;
    max-width: calc(100vh - 40px);
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 3%,
      black,
      rgba(0, 0, 0, 0) 97%
    );
  }
  .primary-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
  }
  button.record {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    border: none;
    border-radius: 50%;
    width: 88px;
    height: 88px;
    background: white;
    opacity: 1;
    cursor: pointer;
  }
  .record.disabled {
    background-color: transparent;
  }
  .pill {
    z-index: 2;
    border-radius: 29px;
    box-sizing: border-box;
    width: 130px;
    height: 57px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .pill.done {
    background: white;
    border: none;
  }
  .pill.done.contents {
    display: flex !important;
    height: 100%;
    align-items: center;
  }
  .pill.done.recording.contents.padder {
    /*display: inline-block;*/
    /*border-inline-start: 1px solid #f3f2f1;*/
    /*padding: 0 16px;*/
  }
  .pill.active {
    border: 2px solid #e7e5e2;
    background: white;
  }
  button {
    border: none;
    padding: 0;
    height: 100%;
    background: none;
    cursor: pointer;
    outline: none;
  }
  button.play:hover path {
    fill: #59cbb7;
  }
  .placeholder {
    width: 110px;
  }
  button.redo:hover path {
    fill: #ff4f5e;
  }
  .gridStyleRight {
    z-index: 4;
    border-left: 1px solid #dedede;
  }
  .gridStyleLeft {
    display: flex;
    align-self: center;
    margin: auto;
    width: 100%;
  }
  .scenarioStyle {
    width: 100%;
    background-color: white;
  }
  .gridStyleScenario {
    height: calc(100vh - 119px);
    overflow-y: scroll;
  }
  @media screen and (max-width: 600px) {
    .instruction {
      font-size: 11px;
      word-wrap: break-word;
    }
  }
`;

export { CollectAudioRoomStyled };
