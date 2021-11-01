/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import routes from '../../constants/route';
import { LayoutStyled } from './index.style';

const hideSideBarRoute = [
  routes.CHATBOT_REVIEW,
  routes.CHATBOT_INTENT_REVIEW,
  routes.CHATBOT_COLLECT_RESULT,
  routes.CHATBOT_COLLECT,
  routes.FAQ_TEXT_COLLECT,
  routes.FAQ_COLLECTION,
];

export default function Layout({ children }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(true);
  const [isShowSideBar, setIsShowSideBar] = useState(false);

  const checkIsShowSideBar = () => {
    let routePath = location.pathname;
    if (routePath && routePath.includes('?'))
      routePath = routePath.split('?')[0];
    const isOpen = !hideSideBarRoute.some((route) =>
      matchPath(location.pathname, { path: route, exact: true }),
    );
    setIsShowSideBar(isOpen);
  };

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleSidebarToggle = () => setOpenSideBar((open) => !open);

  useEffect(() => {
    checkIsShowSideBar();
  }, [location.pathname]);

  return (
    <LayoutStyled>
      <Header
        handleDrawerToggle={handleDrawerToggle}
        isShowSideBar={isShowSideBar}
      />
      <Sidebar
        isShowSideBar={isShowSideBar}
        mobileOpen={mobileOpen}
        openSideBar={openSideBar}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Content
        handleSidebarToggle={handleSidebarToggle}
        isShowSideBar={isShowSideBar}
      >
        {children}
      </Content>
    </LayoutStyled>
  );
}
