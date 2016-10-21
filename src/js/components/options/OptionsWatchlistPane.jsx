import AutoComplete from 'material-ui/AutoComplete';
import CircularProgress from 'material-ui/CircularProgress';
import { getWatchlist, setWatchlist } from '../../model/config.js';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { lightGreen500 } from 'material-ui/styles/colors';
import React from 'react';
import request from '../../utils/request.js';
import Spinner from '../core/Spinner.jsx';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const dataSource = [
  {text: 'TWTR, Twitter Inc.', value: 'NYSE:TWTR'},
  {text: 'LNKD, LinkedIn Corp.', value: 'NYSE:LNKD'},
  {text: 'GOOGL, Google Inc.', value: 'NASDAQ:GOOGL'},
  {text: 'MSFT, Microsoft Corporation', value: 'NASDAQ:MSFT'},
  {text: 'FB, Facebook Inc.', value: 'NASDAQ:FB'},
];

const textFieldStyle = {
  floatingLabelFocusStyle: {
    color: lightGreen500,
  },
  underlineFocusStyle: {
    borderColor: lightGreen500,
  },
};

let autoCompleteRef = null;

class OptionsWatchlistPane extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      watchlist: null,
      selectedSymbolKeys: [],
      watchlistSymbolKeys: null,
      autoCompleteErrorText: null,
    };
  }

  componentDidMount() {
    getWatchlist((watchlistSymbolKeys) => {
      // Query the data for the given watchlist
      this.setState({watchlistSymbolKeys});
      request.getFullData(watchlistSymbolKeys, (data) => {
        const watchlist = [];
        data.forEach((datum) => {
          watchlist.push({
            symbol: datum.t,
            name: datum.name,
            market: datum.e,
            symbolKey: datum.e + ':' + datum.t,
          });
        });
        this.setState({watchlist});
      });
    });
  }

  _handleRowSelected = (selectedRows) => {
    const selectedSymbolKeys = [];
    if (selectedRows === 'all') {
      this.state.watchlist.forEach((symbol) =>
        selectedSymbolKeys.push(symbol.symbolKey)
      );
    } else if (selectedRows !== 'none') {
      selectedRows.forEach((index) => {
        selectedSymbolKeys.push(this.state.watchlist[index].symbolKey);
      })
    }
    this.setState({selectedSymbolKeys});
  }

  _handleRemoveSymbols = () => {
    const newWatchlistSymbolKeys = [];
    this.state.watchlist.forEach((symbol) => {
      if (!this.state.selectedSymbolKeys.includes(symbol.symbolKey)) {
        newWatchlistSymbolKeys.push(symbol.symbolKey);
      }
    })
    setWatchlist(newWatchlistSymbolKeys, (watchlistSymbolKeys) => {
      // update the watchlist data
      const newWatchlist = [];
      this.state.watchlist.forEach((symbol) => {
        if (watchlistSymbolKeys.includes(symbol.symbolKey)) {
          newWatchlist.push(symbol);
        }
      });
      this.setState({
        watchlist: newWatchlist,
        selectedSymbolKeys: [],
        watchlistSymbolKeys: watchlistSymbolKeys,
      });
    });
  }

  _handleEnterNewSymbol = (autoCompleteItem) => {
    const symbolKeyToAdd = autoCompleteItem.value;
    if (this.state.watchlistSymbolKeys.includes(symbolKeyToAdd)) {
      this.setState({
        autoCompleteErrorText:
          <span>This symbol has already been in your watchlist.</span>,
      })
      return;
    }

    // TODO add verification for the new symbol

    const newWatchlistSymbolKeys = [
      symbolKeyToAdd,
      ...this.state.watchlistSymbolKeys,
    ];
    setWatchlist(newWatchlistSymbolKeys, (watchlistSymbolKeys) => {
      // update the watchlist data
      const newWatchlist = [];
      request.getFullData([symbolKeyToAdd], (data) => {
        const watchlist = [];
        data.forEach((datum) => {
          watchlist.push({
            symbol: datum.t,
            name: datum.name,
            market: datum.e,
            symbolKey: datum.e + ':' + datum.t,
          });
        });
        this.setState({
          watchlist: watchlist.concat(this.state.watchlist),
          autoCompleteErrorText: null,
          watchlistSymbolKeys,
        });
      });
    });
  }

  renderWatchlistTable() {
    const watchlistRows = this.state.watchlist.map(item =>
      <TableRow
        key={item.symbolKey}
        selected={this.state.selectedSymbolKeys.includes(item.symbolKey)}>
        <TableRowColumn>{item.symbol}</TableRowColumn>
        <TableRowColumn>{item.name}</TableRowColumn>
        <TableRowColumn>{item.market}</TableRowColumn>
      </TableRow>
    );
    return this.state.watchlist.length === 0
      ? null
      : <Table multiSelectable={true} onRowSelection={this._handleRowSelected}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Symbol</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Market</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {watchlistRows}
          </TableBody>
        </Table>;
  }

  render() {
    if (!this.state.watchlist) {
      return <Spinner />;
    }

    return (
      <div id="options-watchlist">
        <AutoComplete
          dataSource={dataSource}
          errorText={this.state.autoCompleteErrorText}
          floatingLabelText="Add stock to watchlist"
          filter={AutoComplete.caseInsensitiveFilter}
          fullWidth={true}
          maxSearchResults={5}
          onNewRequest={this._handleEnterNewSymbol}
          ref={(ref) => autoCompleteRef = ref}
          {...textFieldStyle}
        />
        {this.renderWatchlistTable()}
        <span className='footer'>
          <FloatingActionButton
            disabled={this.state.selectedSymbolKeys.length === 0}
            className="button"
            onClick={this._handleRemoveSymbols}>
            <ContentRemove />
          </FloatingActionButton>
          <FloatingActionButton
            className="button"
            onClick={() => {
              if (autoCompleteRef) {
                autoCompleteRef.focus();
              }
            }}
            secondary={true}>
            <ContentAdd />
          </FloatingActionButton>
        </span>
      </div>
    );
  }
}

export default OptionsWatchlistPane;
