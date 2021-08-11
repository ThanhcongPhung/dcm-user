import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import { LayoutStyled } from './index.style';

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setOpenSideBar((open) => !open);
  };

  return (
    <LayoutStyled>
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        mobileOpen={mobileOpen}
        openSideBar={openSideBar}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Content handleSidebarToggle={handleSidebarToggle}>{children}</Content>
    </LayoutStyled>
  );
}
