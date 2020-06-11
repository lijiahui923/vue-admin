import { Login } from 'api/login/login';

const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
  // isCollapse: JSON.parse(Cookie.get('isCollapse')) || false
};
const getters = {
  isCollapse: state => state.isCollapse
};
const mutations = {
  set_isCollapse (state) {
    state.isCollapse = !state.isCollapse;
    // Cookie.set('isCollapse',JSON.stringify(state.isCollapse))
    // html5本地存储
    sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse));
  }
};
const actions = {
    login (context, data) {
      return new Promise( (resolve, reject) => {
        Login(data).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    }
  };
export default {
  // 区分命名空间
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
