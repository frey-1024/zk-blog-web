/**
 * 判断val 是否为空值
 * @param val
 * @returns {boolean}
 */
export function isBlank (val) {
  return val === null || typeof val === 'undefined' || val === '' || val.trim() === '';
}
