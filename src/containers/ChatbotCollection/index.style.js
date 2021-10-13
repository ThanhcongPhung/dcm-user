import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import { FEATURE_COLOR } from '../../styles/configs';

const ChatbotCollectionStyled = styled(Grid)`
  height: 78vh;
  overflow: hidden;
  grid-gap: 20px;
  display: flex;
  flex-direction: row;
  .gridItem {
    min-width: 360px;
    height: 100%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border: 1px solid ${FEATURE_COLOR.backgroundMenu};
  }
  .messageChat {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .chatbotInfo {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
    .buttonConvertWrapper {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 10px;
      .icon {
        cursor: pointer;
      }
    }
  }
  .tabPanel {
    flex: 1;
    -webkit-box-flex: 1;
    overflow: hidden auto;
    &::-webkit-scrollbar {
      width: 10px;
    }
  }
`;

export { ChatbotCollectionStyled };
