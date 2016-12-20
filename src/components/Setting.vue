/**
 * 设置界面
 */
<template>
  <div class="setting">
    <MenuGroup :menuItems="groupA"></MenuGroup>
    <MenuGroup :menuItems="groupB"></MenuGroup>
  </div>
</template>

<script>
import CommonUtil from '../CommonUtil.js'
import MenuGroup from './include/MenuGroup'

export default {
  name: 'Setting',
  data () {
    return {
      groupA: [{path: '/foo/888', name: '个人信息'},
               {path: '/monthcalendar/2016/12', name: '日历'},
               {path: '/aa', name: '设置头像'},
               {path: '/aa', name: '修改密码', id: 'changepassword'}],
      groupB: [{path: '/aa', name: '切换用户'},
               {path: '/aa', name: '退出登录'}]
    }
  },
  components: { MenuGroup },
  created () {
    // 组件加载完毕会调用此函数
    console.log('created called')
    CommonUtil.setTitle('设置')
    this.$store.commit('setTab', 'setting') // 设置底部高亮菜单为setting
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.setting{padding-top:35px; background-color: #EFEFEF;}

</style>
