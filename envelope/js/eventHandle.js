Object.extend=function(destination,source){
	if(source){
		for(var key in source){
			destination[key]=source[key];
		}
	}
	return destination;
}
//需要的数据：maskDiv的CSS,可以传入一个class；显示的内容：可以传入到innerHTML
//点击出现遮罩事件的处理
function Mask(config){
	this.conf=Object.extend({
		"class":"",
		"cssText":"width:100%;height:100%;position:absolute;top:0;left:0;background-color:rgba(0,0,0,0.7)",
		"innerHTML":"<h3>这就是遮罩层</h3>"
	},
	config);

	
	var self=this;
	//获取事件的目标元素,在ie中是e.srcElement，在其他浏览器中是e.target
	this.getEventTarget=function(e){
		e=e||window.event;
		return e.target||e.srcElement;
	}
	//对目标元素进行处理
	this.eventHandle=function(e){
		var target=self.getEventTarget(e);
		//显示遮罩层
		if(target.dataset.show){
			switch(target.dataset.show){
				case "mask":
				//alert("mask");
				self.showMask();
				break;
			}
		}
		//隐藏遮罩层
		if(target.dataset.hide){
			switch(target.dataset.hide){
				case "mask":
				self.hideMask();
				break;
			}
		}
	}
	this.showMask=function(){
		
		if(document.getElementById("mask")){
			  document.getElementById("mask").style.display="block"; 
		}else{
			var maskDiv=document.createElement("div");
			maskDiv.id="mask";
			if(self.conf.class){
				maskDiv.className=self.conf.class;
			}else{
				maskDiv.style.cssText=self.conf.cssText;
			}
			maskDiv.dataset.hide="mask";

			maskDiv.innerHTML=self.conf.innerHTML;
			
			document.body.appendChild(maskDiv);
		}
		document.body.style.overflow="hidden";
	}
	this.hideMask=function(){
		var mask=document.getElementById("mask");
		if(mask){
			mask.style.display="none";
			document.body.style.overflow=""; 
		}
	}
}






