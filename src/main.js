import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'amfe-flexible'
import '@/styles/index.scss' // global css
import '@/styles/resetStyle.css'
import '@/styles/element-variables.scss'
import App from './App'
import store from './store'
import router from './router'
import api from './api'
import '@/icons' // icon
import '@/permission' // permission control


Vue.use(ElementUI)
Vue.prototype.$api = api;


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
