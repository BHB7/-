<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>

<script>
import Layout from './views/layout/index.vue'
export default {
  components: {
    Layout
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit (e) {
      console.log(e)
    }
  }
}
</script>

<style>
</style>
<style lang="less">
.box {
  margin: 0 auto;
  width: 300px;
  height: 300px;
  background-color: pink;
  p {
    line-height: 300px;
    text-align: center;
  }
}
</style>
