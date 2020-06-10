import Vue from "vue";
import Vuex from "vuex";
// import Cookie from "cookie_js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
    // isCollapse: JSON.parse(Cookie.get('isCollapse')) || false
  },
  getters: {
    isCollapse: state => state.isCollapse
  },
  mutations: {
    set_isCollapse (state) {
      state.isCollapse = !state.isCollapse;
      // Cookie.set('isCollapse',JSON.stringify(state.isCollapse))
      // html5本地存储
      sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse));
    }
  },
  actions: {},
  modules: {}
});
