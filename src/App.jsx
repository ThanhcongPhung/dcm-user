import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { SnackbarProvider } from 'notistack';
import store from './redux/store';
import AppRouter from './router';
import theme from './styles/theme';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <Provider store={store()}>
          <SnackbarProvider>
            <AppRouter />
          </SnackbarProvider>
        </Provider>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
