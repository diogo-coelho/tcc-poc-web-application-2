import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: null,
      email: null,
      name: null,
      profile_id: null
    }
  },
  mutations: {
    SET_USER: (state, usuario) => {
      state.user = usuario
    }
  },
  actions: {
    configurarSessao: ({ commit }, sessao) => {
      commit('SET_USER', sessao);
    }
  },
  modules: {
  }
})
