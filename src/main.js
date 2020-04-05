import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import { VueHammer } from 'vue2-hammer'
// import vuedraggable, { draggable } from 'vuedraggable'
// Vue.use(draggable)
Vue.use(Datetime)
Vue.component('datetime',Datetime)
// Vue.component('draggable',vuedraggable)
Vue.use(VueHammer)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
