import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '@/views/MainView.vue'
import AuthView from '@/views/AuthView.vue'
import RastreioListagemView from '@/views/RastreioListagemView.vue'
import RastreioView from '@/views/RastreioView.vue'
import CalculoFreteView from '@/views/CalculoFreteView.vue'
import CalculoFreteResultadoView from '@/views/CalculoFreteResultadoView.vue'
import Store from '@/store/index'

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
    name: "RastreioListagemView",
    path: "/rastreio",
    component: RastreioListagemView
  },
  {
    name: "RastreioView",
    path: "/rastreio/:tracking_code",
    component: RastreioView,
    props: true
  },
  {
    name: "CalculoFreteView",
    path: "/calculo-frete",
    component: CalculoFreteView,
  },
  {
    name: "CalculoFreteResultadoView",
    path: "/calculo-frete/resultado",
    component: CalculoFreteResultadoView,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  Store.commit('TOGGLE_MENU_PRINCIPAL', false);

  next();
});

export default router
