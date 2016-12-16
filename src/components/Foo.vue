/**
 * 这是个带参数路由跳转到的异步组件的例子
 */
<template>
  <div class="foo">
    {{ title }}
    fooId: <span class="fooid">{{ $route.params.id }}</span>
    <router-link to="/" class="gohome">返回首页</router-link>
  </div>
</template>

<script>
import CommonUtil from '../CommonUtil.js'

export default {
  name: 'foo',
  data () {
    return {
      title: 'Welcome to Foo'
    }
  },
  created () {
    // 组件加载完毕会调用此函数
    console.log('created called')
    CommonUtil.setTitle('Foo页面')
    this.$store.commit('setShowBottomMenu', false) // 不显示底部菜单
    this.$store.commit('setTab', 'none') // 设置底部高亮菜单为none, home和setting都不会加量
  },
  beforeRouteEnter (to, from, next) {
    // 导航完成前
    // console.log('beforeRouteEnter to=' + to + ' from=' + from + ' next=' + next + ' called.')
    var a = 3
    if (a < 5) {
      next()
    } else {
      next(false)
    }
  },
  watch: {
    // 如果路由有变化
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      console.log('fechData() ' + this.$route.params)
    },
    commitData () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.foo{padding-top:20px;}
h1, h2 {
  font-weight: normal;
}
.fooid{color:red;}
.gohome{display:block; margin:20px;}
</style>
