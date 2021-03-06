import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Toasted from 'vue-toastification'
import "vue-toastification/dist/index.css"

Vue.config.productionTip = false

// Configura o toaster dentro da instância do VueJS //
Vue.use(Toasted, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
