import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './components/popup/Popup.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
ReactDOM.render(<Popup />, document.getElementById('popup'));
