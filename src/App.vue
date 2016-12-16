<template>
  <div id="container">
    <router-view></router-view>
    <div id="footer" v-show="state.isShowBottomMenu ">
      <FooterMenu></FooterMenu>
    </div>
    <div id="loadding" v-bind:class="{hideloading: state.isShowLoadding == false}">
      <div class="mask">
      </div>
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 200 200" height="200" width="200">
              <circle cx="15" cy="100" r="6" />
              <circle cx="185" cy="100" r="6" />
              <circle cx="100" cy="15" r="6" />
              <circle cx="100" cy="185" r="6" />
          </svg>
      </div>
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
#loadding{postion:fixed; top:0; left:0; width:100%; height: 100%;}
.hideloading{display:none;}
#loadding .mask {position:fixed; top:0px; bottom:0px; width:100%; height: 100%; background-color: #000; opacity: 0.3; z-index:666;}
#loadding .icon{position:fixed; z-index:996; top:40%; left:50%; width:200px; height:200px; margin: -100px 0px 0px -100px; border-radius:8px; background:#999 url('/static/loadingicon.png') no-repeat center center; background-size: 150px 150px; opacity: 1;}
#loadding .icon svg circle{fill:#FFF; stroke-width:0; stroke:#FFF;}
#loadding .icon svg {animation: rotate 1.6s linear infinite; }
@keyframes rotate {from { transform: rotate(0); } to {transform: rotate(360deg); } }

</style>
