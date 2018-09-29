export default [{
  name: 'home',
  path: '/home',
  component: () => import('./pages/Index.vue')
}, {
  name: 'search',
  path: '/search',
  component: () => import('./pages/Search.vue'),
}];
