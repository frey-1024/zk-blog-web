import Loading from './Loading';

export function addGlobalDirectives(vm) {
  // 加载 loading
  vm.directive('loading', Loading);
}
