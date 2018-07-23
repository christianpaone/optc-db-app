import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import vuestars from 'vue-stars' 
import App from './App'
import Home from './components/Home'
import Characters from './components/characters/Characters'
import router from './router'
import store from './store'

Vue.use(Vuetify);
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App, Home, Characters, vuestars},
  router,
  store,
  template: '<App/>'
}).$mount('#app')
