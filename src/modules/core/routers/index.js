import Vue from 'vue';
import Router from 'vue-router';
import homeRouter from '../../home/router';
import securityRouter from '../../profile/router';
import articleRouter from '../../article/router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'home' } },
    ...securityRouter,
    ...homeRouter,
    ...articleRouter,
    {
      path: '*',
      redirect: { name: 'home' }
    }
  ]
});
