import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: false
  },
  getters: {
    isCollapse: state => state.isCollapse
  },
  mutations: {
    set_isCollapse (state) {
      state.isCollapse = !state.isCollapse;
    }
  },
  actions: {},
  modules: {}
});
