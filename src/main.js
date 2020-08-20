import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.directive('focus', { // 指令的定义(全局) //20200819
// 当被绑定的元素插入到 DOM 中时……
	inserted: function (el) {
// 聚焦元素
		el.focus()
		el.placeholder='全局 v-focus 自定义指令'
	}
})
