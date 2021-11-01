import styled from 'styled-components';
import { FEATURE_COLOR } from '../../../../styles/configs';

const ContainerStyled = styled.div`
  height: 100%;
`;

const MessageHeaderStyled = styled.div`
  display: flex;
  .headerTitle {
    padding: 8px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    .image {
      min-width: 30px;
      margin-right: 10px;
    }
  }
`;

const MessageContentStyle = styled.div`
  .wrapper {
    display: flex;
    flex-grow: 1;
    height: calc(100vh - 128px - 32px - 48px - 36px - 20px - 16px);
    overflow: auto;
  }
  .list {
    width: 100%;
  }
  .avatarWrapper {
    display: flex;
    width: 100%;
    &.client {
      justify-content: flex-end;
    }
  }
  .listItemContent {
    max-width: 80%;
    display: flex;
    margin: 0 5px;
    &:hover {
      .responseContent {
        opacity: 1;
      }
    }
  }
  .responseContent {
    width: 50px;
    display: flex;
    opacity: 0;
    justify-content: flex-end;
    align-items: center;
    margin-right: 10px;
    .icon {
      cursor: pointer;
      margin-left: 1px;
    }
  }
  .intent {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    .infoIntent {
      color: ${FEATURE_COLOR.havelockBlue};
    }
  }
  .messageClient {
    border-radius: 10px;
    padding: 8px;
    background-color: ${FEATURE_COLOR.havelockBlue};
    color: white;
  }
  .messageServer {
    border-radius: 10px;
    padding: 8px;
    background-color: #eee;
  }
  .buttonContent {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .option {
      border: 1px dashed ${FEATURE_COLOR.primary};
      margin: 2px 0;
      padding: 2px;
    }
  }
`;

const ListItemStyled = styled.div`
  .listItem {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const MessageInputStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  .textInput {
    flex: 1;
  }
  .iconWrap {
    margin: 0 10px;
    .icon {
      cursor: pointer;
    }
  }
`;

export {
  ContainerStyled,
  MessageHeaderStyled,
  MessageContentStyle,
  ListItemStyled,
  MessageInputStyle,
};
