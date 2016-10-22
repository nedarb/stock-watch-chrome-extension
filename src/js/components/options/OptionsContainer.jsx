import OptionsTabDisplay from './OptionsTabDisplay.jsx';
import OptionsTabWatchlist from './OptionsTabWatchlist.jsx';
import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { getColumns } from './../../model/config';

const OptionsContainer = () =>
  <Tabs inkBarStyle={{height: 4, marginTop: -4}}>
    <Tab label="Watchlist" value="a" >
      <OptionsTabWatchlist />
    </Tab>
    <Tab label="Display" value="b">
      <OptionsTabDisplay />
    </Tab>
  </Tabs>;

export default OptionsContainer;
