export default [{
  name: 'security',
  path: '/security',
  redirect: { name: 'login' },
  component: () => import('./pages/Index.vue'),
  children: [{
    name: 'login',
    path: 'login',
    component: () => import('./components/Login.vue')
  }, {
    name: 'register',
    path: 'register',
    component: () => import('./components/Register.vue')
  }]
}];
