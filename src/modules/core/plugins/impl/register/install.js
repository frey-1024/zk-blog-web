import Template from './Template.vue';
const Register = Object.create(null);

Register.install = (Vue) => {
  let vm = null;
  Vue.prototype.$zkRegister = () => {
    if (!vm) {
      const tpl = Vue.extend(Template);
      // 实例化， Vue挂载目标
      vm = new tpl();
      // 添加DOM
      document.body.appendChild(vm.$mount().$el);
      return vm.open();
    }
    return vm.open();
  };
};

export default Register;
