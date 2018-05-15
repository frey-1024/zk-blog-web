import Vue from 'vue';
import App from './App.vue';
import 'vue-awesome/icons';
import router from './modules/core/routers/index';
import { addGlobalComponents } from './modules/core/global/components';

Vue.config.productionTip = false;
addGlobalComponents(Vue);
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
