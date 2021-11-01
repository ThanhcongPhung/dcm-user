import styled from 'styled-components';
import { FEATURE_COLOR } from '../../styles/configs';

const ChatbotReviewStyled = styled.div`
  .container {
    min-height: 70vh;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    min-width: 600px;
  }
  .content {
    padding: 20px 0;
  }
`;

const CampaignInfoStyle = styled.div`
  .cardMedia {
    padding-top: 50%;
  }
  .campaignName {
    cursor: pointer;
  }
`;

const GuideReviewStyled = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding-left: 20px;
  .guideInfo {
    flex: 1;
    overflow: hidden auto;
    .textNote {
      color: ${FEATURE_COLOR.froly};
    }
  }
  .buttonGroup {
    display: flex;
    justify-content: center;
    align-items: center;
    .button {
      margin: 0 10px;
    }
  }
`;

export { ChatbotReviewStyled, CampaignInfoStyle, GuideReviewStyled };
