import CircularProgress from 'material-ui/CircularProgress';
import { lightGreen500 } from 'material-ui/styles/colors';
import PopupTableRow from './PopupTableRow.jsx';
import React from 'react';
import './../../../css/popup.css';

const PopupTable = (props) => {
  if (!props.data) {
    return <CircularProgress color={lightGreen500} size={24} thickness={3} />;
  }
  const stockRows = props.data.map(
    stockData => <PopupTableRow key={stockData.id} {...stockData} />
  );
  return (
    <table className="app">
      <thead>
        <tr id="table-header">
          <th>Symbol</th>
          <th>Price</th>
          <th>Change$</th>
          <th>Change%</th>
        </tr>
      </thead>
      <tbody>
        {stockRows}
      </tbody>
    </table>
  );
};

export default PopupTable;
