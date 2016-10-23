const testWatchlist = ['NYSE:TWTR', 'NYSE:LNKD', 'NASDAQ:GOOGL', 'NASDAQ:MSFT', 'NASDAQ:FB'];

const defaultConfig = {
  watchlist: testWatchlist,
  columns: [
    {key: 'symbol', optionsLabel: 'symbol', popupLabel: 'Symbol', isDelta: false, isPercentage: false, dataKey: 't', checked: true},
    {key: 'currentPrice', optionsLabel: 'current price', popupLabel: 'Price', isDelta: false, isPercentage: false, dataKey: 'l', checked: true},
    {key: 'changeByValue', optionsLabel: 'change by value', popupLabel: 'Change$', isDelta: true, isPercentage: false, dataKey: 'c', checked: true},
    {key: 'changeByPercentage', optionsLabel: 'change by percentage', popupLabel: 'Change%', isDelta: true, isPercentage: true, dataKey: 'cp', checked: true},
    {key: 'previouslyClosedPrice', optionsLabel: 'previously closed price', popupLabel: 'Prev Price', isDelta: false, isPercentage: false, dataKey: 'pcls_fix', checked: false},
    {key: 'openPrice', optionsLabel: 'open price', popupLabel: 'Open', isDelta: false, isPercentage: false, dataKey: 'op', checked: false},
    {key: 'dayLow', optionsLabel: 'day low', popupLabel: 'Day Low', isDelta: false, isPercentage: false, dataKey: 'lo', checked: false},
    {key: 'dayHigh', optionsLabel: 'day high', popupLabel: 'Day High', isDelta: false, isPercentage: false, dataKey: 'hi', checked: false},
    {key: 'fiftyTwoWeekLow', optionsLabel: '52 week low', popupLabel: '52 Wk Low', isDelta: false, isPercentage: false, dataKey: 'lo52', checked: false},
    {key: 'fiftyTwoWeekHigh', optionsLabel: '52 week high', popupLabel: '52 Wk High', isDelta: false, isPercentage: false, dataKey: 'hi52', checked: false},
    {key: 'marketCapital', optionsLabel: 'market capital', popupLabel: 'Mkt Cap', isDelta: false, isPercentage: false, dataKey: 'mc', checked: false},
    {key: 'pe', optionsLabel: 'P/E', popupLabel: 'P/E', isDelta: false, isPercentage: false, dataKey: 'pe', checked: false},
    {key: 'beta', optionsLabel: 'Beta', popupLabel: 'Beta', isDelta: false, isPercentage: false, dataKey: 'beta', checked: false},
    {key: 'eps', optionsLabel: 'EPS', popupLabel: 'EPS', isDelta: false, isPercentage: false, dataKey: 'eps', checked: false},
    {key: 'shares', optionsLabel: 'shares', popupLabel: 'Shares', isDelta: false, isPercentage: false, dataKey: 'shares', checked: false},
    {key: 'instOwned', optionsLabel: 'institutionally owned', popupLabel: 'Inst Own', isDelta: false, isPercentage: false, dataKey: 'inst_own', checked: false},
  ],
  fontSize: 12,
};

let config = null;

const _initConfig = (callback) => {
  chrome.storage.sync.get('APP_STORAGE_KEY', (items) => {
    if (Object.keys(items).length === 0 && items.constructor === Object) {
      const newConfig = Object.assign({}, defaultConfig); // defensive copy
      chrome.storage.sync.set({APP_STORAGE_KEY: newConfig}, () => {
        config = newConfig;
        callback(config);
      });
    } else {
      config = items.APP_STORAGE_KEY;
      callback(config);
    }
  });
}

const getWatchlist = (callback) => {
  if (!config) {
    _initConfig((config) => {
      callback(config.watchlist);
    })
  } else {
    callback(config.watchlist);
  }
}

const getColumns = (callback) => {
  if (!config) {
    _initConfig((config) => {
      callback(config.columns);
    })
  } else {
    callback(config.columns);
  }
}

const getFontSize = (callback) => {
  if (!config) {
    _initConfig((config) => {
      callback(config.fontSize);
    })
  } else {
    callback(config.fontSize);
  }
}

const setWatchlist = (newWatchlist, callback) => {
  const newConfig = Object.assign({}, config, {watchlist: newWatchlist});
  chrome.storage.sync.set({APP_STORAGE_KEY: newConfig}, () => {
    config = newConfig; // update the config in memory
    callback(config.watchlist); // pass back the new watchlist
  });
}

const setColumns = (newColumns, callback) => {
  const newConfig = Object.assign({}, config, {columns: newColumns});
  chrome.storage.sync.set({APP_STORAGE_KEY: newConfig}, () => {
    config = newConfig; // update the config in memory
    callback(config.columns); // pass back the new watchlist
  });
}

const setFontSize = (newFontSize, callback) => {
  const newConfig = Object.assign({}, config, {fontSize: newFontSize});
  chrome.storage.sync.set({APP_STORAGE_KEY: newConfig}, () => {
    config = newConfig; // update the config in memory
    callback(config.fontSize); // pass back the new watchlist
  });
}

export default {
  getColumns,
  getFontSize,
  getWatchlist,
  setColumns,
  setFontSize,
  setWatchlist,
};
