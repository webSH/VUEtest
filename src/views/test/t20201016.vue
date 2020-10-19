<template>
	<div class="taL">
		<h2>20201016 v-bind支持动态参数</h2>
		<span class="cMain2 note">示例来源：<a class="cMain2" v-href-txt href="https://cn.vuejs.org/v2/guide/syntax.html#动态参数"></a></span><br>
		<p class="page">
			<span v-bind:[attrname]="customTitle">看title</span>
		</p>
		<p>
		<p class="warning">
			注意：① v-bind:[attrname]，中括号里的attrname键名会被浏览器强制转为小写，所以不要带大写字母<br>
			② v-bind[attrname]的中括号中也不能带空格或引号
		</p>
<pre class="code">
<span class="cMain2">html:</span>sdfds
&lt;span v-bind[attrName]="customTitle"&gt;看title&lt;/span&gt;
<span class="cMain2">js:</span>
data() {
	return {
		attrname:'title',
		customTitle:'绑定到property的title'
	}
}
</pre>
		</p>
	</div>
</template>
<script>
	export default {
		name: 't20201016',
		components: {

		},
		data() {
			return {
				attrname:'title',
				customTitle:'绑定到property的title'
			}
		},
		methods: {

		},
		mounted() {

		}
	}
</script>
<style lang="scss" scoped>

</style>
