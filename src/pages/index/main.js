import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';

import '@/styles/index.scss'; // global css

import App from './App.vue';
import router from './router';
import store from './store';

import '@/icons'; // icon
import 'virtual:svg-icons-register'; // svg-register
import './permission'; // permission control

// import './assets/main.css';
Vue.config.productionTip = false;

Vue.use(Antd);

/* 开发环境mock数据，生产环境删掉 */
import { setupProdMockServer } from '@/utils/mockProdServer';
setupProdMockServer(import.meta.env.VITE_APP_BASE_API);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
