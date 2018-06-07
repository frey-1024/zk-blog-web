import { objMerge, isEmptyObject } from './string';

function handleFetch(url, options) {
  return fetch(url, options).then(res => res.json());
}
function jointUrl(url, params = {}) {
  if (isEmptyObject(params)) {
    return url;
  }
  let joinStr = '?';
  Object.keys(params).forEach((key) => {
    url += `${joinStr}${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    joinStr = '&';
  });
  return url;
}
export function zkFetch (url, options = {}) {
  const opts = objMerge({
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json'
    },
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
  }, options, true);
  return {
    get(params) {
      opts.method = 'get';
      return handleFetch(jointUrl(url, params), opts);
    },
    post(data, params) {
      opts.method = 'post';
      opts.body = JSON.stringify(data);
      return handleFetch(jointUrl(url, params), opts);
    },
    delete(params) {},
    put(data, params) {},
  };
}
