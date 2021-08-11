import { COLOR } from './color';

const BORDER_RADIUS = 10;
const SIDEBAR_WIDTH = 240;

const FEATURE_COLOR = {
  white: COLOR.white,
  black: COLOR.black,

  primary: '#000034',
  secondary: COLOR.yellow[500],
  tertiary: '#91d5ff',
  divider: COLOR.gray[400],
  text: '#4a4a4a',

  buttercup: '#f6a61f',
  froly: '#f16a73',
  havelockBlue: '#4991e2',
  oceanGreen: '#48bb78',
  mediumPurple: '#9f7aea',

  backgroundMenu: '#eee',
};

const AVATAR_COLORS = [
  FEATURE_COLOR.buttercup,
  FEATURE_COLOR.froly,
  FEATURE_COLOR.oceanGreen,
  FEATURE_COLOR.mediumPurple,
];

const BOX_SHADOW = {
  card: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
  layout:
    'rgba(0, 0, 0, 0.42) 0px 10px 30px -12px, rgba(0, 0, 0, 0.12) 0px 4px 25px 0px, rgba(0, 0, 0, 0.2) 0px 8px 10px -5px',
};

const TRANSITION = {
  sideBar: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1) 0s',
};

export {
  FEATURE_COLOR,
  BORDER_RADIUS,
  AVATAR_COLORS,
  BOX_SHADOW,
  TRANSITION,
  SIDEBAR_WIDTH,
};
