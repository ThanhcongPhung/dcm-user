import styled from 'styled-components';
import { FEATURE_COLOR } from '../../../styles/configs';

const MessageHeaderStyled = styled.div`
  display: flex;
  .headerTitle {
    padding: 0 10px;
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
    height: calc(100vh - 215px);
    overflow: auto;
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
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 10px;
      }
    }
  }
  .responseContent {
    width: 100px;
    display: flex;
    opacity: 0;
    justify-content: flex-start;
    align-items: center;
    margin-left: 10px;
    .heartContainer {
      height: 20px;
      margin-top: -5px;
      display: flex;
      justify-content: center;
    }
    .icon {
      cursor: pointer;
      margin-left: 1px;
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

  .comment {
    margin-left: 45px;
    width: 70%;
  }
`;

const ListItemStyled = styled.div`
  .listItem {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const MessageInputStyle = styled.div`
  display: flex;
  align-items: center;
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
  MessageHeaderStyled,
  MessageContentStyle,
  ListItemStyled,
  MessageInputStyle,
};
