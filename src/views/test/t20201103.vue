<template>
	<div class="taL">
		<h2>{{$route.name}} v-if 条件渲染</h2>
		<span class="cMain2 note">
			示例来源：<a class="cMain2" v-href-txt href="https://cn.vuejs.org/v2/guide/conditional.html"></a>
		</span>
		<p class="page">
			<pageA></pageA>
		</p>
		<p>
<pre class="code">
<h4 class="cMain2">html:</h4>{{pageA.template}}
<h4 class="cMain2">js:</h4>
</pre>
		</p>
		<p class="page">
			<p>用 key 来管理客服用的元素<br>
				Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 变得非常快之外，还有其他一些好处。例如，如果你允许用户在不同的登录方式之间切换：
			</p>
			<pageB></pageB>
			<p>那么在上面的代码中切换 loginType 将不会清除用户已经输入第一个 input 的内容。因为两个模板使用了相同的元素，第一个 input 不会被替换掉——仅仅是替换了它的 placeholder；每次切换时，输入框2都将被重新渲染</p>
		</p>
		<p>
<pre class="code">
<h4 class="cMain2">html:</h4>{{pageB.template}}
<h4 class="cMain2">js:</h4><span v-html="funToTxt(pageB.data)"></span>
<span v-html="funToTxt(pageB.methods.toggleLoginType)"></span>
</pre>
		</p>
	</div>
</template>
<script>
	var pageA = {
		template:	
`<div>
    <input type="text" v-model="display" />
    <span v-if="display">if (如果)</span>
	<span v-else>else (否则)</span>
</div>`,
		data:function(){
			return {
				display: true
			}
		}
	}

	var pageB = {
		template:	
`<div>
	<template v-if="loginType === 'username'">
		<label>Username</label>
		<input placeholder="Enter your username">
		<input key="a" placeholder="key='a'">
	</template>
	<template v-else>
		<label>Email</label>
		<input placeholder="Enter your email address">
		<input key="b" placeholder="key='b'">
	</template>
	<br><button @click="toggleLoginType">切换登录类型</button>
</div>`,
		data:function(){
			return {
				loginType: 'username'
			}
		},
		methods: {
			toggleLoginType(){
				if(this.loginType == 'username') {
					this.loginType = 'email'
				}else{
					this.loginType = 'username'
				}
			}
		}
	}

	import {funToTxt} from '@/assets/main'
	export default {
		name: 't20201103',
		components: {
			pageA, //模板 pageA:pageA
			pageB
		},
		data() {
			return {
				pageA,
				pageB
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
