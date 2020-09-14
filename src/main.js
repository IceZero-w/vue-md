import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import router from './router.js'
import VueMD from './vue-md.js'
Vue.use(VueMD);
Vue.use(Router)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
