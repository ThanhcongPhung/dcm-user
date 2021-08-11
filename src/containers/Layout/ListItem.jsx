import React from 'react';
import { v4 as uuidV4 } from 'uuid';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Icon,
} from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { ListItemStyled } from './index.style';

export default function ListItemWrapper(props) {
  const {
    menuInfo,
    menuIndex,
    isMenuActive,
    isMenuHide,
    handleClick,
    isExpand,
    isExpandLess,
    isSubMenu,
  } = props;
  const { t } = useTranslation();

  const ItemWithTooltip = ({ children, title }) => {
    if (isMenuHide) return <Tooltip title={title}>{children}</Tooltip>;

    return children;
  };
  const ExpandMenu = () => {
    return (
      <>
        {isExpandLess ? (
          <ExpandLess
            className={clsx('menuIcon', {
              hide: isMenuHide,
              primary: isMenuHide,
            })}
          />
        ) : (
          <ExpandMore
            className={clsx('menuIcon', {
              hide: isMenuHide,
              primary: isMenuHide,
            })}
          />
        )}
      </>
    );
  };
  return (
    <ListItemStyled>
      <ItemWithTooltip title={t(menuInfo.heading)} isMenuHide={isMenuHide}>
        <ListItem
          key={uuidV4()}
          button
          className={clsx('menuItem', {
            backgroundPrimary: isMenuActive,
            nested: isSubMenu,
          })}
          onClick={() => handleClick(menuInfo.route, menuIndex)}
        >
          <ListItemIcon
            className={clsx('menuIcon', {
              primary: isMenuActive,
            })}
          >
            <Icon aria-label={menuInfo.icon}>{menuInfo.icon}</Icon>
          </ListItemIcon>
          <ListItemText
            className={clsx('menuTitle', {
              hide: isMenuHide,
              primary: isMenuActive,
            })}
            primary={t(menuInfo.heading)}
          />
          {isExpand && <ExpandMenu />}
        </ListItem>
      </ItemWithTooltip>
    </ListItemStyled>
  );
}
