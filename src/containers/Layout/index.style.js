import styled from 'styled-components';
import { AppBar } from '@material-ui/core';
import {
  BOX_SHADOW,
  TRANSITION,
  FEATURE_COLOR,
  SIDEBAR_WIDTH,
} from '../../styles/configs';

const LayoutStyled = styled.div`
  display: flex;
`;

const AppBarStyle = styled(AppBar)`
  z-index: 1201;
  .title {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 20px;
    flex-grow: 1;
  }
  .brandName {
    display: flex;
    align-items: center;
    text-transform: uppercase;
    text-decoration: none;
    color: ${FEATURE_COLOR.white};
  }
  .appName {
    margin-left: 30px;
  }
  .name {
    margin-left: 20px;
    margin-right: 76px;
  }
  .avatarWrapper {
    position: absolute;
    top: 0;
    right: 0;
    padding: 16px;
    border-radius: 100%;
    background-color: ${FEATURE_COLOR.primary};
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
  .account {
    padding: 20px;
  }
  .buttonText {
    text-transform: none;
  }
  .whiteText {
    color: ${FEATURE_COLOR.white};
  }
`;

const ContentStyled = styled.div`
  position: relative;
  flex-grow: 1;
  padding: 0 32px 32px 32px;
  margin-top: 128px;
  min-height: calc(100vh - 128px);
  box-sizing: border-box;

  .menu-icon {
    position: absolute;
    top: -56px;
    left: 18px;
  }
`;

const DrawerStyled = styled.div`
  .drawer {
    width: ${SIDEBAR_WIDTH}px;
    flex-shrink: 0;
    white-space: nowrap;
    box-shadow: ${BOX_SHADOW.card};
  }
  .drawerOpen {
    width: ${SIDEBAR_WIDTH}px;
    transition: ${TRANSITION.sideBar};
  }
  .drawerClose {
    transition: ${TRANSITION.sideBar};
    overflow: visible;
    width: 64px;
  }
`;
const DrawerMobileStyled = styled.div`
  width: ${SIDEBAR_WIDTH}px;
  flex-shrink: 0;
  white-space: nowrap;
`;

const GroupMenuStyled = styled.div`
  position: relative;
  &:hover .rightTopMenuWrapper {
    display: block;
  }
  .rightTopMenuWrapper {
    background-color: transparent;
    position: absolute;
    right: ${-SIDEBAR_WIDTH - 7}px;
    top: 0;
    display: none;
    width: ${SIDEBAR_WIDTH}px;
  }
  .rightTopMenu {
    border-radius: 4px;
    background-color: ${FEATURE_COLOR.white};
    box-shadow: ${BOX_SHADOW.layout};
  }
`;

const ListItemStyled = styled.div`
  .nested {
    padding: 8px 16px 8px 32px;
  }
  .hide {
    display: none;
  }
  .menuItem {
    display: flex;
    align-items: center;
    &:hover {
      background-color: ${FEATURE_COLOR.backgroundMenu};
      &.menuIcon,
      &.menuTitle {
        color: ${FEATURE_COLOR.black};
      }
    }
  }
  .menuIcon {
    min-width: 24px;
    height: 30px;
    font-size: 24px;
    line-height: 30px;
    align-items: center;
    vertical-align: middle;
    color: ${FEATURE_COLOR.black};
  }
  .menuTitle {
    padding-left: 10px;
    margin: 0px;
    transition: ${TRANSITION.sideBar};
    color: ${FEATURE_COLOR.black};
  }
  .primary {
    color: ${FEATURE_COLOR.black};
  }
  .backgroundPrimary {
    background-color: ${FEATURE_COLOR.backgroundMenu};
  }
`;

export {
  LayoutStyled,
  AppBarStyle,
  ContentStyled,
  DrawerStyled,
  DrawerMobileStyled,
  GroupMenuStyled,
  ListItemStyled,
};
