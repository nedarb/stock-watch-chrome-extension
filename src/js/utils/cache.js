/*
 * To save http requests, we may cache some previously fetched data and send
 * minimal requests.
 */

import request from './request.js';

const cache = new Map();
let error = null;

const updateDataInCache = (symbolKeys, callback) => {
  // Filter the ones that are already closed, don't need to query.
  const openSymbolKeys = [];
  symbolKeys.forEach((symbolKey) => {
    if (cache.get(symbolKey).s) {
      openSymbolKeys.push(symbolKey);
    }
  });
  if (openSymbolKeys.length === 0) {
    callback();
    return;
  }

  request.getData(openSymbolKeys, (data) => {
    if (!Array.isArray(data) && data.hasOwnProperty('error')) {
      cache.clear();
      error = data.error;
      callback();
      return;
    }
    data.forEach((datum) => {
      const symbolKey = datum.e + ':' + datum.t;
      const cachedDatum = cache.get(symbolKey);
      // update cache
      cachedDatum.l = datum.l;
      cachedDatum.c = datum.c;
      cachedDatum.cp = datum.cp;
      cachedDatum.lo = Math.min(cachedDatum.lo, datum.l);
      cachedDatum.hi = Math.max(cachedDatum.hi, datum.l);
      cachedDatum.lo52 = Math.min(cachedDatum.lo52, datum.l);
      cachedDatum.hi52 = Math.max(cachedDatum.hi52, datum.l);
    })
    error = null;
    callback();
  });
};

const getData = (symbolKeys, callback) => {
  const fullFetchSymbolKeys = [];
  const minimalFetchSymbolKeys = [];
  symbolKeys.forEach((symbolKey) => {
    if (cache.has(symbolKey)) {
      minimalFetchSymbolKeys.push(symbolKey);
    } else {
      fullFetchSymbolKeys.push(symbolKey);
    }
  });

  if (fullFetchSymbolKeys.length === 0) {
    updateDataInCache(minimalFetchSymbolKeys, () => {
      if (cache.size === 0 && error) {
        callback({error});
      }
      callback([...cache.values()]);
    })
  } else {
    request.getFullData(fullFetchSymbolKeys, (data) => {
      if (!Array.isArray(data) && data.hasOwnProperty('error')) {
        cache.clear();
        error = data.error;
        callback({error});
        return;
      }
      // Put all the data in the cache.
      data.forEach((datum) => {
        const symbolKey = datum.e + ':' + datum.t;
        cache.set(symbolKey, datum);
      })
      error = null;
      updateDataInCache(minimalFetchSymbolKeys, () => {
        if (cache.size === 0 && error) {
          callback({error});
        }
        callback([...cache.values()]);
      })
    });
  }
};

export default {getData};
