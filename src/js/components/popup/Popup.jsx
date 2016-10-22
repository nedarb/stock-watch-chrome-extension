import { cyan500 } from 'material-ui/styles/colors';
import { getWatchlist } from '../../model/config.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PopupTable from './PopupTable.jsx';
import React from 'react';
import request from '../../utils/request.js';

const DATA_FETCH_INTERVAL = 3000;

class Popup extends React.Component {

  _timer;

  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    getWatchlist((watchlistSymbolKeys) => {
      this._timer = setInterval(
        () => request.getData(
          watchlistSymbolKeys,
          (data) => this.setState({data}),
        ),
        DATA_FETCH_INTERVAL,
      );
    });
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
