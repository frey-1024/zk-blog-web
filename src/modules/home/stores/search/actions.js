import { SET_STATE, SET_LOADING } from '../../../core/stores/mutationTypes';
import { searchArticleList } from '../../services/apiService';
export default {
  refreshSearch (context, params) {
    const body = Object.assign({
      pageSize: 5,
      currentPage: 1,
    }, params);
    context.commit(`${SET_LOADING}`, { loading: true });
    searchArticleList.post(body).then((result) => {
      context.commit(`${SET_STATE}`, { ...result.data, search: body.search });
      context.commit(`${SET_LOADING}`, { loading: false });
    }).catch(() => {
      context.commit(`${SET_LOADING}`, { loading: false });
    });
  }
};
