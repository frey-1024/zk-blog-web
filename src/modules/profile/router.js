export default [{
  name: 'profile',
  path: '/profile',
  redirect: { name: 'basic' },
  component: () => import('./pages/Index.vue'),
  children: [{
    name: 'basic',
    path: 'basic',
    component: () => import('./pages/Basic.vue')
  }, {
    name: 'resetPwd',
    path: 'reset/pwd',
    component: () => import('./pages/ResetPwd.vue')
  }]
}];
