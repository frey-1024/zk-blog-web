/**
 * 返回一个  Selection 对象，表示用户选择的文本范围或光标的当前位置。
 * @returns {Selection}
 */
export function getSelection() {
  return window.getSelection();
}

export function getCurrentRange() {
  const selection = getSelection();
  return selection.getRangeAt(0);
}

export function removeAllRanges() {
  const selection = getSelection();
  selection.removeAllRanges();
  return selection;
}

/**
 * 恢复选取
 */
export function restoreSelection(prevRange) {
  const selection = removeAllRanges();
  selection.addRange(prevRange);
}
