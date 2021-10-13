import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { SnackbarProvider } from 'notistack';
import MomentUtils from '@date-io/moment';
import store from './redux/store';
import AppRouter from './router';
import theme from './styles/theme';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <Provider store={store()}>
          <SnackbarProvider>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <AppRouter />
            </MuiPickersUtilsProvider>
          </SnackbarProvider>
        </Provider>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
