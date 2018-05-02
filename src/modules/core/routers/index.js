import Vue from 'vue';
import Router from 'vue-router';
import homeRouter from '../../home/router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    ...homeRouter,
  ]
});
