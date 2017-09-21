import axios from 'axios';

function requestData(symbols, columnNames = ["*"]) {
  // sanitize symbols
  const symb = symbols.map(s => s.indexOf(':') >= 0 ? s.split(':')[1] : s);

  const url = new URL('https://query.yahooapis.com/v1/public/yql'),
    params = {
      q: `select ${columnNames.join(',')} from yahoo.finance.quotes where symbol in (${symb.map(s => `"${s}"`).join(',')})`,
      format: 'json',
      env: 'store://datatables.org/alltableswithkeys',
      callback: ''
    };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return fetch(url.toString()).then(res => res.json()).then(data => {
    const result = data.query.results.quote;
    return result;
  }, error => {
    return Promise.reject(error);
  });
}

const getData = (symbols, callback) => {
  return getFullData(symbols, callback);
};

const getFullData = (symbols) => {
  return requestData(symbols).then(data => {
    return data;
  }, error => {
    return Promise.reject(error);
  });
};

const getAutoCompleteDataSource = (keyword, callback) => {
  axios.get('https://www.google.com/finance/match', {
    params: {
      matchtype: 'matchall',
      q: keyword,
    }
  })
    .then((response) => {
      let suggestions = null;
      if (response && response.data && response.data.matches) {
        suggestions = response.data.matches;
      }
      callback(suggestions);
    })
    .catch((error) => {
      callback({ error });
    });
}

module.exports = { getData, getFullData, getAutoCompleteDataSource };
