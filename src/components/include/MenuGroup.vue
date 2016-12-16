/**
 * 一个菜单组（管理菜单页，中的一个组），在Setting.vue里有调用
 */
<template>
  <ul class="menugroup">
    <li v-for="item in menuItems" :id="item.id" v-bind:class="{ redpoint: showRedPoint(item.id) }"><router-link :to="item.path">{{ item.name }}</router-link></li>
  </ul>
</template>

<script>
export default {
  name: 'MenuGroup',
  methods: {
    showRedPoint (itemId) {
      for (var i = 0; i < this.$store.state.redPointIds.length; i++) {
        if (this.$store.state.redPointIds[i] === itemId) {
          return true
        }
      }
      return false
    }
  },
  props: ['menuItems'] // 从父组件接收的参数
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul.menugroup {margin: 0 0 40px 0; padding: 0 0 0 30px; list-style: none; border-top: 1px solid #DFDFDF; border-bottom: 1px solid #DFDFDF; background-color: #FFF; font-size: 32px;}
ul.menugroup li {list-style:none; padding:0px; margin:0px; border-top:1px solid #DFDFDF; position:relative;}
ul.menugroup li:first-child {border-top: none; }
ul.menugroup li a:link, ul.menugroup li a:visited{ display: block; font-size: 36px; line-height: 84px; text-decoration: none; color: #333; padding-left: 60px; cursor:pointer;}
ul.menugroup li a:after{content: " "; display: inline-block; height: 12px; width: 12px; border-width: 4px 4px 0 0;
    border-color: #999; border-style: solid; position:absolute; transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0); top: 50%; margin-top: -8px; right: 40px;}
ul.menugroup li.redpoint:after{content: " "; display: inline-block; border:0px solid #f43531; background-color:#f43531; right:70px; position: absolute; width:20px; height:20px; border-radius:10px; top: 50%; margin-top:-10px;}
</style>
