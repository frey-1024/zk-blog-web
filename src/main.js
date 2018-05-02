import Vue from 'vue';
import App from './App.vue';
import router from './modules/core/routers/index';

Vue.config.productionTip = false;
// let query = false;
// router.beforeEach((to, from, next) => {
//   if (!query || to.path !== '/') {
//     console.log('aaaa');
//     query = true;
//     return next({ path: '/' });
//   } else {
//     return next();
//   }
// });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
