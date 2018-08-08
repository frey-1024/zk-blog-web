import { zkFetch } from '../../core/utils/fetch';

export const article = zkFetch('/article');
export const articleById = zkFetch('/article/:id/:type');
export const articleList = zkFetch('/article/list');
