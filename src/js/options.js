import React from 'react';
import ReactDOM from 'react-dom';
import Options from './components/options/Options.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
ReactDOM.render(<Options style={{width: '100%'}}/>, document.getElementById('options'));
