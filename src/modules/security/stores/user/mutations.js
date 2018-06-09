import { SET_STATE } from '../../../core/stores/mutationTypes';

export default {
  [SET_STATE](state, newState) {
    state = newState;
  }
};
