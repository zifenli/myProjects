
Object.extend=function(destination,source){
		if(source){
			for(var key in source){
				destination[key]=source[key];
			}
		}
		return destination;
}
function $(str){
	return document.getElementById(str);
}
//分析：整个流程是输入——搜索——显示
//输入时触发keyup事件，该事件为：首先获得输入框中的数据，与dataKey组成键值对（默认为name:value），
//根据该键值对在本地或数据库中提取相应的数据
//targetObj表示目标DOM对象，dataProvider表示源数据，config表示用户定义的配置
//变化的东西是需要的数据，可用JSON表示
function SearchModel(targetObj,showList,dataProvider,config){
	this.conf=Object.extend(
		{
			"className":"",
			"dataneeded":{"name":"name","email":"email","number":"phonenumber"},//需要的数据，默认为姓名和电话
			"dataKey":{"key":"name"},
			"datashowform":"",//在创建的时候传入(是一个handlebars的模板)，默认格式为姓名+电话
			'bgColorOfItem':['#ffffff','#F3F2FF', '#6666FF']
		},
		config
		);            
	var self=this;
	//组件的DOM组成部分,其实就是$(inputId);
	this.target=targetObj;  
	this.showList=showList;             
	//关闭自动完成功能
	this.target.setAttribute("autocomplete", "off");
	//数据来源
	this.dataService =self.getData();            	
	//当前选中对象
	this.currObj;
	
	//如果数据是从远程服务器上取得的，则先取出数据，然后再将数据组织成需要的格式，最后将得到的数据赋值给dataService 
	//dataProvider有两种形式JSON和url，如果为JSON直接将值赋给dataService即可
	this.getxmlHttpObject=function(){
		var xmlHttpRequest;
		if(window.ActiveXObject){
			xmlHttpRequest=new ActiveXObject("Microsoft.XMLHTTP");
		}else{
			xmlHttpRequest=new XMLHttpRequest();
		}
		return xmlHttpRequest;
	}
	this.getData=function(){
		if(typeof(dataProvider)==object){
			return;
		}else{
			
			var myxmlHttpRequest=self.getxmlHttpObject();
			if(myxmlHttpRequest){
				var url=dataProvider;
				//数据data 的形式如:"key=value",其中key=dataKey，value=self.target.value;
				data=self.conf.dataKey.key+"="+self.target.value;
				//打开页面一号线
				myxmlHttpRequest.open("post",url,true);
				//这句话在post请求时一定要加
				myxmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				//指定回调函数,四号线
				var mes=myxmlHttpRequest.onreadystatechange=function(){
					if(myxmlHttpRequest.readyState==4){
						var mes=myxmlHttpRequest.responseText;
						var mes=eval("("+mes+")");
						/*这里添加处理代码

						*/
						return mes;
					}
				}
				//真正发送,二号线
				myxmlHttpRequest.send(data);
				dataProvider=mes;
			}

		}
	}
	//为输入框和显示框设置样式
	this.setStyle=function(){
		var deftargetCss="width: 300px;";
		var deflistCss="width: 300px;display:none;border: 1px solid #aaa;margin:0px auto;border-top: none;";
		if(self.conf.className.length==0){
			self.target.style.cssText=deftargetCss;
			self.showList.style.cssText=deflistCss;
		}else if(self.conf.className.length==1){
			self.target.className=self.conf.className[0];
			self.showList.style.cssText=deflistCss;

		}else{
			self.target.className=self.conf.className[0];
			self.showList.className=self.conf.className[1];
		}
	}
	//查找数据，将找到的条目返回
	this.searchData=function(){
		var value=self.target.value;//输入的数据
		//输入为空时，返回
		 
		var key=self.conf.dataKey.key;//根据哪个属性搜索
		var dataneeded=self.conf.dataneeded;//需要的数据的属性名称
		var data=dataProvider.alldata;//所有的数据
		var simIndex=new Array();
		var result="";
		//循环遍历所有;items
		
		for(var i=0;i<data.length;i++){
			//循环遍历每个item的所有项，找到与datakey匹配的项，并判断该项的值是否和result.key的值是否相似，如果相似，则提取出该item
			for(var item in data[i]){   
				if(item==key){ 
				//  
					var substr=data[i][item].substr(0,value.length);
       				if(substr==value){
       					simIndex.push(i);
       				}
       			} 
			}
		}
		//没有匹配的值时返回null
		if(simIndex.length==0){
			return null;
		}
		//循环遍历每一个相似的条目
		for(var i=0;i<simIndex.length;i++){
			//将每一个条目中需要的数据取出，并放在keys和values数组中
			var keys=[];
			var values=[];
			//遍历每一个相似条目的item
			for(var items in data[simIndex[i]]){
				//遍历每一个需要的item
				for(var itemn in dataneeded){
					if(dataneeded[itemn]==items){
						//如果items是最后一个result+="\""+items+"\":\""+data[simIndex[i]][items]+"\"";
						//定义两个数组分别存储key和value
						keys.push(items);
						values.push(data[simIndex[i]][items]);

					}
				}
			}
			//拼字符串
			for(var j=0;j<keys.length;j++){
				if(j==0){
					result+="{\""+keys[j]+"\":\""+values[j]+"\",\"";
				}
				else if(j==keys.length-1){
					if(i==simIndex.length-1){
						result+=keys[j]+"\":\""+values[j]+"\"}";
					}
					else{
						result+=keys[j]+"\":\""+values[j]+"\"},";
					}
				}else{
					result+=keys[j]+"\":\""+values[j]+"\",\"";
				}
			}
		}
		result="{"+"\"data\":["+result+"]}";
		return result;
		
	}
	//显示数据，将找到的条目一条一条的显示在ul中
	this.showListf=function(){
		self.showList.style.display="block";
	}
	this.hideListf=function(){
		self.showList.style.display="none";
	}
	this.showPop=function(){

		var resultItems=self.searchData();
		//如果输入为空或没有匹配的值
		if(resultItems==null){
			if($("showUl")){
				self.showList.removeChild($("showUl"));
			}
			if(self.currObj){
				self.currObj=null;
			}
			self.showList.style.display="none";
			return;
		}
		resultItems=eval('('+resultItems+')');
		//alert(resultItems.data.length);
		//如果定义了数据显示格式，则此处以该格式显示
		if(self.conf.datashowform){
			//alert("ok");
			var template = Handlebars.compile($(self.conf.datashowform).innerHTML);
			Handlebars.registerHelper('list',function(resultItems, options) {
			var out = "<ul id='showUl' style='list-style: none;text-align: left;'>";
			  for(var i=0, l=resultItems.length; i<l; i++) {

			    out = out + "<li>" + options.fn(resultItems[i]) + "</li>";
			  }
			  //alert(out);
			  return out + "</ul>";
			});
			self.showList.innerHTML=template(resultItems);

		}else{
			var ul=document.createElement("ul");
			ul.id="showUl";
			ul.innerHTML="";
			
			ul.style.cssText="list-style: none;text-align: left;";
			//遍历每一条
			for(var i=0;i<resultItems.data.length;i++){
				//遍历每一条里面的每一项
				var str="";
				for(var item in resultItems.data[i]){

					str+=resultItems.data[i][item]+"&nbsp";
				}
				str="<li>"+str+"</li>";
				ul.innerHTML+=str;
			}
			//在添加之前先检测div中是否已经有ul如果有，则删除
			if($("showUl")){
				self.showList.removeChild($("showUl"));
			}
			self.showList.appendChild(ul);
		}
		
		self.showListf();
		//绑定鼠标事件
		self.mouseEvent();
		//绑定键盘事件
		self.bind(document,'keyup',self.keyEvent);	
		
	}
	this.mouseEvent=function(){
		
		var li=$("showUl").getElementsByTagName("li");
		//鼠标移动上去之后改变背景颜色
		for(var i=0;i<li.length;i++){
			self.bind(li[i],"mouseover",self.onmouseover);
			self.bind(li[i],"click",self.onclick);
		}
		
	}
	//鼠标移动
	this.onmouseover=function(){
		if(self.currObj){
			self.currObj.style.backgroundColor="#fff";
		}
		this.style.background="#eee";
		self.currObj=this;
	}
	//鼠标点击
	this.onclick=function(){
		self.target.value=this.innerText;
		self.showList.style.display="none";
	}
	this.keyEvent=function(){
		if(event.keyCode!=38&&event.keyCode!=40){
			return;
		}
		var curindex=-1;
		var li=$("showUl").getElementsByTagName("li");
		if(self.currObj){
			//alert(self.currObj.innerHTML);
			for(var i=0;i<li.length;i++){
				if(self.currObj.innerHTML==li[i].innerHTML){
					curindex=i;
				}
			}
		}
		switch(event.keyCode){
			case 38:
			if(curindex==-1){
				curindex=li.length-1
			}else{
				curindex-=1;
			}
			break;
			case 40:
			if(curindex==li.length-1){
				curindex=-1;
			}else{
				curindex+=1;
			}
			break;
		}
		if(curindex!=-1){
			li[curindex].style.backgroundColor="#eee";
			self.currObj=li[curindex];
		}else{
			self.currObj=null;
		}
		
	}
	//给i输入框绑定事件
	this.bind=function(obj,eventName,handleName){
		if(obj.addEventListener){
			obj.addEventListener(eventName,handleName,false);
		}else if(obj.attachEvent){
			obj.attachEvent(eventName,handleName);
		}else{
			obj["on"+eventName]=handleName;
		}
	}
	this.setStyle();
	this.bind(this.target,'keyup',self.showPop);


}
var data={
	"alldata":[
		{"name":"a","phonenumber":"111","email":"a@gamil.com"},
		{"name":"ab","phonenumber":"121","email":"ab@gamil.com"},
		{"name":"abc","phonenumber":"131","email":"abc@gamil.com"},
		{"name":"abcd","phonenumber":"141","email":"abcd@gamil.com"},
		{"name":"abcde","phonenumber":"151","email":"abcde@gamil.com"}
	]};
var myconfig={
	//"className":"showDiv"
	"dataneeded":{"name":"name","email":"email","phonenumber":"phonenumber"},
	"datashowform":"people-template"
};
var mysearch=new SearchModel($("searchInput"),$("showList"),data,myconfig);
//mysearch.bind(mysearch.target,"keyup",mysearch.showPop);








       


        




