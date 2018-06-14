import Message from './impl/message/install';
import Confirm from './impl/confirm/install';

export function addGlobalPlugins(vm, options) {
  // 提示
  vm.use(Message, {
    showClose: true,
    expire: 3000
  });
  // 确认提示框
  vm.use(Confirm, {
    showClose: true,
    expire: 3000
  });
}
