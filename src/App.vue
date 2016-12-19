<template>
  <div id="container">
    <router-view></router-view>
    <div id="footer" v-show="state.isShowBottomMenu ">
      <FooterMenu></FooterMenu>
    </div>
    <div class="loader" v-bind:class="{hideme: state.isShowLoadding == false}">
      <div class="mask"></div>
      <div class="icon">
        <svg viewBox="0 0 32 32" width="32" height="32">
          <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
        </svg>
      </div>
    </div>
    <div class="toastcontainer" v-bind:style="state.toastStyle">
      <div class="mask"></div>
      <div class="message">{{ state.toastMessage }}</div>
    </div>
  </div>
</template>

<script>
import FooterMenu from './components/include/FooterMenu.vue'

export default {
  name: 'app',
  data () {
    return {
      state: this.$store.state
    }
  },
  components: { FooterMenu }
}
</script>

<style>
html, body {height: 100%;}
body{background-color:#FFF; margin:0px; padding:0; font-size:28px;}
#container{margin-bottom:180px;}

/* 弹出的提示层 */
#toast{padding: 16px 5px; position: fixed; top: 200px; z-index: 990; background-color: #666; font-size: 28px; border-radius: 8px; text-align: center; color: #FFF; transition: opacity 2s; }
.toastmessage{text-align:center; padding:50px 30px; transition: opacity 2s; }

/* 底部带图标的菜单条 */
#footer{position: fixed; bottom:0px; height:100px; width:100%; z-index: 900; border-top:1px solid #DFDFDF; background-color: #FFF; font-size: 20px; line-height:20px; text-align:center; color:#999;}
#footer ul {padding:0px; margin:0px; list-style:none;}
#footer ul li{list-style: none; float:left; width: 50%; padding:0px; text-align:center;}
#footer ul li a {width:100px; display:block; margin: 10px auto;}
#footer svg{width:48px; height:48px; margin:5px 26px; fill:#FFF;stroke:#666;stroke-width:2;}
#footer li.selected svg{fill:#00A1E9;stroke:#00A1E9;stroke-width:2}
#footer a:link, #footer a:visited{text-decoration: none; font-size:20px; color:#999; cursor:pointer;}
#footer li.selected a:link, #footer li.selected a:visited {color:#00A1E9;}
#footer li.redpoint:after{content: " "; display: inline-block; border:0px solid #f43531; background-color:#f43531; position: absolute; width:20px; height:20px; border-radius:10px; top: 10px; right:60px; }

/* loadding */
.hideme {display:none;}
.loader {left: 0; top: 0; width:100%; height: 100%; position: fixed;}
.loader .mask {position:fixed; top:0px; bottom:0px; width:100%; height: 100%; background-color: #000; opacity: 0.3; z-index:666;}
.loader .icon {position:absolute; left:50%; top:40%; margin-left:-32px; margin-top: -32px; width:64px; height:64px;}
.loader svg{width:64px; height:64px;}
.loader #spinner {box-sizing: border-box; stroke: #666; stroke-width: 3px; transform-origin: 50%; animation: line 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite, rotate 1.6s linear infinite; }

@keyframes rotate {from { transform: rotate(0); } to {transform: rotate(450deg); } }
@keyframes line {
  0% { stroke-dasharray: 2, 85.964; transform: rotate(0); }
  50% { stroke-dasharray: 65.973, 21.9911; stroke-dashoffset: 0; }
  100% { stroke-dasharray: 2, 85.964; stroke-dashoffset: -65.973; transform: rotate(90deg); } 
}

/* toast */
.toastcontainer { position: fixed; top: 20%; left:50%; margin-left: -150px; width: 300px; overflow: hidden; border-radius:5px; transition:opacity 0.8s;}
.toastcontainer .mask {z-index:-1; position:absolute; left:0px; top:0px; background-color:#666; opacity: 0.9; height:300px; width:100%;}
.toastcontainer .message { padding: 20px; text-align:center; color:#FFF; font-size: 18px; line-height: 24px;}
</style>
