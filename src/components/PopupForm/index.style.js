import styled from 'styled-components';

const PopupFormStyled = styled.div`
  .dialog-wrapper {
    padding: spacing(2);
    position: absolute;
    top: spacing(5);
  }
`;
const FormStyled = styled.div`
  .formStyle {
    width: 80%;
    margin: spacing(1);
    display: flex;
    flex-direction: row;
  }
`;
export { PopupFormStyled, FormStyled };
