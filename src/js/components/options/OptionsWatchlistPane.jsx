import AutoComplete from 'material-ui/AutoComplete';
import CircularProgress from 'material-ui/CircularProgress';
import { getWatchlist, setWatchlist } from '../../model/config.js';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { lightGreen500 } from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
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
      watchlistErrorType: null,
      selectedSymbolKeys: [],
      watchlistSymbolKeys: null,
      autoCompleteErrorText: null,
      autoCompleteDataSource: [],
    };
  }

  componentDidMount() {
    getWatchlist((watchlistSymbolKeys) => {
      // Query the data for the given watchlist
      request.getFullData(watchlistSymbolKeys, (data) => {
        if (Array.isArray(data)) {
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
            watchlist,
            watchlistSymbolKeys,
            watchlistErrorType: null,
          });
          return;
        }

        // error handling
        const { ErrorType } = require('../core/ErrorPage.jsx');
        if (data === 'Network Error') {
          this.setState({
            watchlistErrorType: ErrorType.NETWORK,
          });
        } else {
          // TODO provide a friendly way to report errors
          this.setState({
            watchlistErrorType: ErrorType.UNKNOWN,
          });
        }
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

  _handleEnterNewSymbol = (autoCompleteItem, index, value) => {
    const symbolKeyToAdd = autoCompleteItem.key;
    if (this.state.watchlistSymbolKeys.includes(symbolKeyToAdd)) {
      this.setState({
        autoCompleteErrorText:
          <span>This symbol is already in your watchlist.</span>,
      })
      autoCompleteRef.focus();
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
          watchlistErrorType: null,
          autoCompleteErrorText: null,
          watchlistSymbolKeys,
        });
        autoCompleteRef.focus();
      });
    });
  }

  _handleAutoCompleteType = (text) => {
    request.getAutoCompleteDataSource(text, (suggestions) => {
      // convert the suggestion array to dataSource format
      if (!Array.isArray(suggestions)) {
        this.setState({autoCompleteDataSource: []});
        return;
      }
      const autoCompleteDataSource = suggestions.map((suggestion) => {
        const text = suggestion.t + ', ' + suggestion.n;
        const value =
          <MenuItem
            primaryText={text}
            secondaryText={suggestion.e}
            value={suggestion.e + ':' + suggestion.t}
          />
        return {text, value, key: suggestion.e + ':' + suggestion.t};
      })
      this.setState({autoCompleteDataSource});
    });
  }

  renderWatchlistTable() {
    if (this.state.watchlistErrorType) {
      // hot loading the required module only needed
      const ErrorPage = require('../core/ErrorPage.jsx').default;
      return (<ErrorPage type={this.state.watchlistErrorType} />);
    }

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
    if (!this.state.watchlist && !this.state.watchlistErrorType) {
      return <Spinner />;
    }

    return (
      <div id="options-watchlist">
        <AutoComplete
          dataSource={this.state.autoCompleteDataSource}
          errorText={this.state.autoCompleteErrorText}
          floatingLabelText="Add stock to watchlist"
          filter={AutoComplete.caseInsensitiveFilter}
          fullWidth={true}
          maxSearchResults={5}
          onNewRequest={this._handleEnterNewSymbol}
          onUpdateInput={this._handleAutoCompleteType}
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
