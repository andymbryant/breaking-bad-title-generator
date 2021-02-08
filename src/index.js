import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "typeface-lora";
import CssBaseline from "@material-ui/core/CssBaseline";

const bbTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#1d7b33'
    },
    secondary: {
      main: '#ffa400'
    }
  }
});

ReactDOM.render(
  // Removed to prevent reducer from running multiple times
  // <React.StrictMode>
    <MuiThemeProvider theme={bbTheme}>
      <CssBaseline/>
      <App />
    </MuiThemeProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
