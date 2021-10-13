import styled from 'styled-components';
import { FEATURE_COLOR } from '../../styles/configs';

const IntentReviewStyled = styled.div`
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
    .headerTime {
      width: 200px;
    }
  }
  .userSearch {
    margin-bottom: 10px;
  }
  .userTable {
    flex: 1;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
  }
`;

const TableStyled = styled.div`
  .headerCell {
    background: ${FEATURE_COLOR.havelockBlue};
    border: 1px solid ${FEATURE_COLOR.white};
    color: ${FEATURE_COLOR.white};
    padding: 8px;
  }
  .bodyRow {
    cursor: pointer;
    &:hover {
      background-color: ${FEATURE_COLOR.backgroundMenu};
    }
    &.notPass {
      background: ${FEATURE_COLOR.borderColor};
    }
  }
  .bodyCell {
    padding: 8px;
    &.reviewComment {
      display: flex;
      align-items: center;
      min-height: 42px;
    }
    .editButton {
      margin-left: 8px;
      cursor: pointer;
    }
    .textComment {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      width: 80px;
      flex: 1;
    }
    &.checkboxCell {
      width: 85px;
    }
    .checkbox {
      &.noPass {
        color: ${FEATURE_COLOR.checkboxSecondary};
      }
    }
  }
`;

const ReviewSearchStyled = styled.div`
  display: flex;
  margin: 8px 0;
  .search-information {
    width: calc(100% / 3 - 10px);
    margin-right: 10px;
  }
`;

const EditCommentStyled = styled.div`
  .gridLabel {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .label {
    font-weight: bold;
  }
  .textField {
    margin-top: 20px;
  }
`;

export {
  IntentReviewStyled,
  TableStyled,
  ReviewSearchStyled,
  EditCommentStyled,
};
