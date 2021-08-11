import styled from 'styled-components';

const AvatarStyled = styled.div`
  display: flex;
  align-items: center;
  .avatar {
    background-color: ${(props) => props.bgColor};
  }
`;

export { AvatarStyled };
