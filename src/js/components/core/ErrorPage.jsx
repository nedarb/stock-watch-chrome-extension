import { lightBlue900 } from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import React from 'react';

export const ErrorType = {
  NETWORK: 'network',
  UNKNOWN: 'unknown',
};

const ErrorPage = (props) => {
  let desc = 'An unknown error happens, please try again later.';
  if (props.type) {
    switch(props.type) {
      case ErrorType.NETWORK:
        desc = 'We are unable to connect to the Internet.';
        break;
    }
  }
  return (
    <Paper
      style={{minWidth: 300, padding: '2px 20px', textAlign: 'center'}}
      zDepth={2}>
      <h1 style={{color: lightBlue900}}>
        Oops!
      </h1>
      <p style={{color: lightBlue900}}>{desc}</p>
    </Paper>
  );
}

ErrorPage.propTypes = {
  type: React.PropTypes.string,
};

export default ErrorPage;
