import { SET_STATE } from '../../../core/stores/mutationTypes';
import { isBlank } from '../../../core/utils/string';

export default {
  [SET_STATE](state, newState) {
    state.id = newState.id;
    state.token = newState.token;
    state.isLogin = !isBlank(newState.id) && !isBlank(newState.token);
  }
};
