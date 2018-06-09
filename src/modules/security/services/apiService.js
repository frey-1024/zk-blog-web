import { zkFetch } from '../../core/utils/fetch';

export const login = zkFetch('/:user/security/:id/login/:name');
