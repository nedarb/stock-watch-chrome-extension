import OptionsDisplayPane from './OptionsDisplayPane.jsx';
import OptionsWatchlistPane from './OptionsWatchlistPane.jsx';
import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import config from './../../model/config';

class OptionsTabContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  componentWillMount() {
    // read the current settings
    config.getCurrentSettings(this.setConfig);
  }

  setConfig = (config) => {
    console.log(config);
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <Tabs
        inkBarStyle={{height: 4, marginTop: -4}}
        onChange={this.handleChange}
        value={this.state.value}>
        <Tab label="Watchlist" value="a" >
          <OptionsWatchlistPane />
        </Tab>
        <Tab label="Display" value="b">
          <OptionsDisplayPane />
        </Tab>
      </Tabs>
    );
  }
}

export default OptionsTabContainer;
