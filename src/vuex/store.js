import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowLoadding: false,
    isShowBottomMenu: true,
    currentTab: 'home',
    redPointIds: ['']  // 需要显示红点的项目的ID
  },
  mutations: {
    setShowLoadding (state, showLoadding) {
      state.isShowLoadding = showLoadding
    },
    setShowBottomMenu (state, showBottomMenu) {
      state.isShowBottomMenu = showBottomMenu
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
