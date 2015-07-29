
function share(){
	var btns=document.getElementsByClassName("u-btn");
	btns[0].onclick=function(){
		var mask=document.getElementById("mask");
		if(mask){
			mask.style.display="block";
		}else{
			var maskDiv=document.createElement("div");
			maskDiv.className="m-mask";
			maskDiv.id="mask";
			maskDiv.innerHTML="<img class=\"f-fr\" src=\"../images/ic-arrow.png\"><span>点击右上角<br/>通过【发送给朋友】功能<br/>或者【分享到朋友圈】功能<br/>分享给朋友</span>";
			document.body.appendChild(maskDiv);	
		}
		document.body.style.overflow="hidden";
		document.getElementById("mask").onclick=function(){
			this.style.display="none";
			document.body.style.overflow="";
		}
	}
}
share();  
/*var myconfig={
	"class":"m-mask",
	"innerHTML":"<img class=\"f-fr\" src=\"../images/ic-arrow.png\"><span>点击右上角“发送给朋友”<br/>即可邀请好友啦</span>"
}
var mymask=new Mask(myconfig);
document.onclick=mymask.eventHandle;*/
