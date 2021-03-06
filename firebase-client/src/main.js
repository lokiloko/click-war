// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
// import Firebase from 'firebase'
import VueFire from 'vuefire'
import router from './router'
import store from './vuex/store'
import '@/assets/css/bootstrap.min.css'
import '@/assets/js/jquery.min.js'
import '@/assets/js/bootstrap.min.js'
import VeeValidate from 'vee-validate'
import JsonWebToken from 'jsonwebtoken'

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(VueFire)
Vue.use(VeeValidate)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
