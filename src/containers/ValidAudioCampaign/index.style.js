import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { FEATURE_COLOR } from '../../styles/configs';

const ValidAudioStyled = styled(Grid)`
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
  .validRoomPaper {
    margin: 1rem;
    padding: 1rem;
  }
`;
const TableStyled = styled.div`
  .headerCell {
    background: ${FEATURE_COLOR.havelockBlue};
    border: 1px solid ${FEATURE_COLOR.white};
    color: ${FEATURE_COLOR.white};
    padding: 13px 8px;
  }
  .bodyRow {
    cursor: pointer;
    &:hover {
      background-color: ${FEATURE_COLOR.backgroundMenu};
    }
  }
  .bodyCell {
    cursor: pointer;
    padding: 8px;
    &.nameBodyCell {
      min-width: 140px;
    }
    &.status {
      font-weight: bold;
    }
    &.end {
      color: ${FEATURE_COLOR.froly};
    }
    &.time {
      min-width: 85px;
    }
    .viewParticipant {
      cursor: pointer;
      color: ${FEATURE_COLOR.havelockBlue};
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
export { ValidAudioStyled, TableStyled };
