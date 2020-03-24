import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
