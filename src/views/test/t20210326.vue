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
					duration_L: 5,
					duration_A: 10,
					duration_y: 3,
					duration_flash: 3,
					delay_r: 2 // 红灯延时(秒)
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
					duration_L: 5,
					duration_A: 10,
					duration_y: 3,
					duration_flash: 3,
					delay_r: 2 // 红灯延时(秒)
				},
				status: 'run',
				runTime: null,
			}
		},
		methods: {
			/* 
			init_directionObj_on 第一组
			init_directionObj_off 第二组
			*/
			init(init_directionObj_on=this.NS, init_directionObj_off=this.EW){
				let $this = this;
				this.status = 'run';
				function Countdown(directionObj, duration){	//倒计时计算 directionObj:[南北|东西], duration:传秒
					function textTime(number){ //一位转两位
						if (number<10) {
							let text = '0' + number;
							directionObj.countdown = text.substr(0,2);
						}
					}

					if (directionObj.countdownTime) {
						clearInterval(directionObj.countdownTime)
					}
					directionObj.countdown = duration;
					textTime(directionObj.countdown) //显示初始秒
					directionObj.countdownTime = setInterval(() => { //轮询 → 显示倒计时
						if (directionObj.countdown > 0){
							directionObj.countdown --;
						}
						textTime(directionObj.countdown)
						if ($this.status=='stop') {
							clearInterval(directionObj.countdownTime)
						}
					}, 1*1000);
				}

				function lightInit(ON,OFF) { //初始化
					// 通行方↓
					ON.A['r'].on = false;
					ON.A['y'].on = false;
					ON.A['g'].on = true;
					ON.A['g'].flash = false;

					ON.L['r'].on = true;
					ON.L['y'].on = false;
					ON.L['g'].on = false;
					ON.L['g'].flash = false;
					// 等待方↓
					OFF.A['r'].on = true;
					OFF.A['y'].on = false;
					OFF.A['g'].on = false;
					OFF.A['g'].flash = false;

					OFF.L['r'].on = true;
					OFF.L['y'].on = false;
					OFF.L['g'].on = false;
					OFF.L['g'].flash = false;

					Countdown(ON, ON.duration_A); //通行方倒计时
					Countdown(OFF, ON.duration_A + ON.duration_L + ON.duration_y*2 + ON.delay_r); //等待方倒计时(通行方 前+左+黄*2+红灯延时)
				}


				function flashOn(flashObj){	//闪
					flashObj['g'].flash = true;
				}
				function flashOff(flashObj,on){ //闪-off
					flashObj['g'].flash = false;	//闪-off
					flashObj['g'].on = false;	//绿-off
					flashObj['y'].on = true;	//黄
					Countdown(on, on.duration_y);
				}
				function yOff(curLightGroup, nextLightGroup, curDirection, nextDirection, nextDuration, delay_r){ //黄-off
				/*	curLightGroup: 当前（绿灯）组,
					nextLightGroup: 下一（红灯）组,
					nextDirection: 切换后方向组,
					nextDuration: 切换后方向组倒计时,
					delay_r: 绿灯组红灯延时  */
					curLightGroup['y'].on = false;	//1st-黄-off
					curLightGroup['r'].on = true;	//1st-红
					function switchDirection(){
						nextLightGroup['g'].on = true; //2en-绿
						nextLightGroup['r'].on = false; //2en-红-off
						Countdown(nextDirection, nextDuration);	//2en-倒计时
					}
					if (delay_r){	//如果有红灯延时(换向情况)
						Countdown(curDirection, curDirection.delay_r + nextDirection.duration_A + nextDirection.duration_L + nextDirection.duration_y*2 + nextDirection.delay_r); //1st-倒计时
						setTimeout(() => {
							if ($this.status=='run') {
								switchDirection();
								RUN(nextDirection, curDirection) //换向
							}
						}, delay_r*1000);
					}else{
						switchDirection();
					}
				}

				function RUN(directionObj_on, directionObj_off){
					$this.runTime = setTimeout( ()=>{
						flashOn(directionObj_on.A);	//1st-前闪
						let runTime_1st_a_Flash_off = setTimeout(() => {
							flashOff(directionObj_on.A, directionObj_on)	//1st-前闪-off
							let runTime_1st_a_y_off = setTimeout(() => {
								yOff(directionObj_on.A, directionObj_on.L, directionObj_on, directionObj_on, directionObj_on.duration_L) //1st-前黄-off
								let runTime_1st_l_flash = setTimeout(() => {
									flashOn(directionObj_on.L);	//1st-左闪
									let runTime_1st_l_flash_off = setTimeout(() => {
										flashOff(directionObj_on.L, directionObj_on)	//1st-左闪-off
										let runTime_1st_l_y_off = setTimeout(() => {
											yOff(directionObj_on.L, directionObj_off.A, directionObj_on, directionObj_off, directionObj_off.duration_A, directionObj_on.delay_r)	//1st-左黄-off (换向在 yOff 中延时 directionObj_on.delay_r 完成)
										}, directionObj_on.duration_y*1000);	//1st-左黄-off
										if ($this.status=='stop' && runTime_1st_l_y_off){ //检查状态(是否停止)
											clearTimeout(runTime_1st_l_y_off)
										}
									}, directionObj_on.duration_flash*1000);	//1st-左闪-off
									if ($this.status=='stop' && runTime_1st_l_flash_off){ //检查状态(是否停止)
										clearTimeout(runTime_1st_l_flash_off)
									}
								}, (directionObj_on.duration_L - directionObj_on.duration_y)*1000);	//1st-左闪
								if ($this.status=='stop' && runTime_1st_l_flash){ //检查状态(是否停止)
									clearTimeout(runTime_1st_l_flash)
								}
							}, directionObj_on.duration_y*1000); //1st-前黄-off
							if ($this.status=='stop' && runTime_1st_a_y_off){ //检查状态(是否停止)
								clearTimeout(runTime_1st_a_y_off)
							}
						}, directionObj_on.duration_flash*1000);	//1st-前闪-off
						if ($this.status=='stop' && runTime_1st_a_Flash_off){ //检查状态(是否停止)
							clearTimeout(runTime_1st_a_Flash_off)
						}
					},(directionObj_on.duration_A - directionObj_on.duration_y)*1000)	//1st-前闪

					if ($this.status=='stop' && $this.runTime){ //检查状态(是否停止)
						clearTimeout($this.runTime)
					}
				}
				lightInit(init_directionObj_on, init_directionObj_off);
				RUN(init_directionObj_on, init_directionObj_off)
			},
			stop(){
				this.status = 'stop';
				if (this.runTime) {
					clearTimeout(this.runTime)
				}
				// if (this.NS.countdownTime) {
				// 	clearInterval(this.NS.countdownTime)
				// }
				// if (this.EW.countdownTime) {
				// 	clearInterval(this.EW.countdownTime)
				// }
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
			&::after{content:'';display: block;height: 100%;border-radius: 50%;}
			&.r.on::after{background: $red;}
			&.y.on::after{background: $yellow;}
			&.g.on::after{background: $green;}
			&.flash::after{animation:flash 1s linear infinite;}
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
	1%{opacity:0;}
	40%{opacity:0;}
    50%{opacity:1;}
    100%{opacity:1;}
}
</style>
