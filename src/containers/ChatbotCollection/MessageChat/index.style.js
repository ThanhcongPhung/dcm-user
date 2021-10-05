import styled from 'styled-components';
import { FEATURE_COLOR } from '../../../styles/configs';

const backgroundContent = 'rgb(245, 246, 250)';

const MessageHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  .cardMedia {
    margin-left: 10px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
  .title {
    margin: 0 10px;
    cursor: pointer;
    flex: 1;
  }
`;

const MessageContentStyle = styled.div`
  flex: 1;
  -webkit-box-flex: 1;
  overflow: hidden auto;
  background: ${backgroundContent};
  .avatarWrapper {
    display: flex;
    width: 100%;
    align-items: flex-end;
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
      padding-right: 5px;
    }
  }
  .messageClient {
    border-radius: 10px;
    padding: 8px;
    background-color: ${FEATURE_COLOR.havelockBlue};
    border-radius: 1.3em 1.3em 4px;
    color: ${FEATURE_COLOR.white} !important;
  }
  .messageServer {
    border-radius: 10px;
    padding: 8px;
    background: ${FEATURE_COLOR.white};
    border-radius: 1.3em 1.3em 1.3em 4px;
    overflow-wrap: break-word;
    color: ${FEATURE_COLOR.text} !important;
  }
  .buttonContent {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .option {
      width: 50%;
      border: 1px dashed ${FEATURE_COLOR.primary};
      margin: 2px 0;
      padding: 2px;
    }
  }
`;

const ListItemStyled = styled.div`
  .sessionTime {
    margin-top: 10px;
    color: ${FEATURE_COLOR.textSecondary};
  }
  .listItem {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const EditIntentStyled = styled.div`
  .label {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .intentText {
    color: ${FEATURE_COLOR.havelockBlue};
  }
  .intent {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .iconEdit {
      cursor: pointer;
      margin-left: 10px;
      border-radius: 50%;
      padding: 2px;
      &:hover {
        background-color: ${FEATURE_COLOR.backgroundMenu};
      }
    }
  }
  .labelIcon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MessageInputStyle = styled.div`
  position: relative;
  overflow: hidden;
  padding: 10px 15px;
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 1fr 40px;
  background: ${FEATURE_COLOR.white};
  border-radius: 30px 30px 5px 5px;
  column-gap: 8px;
  align-items: center;
  .inputWrapper {
    display: flex;
    flex-direction: row;
    border-radius: 1.3em;
    padding: 8px 24px;
    background: ${FEATURE_COLOR.backgroundMenu};
    background-blend-mode: overlay;
    mix-blend-mode: normal;
  }
  .textInput {
    .MuiInput-underline {
      border-bottom: none;
      &::before {
        border-bottom: none;
      }
      &::after {
        border-bottom: none;
      }
    }
  }
  .iconWrap {
    height: 40px;
    width: 40px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    background: ${FEATURE_COLOR.white};
  }
`;

export {
  MessageHeaderStyled,
  MessageContentStyle,
  ListItemStyled,
  MessageInputStyle,
  EditIntentStyled,
};
