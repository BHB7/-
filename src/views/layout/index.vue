<template>
  <div>
    <!-- 二级路由展示区域 -->
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000" route>
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/categorization" icon="apps-o">分类页</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: ''
    }
  }
}
</script>

<style>
</style>
