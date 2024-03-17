const INFKEY = 'userkey'
const SEARCH_KEY = 'serarch_key'
// 获取本地数据 如果没有则返回 空模板对象
export const getInfo = () => {
  const userInfo = JSON.parse(localStorage.getItem(INFKEY))
  return userInfo || {
    token: '',
    userId: ''
  }
}
// 本地存储
export const setInfo = (userInfo) => {
  localStorage.setItem(INFKEY, JSON.stringify(userInfo))
}

// 移除本地存储
export const romoveInfo = () => {
  localStorage.removeItem(INFKEY)
}

// 搜索
export const setSearch = (key) => {
  localStorage.setItem(SEARCH_KEY, JSON.stringify(key))
}

// 获取本地数据
export const getSearch = () => {
  const res = localStorage.getItem(SEARCH_KEY)
  return res ? JSON.parse(res) : []
}

// 删除
export const romoveSearch = () => {
  localStorage.removeItem(SEARCH_KEY)
}
