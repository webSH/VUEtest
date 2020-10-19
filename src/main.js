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

Vue.directive('focus', { // 指令的定义(全局) //hA 20200819
// 当被绑定的元素插入到 DOM 中时……
	inserted: function (el) {
// 聚焦元素
		el.focus()
		el.placeholder='全局 v-focus 自定义指令'
	}
})

Vue.directive('href-txt', { // 指令的定义(全局) //hA 20201015
// 当被绑定的元素插入到 DOM 中时……
	inserted: function (el) {
// href就是text
		el.textContent = decodeURI(el.href)
    el.title = '点击打开 '+decodeURI(el.href)
	}
})

import '@/style/main.scss' //hA 20201015
