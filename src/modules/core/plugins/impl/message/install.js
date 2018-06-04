import Template from './Template.vue';
const Message = Object.create(null);

Message.install = (Vue, options = {}) => {
  let opt = null;
  let vm = null;
  const zkMessage = (tip = '', data = {}) => {
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
  // 信息类型
  const types = ['warning', 'danger', 'success', 'default'];
  types.forEach((type) => {
    // 方便书写,包括下面多种写法
    // $zkMessage()
    // $zkMessage.waring()
    // $zkMessage.danger()
    // $zkMessage.success()
    // $zkMessage.default()
    zkMessage[type] = (tip, data = {}) => {
      data.type = type;
      zkMessage(tip, data);
    };
  });
  Vue.prototype.$zkMessage = zkMessage;
};

export default Message;
