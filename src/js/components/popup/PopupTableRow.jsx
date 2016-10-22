import PopupTableCell from './PopupTableCell.jsx';
import React from 'react';

const PopupTableRow = (props) =>
  <tr>
    <PopupTableCell isDelta={false} value={props.t} />
    <PopupTableCell isDelta={false} value={props.l} />
    <PopupTableCell isDelta={true} value={props.c} />
    <PopupTableCell
      isDelta={true}
      isPercentage={true}
      value={props.cp}
    />
  </tr>;

export default PopupTableRow;
