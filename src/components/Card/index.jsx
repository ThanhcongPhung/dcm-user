import React from 'react';
import { CardStyled } from './index.style';

export default function Card({ children, ...props }) {
  return <CardStyled {...props}>{children}</CardStyled>;
}
