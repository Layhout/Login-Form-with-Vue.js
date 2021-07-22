import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isLogged: false,
  },
  getters: {
    User(state) {
      return state.user;
    },
    IsLogged(state) {
      return state.isLogged;
    },
  },
  mutations: {
    setUser(state, res) {
      switch (res.status) {
        case 200:
          state.user = res.data
          window.localStorage.currentUser = JSON.stringify(res.data);
          state.isLogged = true;
          break;
        case 401:
          state.user = { notFound: true }
          break;
        default:
          state.user = { serverFail: true }
      }
    },
    logout(state) {
      state.isLogged = false;
      state.user = null;
      window.localStorage.currentUser = JSON.stringify(null);
    },
    setLoggedUser(state, loggedUser) {
      state.user = loggedUser;
      state.isLogged = true;
    },
    updFail(state, info) {
      state.user = { ...state.user, updFail: info };
    },
    serverFail(state, info) {
      state.user = { ...state.user, serverFail: info };
    }
  },
  actions: {
    async handleCheckUser({ commit }, loggedUser) {
      try {
        const res = await axios.post("http://localhost:1000/check", loggedUser)
        commit("setUser", res);
      } catch (err) {
        commit("setUser", err.response);
      }
    },
    handleLogout({ commit }) {
      commit("logout");
    },
    handleRegister({ commit }, newUser) {
      return axios.post("http://localhost:1000/save", newUser)
    },
    handleLoggedUser({ commit }) {
      if (window.localStorage.currentUser) {
        commit("setLoggedUser", JSON.parse(window.localStorage.currentUser))
      }
    },
    async handleEdit({ commit }, updUser) {
      await axios.patch("http://localhost:1000/update", updUser)
        .then((res) => {
          commit("setLoggedUser", res.data);
        })
        .catch((err) => {
          (err.response.status === 400) ? commit("updFail", true) : commit("serverFail", true)
        })
    }
  },
  modules: {
  }
})
