import styled from 'styled-components';
import { FEATURE_COLOR } from '../../styles/configs';

const ContributionResultStyled = styled.div`
  .container {
    min-height: 70vh;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding: 15px 5px;
    align-items: center;
    .headTitle {
      text-transform: uppercase;
    }
  }
`;

const ResultSearchStyled = styled.div`
  display: flex;
  margin: 8px 0;
  .search-information {
    width: ${(props) =>
      props.manageType ? 'calc(100% / 4 - 10px)' : 'calc(100% / 3 - 10px)'};
    margin-right: 10px;
  }
`;

const TableStyled = styled.div`
  .headerCell {
    background: ${FEATURE_COLOR.havelockBlue};
    border: 1px solid ${FEATURE_COLOR.white};
    color: ${FEATURE_COLOR.white};
    padding: 8px;
  }
  .headerCellLevel2 {
    padding: 8px;
    font-weight: bold;
  }
  .bodyRow {
    &:hover {
      background-color: ${FEATURE_COLOR.backgroundMenu};
    }
    &.isPointer {
      cursor: pointer;
    }
    &.notPass {
      background: ${FEATURE_COLOR.borderColor};
    }
    &.chooseTableRow {
      background-color: ${FEATURE_COLOR.backgroundMenu};
    }
  }
  .bodyCell {
    padding: 8px;
    &.reviewComment {
      max-width: 200px;
    }
    .checkboxWrapper {
      display: flex;
      justify-content: center;
    }
  }
  .tableCellCollapse {
    padding: 0;
  }
`;

export { ContributionResultStyled, ResultSearchStyled, TableStyled };
