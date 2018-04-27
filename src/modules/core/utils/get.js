/**
 * 根据属性，获取元素的样式值
 * @param el  元素
 * @param attr 属性
 * @param pseudoClass 元素伪类
 * @returns {*}
 */
export function getStyle(el, attr, pseudoClass = null) {
  return window.getComputedStyle(el, pseudoClass)[attr];
}
