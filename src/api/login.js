// 登录相关的所有接口
import request from '@/utils/request'
// 获取图形验证码
// 导出
export const getPicCode = () => {
  return request.get('/captcha/image')
}
// 获取短信验证码
/**
 *
 * @param {图形验证码} captchaCode
 * @param {图形验证码key} captchaKey
 * @param {接收验证码手机} mobile
 * @returns
 */
export const getSmsCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 手机验证码登录
/**
 * @param { 是否存在第三方用户信息 } isParty
 * @param { 手机号 } mobile
 * @param { 三方登录信息，默认为：{} } partyData
 * @param { 短信验证码， 测试环境验证码为：246810 } smsCode
 */
export const handleLogin = (mobile, smsCode, isParty = false, partyData = {}) => {
  return request.post('/passport/login', {
    form: {
      mobile,
      smsCode,
      isParty,
      partyData
    }
  })
}
