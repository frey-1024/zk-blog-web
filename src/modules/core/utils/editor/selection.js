/**
 * 返回一个  Selection 对象，表示用户选择的文本范围或光标的当前位置。
 * @returns {Selection}
 */
export function getSelection() {
  return window.getSelection();
}

export function getCurrentRange(prevRange) {
  const selection = getSelection();
  if (selection.rangeCount < 1 && prevRange) {
    return prevRange;
  }
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

// 选区是否为空
export function isSelectionEmpty(prevRange) {
  const range = getCurrentRange(prevRange);
  return range && range.startContainer && range.startContainer === range.endContainer && range.startOffset === range.endOffset;
}
