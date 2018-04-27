import Vue from 'vue';
import App from './App.vue';
import router from './modules/core/routers/index';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
