import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Itunes from '../views/Itunes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/itunes',
    name: 'Itunes',
    component: Itunes
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
