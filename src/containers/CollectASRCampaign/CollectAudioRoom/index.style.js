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
  .messageContainer {
    display: flex;
    justify-content: flex-end;
    padding: 0 5%;
    margin-top: 3px;
  }
  .justifyStart {
    justify-content: flex-start;
  }
  .justifyEnd {
    justify-content: flex-end;
  }
  .text-username {
    display: flex;
    flex-direction: column;
  }
  .message-area {
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
  }
  .audio-text {
    display: flex;
    flex-direction: column;
  }
  .text-checkButton {
    display: flex;
  }
  .text-checkButton1 {
    display: flex;
    justify-content: flex-end;
  }
  .check-button {
    //display: none;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    position: relative;
  }
  .check-button1 {
    //display: none;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    position: relative;
  }

  button.check svg path {
    fill: black;
  }
  //.message-area:hover {
  //  --c: #3e4042;
  //}
  //.message-area > .check-button > button.check svg path {
  //  fill: var(--c);
  //}
  .double-button {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .edit-text {
    width: 400px;
    letter-spacing: 0;
    float: left;
    font-size: 15px;
    word-wrap: break-word;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    overflow: visible;
  }
  .messageBox {
    display: flex;
    flex-direction: row;
    background: #f3f3f3;
    border-radius: 20px;
    padding: 10px;
    color: white;
    max-width: 100%;
  }
  .backgroundBlue {
    background: #f1f1f1;
    width: 100%;
  }
  .backgroundBlue-loading {
    background: #f1f1f1;
    width: 100%;
    height: 25px;
    justify-content: center;
    align-items: center;
  }
  .backgroundLight {
    background: #edd1d1;
    width: 100%;
  }
  .messageText {
    width: 100%;
    letter-spacing: 0;
    float: left;
    font-size: 15px;
    word-wrap: break-word;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .messageText img {
    vertical-align: middle;
  }
  .colorWhite {
    color: black;
  }
  .useName {
    color: #b0b3b8;
    font-size: 0.6875rem;
  }
  .iconFontSize {
    font-size: 20px;
  }
  .textFieldStyle {
    color: black;
    font-size: 15px;
    overflow: visible;
  }
  .dotWrapper {
    display: flex;
    align-items: flex-end;
  }
  @keyframes bounceAnimation {
    0% {
      margin-bottom: 0;
    }
    50% {
      margin-bottom: 5px;
    }
    100% {
      margin-bottom: 0;
    }
  }
  .dot0s {
    background-color: black;
    border-radius: 50%;
    width: 6px;
    height: 6px;
    margin: 0 5px;
    animation: bounceAnimation 0.5s linear infinite;
    animation-delay: 0s;
  }
  .dot01s {
    background-color: black;
    border-radius: 50%;
    width: 6px;
    height: 6px;
    margin: 0 5px;
    animation: bounceAnimation 0.5s linear infinite;
    animation-delay: 0.1s;
  }
  .dot02s {
    background-color: black;
    border-radius: 50%;
    width: 6px;
    height: 6px;
    margin: 0 5px;
    animation: bounceAnimation 0.5s linear infinite;
    animation-delay: 0.2s;
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
  button.ASR_buttons {
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
    z-index: 2;
    border: none;
    outline: none;
    border-radius: 50px;
    width: 178px;
    height: 57px;
    color: white;
    background: #708fc1;
    text-transform: uppercase;
    font-family: Open Sans, sans-serif;
    font-weight: 600;
  }
  button.ASR_buttons:disabled,
  button.ASR_buttons[disabled] {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
  .scriptConfirmGrid {
    justify-content: center;
    align-items: center;
  }
  .buttonConfirm {
    display: flex;
    flex-direction: row;
  }
  .scenario {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
  }
  .scenarioText {
    padding-right: 20px;
    padding-left: 20px;
    font-size: 16px;
    float: left;
    overflow-y: auto;
    position: relative;
  }
  .scenarioText1 {
    padding-right: 20px;
    padding-left: 20px;
    font-size: 16px;
    float: left;
    overflow-y: auto;
    position: relative;
  }
  h3.scenario-subtitle {
    display: flex;
    justify-content: center;
  }
  .styleAutoComplete {
    width: 300px;
    margin-top: 10px;
  }
  .modalDisplay {
    top: 40%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: white;
    padding: 20px 40px 30px;
  }
  .buttonLeave {
    margin-left: 10px;
    background-color: #90caf9;
    color: #585d5e;
  }
  @media screen and (max-width: 600px) {
    .instruction {
      font-size: 11px;
      word-wrap: break-word;
    }
  }
`;

export { CollectAudioRoomStyled };
