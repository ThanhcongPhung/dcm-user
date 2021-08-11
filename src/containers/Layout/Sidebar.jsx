import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, matchPath } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import clsx from 'clsx';
import { Toolbar, Drawer, List, Collapse, Hidden } from '@material-ui/core';
import menuList from '../../constants/menu';
import ListItem from './ListItem';
import {
  DrawerStyled,
  DrawerMobileStyled,
  GroupMenuStyled,
} from './index.style';

export default function Sidebar({
  openSideBar,
  mobileOpen,
  handleDrawerToggle,
}) {
  const [menu, setMenu] = useState([]);
  const [expandMenu, setExpandMenu] = useState();
  const [menuActive, setMenuActive] = useState();

  const location = useLocation();
  const history = useHistory();

  const isActiveRoute = (route) => {
    return matchPath(location.pathname, { path: route, exact: true });
  };

  const handleCollapseMenu = (route, index) => {
    if (expandMenu === index) setExpandMenu('');
    else {
      setExpandMenu(index);
    }
  };

  const handleClickMenu = (route, menuIndex) => {
    history.push(route);
    setExpandMenu(menuIndex);
  };

  useEffect(() => {
    menuList.every((menuItem, index) => {
      const checked = isActiveRoute(menuItem.route);
      if (checked) {
        setMenuActive(index);
        setExpandMenu(index);
        return false;
      }
      if (menuItem.subMenus) {
        const checkedNestedMenu = menuItem.subMenus.every((subMenu) => {
          const checkSubmenu = isActiveRoute(subMenu.route);
          if (checkSubmenu) {
            setMenuActive(index);
            setExpandMenu(index);
            return false;
          }
          return true;
        });
        if (!checkedNestedMenu) return false;
      }
      return true;
    });

    setMenu(menuList);
  }, [location.pathname]);

  const renderSubMenu = (subMenu, index, isRightTopMenu) => {
    return (
      <div className={clsx({ rightTopMenuWrapper: isRightTopMenu })}>
        <List
          component="div"
          disablePadding
          className={clsx({ rightTopMenu: isRightTopMenu })}
        >
          {subMenu &&
            subMenu.map((subMenuItem) => {
              const isSubMenuActive =
                menuActive === index && isActiveRoute(subMenuItem.route);
              return (
                <ListItem
                  key={uuidV4()}
                  menuInfo={subMenuItem}
                  menuIndex={index}
                  isMenuActive={isSubMenuActive}
                  handleClick={handleClickMenu}
                  isSubMenu
                />
              );
            })}
        </List>
      </div>
    );
  };

  const renderCollapseMenuItem = (item, index, mobile) => {
    return (
      <GroupMenuStyled>
        <ListItem
          menuInfo={item}
          menuIndex={index}
          isMenuActive={menuActive === index && expandMenu !== index}
          handleClick={handleCollapseMenu}
          isMenuHide={!mobile && !openSideBar}
          isExpand
          isExpandLess={expandMenu === index}
        />
        {!mobile && !openSideBar && renderSubMenu(item.subMenus, index, true)}
        <Collapse
          in={(mobile || openSideBar) && expandMenu === index}
          timeout="auto"
          unmountOnExit
        >
          {renderSubMenu(item.subMenus, index)}
        </Collapse>
      </GroupMenuStyled>
    );
  };

  const renderMenuItem = (item, index, mobile) => {
    return (
      <ListItem
        menuInfo={item}
        menuIndex={index}
        isMenuActive={menuActive === index}
        isMenuHide={!mobile && !openSideBar}
        handleClick={handleClickMenu}
      />
    );
  };

  const renderSidebarWindow = () => {
    return (
      <Hidden smDown implementation="css">
        <DrawerStyled>
          <Drawer
            open={openSideBar}
            variant="permanent"
            className={clsx('drawer', {
              drawerOpen: openSideBar,
              drawerClose: !openSideBar,
            })}
            classes={{
              paper: clsx('drawer', {
                drawerOpen: openSideBar,
                drawerClose: !openSideBar,
              }),
            }}
          >
            <Toolbar />
            <List>
              {menu.map((item, index) => {
                return (
                  <div key={item.heading}>
                    {item.subMenus
                      ? renderCollapseMenuItem(item, index)
                      : renderMenuItem(item, index)}
                  </div>
                );
              })}
            </List>
          </Drawer>
        </DrawerStyled>
      </Hidden>
    );
  };

  const renderSidebarMobile = () => {
    return (
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <DrawerMobileStyled>
            <List>
              {menu.map((item, index) => {
                return (
                  <div key={item.heading}>
                    {item.subMenus
                      ? renderCollapseMenuItem(item, index, true)
                      : renderMenuItem(item, index, true)}
                  </div>
                );
              })}
            </List>
          </DrawerMobileStyled>
        </Drawer>
      </Hidden>
    );
  };
  return (
    <>
      {renderSidebarWindow()}
      {renderSidebarMobile()}
    </>
  );
}
