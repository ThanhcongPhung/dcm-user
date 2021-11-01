import styled from 'styled-components';

const CountdownTimerStyled = styled.div`
  h1 {
    text-align: center;
    margin-bottom: 40px;
  }
  .timer-wrapper {
    display: flex;
    justify-content: center;
  }
  .timer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .text {
    color: #aaa;
  }
  .value {
    font-size: 40px;
  }
  .info {
    max-width: 360px;
    margin: 40px auto 0;
    text-align: center;
    font-size: 16px;
  }
  .countdown {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const ConfirmModalStyled = styled.div`
  .textP {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .buttonStart {
    margin-left: 10px;
    background-color: #90caf9;
    color: #585d5e;
  }
  .dividerComponent {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .groupButton {
    float: right;
  }
  .modalPaper {
    top: 40%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: white;
    padding: 20px 40px 3px;
  }
`;

export { CountdownTimerStyled, ConfirmModalStyled };
