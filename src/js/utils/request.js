import axios from 'axios';

/**
 * Get stock quotes for the given symbols, and pass the fetched data back to
 * callback.
 * @param {string[]} symboles - symboles of the stocks to query
 * @param {Function} callback - callback to which the quote data will be passed
 */
const getData = (symbols, callback) => {
  axios.get('http://finance.google.com/finance/info', {
    params: {
      client: 'ig',
      q: symbols.join(','),
    }
  })
  .then((response) => {
    const data = JSON.parse(response.data.slice(3));
    // Convert numeric fileds from string to number.
    data.forEach(datum => {
      datum.c = +datum.c;
      datum.c_fix = +datum.c_fix;
      datum.cp = +datum.cp;
      datum.cp_fix = +datum.cp_fix;
      datum.div = +datum.div;
      datum.el = +datum.el;
      datum.el_fix = +datum.el_fix;
      datum.el_cur = +datum.el_cur;
      datum.ec = +datum.ec;
      datum.ec_fix = +datum.ec_fix;
      datum.ecp = +datum.ecp;
      datum.ecp_fix = +datum.ecp_fix;
      datum.l = +datum.l;
      datum.l_fix = +datum.l_fix;
      datum.l_cur = +datum.l_cur;
      datum.pcls_fix = +datum.pcls_fix;
      datum.yld = +datum.yld;
    })
    callback(data);
  })
  .catch((error) => {
    callback(error.message);
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
    // Convert numeric fileds from string to number.
    data.forEach(datum => {
      datum.c = +datum.c;
      datum.c_fix = +datum.c_fix;
      datum.cp = +datum.cp;
      datum.cp_fix = +datum.cp_fix;
      datum.l = +datum.l;
      datum.l_fix = +datum.l_fix;
      datum.l_cur = +datum.l_cur;
      datum.op = +datum.op;
      datum.hi = +datum.hi;
      datum.lo = +datum.lo;
      datum.hi52 = +datum.hi52;
      datum.lo52 = +datum.lo52;
      datum.mc = +datum.mc;
      datum.pe = +datum.pe;
      datum.beta = +datum.beta;
      datum.eps = +datum.eps;
      datum.pcls_fix = +datum.pcls_fix;
    })
    callback(data);
  })
  .catch((error) => {
    callback(error.message);
  });;
};

module.exports = {getData, getFullData};
