export default [{
  name: 'article',
  path: '/article',
  redirect: { name: 'view' },
  component: () => import('./pages/Index.vue'),
  children: [{
    name: 'view',
    path: 'view/:id',
    component: () => import('./pages/View.vue'),
  }, {
    name: 'edit',
    path: 'edit/:id?',
    component: () => import('./pages/Edit.vue'),
  }],
}];
