import styled from 'styled-components';

const UsecaseStyled = styled.div`
  .title {
    font-weight: bold;
  }
  .intentWrap {
    margin-bottom: 8px;
    .listItem {
      padding-bottom: 4px;
      padding-top: 4px;
    }
  }
  .tablePagination {
    display: flex;
    justify-content: flex-end;
  }
`;

const IntentStyled = styled.div`
  .intentWrap {
    margin-bottom: 8px;
  }
  .intentItem {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    .displayIntent {
      flex: 1;
    }
  }
  .tablePagination {
    display: flex;
    justify-content: flex-end;
  }
`;

export { UsecaseStyled, IntentStyled };
