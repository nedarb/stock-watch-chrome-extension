import OptionsDisplaySectionColumn from './OptionsDisplaySectionColumn.jsx';
import OptionsDisplaySectionFontSize from './OptionsDisplaySectionFontSize.jsx';
import React from 'react';

const OptionsDisplayPane = (props) =>
  <div id="options-display">
    <OptionsDisplaySectionColumn />
    <OptionsDisplaySectionFontSize />
  </div>;

export default OptionsDisplayPane;
