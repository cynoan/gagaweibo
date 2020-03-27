import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: "",
    infos: {},
    nowDetails: {}
  },
  mutations: {
    setUid(state, uid) {
      state.uid = uid;
    },
    logout(state) {
      state.uid = "";
      state.infos = {};
    },
    setInfos(state, infos) {
      state.infos = infos;
    },
    setDetails(state, details) {
      state.nowDetails = details;
    },
    regetUser(state) {
      if (!state.uid) {
        state.uid = JSON.parse(window.localStorage.getItem("user")).uid;
        state.infos = JSON.parse(window.localStorage.getItem("infos"));
      }
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {

  }
})
