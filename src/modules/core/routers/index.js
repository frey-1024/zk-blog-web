import Vue from 'vue';
import Router from 'vue-router';
import homeRouter from '../../home/router';
import securityRouter from '../../profile/router';
import articleRouter from '../../article/router';
import searchRouter from '../../search/router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'home' } },
    ...securityRouter,
    ...homeRouter,
    ...articleRouter,
    ...searchRouter,
    {
      path: '*',
      redirect: { name: 'home' }
    }
  ]
});
