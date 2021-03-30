<template>
	<div class="taL">
		<h2>{{$route.name.substr(1)}}Auto Trafficlight</h2>
		<button class="bgGreen" @click="init()">GO</button> <button class="bgRed" @click="stop()">STOP</button>
		<div class="space">
			<div class="WN">

			</div>
			<div class="EN">
				
			</div>
			<div class="WS">

			</div>
			<div class="ES">
				
			</div>
			<div class="road road_NS">
				<div class="down">
					<div class="in">
						<p class="line a"></p>
						<p class="line a"></p>
						<p class="line l"></p>
					</div>
					<div class="out">
						<p class="line a"></p>
						<p class="line a"></p>
						<p class="line a"></p>
					</div>
				</div>
				<div class="up">
					<div class="in">
						<p class="line l"></p>
						<p class="line a"></p>
						<p class="line a"></p>
					</div>
					<div class="out">
						<p class="line a"></p>
						<p class="line a"></p>
						<p class="line a"></p>
					</div>
				</div>
			</div>
			<div class="road road_EW">
				<div class="right">
					<div class="in">
						<p class="l"></p>
						<p class="a"></p>
						<p class="a"></p>
					</div>
					<div class="out">
						<p class="a"></p>
						<p class="a"></p>
						<p class="a"></p>
					</div>
				</div>
				<div class="left">
					<div class="in">
						<p class="a"></p>
						<p class="a"></p>
						<p class="l"></p>
					</div>
					<div class="out">
						<p class="a"></p>
						<p class="a"></p>
						<p class="a"></p>
					</div>
				</div>
			</div>
			<div class="light light_NS">
				<p class="turnL">
					<span v-for="ltL in NS.L" :class="[ltL.class,{'on':ltL.on},{'flash':ltL.flash}]">
						<!-- <Icon v-if="ltL.class=='r' || ltL.class=='g'" name="left" class="ico w1x h1x" style="width:80%;height:80%;" /> -->
					</span>
				</p>
				<p class="turnA">
					<span v-for="ltA in NS.A" :class="[ltA.class,{'on':ltA.on},{'flash':ltA.flash}]"></span>
				</p>
				<p class="countdown"><b class="LED" :class="{'cG':NS.A['g'].on || NS.L['g'].on, 'cY':NS.A['y'].on || NS.L['y'].on, 'cR':NS.A['r'].on && NS.L['r'].on}">{{NS.countdown}}</b></p>
			</div>
			<div class="light light_EW">
				<p class="turnL">
					<span v-for="ltL in EW.L" :class="[ltL.class,{'on':ltL.on},{'flash':ltL.flash}]">
						<!-- <Icon v-if="ltL.class=='r' || ltL.class=='g'" name="left" class="ico w1x h1x" style="width:80%;height:80%;" /> -->
					</span>
				</p>
				<p class="turnA">
					<span v-for="ltA in EW.A" :class="[ltA.class,{'on':ltA.on},{'flash':ltA.flash}]"></span>
				</p>
				<p class="countdown"><b class="LED" :class="{'cG':EW.A['g'].on || EW.L['g'].on, 'cY':EW.A['y'].on || EW.L['y'].on, 'cR':EW.A['r'].on && EW.L['r'].on}">{{EW.countdown}}</b></p>
			</div>
		</div>

	</div>
