import styled from 'styled-components';
import { FEATURE_COLOR } from '../../styles/configs';

const CampaignListStyle = styled.div`
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    .card {
      min-width: 285px;
      height: 100%;
      display: flex;
      flex-direction: column;
      .cardMedia {
        padding-top: 50%;
      }
      .campaignName {
        cursor: pointer;
      }
      .cardActions {
        display: flex;
        justify-content: center;
      }
    }
    .noData {
      display: flex;
      justify-content: center;
    }
  }

  .pagination {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
`;

const ShowButtonStyled = styled.div`
  .buttonExit {
    margin: 0 5px;
    background-color: ${FEATURE_COLOR.froly};
  }
`;

const SearchCampaignStyled = styled.div`
  display: flex;
  margin: 20px 0;
  .search-information {
    width: calc(100% / 4 - 10px);
    margin-right: 10px;
  }
`;

export { CampaignListStyle, ShowButtonStyled, SearchCampaignStyled };
