import Vue from 'vue'
import VueRouter from 'vue-router';
import shopping from '@/views/shopping'
import stickys from '@/views/stickys'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'stickys',
    component: stickys
  },
  {
    path:'/shopping',
    name:'shopping',
    component: shopping
  },
]

const router = new VueRouter({
  routes
})

export default router
