/* 封装axios用于发送请求 */
import axios from 'axios'
import { Toast } from 'vant'

// 创建一个新的axios实例
const request = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0 // 不会自动关闭
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么 默认axios会包装一层data
  const res = response.data
  if (res.status !== 200) {
    // Toast 默认是单例模式，后面的toast调用了，会将前一个toast效果覆盖
    // 同时只能存在一个Toast
    Toast(res.message)
    // 抛出一个错误的promise
    return Promise.reject(res.message)
  } else {
    // 当响应完成后 关闭loading效果
    Toast.clear()
  }
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出
export default request
