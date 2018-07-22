import mutations from './mutations';

export default {
  namespaced: true,
  state: {
    id: null,
    token: null,
    isLogin: true,
  },
  mutations,
};

