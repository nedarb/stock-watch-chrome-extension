import { getColumns, getFontSize, setColumns, setFontSize } from '../../model/config.js';
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
    getColumns((columns) => this.setState({columns}));
    getFontSize((fontSize) => this.setState({fontSize}));
  }

  handleFontSizeChange = (event, fontSize) => {
    setFontSize(fontSize, (fontSize) => {
      this.setState({fontSize});
    });
  }

  handleColumnCheck = (index, checked) => {
    const columns = [...this.state.columns];
    columns[index].checked = checked;
    setColumns(columns, (columns) => {
      this.setState({columns});
    });
  }

  renderColumnsSection() {
    return !this.state.columns
      ? null
      : <OptionsTabDisplaySectionColumn
          columns={this.state.columns}
          handleColumnCheck={this.handleColumnCheck}
        />;
  }

  renderFontSizeSection() {
    return !this.state.fontSize
      ? null
      : <OptionsTabDisplaySectionFontSize
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

export default OptionsTabDisplay;
