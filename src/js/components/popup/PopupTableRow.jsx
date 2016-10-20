import PopupTableColumn from './PopupTableColumn.jsx';
import React from 'react';

const PopupTableRow = (props) =>
  <tr>
    <PopupTableColumn isDelta={false} value={props.t} />
    <PopupTableColumn isDelta={false} value={props.l} />
    <PopupTableColumn isDelta={true} value={props.c} />
    <PopupTableColumn
      isDelta={true}
      isPercentage={true}
      value={props.cp}
    />
  </tr>;

export default PopupTableRow;
