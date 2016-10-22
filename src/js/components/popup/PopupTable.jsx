import config from '../../model/config.js';
import PopupTableRow from './PopupTableRow.jsx';
import React from 'react';
import Spinner from '../core/Spinner.jsx';
import './../../../css/popup.css';

const PopupTable = (props) => {
  if (!props.data) {
    return <Spinner />;
  }
  if (!Array.isArray(props.data)) {
    // if the data is not an array, it is an error
    const { ErrorType } = require('../core/ErrorPage.jsx');
    const ErrorPage = require('../core/ErrorPage.jsx').default;
    let type = null;
    switch(props.data) {
      case 'Network Error':
        type = ErrorType.NETWORK;
    }
    return (<ErrorPage type={type} />);
  }

  // construct the column metadata
  const tableHeaders = [];
  props.columns.forEach((column) => {
    if (column.checked) {
      tableHeaders.push(<th>{column.popupLabel}</th>);
    }
  })

  const rows = props.data.map(
    datum =>
      <PopupTableRow
        columns={props.columns}
        data={datum}
        key={datum.symbolKey}
      />
  );
  return (
    <table className="app">
      <thead>
        <tr id="table-header">
          {tableHeaders}
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};

export default PopupTable;
