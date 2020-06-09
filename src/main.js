import Vue from "vue";
import VueCompositionApi from '@vue/composition-api'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import commComponent from '../src/components';
// import uploader from 'vue-simple-uploader';
// Vue.use(uploader);

// 自定义全局组件
import '@/icons/index.js';

// const { LJHcompent } = commComponent;
Vue.config.productionTip = false;
Vue.use(ElementUI);
// vue3.0
Vue.use(VueCompositionApi);
// Vue.use(commComponent);

// runtime(运行模式)
new Vue({
  router,
  store,
  render: h => h(App, {
    // view: {...LJHcompent}
  })
}).$mount("#app");

/**
 * compiler(模式)模板
 * new Vue({
 *  el: '#app',
 * router: router,
 * store: store,
 * template: '<App />',
 * components:{App}
 * });
 * 这种模式才能用这个自定义全局组件
 * Vue.component('svg-icon',{
 *     template: "<div>asdad</div>"
 *   });
 * 如果想要runtime(模式想要自定义组件的话)就把vue模块指向vue/dist/vue.js
 * 因为现在vue模块的默认为runtime模式，指向了‘dist/vue.runtime.common.js’位置
 */