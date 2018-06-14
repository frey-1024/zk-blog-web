import cookies from '../../../core/utils/cookies';
import mutations from './mutations';
import { isAllFull } from '../../../core/utils/string';

const id = cookies.get('id') || null;
const token = cookies.get('token') || null;

export default {
  namespaced: true,
  state: {
    id,
    token,
    isLogin: isAllFull(id, token)
  },
  mutations,
};
