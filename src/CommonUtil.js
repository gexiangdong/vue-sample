/*
 * 一些全局公用函数
 * 需要使用这些公共函数的component。 例如：先
 * import CommonUtil from '../CommonUtil.js'
 * 然后 CommonUtil.setTitle('要更改的页面标题') 这样引用即可
 */

/**
 * 更改页面标题（主要应对ios微信上documnet.title改变后标题不会自动更改的问题）
 */
function setTitle (title) {
  var u = navigator.userAgent
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isiOS) {
    document.title = title
    var iframe = document.createElement('IFRAME')
    iframe.src = '/static/blank.txt'
    iframe.style.width = '1px'
    iframe.style.height = '1px'
    iframe.style.display = 'none'
    iframe.onload = function () {
      window.setTimeout(function () {
        document.body.removeChild(iframe)
      }, 1)
    }
    document.body.appendChild(iframe)
  } else {
    document.title = title
  }
}

/**
 * 需要导出的public 的方法
 */
module.exports = {
  setTitle: setTitle
}
