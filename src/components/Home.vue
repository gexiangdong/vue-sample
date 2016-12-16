<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li><router-link :to="{ name: 'foo', params: { id: 123 }}" >跳转到Foo(普通链接的例子）</router-link></li>
      <li v-on:click="gotoFoo">跳转到Foo(Javascript 跳转的例子)</li>
    </ul>
  </div>
</template>

<script>
import CommonUtil from '../CommonUtil.js'

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome, VUE'
    }
  },
  created () {
    // 组件加载完毕会调用此函数
    console.log('created called')
    CommonUtil.setTitle('首页')
    this.$store.commit('setShowBottomMenu', true) // 显示底部菜单
    this.$store.commit('setTab', 'home') // 设置底部高亮菜单为setting
  },
  methods: {
    gotoFoo () {
      // JavaScript跳转到foo页面，并传递参数id=457；除了router.push外还可以router.replace
      this.$router.push({name: 'foo', params: { id: 457 }})
    },
    gotoHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{}
ul li a:visited, ul li a:link {text-decoration: none; color:#0000FF;}
ul li {margin-bottom:50px; text-decoration: none; color:#0000FF;}

</style>
