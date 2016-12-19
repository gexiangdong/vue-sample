import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
  isShowLoadding: false,
  isShowBottomMenu: true,
  toastStyle: {opacity: 1, display: 'none'}, // 仅供App.vue和此文件中js使用；其他地方不应该修改此变量
  toastMessage: '',
  currentTab: 'home',
  redPointIds: ['']  // 需要显示红点的项目的ID
}

var beginHideToastHandle = null
var hideToastHandle = null
function beginHideToast () {
  state.toastStyle = {opacity: 0, display: ''}
  if (hideToastHandle !== null) {
    window.clearTimeout(hideToastHandle)
  }
  hideToastHandle = window.setTimeout(hideToast, 700)
}
function hideToast () {
  state.toastStyle = {opacity: 0, display: 'none'}
}

export default new Vuex.Store({
  state: state,
  mutations: {
    setShowLoadding (state, showLoadding) {
      state.isShowLoadding = showLoadding
    },
    setShowBottomMenu (state, showBottomMenu) {
      state.isShowBottomMenu = showBottomMenu
    },
    showToast (state, message, duration) {
      state.toastMessage = message
      state.toastStyle = {opacity: 1, display: ''}
      if (beginHideToastHandle !== null) {
        window.clearTimeout(beginHideToastHandle)
      }
      beginHideToastHandle = window.setTimeout(beginHideToast, (typeof duration === 'undefined' || duration === null ? 2000 : duration))
    },
    setTab (state, selectedTab) {
      state.currentTab = selectedTab
    },
    addRedPointIds (state, redPointIds) {
      // 增加一些需要红点的条目的ID
      state.redPointIds = state.redPointIds.concat(redPointIds)
    },
    setRedPointIds (state, redPointIds) {
      // 重新设置所有需要红点的条目的ID
      state.redPointIds = redPointIds
    },
    removeRedPointIds (state, ids) {
      // 删除一些需要红点的条目的ID
      var newIds = []
      for (var id in state.redPointIds) {
        var keeped = true
        for (var idToDel in ids) {
          if (id === idToDel) {
            keeped = false
            break
          }
        }
        if (keeped) {
          newIds.push(id)
        }
      }
      state.redPointIds = newIds
    }
  }
})
