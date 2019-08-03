import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueResource from 'vue-resource'
import store from './store'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


Vue.use(vueResource)
Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
