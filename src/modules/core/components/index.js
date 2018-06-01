import ZkButton from '../components/ZkButton.vue';
import Icon from 'vue-awesome/components/Icon';

// 全局注册（在 `main .js` 文件中）

export function addGlobalComponents(vm) {
  vm.component('Icon', Icon);
  vm.component('ZkButton', ZkButton);
}
