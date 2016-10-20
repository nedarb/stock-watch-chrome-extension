import OptionsDisplayPane from './OptionsDisplayPane.jsx';
import OptionsWatchlistPane from './OptionsWatchlistPane.jsx';
import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { getColumns } from './../../model/config';

const OptionsTabContainer = () =>
  <Tabs
    inkBarStyle={{height: 4, marginTop: -4}}>
    <Tab label="Watchlist" value="a" >
      <OptionsWatchlistPane />
    </Tab>
    <Tab label="Display" value="b">
      <OptionsDisplayPane />
    </Tab>
  </Tabs>;

export default OptionsTabContainer;
