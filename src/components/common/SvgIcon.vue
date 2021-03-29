<template>
<svg class="vaM tra-fast" :class="sizeClass" aria-hidden="true">
	<use :xlink:href="iconName"></use>
</svg>
</template>

<script>
	export default {
		name:"Icon",
		props: {
			name:{
				type: String,
				required: true
			},
			sizeBase:{
				type: String,
				default:"s"
			}
		},
		computed: {
			iconName() {
				return `#${this.name}`
			},
			sizeClass() {
				switch(this.sizeBase){
					case "xxs":return "fs08x";
					case "xs":return "";
					case "s":return "fs12x";
					case "s2":return "fs14x";
					case "m":return "fs16x";
					case "l":return "fs20x";
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.svg-icon {
	cursor: pointer;
	width: 1.5em;
	height: 1.5em;
	vertical-align: middle;
	fill:currentColor;
	overflow: hidden;
}
</style>
