
/// utility functions
import $ from 'jquery';

import { FETCH_METHOD, POST_METHOD, GET_METHOD } from '../constants';

const FETCH_ERROR = 'FETCH_ERROR';

let now = Date.now();

export function fetchData(url, initObj = {}) {

  const { params, dispatch = (() => {}), ..._initObj } = initObj;

  const fetchObj = {
    method: FETCH_METHOD,
    // credentials: 'include',
    cache: 'no-cache',
    ..._initObj
  };

  let fetchUrl = url;

  if ( fetchObj.method === POST_METHOD ) {
    if (typeof params === 'string') {
      fetchObj.body = params;
    } else {
      fetchObj.body = JSON.stringify(params || {});
    }
  } else if ( fetchObj.method === GET_METHOD ) {
    const _params = params || {};
    _params._ = now++;
    fetchUrl = `${fetchUrl}?${$.param(_params)}`;
  }

 // console.log('fetchData', fetchUrl, fetchObj);

  return fetch(fetchUrl, fetchObj)
  .then(res => {
    if (!res.ok) {
      return Promise.reject(res);
    }
    return res;
  })
  .catch(error => console.error({
    type: FETCH_ERROR,
    payload: { error, fetchUrl: fetchUrl.replace(/[\?\&]?_=\d+/g, '') }
  }));
}

export function fetchJSON(url, initObj = {}) {

  const { dispatch = (() => {}) } = initObj;

  const fetchObj = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    ...initObj
  };

  return fetchData(url, fetchObj)
    .then(res => res.json())
    .catch(error => Promise.reject(error));
}

export function fetchGetJSON(url, initObj = {}) {

  const fetchObj = {
    method: GET_METHOD,
    ...initObj
  };

  return fetchJSON(url, fetchObj);
}
