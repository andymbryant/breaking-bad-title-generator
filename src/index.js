import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "typeface-lora";
import CssBaseline from "@material-ui/core/CssBaseline";

// Palette reference:
// https://akm-img-a-in.tosshub.com/indiatoday/images/story/202001/Breaking_Bad.jpeg?Ifrqi.v01Y0KfAlAyY172HCu8HZTJJvy&size=770:433
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
  <React.StrictMode>
    <MuiThemeProvider theme={bbTheme}>
      <CssBaseline/>
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
