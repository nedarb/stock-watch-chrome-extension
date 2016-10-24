import axios from 'axios';

const getData = (symbols, callback) => {
  axios.get('http://finance.google.com/finance/info', {
    params: {
      client: 'ig',
      q: symbols.join(','),
    }
  })
  .then((response) => {
    const data = JSON.parse(response.data.slice(3));
    callback(data);
  })
  .catch((error) => {
    callback({error});
  });
};

const getFullData = (symbols, callback) => {
  axios.get('http://finance.google.com/finance/info', {
    params: {
      client: 'ig',
      infotype: 'infoquoteall', // query full information
      q: symbols.join(','),
    }
  })
  .then((response) => {
    const data = JSON.parse(response.data.slice(3));
    callback(data);
  })
  .catch((error) => {
    callback({error});
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
    callback({error});
  });
}

module.exports = {getData, getFullData, getAutoCompleteDataSource};
