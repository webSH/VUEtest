<template>
	<div class="test">
		<h2>20200813</h2>
		<div id="nav">
			<router-link to="">本页</router-link>
		</div>
		<div>
			<h3>自定义指令</h3>
			<div>
				<h4>v-focus 加载即聚焦</h4>
				<input v-focus type="" name=""> 
				<input v-foc type="" name="">
			</div>
			<div>
				<h4>钩子函数bind的binding参数应用</h4>
				<div v-bindingParams:foo.a.b="msg"></div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 't20200813',
		components: {
			
		},
		data() {
			return {
				msg: 'hello!'
			}
		},
		created() {
		},
		methods: {

		},
		directives: {
			// 指令的定义(局部)
			foc: { //20200819
				inserted: function (el,binding) {
					console.log(binding)
					el.focus()
					el.placeholder='局部 v-foc 自定义指令'
				}
			},
			bindingParams:{
				bind: function(el,binding,vnode){
					let s = JSON.stringify
					el.innerHTML =
						'name: ' + s(binding.name) + '<br>' +
						'value: ' + s(binding.value) + '<br>' +
						'expression: ' + s(binding.expression) + '<br>' +
						'argument: ' + s(binding.arg) + '<br>' +
						'modifiers: ' + s(binding.modifiers) + '<br>' +
						'vnode keys: ' + Object.keys(vnode).join('、')
				}
			}
		},
		mounted() {

		}
	}
</script>