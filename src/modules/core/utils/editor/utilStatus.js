/**
 * 重置工具栏状态
 */
export function resetUtilsStatus(utils) {
  utils.forEach((util) => {
    // 当状态可以设置时， 状态修改为false
    if (!util.unselect) {
      util.active = false;
    }
  });
}

function findTagNameOnUtil(util, tagName) {
  return !util.unselect && util.el && util.el.indexOf(tagName) !== -1;
}

function setUtilsStatusByTagName(utils, parentElement) {
  let util;
  for (let i = 0, l = utils.length; i < l; i += 1) {
    util = utils[i];
    if (findTagNameOnUtil(util, parentElement.tagName.toUpperCase())) {
      util.active = true;
      return;
    }
  }
}

function setUtilsDropMenuStatus(utils, parentElement) {
  const utilsDropStyleKeys = ['lineHeight'];
  const elStyles = parentElement.style;
  let styleVal;
  utilsDropStyleKeys.forEach((name) => {
    styleVal = elStyles[name];
    if (styleVal === 0 || styleVal) {
      const findUtil = utils.find((util) => util.styleKey === name);
      if (findUtil && findUtil.dropMenus) {
        findUtil.dropMenus.forEach((menu) => {
          menu.active = styleVal === menu.val || parseFloat(styleVal) === menu.val;
        });
      }
    }
  });
}

export function setUtilsStatusByRange(utils) {
  // 把之前的状态清除
  resetUtilsStatus(utils);

  const selection = getSelection();
  const range = selection.getRangeAt(0);
  let parentElement = range.startContainer.parentNode;
  while (parentElement && parentElement.className.indexOf('zk-editor-content') < 0) {
    setUtilsStatusByTagName(utils, parentElement);
    setUtilsDropMenuStatus(utils, parentElement);
    parentElement = parentElement.parentNode;
  }
}
