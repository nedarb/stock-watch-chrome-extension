
import React from 'react';
import Slider from 'material-ui/Slider';

const DEFAULT_FONT_SIZE = 12;

class OptionsDisplaySectionFontSize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 12, // use the prop value for this.
    }
  }

  handleSlider = (event, value) => {
    console.log(value);
    this.setState({sliderValue: value});
  }

  render() {
    const info = this.state.sliderValue === DEFAULT_FONT_SIZE
      ? this.state.sliderValue + "px (default)"
      : this.state.sliderValue + "px";
    return (
      <div>
        <h1>Font Size</h1>
        {info}
        <Slider
          min={10}
          max={20}
          step={1}
          defaultValue={12}
          value={this.state.sliderValue}
          onChange={this.handleSlider}
        />
      </div>
    );
  }
}

export default OptionsDisplaySectionFontSize;
