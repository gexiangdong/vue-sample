/**
 * 底部菜单条
 */
<template>
  <ul>
    <li v-bind:class="{ selected: state.currentTab == 'home' , redpoint: showRedPoint('home')}" id="tabhome">
      <router-link to="/" >
        <FooterIconHome></FooterIconHome>
        首页
      </router-link>
    </li>
    <li v-bind:class="{ selected: state.currentTab == 'setting', redpoint: showRedPoint('setting') }" id="tabsetting">
      <router-link to="/setting">
        <FooterIconSetting></FooterIconSetting>
        设置
      </router-link>
    </li>
  </ul>
</template>

<script>
import FooterIconHome from './icons/FooterIconHome'
import FooterIconSetting from './icons/FooterIconSetting'

export default {
  name: 'FooterMenu',
  data () {
    return {
      state: this.$store.state
    }
  },
  components: { FooterIconHome, FooterIconSetting },
  created () {
  },
  methods: {
    showRedPoint (itemId) {
      for (var i = 0; i < this.$store.state.redPointIds.length; i++) {
        if (this.$store.state.redPointIds[i] === itemId) {
          return true
        }
      }
      return false
    }
  }
}
</script>
