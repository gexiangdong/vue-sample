/**
 * 一个调用自定义组件的例子；有向子组件传递数据；也有子组件通过事件通知父组件状态改变
 * 动态组件
 */
<template>
  <div>
    <h1>{{ calendar.year }}年{{ calendar.month }}月</h1>
    <Calendar v-bind:cellHandler="calendarCellHandler" v-on:monthChanged="monthChanged" v-on:dayClicked="dayClicked"></Calendar>

    <router-link to="/" class="gohome">返回首页</router-link>
  </div>
</template>

<script>
import CommonUtil from '../CommonUtil.js'
import Calendar from './include/Calendar'
import Vue from 'vue'

export default {
  name: 'MonthCalendar',
  data () {
    return {
      calendar: { year: 1, month: 2 }
    }
  },
  components: {Calendar},
  created () {
    // 组件加载完毕会调用此函数
    console.log('created called')
    this.$store.commit('setShowLoadding', false)
    CommonUtil.setTitle(this.$route.params.year + '年' + this.$route.params.month + '月')
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

    },
    monthChanged (year, month) {
      this.calendar.year = year
      this.calendar.month = month
      console.log('monthChanged:' + year + ',' + month)
    },
    calendarCellHandler (year, month, date) {
      if (date % 3 !== 0) {
        return null
      }
      return Vue.component('child', {
        template: '<span>D' + date + '</span>'
      })
    },
    dayClicked (year, month, date) {
      // 某一天被点击
      console.log('you clicked ' + year + '/' + month + '/' + date)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.foo{padding-top:20px;}
h1 {font-size:18px; margin:0px; padding:5px; text-align:center;}
.fooid{color:red;}
.gohome{display:block; margin:20px;}
</style>
