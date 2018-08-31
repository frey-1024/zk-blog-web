import Template from './Template.vue';
const Login = Object.create(null);

Login.install = (Vue) => {
  let vm = null;
  Vue.prototype.$zkLogin = () => {
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

export default Login;
