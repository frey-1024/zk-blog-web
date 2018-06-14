import cookies from '../../../core/utils/cookies';
import { SET_STATE } from '../../../core/stores/mutationTypes';
import { isAllFull } from '../../../core/utils/string';

export default {
  [SET_STATE](state, newState) {
    state.id = newState.id;
    state.token = newState.token;
    state.isLogin = isAllFull(newState.id, newState.token);
    cookies.set('id', state.id);
    cookies.set('token', state.token);
  }
};
