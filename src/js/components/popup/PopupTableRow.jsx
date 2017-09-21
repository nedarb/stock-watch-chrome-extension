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
          key={column.key}
          value={props.data[column.dataKey] || props.data[column.key]}
        />
      );
    }
  })
  return (
    <tr>{cells}</tr>
  );
}

PopupTableRow.propTypes = {
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.object.isRequired,
};

export default PopupTableRow;
