import Template from './Template.vue';
const Message = Object.create(null);

Message.install = (Vue, options = {}) => {
  let opt = null;
  let vm = null;
  Vue.prototype.$zkMessage = (tip = '', data = {}) => {
    // 合并 tip 和 data, 在模板中方便操作
    data.tip = tip;
    // 合并参数
    opt = Object.assign({}, options, data);
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
};

export default Message;
