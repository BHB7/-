import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  // 挂载user模块
  modules: {
    user
  },
  getters: {
    token (state) {
      return state.user.userInfo.token
    }
  }
})
