import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Hidden,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import i18n from '../../languages';
import { logout } from '../../redux/auth/actions';
import CustomAvatar from '../../components/Avatar';
import { AppBarStyle } from './index.style';

const languages = [
  { value: 'en', label: 'English' },
  { value: 'vi', label: 'Vietnamese' },
];

export default function Header({ handleDrawerToggle, isShowSideBar }) {
  const [isOpenLanguage, setIsOpenLanguage] = useState(null);
  const [isOpenAccount, setIsOpenAccount] = useState(null);
  const { accessToken, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleOpenLanguage = (event) => setIsOpenLanguage(event.currentTarget);
  const handleCloseLanguage = () => setIsOpenLanguage(null);
  const handleChangeLanguage = (event, index) => {
    i18n.changeLanguage(languages[index].value);
    setIsOpenLanguage(null);
  };

  const handleOpenAccount = (event) => setIsOpenAccount(event.currentTarget);
  const handleCloseAccount = () => setIsOpenAccount(null);

  const handleLogout = () => {
    dispatch(logout(accessToken));
    setIsOpenAccount(null);
  };

  return (
    <AppBarStyle position="fixed">
      <Toolbar>
        <Hidden mdUp={isShowSideBar} implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <div className="title">
          <a className="brandName" href="/">
            {t('dataCollection')}
          </a>
        </div>
        <Button
          color="inherit"
          endIcon={<ExpandMore />}
          onClick={handleOpenLanguage}
        >
          {i18n.language}
        </Button>
        <Menu
          anchorEl={isOpenLanguage}
          keepMounted
          open={Boolean(isOpenLanguage)}
          onClose={handleCloseLanguage}
        >
          {languages.map((language, index) => (
            <MenuItem
              key={language.value}
              onClick={(event) => handleChangeLanguage(event, index)}
            >
              {t(language.label)}
            </MenuItem>
          ))}
        </Menu>
        <div className="name">{user.name}</div>
        <div className="avatarWrapper">
          <CustomAvatar
            avatar={user.avatar}
            name={user.name}
            number={moment(user.createdAt).valueOf()}
            handleClick={handleOpenAccount}
          />
          <Menu
            anchorEl={isOpenAccount}
            keepMounted
            open={Boolean(isOpenAccount)}
            onClose={handleCloseAccount}
          >
            <MenuItem onClick={handleLogout}>{t('logout')}</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBarStyle>
  );
}
