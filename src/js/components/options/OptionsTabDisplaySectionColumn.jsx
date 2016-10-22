import Checkbox from 'material-ui/Checkbox';
import React from 'react';

const OptionsTabDisplaySectionColumn = (props) => {
  const columns = props.columns.map((column, index) =>
    <Checkbox
      {...column}
      disabled={column.key === 'symbol'}
      key={column.key}
      labelStyle={{textAlign: 'left'}}
      onCheck={(event, checked) => props.handleColumnCheck(index, checked)}
    />
  );
  return (
    <div>
      <h1>Columns</h1>
      {columns}
    </div>
  );
};

export default OptionsTabDisplaySectionColumn;
