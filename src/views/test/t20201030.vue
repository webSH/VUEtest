<template>
	<div class="taL">
		<h2>20201030 计算属性</h2>
		<span class="cMain2 note">示例来源：<a class="cMain2" v-href-txt href="https://cn.vuejs.org/v2/guide/computed.html#计算属性"></a></span><br>
		<p class="page">
			<pageA></pageA>
		</p>
		<p>
<pre class="code">
<span class="cMain2">html:</span>
{{pageA.template}}
<span class="cMain2">js:</span>
<span v-html="funToTxt(pageA.computed.reversedMsg)"></span>
</pre>
		</p>
	</div>
</template>
<script>
	var pageA = {
		template:	
`<div>
	<p>{{msg}}</p>
	<p>{{msg.split("").reverse().join("")}}</p>
	<p>{{reversedMsg}}</p>
</div>`,
		data:function(){
			return {
				msg:'这是什么？'
			}
		},
		computed: {
			reversedMsg: function(){ //计算属性
				return this.msg.split('').reverse().join('')
			}
		}
	}

	import {funToTxt} from '@/assets/main'
	export default {
		name: 't20201030',
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
