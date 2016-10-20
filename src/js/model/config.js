// save the new config

const APP_STORAGE_KEY = 'APP_STORAGE_KEY';

const getDefaultConfig = () => {
  return {
    "userSettings": {
      "watchlist": ["NASDAQ:FB", "NASDAQ:GOOGL"],
      "columns": {
        "symbol": true,
        "currentPrice": true,
        "changeByValue": true,
        "changeByPercentage": true,
        "previouslyClosedPrice": false,
        "openPrice": false,
        "dayLow": false,
        "dayHigh": false,
        "52WeekLow": false,
        "52WeekHigh": false,
        "marketCapital": false,
        "pe": false,
        "beta": false,
        "eps": false,
        "instOwned": false
      },
      "fontSize": 12
    }
  };
};

const getCurrentSettings = (callback) => {
  // if no settings found in current storage, use the default settings
  chrome.storage.sync.get((items) => {
    if (Object.keys(items).length === 0 && items.constructor === Object) {
      callback(getDefaultConfig());
    } else {
      callback(items);
    }
  });
}

const saveSettings = (config) => {
  chrome.storage.sync.set(APP_STORAGE_KEY, () => {
    console.log('Saved successfully.');
  });
}

export default {getCurrentSettings, saveSettings};
