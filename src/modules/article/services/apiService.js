import { zkFetch } from '../../core/utils/fetch';

export const article = zkFetch('/article');
export const articleById = zkFetch('/article/:id/:type');
export const articleList = zkFetch('/article/list');

// 评论
export const comment = zkFetch('/comment');
// 回复
export const reply = zkFetch('/comment/reply');
// 评论列表
export const commentList = zkFetch('/comment/:articleId/list');
// 点赞
export const votes = zkFetch('/article/votes');
