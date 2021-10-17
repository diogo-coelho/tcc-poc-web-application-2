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
    },
    menuPrincipal: false,
    route: undefined
  },
  mutations: {
    SET_USER: (state, usuario) => {
      state.user = usuario
    },
    TOGGLE_MENU_PRINCIPAL: (state, boolean) => {
      state.menuPrincipal = boolean;
    },
    SET_NAME_ROUTE: (state, name) => {
      state.route = name;
    }
  },
  actions: {
    configurarSessao: ({ commit }, sessao) => {
      commit('SET_USER', sessao);
    },
    toggleMenuPrincipal: ({ commit }, boolean) => {
      commit('TOGGLE_MENU_PRINCIPAL', boolean);
    },
    setRouteName: ({ commit }, name) => {
      commit('SET_NAME_ROUTE', name);
    }
  },
  modules: {
  }
})
