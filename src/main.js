import Vue from 'vue';
import MarkdownRun from 'vue-markdown-run';

import App from './App.vue';
// import 'vue-awesome/icons';
import store from './modules/core/stores/index';
import router from './modules/core/routers/index';
import { addGlobalComponents } from './modules/core/components/index';
import { addGlobalPlugins } from './modules/core/plugins/index';
import { addGlobalDirectives } from './modules/core/directives/index';
import '../node_modules/vue-markdown-run/lib/theme/index.css';

Vue.config.productionTip = false;
addGlobalComponents(Vue);
addGlobalPlugins(Vue);
addGlobalDirectives(Vue);
Vue.use(MarkdownRun);
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
  store,
  components: { App },
  template: '<App/>'
});
