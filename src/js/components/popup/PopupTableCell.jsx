import React from 'react';

const PopupTableCell = (props) => {
  let className = null;
  if (isNaN(props.value) || !props.isDelta) {
    className = null;
  } else if (props.value >= 0) {
    className = 'color-green';
  } else {
    className = 'color-red';
  }

  return (
    <td className={className}>
      {props.isPercentage ? props.value + '%' : props.value}
    </td>
  );
};

PopupTableCell.propTypes = {
  isDelta: React.PropTypes.bool.isRequired,
  isPercentage: React.PropTypes.bool.isRequired,
};

export default PopupTableCell;
