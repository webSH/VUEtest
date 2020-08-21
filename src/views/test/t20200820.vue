<template>
	<div class="test">
		<h2>GoogleSlideImg</h2>
		<!-- <div id="nav">
			<router-link to="">本页</router-link>
		</div> -->
		<div>
			<h3>GoogleSlideImg</h3>
			<div>
				<h4>GoogleSlideImg</h4>
				<div class="googleSlide">
					<div class="googleSlide_left">
						<img src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/21766691/iceland_old.jpg">
					</div>
					<div class="sliderBar"></div>
					<div class="googleSlide_right">
						<img src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/21766692/iceland_new.jpg">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	let timeout = 0,
		delayTime = 16
	$(document).on("mousemove",".googleSlide",function(event){
		let now = new Date().getTime()
		if (timeout==0 || now - timeout > delayTime) {
			timeout = now
			console.log('='+$(this).offset().left)
			console.log('  '+event.clientX)
			console.log(event.clientX-$(this).offset().left)
			let dynamicWidth = event.clientX - $(this).offset().left
			$(this).find(".googleSlide_left").width(dynamicWidth)
			$(this).find(".sliderBar").css({left:dynamicWidth})
		}
	})
	export default {
		name: 'GoogleSlideImg',
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
			
		},
		mounted() {

		}
	}
</script>
<style type="text/css">
	.googleSlide{
		position: relative;
		width: 742px;
		height: 540px;
		margin: 1em auto;
	}
	.googleSlide>div{overflow: hidden;}
	.googleSlide img{width: 742px;height: 540px;}
	.googleSlide .googleSlide_left{
		position: absolute;
		z-index: 10;
		left: 0;
	}
	.sliderBar{
		position: absolute;
		left: 50%;
		width: 4px;
		background: #fff;
		height: 100%;
		margin-left: -2px;
		z-index: 11;
	}
</style>