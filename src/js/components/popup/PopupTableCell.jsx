import React, { Component, PropTypes } from 'react'

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
  isDelta: PropTypes.bool,
  isPercentage: PropTypes.bool,
};

PopupTableCell.defaultProps = {
  isDelta: false,
  isPercentage: false,
};

export default PopupTableCell;
