import styled from 'styled-components';

const WaitingRoomStyled = styled.div`
  flex-grow: 1;
  .content {
    padding: 20px 0;
    .item {
      height: 100%;
    }
  }
`;

const FindPartnerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 400px;
  .timeCountBox {
    position: relative;
    .timeCount {
      position: absolute;
      z-index: 100;
    }
  }
`;

const GuideModalStyled = styled.div`
  .contentModal {
    width: 400px;
    padding: 16px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
  }
  .nested {
    padding-left: 32px;
  }
`;

const CampaignInfoStyled = styled.div`
  .cardMedia {
    padding-top: 50%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .campaignName {
    cursor: pointer;
  }
`;

export {
  WaitingRoomStyled,
  CampaignInfoStyled,
  FindPartnerStyled,
  GuideModalStyled,
};