</template>
<script>
	export default {
		name: 't20210326',
		components: {

		},
		data() {
			return {
				NS:{
					L:{
						r: {class: 'r', on: false, flash: false},
						y: {class: 'y', on: false, flash: false},
						g: {class: 'g', on: false, flash: false},
					},
					A:{
						r: {class: 'r', on: false, flash: false},
						y: {class: 'y', on: false, flash: false},
						g: {class: 'g', on: false, flash: false},
					},
					countdownTime: null,
					countdown: 0,
					delay_L: 5,
					delay_A: 10,
				},
				EW:{
					L:{
						r: {class: 'r', on: false, flash: false},
						y: {class: 'y', on: false, flash: false},
						g: {class: 'g', on: false, flash: false},
					},
					A:{
						r: {class: 'r', on: false, flash: false},
						y: {class: 'y', on: false, flash: false},
						g: {class: 'g', on: false, flash: false},
					},
					countdownTime: null,
					countdown: 0,
					delay_L: 5,
					delay_A: 10,
				},
				runTime: null,
			}
		},
		methods: {
			init(LightObj_on=this.NS, LightObj_off=this.EW, delay_y=3){
				let $this = this;
				function Countdown(lightObj, delay){
					function textTime(number){
						if (number<10) {
							let text = '0' + number;
							lightObj.countdown = text.substr(0,2);
						}
					}
					if (lightObj.countdownTime) {
						clearInterval(lightObj.countdownTime)
					}
					lightObj.countdown = delay;
					textTime(lightObj.countdown)
					lightObj.countdownTime = setInterval(() => {
						if (lightObj.countdown > 0){
							lightObj.countdown -= 1;
						}
						textTime(lightObj.countdown)
					}, 1*1000);
				}

				function directionChange(LightObj_on,LightObj_off) { //初始化
					// 开方↓
					LightObj_on.A['r'].on = false;
					LightObj_on.A['y'].on = false;
					LightObj_on.A['g'].on = true;
					LightObj_on.A['g'].flash = false;

					LightObj_on.L['r'].on = true;
					LightObj_on.L['y'].on = false;
					LightObj_on.L['g'].on = false;
					LightObj_on.L['g'].flash = false;
					// 等待方↓
					LightObj_off.A['r'].on = true;
					LightObj_off.A['y'].on = false;
					LightObj_off.A['g'].on = false;
					LightObj_off.A['g'].flash = false;

					LightObj_off.L['r'].on = true;
					LightObj_off.L['y'].on = false;
					LightObj_off.L['g'].on = false;
					LightObj_off.L['g'].flash = false;
				}


				function flashOn(LightObj){	//闪
					LightObj['g'].flash = true;
				}
				function flashOff(flashObj,LightObj){ //闪-off
					flashObj['g'].flash = false;	//闪-off
					flashObj['g'].on = false;	//绿-off
					flashObj['y'].on = true;	//黄
					Countdown(LightObj, delay_y);
				}
				function yOff(LightObj_1st, LightObj_2en, LightObj, delay){ //黄-off
					LightObj_1st['y'].on = false;	//1st-黄-off
					LightObj_1st['r'].on = true;	//1st-红
					LightObj_2en['g'].on = true; //2en-绿
					LightObj_2en['r'].on = false; //2en-红-off
					Countdown(LightObj, delay);
				}

				directionChange(LightObj_on, LightObj_off);
				function RUN(LightObj_on, LightObj_off){
					Countdown(LightObj_on, LightObj_on.delay_A);
					Countdown(LightObj_off, LightObj_on.delay_A + LightObj_on.delay_L + delay_y*2);
					$this.runTime = setTimeout( ()=>{
						flashOn(LightObj_on.A);	//1st-前闪
						setTimeout(() => {
							flashOff(LightObj_on.A, LightObj_on)	//1st-前闪-off
							setTimeout(() => {
								yOff(LightObj_on.A, LightObj_on.L, LightObj_on, LightObj_on.delay_L) //1st-前黄-off
								setTimeout(() => {
									flashOn(LightObj_on.L);	//1st-左闪
									setTimeout(() => {
										flashOff(LightObj_on.L, LightObj_on)	//1st-左闪-off
										setTimeout(() => {
											yOff(LightObj_on.L, LightObj_off.A, LightObj_off, LightObj_off.delay_A)	//1st-左黄-off
											RUN(LightObj_off, LightObj_on) //切换方向
										}, delay_y*1000);	//1st-左黄-off
									}, delay_y*1000);	//1st-左闪-off
								}, (LightObj_on.delay_L - delay_y)*1000);	//1st-左闪
							}, delay_y*1000); //1st-前黄-off
						}, delay_y*1000);	//1st-前闪-off
					},(LightObj_on.delay_A - delay_y)*1000)	//1st-前闪
				}
				RUN(LightObj_on, LightObj_off)
			},
			stop(){
				if (this.runTime) {
					clearTimeout(this.runTime)
				}
				if (this.NS.countdownTime) {
					clearTimeout(this.NS.countdownTime)
				}
				if (this.EW.countdownTime) {
					clearTimeout(this.EW.countdownTime)
				}
			}
		},
		mounted() {

		}
	}
