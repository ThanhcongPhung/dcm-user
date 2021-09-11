import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import { FEATURE_COLOR } from '../../styles/configs';

const ChatbotCollectionStyled = styled(Grid)`
  height: 78vh;
  overflow: hidden;
  .gridItem {
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
`;

export { ChatbotCollectionStyled };
