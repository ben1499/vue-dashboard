import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import axios from 'axios';
import Routes from './routes'


Vue.use(axios);
Vue.use(VueRouter);
Vue.config.productionTip = false
Vue.use(ElementUI, { locale });

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});



new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
