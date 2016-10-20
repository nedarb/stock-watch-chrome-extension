import { getColumns, getFontSize } from '../../model/config.js';
import OptionsDisplaySectionColumn from './OptionsDisplaySectionColumn.jsx';
import OptionsDisplaySectionFontSize from './OptionsDisplaySectionFontSize.jsx';
import React from 'react';

class OptionsDisplayPane extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: null,
      fontSize: null,
    };
  }

  componentDidMount() {
    getColumns((columns) => this.setState({columns}));
    getFontSize((fontSize) => this.setState({fontSize}));
  }

  handleFontSizeChange = (event, fontSize) => {
    this.setState({fontSize});
  }

  handleColumnCheck = (columnKey, isInputChecked) => {
    console.log(columnKey);
    console.log(isInputChecked);
  }

  renderColumnsSection() {
    return !this.state.columns
      ? null
      : <OptionsDisplaySectionColumn
          columns={this.state.columns}
          handleColumnCheck={this.handleColumnCheck}
        />;
  }

  renderFontSizeSection() {
    return !this.state.fontSize
      ? null
      : <OptionsDisplaySectionFontSize
          fontSize={this.state.fontSize}
          onChange={this.handleFontSizeChange}
        />;
  }

  render() {
    return (
      <div id="options-display">
        {this.renderColumnsSection()}
        {this.renderFontSizeSection()}
      </div>
    );
  }

}

export default OptionsDisplayPane;
