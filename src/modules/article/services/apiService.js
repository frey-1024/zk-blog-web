import { zkFetch } from '../../core/utils/fetch';

export const article = zkFetch('/article');
export const articleById = zkFetch('/article/:id');
export const articleBySearch = zkFetch('/article/search');
