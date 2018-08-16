import { zkFetch } from '../../core/utils/fetch';

export const article = zkFetch('/article');
export const articleById = zkFetch('/article/:id/:type');
export const articleList = zkFetch('/article/list');

// 评论
export const comment = zkFetch('/comment');
// 评论列表
export const commentList = zkFetch('/comment/:articleId/list');
