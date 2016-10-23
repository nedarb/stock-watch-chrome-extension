import cache from '../../utils/cache.js';
import config from '../../model/config.js';
import ErrorPage from '../core/ErrorPage.jsx';
import { lightBlue900, lightGreen500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PopupTable from './PopupTable.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import Spinner from '../core/Spinner.jsx';

const DATA_FETCH_INTERVAL = 3000;

class Popup extends React.Component {

  _timer;

  constructor(props) {
    super(props);
    this.state = {
      columns: null,
      data: null,
      fontSize: null,
      watchlistSymbolKeys: null,
     };
  }

  componentDidMount() {
    config.getColumns((columns) => {
      config.getWatchlist((watchlistSymbolKeys) => {
        this._timer = setInterval(
          () => cache.getData(
            watchlistSymbolKeys,
            (data) => this.setState({data, columns, watchlistSymbolKeys}),
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

  _handleAddSymbolButtonClick = () => {
    window.open('./options.html');
  }

  render() {
    let component = null;
    const { columns, data, watchlistSymbolKeys, fontSize} = this.state;

    if (!fontSize || (!columns && !data && !watchlistSymbolKeys)) {
      // if nothing loaded, show loading indicator
      component = <Spinner />;
    } else if (watchlistSymbolKeys && watchlistSymbolKeys.length === 0) {
      // if we have no symbol in our watchlist, show the add button
      component =
        <RaisedButton
          backgroundColor={lightGreen500}
          label="ADD SYMBOL"
          labelColor={lightBlue900}
          fullWidth={true}
          onClick={this._handleAddSymbolButtonClick}
          style={{minWidth: '200px'}}
        />;
    } else if (columns && columns.length > 0 && data && data.length > 0 &&
        watchlistSymbolKeys && watchlistSymbolKeys.length > 0) {
      component = <PopupTable {...this.state} />;
    } else {
      component = <ErrorPage />;
    }

    return (
      <MuiThemeProvider>
        <div style={{fontSize}}>
          {component}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Popup;
