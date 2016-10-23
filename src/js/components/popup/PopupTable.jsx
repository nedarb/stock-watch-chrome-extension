import config from '../../model/config.js';
import PopupTableRow from './PopupTableRow.jsx';
import React from 'react';
import './../../../css/popup.css';

const PopupTable = (props) => {
  if (!Array.isArray(props.data) && props.data.hasOwnProperty('error')) {
    // if the data is not an array, it is an error
    const { ErrorType } = require('../core/ErrorPage.jsx');
    const ErrorPage = require('../core/ErrorPage.jsx').default;
    let type = null;
    switch(props.data.error.message) {
      case 'Network Error':
        type = ErrorType.NETWORK;
    }
    return (<ErrorPage type={type} />);
  }

  // construct the column metadata
  const tableHeaders = [];
  props.columns.forEach((column) => {
    if (column.checked) {
      tableHeaders.push(<th key={column.key}>{column.popupLabel}</th>);
    }
  })

  const rows = props.data.map(
    datum =>
      <PopupTableRow
        columns={props.columns}
        data={datum}
        key={datum.id}
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

PopupTable.propTypes = {
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.any,
};

export default PopupTable;
