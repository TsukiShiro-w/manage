import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

// 导入路由
import router from '@/router/index.js'
import store from '@/store/index.js'


Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
