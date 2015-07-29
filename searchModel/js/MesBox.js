function MesBox(options){
	
	var self=this;
	//配置信息
	this.options=coverOptions({
		"title":"模态框标题",
		"content":"内容",
		"applyName":"确定",
		"cancleName":"取消"
	},options);
	//获取
	this.getEventTarget=function(e){
		e=e||window.event;
		return e.target||e.srcElement;
	}
	function coverOptions(destination,source){
		for(var key in source){
			destination[key]=source[key];
		}
		return destination;
	}
	this.setMexBox=function(){
		var boxDiv=document.createElement("div");
		var str="<h3>"+self.options.title+"</h3>";
		boxDiv.innerHTML=str;
		document.body.appendChild(boxDiv);
	}
	this.showBox=function(){

	}
	this.hideBox=function(){

	}
}

var options={
	"title":"",//模态框头部显示的内容，必有
	"id":"",//模态框的id，可有可无
	"type":"",//用来确定模态框的显示格式，目前有alert、confirm/prompt、ajax这三种，必有
	"content":"",//内容部分的显示，字符串货html代码，必有
	"applyName":"",//确认按钮显示的名字，
	"applyFn":"",//确认按钮点击后的回调函数，可有可无
	"cancleName":"",//取消按钮的名称
	"confirmType":"",//可有可无
	"ajaxOptions":""//设置一些ajax传入的参数，可有可无
}
var myoptions;
var mymodel=new MesBox(myoptions);
document.getElementById("test").onclick=mymodel.setMexBox;