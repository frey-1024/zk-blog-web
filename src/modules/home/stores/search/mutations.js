import { SET_STATE, SET_LOADING } from '../../../core/stores/mutationTypes';

export default {
  [SET_STATE](state, newState) {
    const re = new RegExp(`${newState.search}`, 'gi');
    newState.rows.forEach((item) => {
      item.title = item.title.replace(re, (word) => `<span class="text-red">${word}</span>`);
    });
    state.searchData = newState;
  },
  [SET_LOADING](state, newState) {
    state.loading = newState.loading;
  }
};
