<template>
	<div class="taL">
		<h2>20201016 v-bind支持动态参数</h2>
		<span class="cMain2 note">示例来源：<a class="cMain2" v-href-txt href="https://cn.vuejs.org/v2/guide/syntax.html#动态参数"></a></span><br>
		<p class="page">
			<span v-bind:[attrname]="customTitle">看title</span>
		</p>
		<p class="warning">
			注意：① v-bind:[attrname]，中括号里的attrname键名会被浏览器强制转为小写，所以不要带大写字母<br>
			② v-bind[attrname]的中括号中也不能带空格或引号
		</p>
<pre class="code">
<span class="cMain2">html:</span>
&lt;span v-bind[attrName]="customTitle"&gt;看title&lt;/span&gt;
<span class="cMain2">js:</span>
data() {
	return {
		attrname:'title',
		customTitle:'绑定到property的title'
	}
}
</pre>
		<h2>修饰符</h2>
		<span class="cMain2 note">示例来源：<a class="cMain2" v-href-txt href="https://cn.vuejs.org/v2/guide/syntax.html#修饰符"></a></span><br>
		<p class="page">
			<pageB></pageB>
		</p>
<pre class="code">
<span class="cMain2">html:</span>
{{pageB.template}}
<span class="cMain2">js:</span>
<span v-html="funToTxt(pageB.methods.vueAlert)"></span>
</pre>
	</div>
</template>
<script>
	var pageB = {
		template: '<a href="http://google.com" @click.prevent="vueAlert">到谷歌的链接</a>',
		data:function(){
			return {}
		},
		methods:{
			vueAlert(){
				/* 直接在@click中使用alert会认为是vue实例中的方法名，会报错 */
				alert('function 通过@click.prevent阻止了a标签的原有链接')
				/*  */
				//单行注 释
			}
		}
	};

	import {funToTxt} from '@/assets/main'
	export default {
		name: 't20201016',
		components: {
			pageB //修饰符示例的模板
		},
		data() {
			return {
				attrname:'title',
				customTitle:'绑定到property的title',
				pageB:pageB
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
