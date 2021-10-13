/* eslint-disable prefer-destructuring */
import React, { useState } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import routes from '../../constants/route';
import { LayoutStyled } from './index.style';

const hideSideBarRoute = [
  routes.CHATBOT_REVIEW,
  routes.CHATBOT_INTENT_REVIEW,
  routes.CHATBOT_INTENT_REVIEW,
];

export default function Layout({ children }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(true);

  const checkIsShowSideBar = () => {
    let routePath = location.pathname;
    if (routePath && routePath.includes('?'))
      routePath = routePath.split('?')[0];
    return !hideSideBarRoute.some((route) =>
      matchPath(location.pathname, { path: route, exact: true }),
    );
  };

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleSidebarToggle = () => setOpenSideBar((open) => !open);

  const isShowSideBar = checkIsShowSideBar();

  return (
    <LayoutStyled>
      <Header handleDrawerToggle={handleDrawerToggle} />
      {isShowSideBar && (
        <Sidebar
          mobileOpen={mobileOpen}
          openSideBar={openSideBar}
          handleDrawerToggle={handleDrawerToggle}
        />
      )}
      <Content
        handleSidebarToggle={handleSidebarToggle}
        isShowSideBar={isShowSideBar}
      >
        {children}
      </Content>
    </LayoutStyled>
  );
}
