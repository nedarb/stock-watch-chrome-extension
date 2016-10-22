import { cyan500 } from 'material-ui/styles/colors';
import config from '../../model/config.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PopupTable from './PopupTable.jsx';
import React from 'react';
import cache from '../../utils/cache.js';

const DATA_FETCH_INTERVAL = 3000;

class Popup extends React.Component {

  _timer;

  constructor(props) {
    super(props);
    this.state = {
      columns: null,
      data: null,
      fontSize: null,
     };
  }

  componentDidMount() {
    config.getColumns((columns) => {
      this.setState({columns});
      config.getWatchlist((watchlistSymbolKeys) => {
        this._timer = setInterval(
          () => cache.getData(
            watchlistSymbolKeys,
            (data) => this.setState({data}),
          ),
          DATA_FETCH_INTERVAL,
        );
      });
    });
    config.getFontSize((fontSize) => this.setState({fontSize}));
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  render() {
    const fontSize = this.state.fontSize || 12;
    return (
      <MuiThemeProvider>
        <div style={{fontSize}}>
          <PopupTable {...this.state} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Popup;