</script>
<style lang="scss" scoped>
$green: #3a3;
$red: #e33;
$yellow: #f90;

$road_width:10%;

p{margin: 0;}
*{box-sizing: border-box;}
.cG{color:$green}
.cY{color:$yellow}
.cR{color:$red}
.space{
	position: relative;
	width: 80%;
	height: 800px;
	margin: 10% auto;
	background: #eee;
}
.WN,.EN,.WS,.ES{
	position: absolute;
	width: (100% - $road_width)/2;
	height: (100% - $road_width)/2;
	background: rgb(230, 230, 230);
	border:.2em solid rgb(12, 105, 59);
}
.WN{border-top:0;border-left:0;left: 0;}
.EN{border-top:0;border-right:0;right: 0;}
.WS{border-bottom:0;border-left:0;bottom: 0;left: 0;}
.ES{border-bottom:0;border-right:0;bottom: 0;right: 0;}
.road{position: absolute;}
.down,.up{width: 50%;display: inline-block;position: relative;}
.road_NS{left: (100% - $road_width)/2;width: $road_width;height: 100%;
	.line{width: 33.33%;height:100%;display: inline-block;}
	.down,.up{height: 100%;
		.in,.out{position: absolute; width:100%; height: (100% - $road_width)/2;}
	}
	.down{top: 0;padding-right:1px;
		.line{border-right:2px solid #fff}
		.in{top: 0;border-right: 2px solid $yellow;
			&>p:last-child{border-right: 0;}
		}
		.out{bottom: 0;border-right: 2px solid $yellow;
			&>p:last-child{border-right: 0;}
		}
	}
	.up{bottom: 0;padding-left:1px;
		.line{border-left:2px solid #fff}
		.in{bottom: 0;border-left: 2px solid $yellow;
			&>p:first-child{border-left: 0;}
		}
		.out{top: 0;border-left: 2px solid $yellow;
			&>p:first-child{border-left: 0;}
		}
	}
}
.road_EW{
	top: 100% - $road_width;
	width: $road_width;
	height: 100%;
}
.light{position:absolute;padding: .5em;width: 30%;height: 2em;background: rgb(168, 168, 168);border-radius:2px;
	>p{width:1.8em;padding:.5em .4em;background:#333;border-radius:1em;display:inline-block;margin:-1.5em 1em 0 0;;
		span{
			display: block;
			height: 1em;
			width: 1em;
			border-radius: 50%;
			background: rgb(18, 18, 18);
			border:2px solid #666;
			margin:0 0 .1em 0;
			&.r.on{background: $red;}
			&.y.on{background: $yellow;}
			&.g.on{background: $green;}
			&.flash{animation:flash 3s ease-out forwards;}
		}
		// &.turnL{
		// 	.r.on{background: rgb(18, 18, 18);
		// 		svg{color: #e33;}
		// 	}
		// 	.g.on{background: rgb(18, 18, 18);
		// 		svg{color: #3a3;}
		// 	}
		// }
	}
	
}
.light_NS{
	right: 5%;top: 30%;
}
.light_EW{
	left: 5%;top: 30%;
}
@keyframes flash{
	0%{opacity:0;}
    20%{opacity:1;}
	40%{opacity:0;}
    60%{opacity:1;}
	80%{opacity:0;}
    100%{opacity:1;}
}
</style>
