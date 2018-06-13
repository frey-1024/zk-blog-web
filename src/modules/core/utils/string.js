/**
 * 判断val 是否为空值
 * @param val
 * @returns {boolean}
 */

export function isBlank (val) {
  return isUndef(val) || val === '' || val.toString().trim() === '';
}

export function isUndef(val) {
  return val === null || typeof val === 'undefined';
}

export function isEmptyObject (obj) {
  return !obj || Object.keys(obj).length <= 0;
}

const objToString = Object.prototype.toString;
export function isObject(obj) {
  return objToString.call(obj) === '[object Object]';
}
export function isArray(obj) {
  return objToString.call(obj) === '[object Array]';
}

export function objMerge(obj1 = {}, obj2 = {}, isDepth) {
  if (!isDepth) {
    return { ...obj1, ...obj2 };
  }
  const result = { ...obj1 };
  let val;
  Object.keys(obj2).forEach((key) => {
    val = obj2[key];
    if (isObject(val) && isObject(result[key])) {
      result[key] = { ...result[key], ...val };
    } else {
      result[key] = val;
    }
  });
  return result;
}
