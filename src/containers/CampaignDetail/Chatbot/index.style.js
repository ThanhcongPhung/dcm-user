import styled from 'styled-components';
import { BORDER_RADIUS, FEATURE_COLOR } from '../../../styles/configs';

const DetailUsecaseStyled = styled.div`
  .title {
    font-weight: bold;
  }
  .content {
    margin: 0;
    .accordionItem {
      &:before {
        top: 0;
        height: 0;
      }
    }
    .MuiPaper-elevation1 {
      border: 1px solid ${FEATURE_COLOR.borderColor};
      border-radius: ${BORDER_RADIUS}px;
      box-shadow: none;
      margin-bottom: 10px;
    }
  }
  .detailContent {
    flex-direction: column;
    .list {
      display: flex;
      flex-direction: column;
      padding-top: 0;
      .listItem {
        padding-top: 4px;
        padding-bottom: 4px;
      }
      .tablePagination {
        justify-content: flex-end;
      }
    }
  }
`;

const DetailIntentStyled = styled.div`
  .title {
    font-weight: bold;
  }
  .list {
    display: flex;
    flex-direction: column;
    padding-top: 0;
    margin: 0;
    .listItem {
      padding-top: 4px;
      padding-bottom: 4px;
    }
    .tablePagination {
      justify-content: flex-end;
    }
  }
`;

export { DetailUsecaseStyled, DetailIntentStyled };
