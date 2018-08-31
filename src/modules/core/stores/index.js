import Vue from 'vue';
import Vuex from 'vuex';
import profileStores from '../../profile/stores/index';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    ...profileStores
  },
  // 始终开启严格模式，保证状态变更都是由 mutation 函数引起的。
  strict: true
});
