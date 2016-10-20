import action from './../../action.js';
import { cyan500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PopupTable from './PopupTable.jsx';
import React from 'react';

const DATA_FETCH_INTERVAL = 3000;

class Popup extends React.Component {

  _timer;

  constructor(props) {
    super(props);
    this.state = {data: null};
  }

  componentDidMount() {
    this._timer = setInterval(
      () => action.getData(
        ['GOOGL', 'FB', 'MSFT', 'TSLA'],
        (data) => this.setState({data}),
      ),
      DATA_FETCH_INTERVAL,
    );
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <PopupTable data={this.state.data}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Popup;
