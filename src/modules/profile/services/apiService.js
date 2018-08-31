import { zkFetch } from '../../core/utils/fetch';

export const login = zkFetch('/security/login');
export const register = zkFetch('/security/register');
