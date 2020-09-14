import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import VueMD from './vue-md.js'
Vue.use(VueMD);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
