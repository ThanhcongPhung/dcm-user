import styled from 'styled-components';

const ValidAudioRoomStyled = styled.div`
  .validRoomContainer {
    display: flex;
    width: 100%;
    height: 78vh;
  }
  .audioListWrapper {
    padding: 10px;
    height: 100%;
  }
  .audioInfo {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    margin-top: 10px;
    justify-content: space-between;
  }
  .audioInfo:hover {
    background-color: teal;
    color: white;
  }
  .active {
    background-color: teal;
    color: white;
  }
  .audioMenuList {
    flex: 3.5;
    position: sticky;
    top: 50px;
    overflow-y: auto;
  }
  .audioName {
    font-weight: 500;
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
`;

export { ValidAudioRoomStyled };
