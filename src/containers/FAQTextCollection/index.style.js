import styled from 'styled-components';
import { BOX_SHADOW, FEATURE_COLOR } from '../../styles/configs';

export const ContentStyled = styled.div`
  .contribute-container {
    padding: 10px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;
  }
  .headTitle {
    text-transform: uppercase;
  }
  .text-icon {
    cursor: pointer;
  }
  .intent {
    width: 80%;
    margin: 0 auto;
  }
  .btn-group {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    .headButton {
      margin: 5px;
      padding: 5px;
      color: white;
    }
    .add-btn {
      margin-left: 10px;
    }
  }
  .iconButton {
    background-color: ${FEATURE_COLOR.primary} !important;
    box-shadow: ${BOX_SHADOW.card};
    .addIcon {
      color: ${FEATURE_COLOR.white};
    }
  }
  .dynamic-row {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dynamic-input {
    width: 88%;
  }
  .icon-btn {
    border: 1px solid ${FEATURE_COLOR.border};
    padding: 5px;
    margin-left: 5px;
  }
`;
