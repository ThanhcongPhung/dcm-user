import styled from 'styled-components';
import { FEATURE_COLOR } from '../../styles/configs';

const CampaignDetailStyle = styled.div`
  height: 100%;
  .public-DraftStyleDefault-block {
    margin: 0;
  }
  .baseContent {
    margin: 15px 0;
    .cardMedia {
      height: 200px;
    }
    .title {
      font-weight: bold;
    }
  }
  .title {
    font-weight: bold;
  }
  .description {
    margin-bottom: 20px;
    .detail {
      padding: 0 15px;
    }
  }
`;
const ParticipantsStyled = styled.div`
  height: 100%;
  .table {
    margin: 15px 0;
  }
  .tableRow {
    &:hover {
      background: ${FEATURE_COLOR.backgroundMenu};
    }
  }
  .tableCell {
    padding: 8px;
    &.avatarName {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .userName {
        margin-left: 5px;
      }
    }
  }
`;

export { CampaignDetailStyle, ParticipantsStyled };
