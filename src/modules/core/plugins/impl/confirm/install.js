import Template from './Template.vue';
const Confirm = Object.create(null);

Confirm.install = (Vue, options = {}) => {
  let opt = null;
  let vm = null;
  const zkConfirm = (tip = '提示', title = '你确定吗?', data = {}) => {
    // 合并 tip 和 data, 在模板中方便操作
    data.tip = tip;
    data.title = title;
    // 合并参数
    opt = Object.assign({
      showCancelBtn: true,
      showConfirmBtn: true,
      cancelBtnText: '取消',
      confirmBtnText: '确定',
    }, options, data);
    if (!vm) {
      const tpl = Vue.extend(Template);
      // 实例化， Vue挂载目标
      vm = new tpl();
      // 添加DOM
      document.body.appendChild(vm.$mount().$el);
      return vm.open(opt);
    }
    vm.options = opt;
    return vm.open(opt);
  };
  // 信息类型
  const types = ['warning', 'danger', 'success', 'info'];
  types.forEach((type) => {
    // 方便书写,包括下面多种写法
    zkConfirm[type] = (tip, title, data = {}) => {
      data.type = type;
      return zkConfirm(tip, title, data);
    };
  });
  Vue.prototype.$zkConfirm = zkConfirm;
};

export default Confirm;
