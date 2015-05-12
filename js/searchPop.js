function SearchPop(inputId,showId){
	this.inputObj=$(inputId);
	this.showObj=$(showId);
	//定义一个全局变量，存储当前元素的索引值，-1代表输入框
	var curIndex=-1;

	this.selectItems=function(needarr,data){
		//获取输入的内容
		var inputTxt=this.inputObj.value;
		//var matched="";
		//var matchArr=new Array();
		//如何根据输入的信息找到相关信息呢？
		//遍历所有的人，每次遍历时判断这个人的信息是否和输入的信息相似（分割后的字符是否相等）（第一步），
		//如果相等，则存储起来，否则，不管，最后会得到一个相似的人的JSON数据，然后从这个数据里面取出需要的数据
		//存到一个数组当中
		//现在的问题是如何存储

		//第一步：遍历所有数据
		//创建一个存储每个item的索引值的数组,如果该item中有与输入的数据相似的数据，则存储该item的index
		var indexArr=new Array();
		//外层循环，遍历所有的条目
		for(var i=0;i<data.alldata.length;i++){

			//flag标示该item中是否有何输入值相似的内容，1表式有，0标示没有，初始化为0
			var flag=0;
			//内层循环，遍历每个条目的各个属性
			for(var item in data.alldata[i]){


				//分割该item里的属性值，判断是否和inputTxt的值相等
				var split=data.alldata[i][item].substr(0,inputTxt.length);
			
				if(split==inputTxt){
					flag=1;
				}
			}
			if(flag){
				indexArr.push(i);
			}

		}
		//第二步：从得到的所有条目中获取所需要的数据
		//创建一个数组，用于存储遍历出来的实际数据，很有可能是多维数组，维度是所需数据的个数，如所需是name和email，则格式如下
		//[[name1,email1],[name2,email2]......]（好像比较不好做。。。好吧用JSON）
		//var matchArr=new Array();
		var matchJSON="";
		//先判断是否有匹配的值，如果有则提取数据，如果没有，返回
		if(indexArr.length==0){
			return null;
		}
		//外层循环，遍历所有相似条目
		for(var i=0;i<indexArr.length;i++){
			//内层循环，遍历每个条目的属性
			for(var item in data.alldata[indexArr[i]]){
				//最内层循环，遍历所需数据数组
				for(var j=0;j<needarr.length;j++){
					//如果该属性名和所需数据相同，则存储在matchJSON
					if(item==needarr[j]){

						if(j==needarr.length-1){
							if(i==indexArr.length-1){
								//最后一条的最后一个
								matchJSON+="\""+needarr[j]+"\":\""+data.alldata[indexArr[i]][item]+"\"}]";
							}else{
								matchJSON+="\""+needarr[j]+"\":\""+data.alldata[indexArr[i]][item]+"\"},";
							}
						}else if(j==0){
							//第一条的第一个
							if(i==0){
								matchJSON+="[{\""+needarr[j]+"\":\""+data.alldata[indexArr[i]][item]+"\",";
							}else{
								matchJSON+="{\""+needarr[j]+"\":\""+data.alldata[indexArr[i]][item]+"\",";
							}
							
						}else{
							matchJSON+="\""+needarr[j]+"\":\""+data.alldata[indexArr[i]][item]+"\",";
						}
					}
				}
			}
		}
		matchJSON="{"+"\"result\":"+matchJSON+"}";
		matchJSON=eval('('+matchJSON+')');
		return matchJSON;
	}
	//往ul里面填数据
	this.showItems=function(matchJSON){
		//alert(matchJSON);
		//如果matched.length不等于0，则把每个item填充进去,
		//如果不存在,this.showObj隐藏，并返回
		if(matchJSON==null){
			this.showObj.style.display="none";
			return;
		}
		//遍历每个item
		var ulElement=document.createElement("ul");
		//给ul一个id，以便之后删除
		ulElement.id="matched";
		ulElement.innerHTML="";
		for(var i=0;i<matchJSON.result.length;i++){

			//暂存遍历所得的内容
			var mystr="";
			//遍历每个result item
			for(var item in matchJSON.result[i]){
				mystr+=matchJSON.result[i][item]+"&nbsp";
			}
			//将遍历出来的该item填入
			ulElement.innerHTML+="<li>"+mystr+"</li>";
		}
		//如果有内容，则得先把内容清空，然后再重新填进去
		if($("matched")){
 			$(showId).removeChild($("matched"));
 		}
		$(showId).appendChild(ulElement);
		$(showId).style.display="block";
	}
	//改变input的值
	//ul里面的li要响应三个事件，
	//第一，鼠标移动，结果是移动到哪个元素，input显示哪个元素的值，并且该元素改变背景色
	//第二，鼠标点击，结果是点击哪个值，input显示哪个的值，并且，showDIv隐藏
	//第三，键盘响应上下键，从当前选中的元素开始，往上下移动
	//思路：为了记录当前选中的元素，要有一个全局的变量用来存储当前选中元素的index
	this.respoEvents=function(){
		if(!$("matched")){
			return;
		}
		
		//给每个li添加点击事件
		for(var i=0;i<$("matched").childNodes.length;i++){
			//添加鼠标移动事件
			//分析：鼠标移动并不是按照顺序来的，所以与当前选中的元素没有关系，只是单纯的鼠标指到哪，哪个元素改
			//背景，并且将值传入input中
			$("matched").childNodes[i].addEventListener("mouseover",
				function(){
					//alert(this);
					//因为只能选中一个元素，所以如果已有选中元素，则首先清除已选中元素
					for(var i=0;i<$("matched").childNodes.length;i++){
						$("matched").childNodes[i].style.backgroundColor="#fff";
						//遍历时顺便注意，如果当前遍历的元素和当前鼠标悬停的元素相等，则将当前遍历元素的索引值付给curIndex
						//以便键盘操作时能够根据该值来进行选择
						if(this.innerText==$("matched").childNodes[i].innerText){
							curIndex=i;
						}
					}
					this.style.backgroundColor="#eee";
					$(inputId).value=this.innerText;
				},false);
			//绑定鼠标点击事件：因为之前在鼠标悬停时已经将值传入到了输入框，因此，此时要做三件事：
			//第一，移除之前添加的ul，因为如果设为none，ul其实还是存在的，这是按下上下键的时候会有反应，因此，直接移除，下次再重新添加
			//第二，将showDiv隐藏
			//第三，将当前的index复位
			$("matched").childNodes[i].addEventListener('click',
				function(){
					//如果匹配列表存在，则先移除
					if($("matched")){
						$(showId).removeChild($("matched"));
					}
					//这里会循环好几次，但只需清空隐藏一次即可
					if($(showId).style="block"){
						$(showId).style.display="none";
					}
					//关闭下拉列表之后将当前的index复位
					curIndex=-1;
				},false);
		}
		document.onkeyup=this.onkeyup;

		
	}
	//绑定键盘onkeyup事件，此处只响应上下键，如果是其他键，则不响应
	this.onkeyup=function(){
		//该方法是针对有匹配列表的情况，如果没有，则应该返回，不执行以下操作
		if(!$("matched")){
			return;
		}
		//首先判断是不是上（38）下（40）键，如果不是，则返回
		if(event.keyCode!=38&&event.keyCode!=40){
			return;
		}
		
		//如果是，则根据curIndex的值上下移动，如果0<curIndex<$("matched").childNodes.length-1
		//则简单得上下移动即可，顺便将curIndex的值改变
		var ullength=$("matched").childNodes.length;
		//与鼠标悬停一样，键盘按下也要将当前选中项清除
		for(var i=0;i<ullength;i++){
			$("matched").childNodes[i].style.backgroundColor="#fff";
		}
		switch(event.keyCode){
			//先判断上键，如果curIndex==-1则说明已是最上面，
			//将curIndex重置为$("matched").childNodes.length-1
			case 38:
				 if(curIndex==-1){
				 	curIndex=ullength-1;
				 }
				 else{
				 	curIndex-=1;
				 }
				break;
			//再判断下键，如果curIndex=ullength-1，则说明已到最下面，此时需将curIndex重置为-1
			case 40:
				if(curIndex==ullength-1){
					curIndex=-1;
				}else{
					curIndex+=1;
				}
				break;
		}
		//根据curIndex的值对li元素做改变，此时当curIndex==-1时不做改变
		//alert(curIndex);
		if(curIndex!=-1){
			$("matched").childNodes[curIndex].style.backgroundColor="#eee";
			$(inputId).value=$("matched").childNodes[curIndex].innerText;
			
		}
		$(showId).style.display="block";

	};

	
}

function $(str){
	return document.getElementById(str);
}
var data={
	"alldata":[
		{"name":"a","phonenumber":"111","email":"a@gamil.com"},
		{"name":"ab","phonenumber":"121","email":"ab@gamil.com"},
		{"name":"abc","phonenumber":"131","email":"abc@gamil.com"},
		{"name":"abcd","phonenumber":"141","email":"abcd@gamil.com"},
		{"name":"abcde","phonenumber":"151","email":"abcde@gamil.com"}
	]};
var needarry=new Array("name","phonenumber");
var mypop=new SearchPop("searchInput","result");

mypop.inputObj.onkeyup=function(){

	var matchJSON=mypop.selectItems(needarry,data);
	mypop.showItems(matchJSON);
	mypop.respoEvents();
};	

