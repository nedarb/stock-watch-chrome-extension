import config from '../../model/config.js';
import OptionsTabDisplaySectionColumn from './OptionsTabDisplaySectionColumn.jsx';
import OptionsTabDisplaySectionFontSize from './OptionsTabDisplaySectionFontSize.jsx';
import React from 'react';

class OptionsTabDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: null,
      fontSize: null,
    };
  }

  componentDidMount() {
    config.getColumns((columns) => this.setState({columns}));
    config.getFontSize((fontSize) => this.setState({fontSize}));
  }

  _handleFontSizeChange = (event, fontSize) => {
    config.setFontSize(fontSize, (fontSize) => {
      this.setState({fontSize});
    });
  }

  _handleColumnCheck = (index, checked) => {
    const columns = [...this.state.columns];
    columns[index].checked = checked;
    config.setColumns(columns, (columns) => {
      this.setState({columns});
    });
  }

  _renderColumnsSection() {
    return !this.state.columns
      ? null
      : <OptionsTabDisplaySectionColumn
          columns={this.state.columns}
          handleColumnCheck={this._handleColumnCheck}
        />;
  }

  _renderFontSizeSection() {
    return !this.state.fontSize
      ? null
      : <OptionsTabDisplaySectionFontSize
          fontSize={this.state.fontSize}
          onChange={this._handleFontSizeChange}
        />;
  }

  render() {
    return (
      <div id="options-display">
        {this._renderColumnsSection()}
        {this._renderFontSizeSection()}
      </div>
    );
  }

}

export default OptionsTabDisplay;
