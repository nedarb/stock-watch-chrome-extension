
import React from 'react';
import Slider from 'material-ui/Slider';

const DEFAULT_FONT_SIZE = 12;

const OptionsTabDisplaySectionFontSize = (props) => {
  const info = props.fontSize === DEFAULT_FONT_SIZE
    ? props.fontSize + "px (default)"
    : props.fontSize + "px";
  return (
    <div>
      <h1>Font Size</h1>
      {info}
      <Slider
        min={10}
        max={20}
        step={1}
        defaultValue={12}
        value={props.fontSize}
        onChange={props.onChange}
      />
    </div>
  );
}

export default OptionsTabDisplaySectionFontSize;
