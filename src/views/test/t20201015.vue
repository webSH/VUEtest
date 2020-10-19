<template>
	<div class="taL">
		<h2>20201015 v-bind</h2>
		<span class="cMain2 note">示例来源：<a class="cMain2" v-href-txt href="https://cn.vuejs.org/v2/guide/index.html#声明式渲染"></a></span><br>
		<p class="page">
			<span v-bind:title="message">Please hover me</span>
		</p>
		<p>
<pre class="code">
<span class="cMain2">html:</span>
&lt;span v-bind:title="message"&gt;Please hover me&lt;/span&gt;
<span class="cMain2">js:</span>
data() {
	return {
		message:'页面加载于 '+new Date().toLocaleString()
	}
}
</pre>
		</p>
	</div>
</template>
<script>
	export default {
		name: 't20201015',
		components: {

		},
		data() {
			return {
				message:'页面加载于 '+new Date().toLocaleString()
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
