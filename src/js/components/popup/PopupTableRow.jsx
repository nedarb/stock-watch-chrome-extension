import PopupTableCell from './PopupTableCell.jsx';
import React from 'react';

const PopupTableRow = (props) => {
  const cells = [];
  props.columns.forEach((column) => {
    if (column.checked) {
      cells.push(
        <PopupTableCell
          isDelta={column.isDelta}
          isPercentage={column.isPercentage}
          value={props.data[column.dataKey]}
        />
      );
    }
  })
  return (
    <tr>{cells}</tr>
  );
}

export default PopupTableRow;
