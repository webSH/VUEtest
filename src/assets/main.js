export function funToTxt(fun){ //内置模板中的函数转换为字符串做前端输出(确保实际运行代码和前端输出代码无差异)
	if (typeof(fun)!='string') fun = fun.toString() //把函数字符串
	var re_MultiComment  = /\/\*[^*/]+\*\//g //正则（匹配多行注释 /**/）
	var re_SingleComment = /\/{2}.+/g //正则（匹配单行注释 //xxx 换行符结束）
	// var comment = fun.match(re)
	// console.log(comment)
	fun = fun.replace('function ','    ') //把String后的方法中第一个function删除（获取模板变量pageB中的方法时前面会加上function）
	var result_filterMultiC
	result_filterMultiC = fun.replace(re_MultiComment,function(str){
		return '<span class="comment">'+str+'</span>'
	}) //逐个替换多行注释为html代码，以在前端显示
	var result_filterSingleC
	var result_filterSingleC = (result_filterMultiC||fun).replace(re_SingleComment,function(str){
		return '<span class="comment">'+str+'</span>'
	}) //逐个替换单行注释为html代码，以在前端显示
	return result_filterSingleC || result_filterMultiC || fun
}