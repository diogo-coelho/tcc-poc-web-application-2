import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '@/views/MainView.vue'
import AuthView from '@/views/AuthView.vue'
import RastreioView from '@/views/RastreioView.vue'

Vue.use(VueRouter)

const routes = [
  {
    // Rota MainView
    name: "MainView",
    path: "/",
    component: MainView
  },
  {
    // Rota AuthView
    name: "AuthView",
    path: "/auth",
    component: AuthView
  },
  {
    name: "RastreioView",
    path: "/rastreio",
    component: RastreioView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
