import AutoComplete from 'material-ui/AutoComplete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { lightGreen500 } from 'material-ui/styles/colors';
import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const dataSource = [
  {text: 'TWTR, Twitter Inc.', value: 'NYSE:TWTR'},
  {text: 'LNKD, LinkedIn Corp.', value: 'NYSE:LNKD'},
  {text: 'GOOGL, Google Inc.', value: 'NASDAQ:GOOGL'},
  {text: 'MSFT, Microsoft Corporation', value: 'NASDAQ:MSFT'},
  {text: 'FB, Facebook Inc.', value: 'NASDAQ:FB'},
];

const watchlist = [
  {symbol: 'TWTR', desc: 'Twitter Inc.', market: 'NYSE', value: 'NYSE:TWTR'},
  {symbol: 'LNKD', desc: 'LinkedIn Corp.', market: 'NYSE', value: 'NYSE:LNKD'},
  {symbol: 'GOOGL', desc: 'Google Inc.', market: 'NASDAQ', value: 'NASDAQ:GOOGL'},
  {symbol: 'MSFT', desc: 'Microsoft Corporation, which is going to acquire LinkedIN.', market: 'NASDAQ', value: 'NASDAQ:MSFT'},
  {symbol: 'FB', desc: 'Facebook Inc.', market: 'NASDAQ', value: 'NASDAQ:FB'},
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

const OptionsWatchlistPane = (props) => {
  const watchlistRows = watchlist.map(item =>
    <TableRow key={item.value}>
      <TableRowColumn>{item.symbol}</TableRowColumn>
      <TableRowColumn>{item.desc}</TableRowColumn>
      <TableRowColumn>{item.market}</TableRowColumn>
    </TableRow>
  );

  return (
    <div id="options-watchlist">
      <AutoComplete
        dataSource={dataSource}
        floatingLabelText="Add stock to watchlist"
        filter={AutoComplete.caseInsensitiveFilter}
        fullWidth={true}
        maxSearchResults={5}
        onNewRequest={(chosenRequest: string, index: number) => {
          console.log(chosenRequest);
          console.log(index);
        }}
        ref={(ref) => autoCompleteRef = ref}
        {...textFieldStyle}
      />
      <Table multiSelectable={true}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Symbol</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Market</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlistRows}
        </TableBody>
      </Table>
      <span className='footer'>
        <FloatingActionButton
          className="button"
          onClick={() => {
            console.log('trigger remove event');
          }}>
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

export default OptionsWatchlistPane;
