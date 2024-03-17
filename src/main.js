import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/common.less'
// 全部导入
// import Vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(Vant)
import vant from '@/utils/vant-ui'
new Vue({
  router,
  store,
  vant,
  render: h => h(App)
}).$mount('#app')
