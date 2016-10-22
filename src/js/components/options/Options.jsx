import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lightBlue900, lightGreen500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import OptionsContainer from './OptionsContainer.jsx';
import Paper from 'material-ui/Paper';
import React from 'react';
import './../../../css/options.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightBlue900,
    accent1Color: lightGreen500,
  },
});

const Options = () =>
  <MuiThemeProvider muiTheme={muiTheme}>
    <div id="options-root-container">
      <Paper id="options-paper" zDepth={4}>
        <OptionsContainer />
      </Paper>
    </div>
  </MuiThemeProvider>;

export default Options;
