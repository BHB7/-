<template>
  <div>
    <div class="login">
      <!-- 头部 -->
      <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />

      <!-- 主体 -->
      <div class="container">
        <div class="title">
          <h3>手机号登录</h3>
          <p>未注册的手机号登录后将自动注册</p>
        </div>
        <div class="form">
          <div class="form-item">
            <input
              v-model.trim="phoneCode"
              class="inp"
              maxlength="11"
              placeholder="请输入手机号码"
              type="text"
            />
          </div>
          <div class="form-item">
            <input
              v-model.trim="picCode"
              class="inp"
              maxlength="5"
              placeholder="请输入图形验证码"
              type="text"
            />
            <img @click="getPicCode" v-if="picUrl" :src="picUrl" alt="" />
          </div>
          <div class="form-item">
            <input
              v-model="smsCode"
              class="inp"
              placeholder="请输入短信验证码"
              type="text"
            />
            <button @click="getCode">
              {{
                second === totalSecond ? "获取验证码" : second + "秒后重新获取"
              }}
            </button>
          </div>
        </div>

        <div @click="handleLogin" class="login-btn">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
// 全局
import { getPicCode, getSmsCode, handleLogin } from '@/api/login'
import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  data () {
    return {
      smsCode: '',
      phoneCode: '', // 手机号码
      picCode: '', // 图形验证码
      picKey: '', // 图形验证码唯一标识
      picUrl: '', // 请求回来的图片地址
      totalSecond: 60, // 总的秒数
      second: 60 // 当前的秒数
    }
  },
  methods: {
    async getPicCode () {
      // data.base64    data.key    data.md5 进行解构
      const {
        data: { base64, key }
      } = await getPicCode()
      this.picUrl = base64
      this.picKey = key
      console.log(this.picKey, this.picUrl)
    },
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.phoneCode)) {
        Toast('请输入正确的手机号')
        return false
      }
      if (!/\w{4}/.test(this.picCode)) {
        Toast('请输入正确的图形验证码')
        return false
      }

      return true
    },
    async getCode () {
      // 数据格式检验
      if (!this.validFn()) {
        return
      }
      //   发起请求
      await getSmsCode(this.picCode, this.picKey, this.phoneCode)
      Toast('验证码发送成功')

      //   定时器判断
      if (!this.timer && this.second === this.totalSecond) {
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            // 归位
            this.second = this.totalSecond
            clearInterval(this.timer)
            // 清空定时器变量
            this.timer = null
          }
        }, 1000)
      }
    },
    // 登录
    async handleLogin () {
      // 如果响应的status非200 最好抛出一个promise错误
      //  await 会等待成功的promise 如果为错误则不会执行下面的语句
      const res = await handleLogin(this.phoneCode, this.smsCode)
      Toast('登录成功')
      // 存储用户id token
      this.$store.commit('user/setUserInfo', res.data)
      console.log(res)
      this.$router.push('/')
    }
  },
  created () {
    this.getPicCode()
  },
  // 当用户离开时，清除定时器
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ec773c, #ff1911);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
