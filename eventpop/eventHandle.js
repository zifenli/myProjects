//遮罩处理模块
var MaskModule=(function(config){
	var MaskModule={};
	//var className,ssText,innerHTML;
	MaskModule.className="";
	MaskModule.cssText="width:100%;height:100%;position:absolute;top:0;left:0;background-color:rgba(0,0,0,0.7)";
	MaskModule.innerHTML="<h3>这就是遮罩层</h3>";
	
	//需要暴露的是show和hide方法
	MaskModule.showMask=function(){
		
		if(document.getElementById("mask")){
			  document.getElementById("mask").style.display="block"; 
		}else{
			var maskDiv=document.createElement("div");
			maskDiv.id="mask";
			if(MaskModule.className){
				maskDiv.className=MaskModule.className;
			}else{
				maskDiv.style.cssText=MaskModule.cssText;
			}
			maskDiv.dataset.hide="mask";

			maskDiv.innerHTML=MaskModule.innerHTML;
			
			document.body.appendChild(maskDiv);
		}
	}
	MaskModule.hideMask=function(){
		var mask=document.getElementById("mask");
		if(mask){
			mask.style.display="none";
		}
	}
return MaskModule;
}())

//事件处理模块
var eHandleModule=(function(mask){

	function getEventTarget(e){
		e=e||window.event;
		return e.target||e.srcElement;
	}
	mask.eventHandle=function(e){
		var target=getEventTarget(e);
		if(target.dataset.show){
			switch(target.dataset.show){
				case "mask":
				//alert("mask");
				mask.showMask();
				break;
			}
		}
		if(target.dataset.hide){
			switch(target.dataset.hide){
				case "mask":
				mask.hideMask();
				break;
			}
		}
	}
	return mask;
}(MaskModule));

var config={
	"cN":"mask",
	"cT":"width:100%;height:100%;position:absolute;top:0;left:0;background-color:rgba(0,0,0,0.7)",
	"iH":"<h3 style=\"text-align:center;margin-top:30px;\">这就是遮罩层</h3>"
};
(function(eH,config){
	if(config){
		eH.className=config.cN;
		eH.cssText=config.cT;
		eH.innerHTML=config.iH;
	}
	document.onclick=eH.eventHandle;
	//return eH;

}(eHandleModule,config));
//document.onclick=eHandleModule.eventHandle;
//console.log(start);






