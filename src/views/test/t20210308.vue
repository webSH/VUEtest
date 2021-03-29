<template>
	<div class="taL">
		<h2>{{$route.name.substr(1)}} Promise</h2>
		<span class="cMain2 note">
			
		</span>
		<img alt="Vue logo" src="../../assets/logo.png">

	</div>
</template>
<script>
function timeout(ms,n) {
	return new Promise((a, reject) => {
		if (n<5) {
		setTimeout(a, ms, '传给 resolve 的参数');
		}else {
			setTimeout(reject, ms, '>5');
		}
	});
}
// timeout(100,3).then((value) => {
// 	console.log(value);
// },(value) => {
// 	console.log('reject-'+value);
// });

function loadImageAsync(url) {
	return new Promise(function(resolve, reject) {
		const image = new Image();

		image.onload = function() {
			resolve(url);
		};

		image.onerror = function() {
			reject(new Error('Could not load image at ' + url));
		};

		image.src = url;
	});
}
loadImageAsync(location.origin+'/img/logo.82b9c7a5.png').then(val=>{console.log("%c ","padding:90px 100px;line-height:20px;background:url("+val+") no-repeat")},val=>{console.log(val)});

const promise = new Promise(function(resolve,reject){
	try {
    throw new Error('test');
  } catch(e) {
    reject(e);
  }
});
promise.catch(err=>{console.log(err)});

	export default {
		name: 't20210308',
		components: {

		},
		data() {
			return {

			}
		},
		methods: {
			substr(){

			}
		},
		mounted() {
		}
	}
</script>
<style lang="scss" scoped>

</style>
