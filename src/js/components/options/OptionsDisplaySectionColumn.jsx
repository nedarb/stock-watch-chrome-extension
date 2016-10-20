import Checkbox from 'material-ui/Checkbox';
import React from 'react';

const OptionsDisplaySectionColumn = (props) => {
  const columns = props.columns.map((column) =>
    <Checkbox
      {...column}
      key={column.key}
      labelStyle={{textAlign: 'left'}}
      onCheck={(event, checked) => props.handleColumnCheck(column.key, checked)}
    />
  );
  return (
    <div>
      <h1>Columns</h1>
      {columns}
    </div>
  );
};

export default OptionsDisplaySectionColumn;
