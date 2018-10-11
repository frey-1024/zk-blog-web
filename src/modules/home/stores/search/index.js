import mutations from './mutations';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    loading: false,
    searchData: {},
  },
  mutations,
  actions,
};
