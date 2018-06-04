import Message from './impl/message/install';

export function addGlobalPlugins(vm, options) {
  // 提示
  vm.use(Message, {
    showClose: true,
    expire: 3000
  });
}
