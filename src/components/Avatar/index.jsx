import React from 'react';
import { Avatar } from '@material-ui/core';
import { AvatarStyled } from './index.style';
import { randomColor } from '../../services/color';
import { AVATAR_COLORS } from '../../styles/configs';

export default function CustomAvatar({ avatar, name, number, handleClick }) {
  return (
    <AvatarStyled bgColor={randomColor(AVATAR_COLORS, number)}>
      <Avatar className="avatar" src={avatar} onClick={handleClick}>
        {!avatar &&
          name &&
          name.split(' ')[name.split(' ').length - 1].slice(0, 1).toUpperCase()}
      </Avatar>
    </AvatarStyled>
  );
}
