import styled from 'styled-components';

const FindPartnerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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

export { FindPartnerStyled, GuideModalStyled };
