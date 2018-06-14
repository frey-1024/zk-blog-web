import { isBlank } from './string';

function isUndefined (value) {
  return typeof value === 'undefined';
}

function isDefined (value) {
  return typeof value !== 'undefined';
}

function isString (value) {
  return typeof value === 'string';
}

function getBaseHref () {
  const oBase = document.getElementsByTagName('base')[0];
  if (!oBase) {
    return '';
  }
  const href = oBase.getAttribute('href');
  return href ? href.replace(/^(https?\:)?\/\/[^\/]*/, '') : '';
}

function cookieWriter (key, value, options) {
  let path, expires;
  const defaultPath = getBaseHref();
  options = options || {};

  path = isDefined(options.path) ? options.path : defaultPath;
  if (isUndefined(value)) {
    expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
  }
  if (isString(expires)) {
    expires = new Date(expires);
  }
  let str = encodeURIComponent(key) + '=' + encodeURIComponent(value);
  str += expires ? ';expires=' + expires.toUTCString() : '';
  str += path ? ';path=' + path : '';
  str += options.domain ? ';domain=' + options.domain : '';
  str += options.secure ? ';secure' : '';
  document.cookie = str;
}

function cookiesReader () {
  const currentCookie = document.cookie || '';
  const lastCookies = {};
  let cookie, index, name;

  const cookieArray = currentCookie.split('; ');

  for (let i = 0; i < cookieArray.length; i++) {
    cookie = cookieArray[i];
    index = cookie.indexOf('=');
    if (index > 0) {
      name = decodeURIComponent(cookie.substring(0, index));
      lastCookies[name] = decodeURIComponent(cookie.substring(index + 1));
    }
  }
  return lastCookies;
}

function getCookieByKey (key) {
  const lastCookies = cookiesReader();
  for (let i in lastCookies) {
    if (i === key) {
      return lastCookies[i];
    }
  }
  return '';
}

function toJson (value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}

export default {
  // 获取cookie
  get: function (key) {
    return getCookieByKey(key);
  },
  // 获取cookie对象
  getObject: function (key) {
    return JSON.parse(getCookieByKey(key));
  },
  // 获取全部cookies，allParse 是否完全解析josn
  getAll: function (allParse) {
    if (!allParse) {
      return cookiesReader();
    }
    const lastCookies = cookiesReader();

    for (let i in lastCookies) {
      lastCookies[i] = toJson(lastCookies[i]);
    }
    return lastCookies;
  },
  // 设置或者修改cookie，value是字符串
  set: function (key, value, options) {
    if (isBlank(value)) {
      this.remove(key);
      return;
    }
    cookieWriter(key, value, options);
  },
  // 设置或者修改cookie,value是对象
  setObject: function (key, value, options) {
    value = JSON.stringify(value);
    cookieWriter(key, value, options);
  },
  // 移除cookie
  remove: function (key) {
    cookieWriter(key);
  },
  // 移除全部cookies
  removeAll: function () {
    const cookies = cookiesReader();
    const keys = Object.keys(cookies);
    for (let i in keys) {
      this.remove(i);
    }
  }
};
