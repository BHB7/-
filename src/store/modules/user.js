import { getInfo, setInfo } from '@/utils/stoage'
export default {
  // 命名空间
  namespaced: true,
  state () {
    return {
      userInfo: getInfo()
    }
  },
  // 修改方法
  mutations: {
    /**
     *
     * @param {*} state
     * @param {用户id,token} user
     */
    setUserInfo (state, user) {
      // 调用本地存储
      setInfo(user)
      state.userInfo = user
    }
  },
  actions: {}
}
