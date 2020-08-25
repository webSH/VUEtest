<template>
	<div class="test">
		<h2>20200824</h2>
		<div id="fixedBox">
			<h3>动态指令参数</h3>
			<p class="ct">未绑定指令的块<br>1.监听事件绑定失败：没找到el的parent<br>（1）自定义指令不能用bind，要用inserted。因为：<br>①bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。<br>②inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。<br>③update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。<br>（2）绑定事件时要用jquery找到的第一个元素 $(el).parent()[0]<br>（3）position: fix 的元素left是到屏幕边上，而不是具有定位属性的父元素。position: absolute 的元素才是到具有定位属性的父元素的边距 <br>（4）想在在自定义指令中修改data中的值直接this取不到data，用变通的方法，标签指令中用对象形式传入修改data的method，在指令代码中通过binding.value[方法对应的key]()来调用</p>
			<p v-pin:[direction[0]]="{val:direction[1],method:changeA}" v-pin:[direction2[0]]="{val:direction2[1],method:changeA}">绑定指令的块，<b>{{position}}</b>布局:{{direction[0]+': '+posleft+(direction2?'; '+direction2[0]+': '+postop:'')}}</p>
		</div>
	</div>
</template>
<script>
	export default {
		name: 't20200824',
		components: {
			
		},
		data() {
			return {
				direction: ['left',200],
				direction2: ['top',50],
				position:'',
				posleft:'',
				postop:''
			}
		},
		created() {
		},
		methods: {
			changeA(left,top,position){
				if (left){
					this.posleft = left
				}
				if (top){
					this.postop = top
				}
				if (position){
					this.position = position
				}
			}
		},
		directives: {
			// 指令的定义(局部)
			pin: {
				inserted: function(el, binding, vnode){
					el.style.position = 'absolute'
					var s = (binding.arg == 'left'?'left':'top')
					el.style[s] = binding.value.val + 'px'
					binding.value.method(s=='left'?el.style[s]:null,s=='left'?null:el.style[s],el.style.position)
					let scrollBox = $(el).parent()[0]
					var abTop = el.offsetTop
					var abLeft = el.offsetLeft
					var ctLeft = scrollBox.offsetLeft
					let $this = this
					scrollBox.addEventListener('scroll', function () {
						var st = scrollBox.scrollTop;
						console.log(st,abTop)
						if (st>abTop){
							el.style.position = 'fixed'
							el.style.top = scrollBox.offsetTop + 'px'
							el.style.left = abLeft + ctLeft + 'px'
							binding.value.method(el.style.left,el.style.top,el.style.position)
							// console.log(el.style.top)
						}else{
							el.style.position = 'absolute'
							el.style.top = abTop + 'px'
							el.style.left = abLeft + 'px'
							binding.value.method(el.style.left,el.style.top,el.style.position)
						}
						// el.style.position = st>pt ? "fixed" : "absolute";
					})
				}
			}
		},
		mounted() {

		}
	}
</script>
<style type="text/css" scoped>
	.test{
	}
	#fixedBox {
		height: 200px;
		position: relative;
		overflow: scroll;
		background: #42b983;
	}
	#fixedBox p{
		text-align: left;
		margin: 0;
		padding: .5em;
		background: rgba(0,0,0,.2)
	}
	#fixedBox p.ct{height: 200px;margin:5em 10em;}
</style>