const testWatchlist = ['NYSE:TWTR', 'NYSE:LNKD', 'NASDAQ:GOOGL', 'NASDAQ:MSFT', 'NASDAQ:FB'];

const defaultConfig = {
  watchlist: testWatchlist,
  columns: [
    {key: 'symbol', label: 'symbol', checked: true},
    {key:'currentPrice', label: 'current price', checked: true},
    {key: 'changeByValue', label: 'change by value', checked: true},
    {key: 'changeByPercentage', label: 'change by percentage', checked: true},
    {key: 'previouslyClosedPrice', label: 'previously closed price', checked: false},
    {key: 'openPrice', label: 'open price', checked: false},
    {key: 'dayLow', label: 'day low', checked: false},
    {key: 'dayHigh', label: 'day high', checked: false},
    {key: 'fiftyTwoWeekLow', label: '52 week low', checked: false},
    {key: 'fiftyTwoWeekHigh', label: '52 week high', checked: false},
    {key: 'marketCapital', label: 'market capital', checked: false},
    {key: 'pe', label: 'P/E', checked: false},
    {key: 'beta', label: 'Beta', checked: false},
    {key: 'eps', label: 'EPS', checked: false},
    {key: 'instOwned', label: 'institutionally owned', checked: false},
  ],
  fontSize: 12,
};

let config = null;

const initConfig = (callback) => {
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

export const getWatchlist = (callback) => {
  if (!config) {
    initConfig((config) => {
      callback(config.watchlist);
    })
  } else {
    callback(config.watchlist);
  }
}

export const getColumns = (callback) => {
  if (!config) {
    initConfig((config) => {
      callback(config.columns);
    })
  } else {
    callback(config.columns);
  }
}

export const getFontSize = (callback) => {
  if (!config) {
    initConfig((config) => {
      callback(config.fontSize);
    })
  } else {
    callback(config.fontSize);
  }
}

export const setWatchlist = (newWatchlist, callback) => {
  const newConfig = Object.assign({}, config, {watchlist: newWatchlist});
  chrome.storage.sync.set({APP_STORAGE_KEY: newConfig}, () => {
    config = newConfig; // update the config in memory
    callback(config.watchlist); // pass back the new watchlist
  });
}

export const setColumns = (newColumns, callback) => {
  const newConfig = Object.assign({}, config, {columns: newColumns});
  chrome.storage.sync.set({APP_STORAGE_KEY: newConfig}, () => {
    config = newConfig; // update the config in memory
    callback(config.columns); // pass back the new watchlist
  });
}

export const setFontSize = (newFontSize, callback) => {
  const newConfig = Object.assign({}, config, {fontSize: newFontSize});
  chrome.storage.sync.set({APP_STORAGE_KEY: newConfig}, () => {
    config = newConfig; // update the config in memory
    callback(config.fontSize); // pass back the new watchlist
  });
}

const saveSettings = (config) => {
  chrome.storage.sync.set(APP_STORAGE_KEY, () => {
    console.log('Saved successfully.');
  });
}
