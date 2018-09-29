import { zkFetch } from '../../core/utils/fetch';

export const articleList = zkFetch('/article/list');
export const searchArticleList = zkFetch('/article/list/search');
