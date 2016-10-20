import CircularProgress from 'material-ui/CircularProgress';
import { lightGreen500 } from 'material-ui/styles/colors';
import React from 'react';

const Spinner = (props) =>
  <div style={{width: '100%', textAlign: 'center'}}>
    <CircularProgress
      color={lightGreen500}
      size={24}
      style={{margin: 20}}
      thickness={3}
      {...props}
    />
  </div>;

export default Spinner;
