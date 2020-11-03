<template>
	<div class="taL">
		<h2>20201102 绑定class的对象语法、数组语法</h2>
		<span class="cMain2 note">示例来源：<a class="cMain2" v-href-txt href="https://cn.vuejs.org/v2/guide/class-and-style.html#对象语法"></a><br /><a class="dpIB cMain2 tIdt5" v-href-txt href="https://cn.vuejs.org/v2/guide/class-and-style.html#数组语法"></a></span><br>
		<p class="page">
			<pageA></pageA>
		</p>
		<p>
<pre class="code">
<h4 class="cMain2">html:</h4>{{pageA.template}}
<h4 class="cMain2">js:</h4><span v-html="funToTxt(pageA.data)"></span>
computed:{
<span v-html="funToTxt(pageA.computed.classObj2)"></span>
}
</pre>
		</p>
	</div>
</template>
<script>
	var pageA = {
		template:	
`<div>
	<p>1.绑定的数据对象 classObj 不必内联定义在模板里</p>
	<p :class="classObj">绑定class的文字</p>
	<p>2.计算属性 classObj 绑定class</p>
	<p :class="classObj2">计算属性绑定class的文字</p>
	<p>3.数组语法 classArray 绑定class<br />数组中也可以使用对象，配合普通数组class列表实例属性"codeClass"一起使用</p>
	<p :class="[{cMain2:isMainColor},codeClass]">数组语法绑定class的文字</p>
	<p>4.数组语法 绑定style</p>
	<p :style="[{color:'red'},{textDecoration:'underline'}]">数组语法绑定style</p>
</div>`,
		data:function(){
			return {
				classObj:{
					code:'fds', //注意：此处为truthy（真值），指的是在布尔值上下文中，转换后的值为真的值。所有值都是真值，除非它们被定义为 假值（即除 false、0、""、null、undefined 和 NaN 以外皆为真值）
					cMain2:true
				},
				isMainColor:true,
				isCode:false,
				codeClass: 'code'
			}
		},
		computed: {
			classObj2: function(){ //计算属性
				return {
					code: this.isCode,
					cMain2: this.isMainColor
				}
			}
		}
	}

	import {funToTxt} from '@/assets/main'
	export default {
		name: 't20201102',
		components: {
			pageA //模板 pageA:pageA
		},
		data() {
			return {
				pageA
			}
		},
		methods: {
			funToTxt,
		},
		mounted() {

		}
	}
</script>
<style lang="scss" scoped>

</style>
