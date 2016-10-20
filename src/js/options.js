import React from 'react';
import ReactDOM from 'react-dom';
import Options from './components/options/Options.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

const style = {
  width: '100%',
};

injectTapEventPlugin();
ReactDOM.render(<Options style={style}/>, document.getElementById('options'));
