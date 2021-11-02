import styled from 'styled-components';
import { BORDER_RADIUS, FEATURE_COLOR } from '../../../../styles/configs';

const DomainDetailStyled = styled.div`
  border-top-left-radius: ${BORDER_RADIUS};
  border-top-right-radius: ${BORDER_RADIUS};
  height: 100%;
  display: flex;
  flex-direction: column;
  .tabContent {
    height: calc(100vh - 128px - 32px - 48px - 36px);
    overflow: auto;
  }
`;

const AnswerHintCardStyled = styled.div`
  flex-grow: 1;
  background: ${FEATURE_COLOR.white};
  z-index: 99;
  display: flex;
  flex-direction: column;
  .contentContainer {
    flex-grow: 1;
    border-top-left-radius: ${BORDER_RADIUS};
    border-top-right-radius: ${BORDER_RADIUS};
  }
  .contentHeader {
    height: 20;
    border-top-left-radius: ${BORDER_RADIUS};
    border-top-right-radius: ${BORDER_RADIUS};
    background-color: ${FEATURE_COLOR.primary};
    cursor: pointer;
  }
  .contentBox {
    padding: 16px;
    height: calc(100vh - 128px - 32px - 48px - 80px);
    overflow: auto;
  }
  .primaryText {
    font-weight: bold;
    padding: 0;
  }
  .listHint {
    list-style-type: circle;
  }
`;

const IntentCardStyled = styled.div`
  flex-grow: 1;
  .primaryText {
    font-weight: bold;
  }
  .secondaryText {
    font-weight: bold;
  }
`;

const MainIntentStyled = styled.div`
  flex-grow: 1;
  .primaryText {
    font-weight: bold;
  }
  .note {
    margin-top: 10px;
  }
`;

const OtherIntentsStyled = styled.div`
  flex-grow: 1;
  .primaryText {
    font-weight: bold;
  }
  .card {
    padding: 8px;
    margin: 10px 0;
  }
`;

export {
  DomainDetailStyled,
  AnswerHintCardStyled,
  IntentCardStyled,
  MainIntentStyled,
  OtherIntentsStyled,
};
