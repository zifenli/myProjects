var addModule = (function() {
	var addModule1={};
	function privateAdd(num1,num2){
		return num1+num2;
	}
	addModule1.add=function (num1,num2){
		return privateAdd(num1,num2);
	}
	return  addModule1;
}());


var module,increment = (function(add) {
	add.name="addNum";
	add.addNum=function(l){
		var sum=0
		for(var i=0;i<l;i++){
			sum+=i;
		}
		return sum;
	}
	return add;
}(addModule));

console.log(increment.addNum(10));
/*模块的特点：
模块化；
封装了变量和方法；
只暴露public方法；
保存当前上下文状态；
*/

