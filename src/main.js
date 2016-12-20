// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Home from './components/Home'

Vue.use(VueRouter)

// Foo是异步调用的组件的例子； Home则是同步调用的组件
const Foo = resolve => require(['./components/Foo'], resolve)
const Setting = resolve => require(['./components/Setting'], resolve)
const MonthCalendar = resolve => require(['./components/MonthCalendar'], resolve)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/foo/:id', name: 'foo', component: Foo },
  { path: '/setting', component: Setting },
  { path: '/monthcalendar/:year/:month', component: MonthCalendar }
]

const router = new VueRouter({
  routes: routes
})

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

app.$mount('#app')
