import Message from './impl/message/install';

export function addGlobalPlugins(vm, options) {
  // 提示
  vm.use(Message, {
    position: 'bottom',
    expire: 3000
  });
}
