import Vue from "vue";
import Vuex from "vuex";
import { setToken, setUsername, getUsername } from "utils/app";
import { Login } from 'api/login/login';
import app from './modules/app';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    to_ken: '',
    username: getUsername() || ''
  },
  getters: {
    isCollapse: state => state.isCollapse,
    username: state => state.username
  },
  mutations: {
    set_isCollapse (state) {
      state.isCollapse = !state.isCollapse;
      sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse));
    },
    set_toKen (state, value) {
      state.to_ken = value;
    },
    set_username (state, value) {
      state.username = value;
    }
  },
  actions: {
    login ({ commit }, data) {
      return new Promise( (resolve, reject) => {
        Login(data).then(response => {
          const data = response.data.data;
          console.log(data.token);
          commit('set_toKen', data.token);
          commit('set_username', data.username);
          setToken(data.token);
          setUsername(data.username);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    }
  },
  modules: {
    app
  }
});
