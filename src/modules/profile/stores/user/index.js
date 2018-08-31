import cookies from '../../../core/utils/cookies';
import mutations from './mutations';
import { getNumber, isAllFull } from '../../../core/utils/string';

const id = getNumber(cookies.get('id'));
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
