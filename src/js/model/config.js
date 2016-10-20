// save the new config
const defaultConfig = {
  watchlist: [],
  columns: {
    symbol: {label: 'symbol', value: true},
    currentPrice: {label: 'current price', value: true},
    changeByValue: {label: 'change by value', value: true},
    changeByPercentage: {label: 'change by percentage', value: true},
    previouslyClosedPrice: {label: 'previously closed price', value: false},
    openPrice: {label: 'open price', value: false},
    dayLow: {label: 'day low', value: false},
    dayHigh: {label: 'day high', value: false},
    fiftyTwoWeekLow: {label: '52 week low', value: false},
    fiftyTwoWeekHigh: {label: '52 week high', value: false},
    marketCapital: {label: 'market capital', value: false},
    pe: {label: 'P/E', value: false},
    beta: {label: 'Beta', value: false},
    eps: {label: 'EPS', value: false},
    instOwned: {label: 'institutionally owned', value: false},
  },
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


const saveSettings = (config) => {
  chrome.storage.sync.set(APP_STORAGE_KEY, () => {
    console.log('Saved successfully.');
  });
}
