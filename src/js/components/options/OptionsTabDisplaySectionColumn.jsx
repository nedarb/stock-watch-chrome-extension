import Checkbox from 'material-ui/Checkbox';
import React from 'react';

const OptionsTabDisplaySectionColumn = (props) => {
  const columns = props.columns.map((column, index) =>
    <Checkbox
      checked={column.checked}
      disabled={column.key === 'symbol'}
      key={column.key}
      label={column.optionsLabel}
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

OptionsTabDisplaySectionColumn.propTypes = {
  columns: React.PropTypes.array.isRequired,
  handleColumnCheck: React.PropTypes.func.isRequired,
};

export default OptionsTabDisplaySectionColumn;
