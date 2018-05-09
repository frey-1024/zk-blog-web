// 文本行距, 下拉选取原数据
const lineHeightMenus = [{
  name: '单倍行距',
  val: 1,
  active: false,
}, {
  name: '1.5倍行距',
  val: 1.5,
  active: true,
}, {
  name: '2倍行距',
  val: 2,
  active: false,
}, {
  name: '2.5倍行距',
  val: 2.5,
  active: false,
}, {
  name: '3倍行距',
  val: 3,
  active: false,
}];

/**
 * 工具图标列表原数据
 */
export const editorMenu = [
  { name: 'bold', icon: 'bold', active: false, el: ['B', 'STRONG'] },
  { name: 'italic', icon: 'italic', active: false, el: ['I', 'EM'] },
  { name: 'underline', icon: 'underline', active: false, el: ['U'] },
  { name: 'strikethrough', icon: 'strikethrough', active: false, el: ['S', 'STRIKE'] },
  { name: 'lineheight', styleKey: 'lineHeight', icon: 'text-height', active: false, dropMenus: lineHeightMenus, dropStyle: { left: 0, width: '120px', 'max-height': '130px', top: '25px', fontSize: '12px' } },
  { name: 'removeformat', icon: 'eraser', unselect: true, active: false, separator: true },
  { name: 'undo', icon: 'undo', unselect: true, },
  { name: 'redo', icon: 'redo', unselect: true, },
];

/**
 * 工具编辑模式图标列表原数据
 */
export const editorMode = [
  { name: 'preview', icon: 'eye', active: false, },
  { name: 'expand', icon: 'expand', active: false, },
];
