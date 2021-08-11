import { createTheme } from '@material-ui/core/styles';
import { FEATURE_COLOR, BORDER_RADIUS } from './configs';

const theme = createTheme({
  palette: {
    primary: {
      main: FEATURE_COLOR.primary,
    },
    secondary: {
      main: FEATURE_COLOR.secondary,
    },
    text: {
      primary: FEATURE_COLOR.text,
    },
    divider: FEATURE_COLOR.divider,
  },
  typography: {
    fontFamily: 'Vbee',
  },
  shape: {
    borderRadius: BORDER_RADIUS,
  },
});

export default theme;
