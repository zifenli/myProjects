function ajaxFunction()
	 {
	 var xmlHttp;
	 try
	    {
	    xmlHttp=new XMLHttpRequest();
	    }
	 catch (e)
	    {
	  // Internet Explorer
	   try{
	      xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
	      }
	   catch (e){
		try{
	         xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	    }catch (e){
	         alert("您的浏览器不支持AJAX！");
	         return false;
	         }
	      }
	    }
	 }

	 function showOthers(){
	 	if(event.keyCode==38||event.keyCode==40){
	 		return;
	 	}
	 	var inputTxt=$("searchInput").value;
	 	//alert("It works!");
	 	var mymatch=new Array("123","1234abcd","123456bcde","abcdef");
	 	var matched=new Array();

	 	for(var i=0;i<mymatch.length;i++){
	 		var mystr=mymatch[i].substr(0,inputTxt.length);
	 		if(mystr==inputTxt){
	 			matched.push(mymatch[i]);
	 		}
	 	}

	 	if(matched.length!=0){

	 		var ulElement=document.createElement("ul");
	 		ulElement.id="matched";
	 		ulElement.innerHTML="";

	 		for(var i=0;i<matched.length;i++){
	 			ulElement.innerHTML+="<li>"+matched[i]+"</li>";
	 		}
	 		if($("matched")){
	 			$("result").removeChild($("matched"));
	 		}
			$("result").appendChild(ulElement);
			$("result").style.display="block";

			//给每个li添加点击事件
			for(var i=0;i<$("matched").childNodes.length;i++){
				
				$("matched").childNodes[i].addEventListener("mouseover",onmouseover,false);
				$("matched").childNodes[i].addEventListener('click',choose,false);

			}
		}
		else{
			//alert("works");
			$("result").style.display="none";
		}

		//choose();
	 }

	 //当前选中的项
	  var choIndex=-1;

	



	 function choose(){
	 	$("searchInput").value=this.innerText;
	 	$("result").style.display="none";
	 }
	 //鼠标悬停
	 function onmouseover(){
	 	//alert(index);
	 	
	 	var matchedItems=$("matched").childNodes;
	 	for(var i=0;i<matchedItems.length;i++){
	 		matchedItems[i].style.backgroundColor="#fff";
	 		if(this.innerText==matchedItems[i].innerText){
	 			choIndex=i;
	 		}
	 	}
	 	//alert(choIndex);
	 	this.style.backgroundColor="#eee";
	 }

	//键盘按键
	 function chooseByKey(){
	 	if(event.keyCode==38||event.keyCode==40){
	 		
	 	
	 	//alert(event.keyCode);
		 	if($("matched")){
					
		 		var matchedItems=$("matched").childNodes;
		 	
		 		for(var i=0;i<matchedItems.length;i++){
		 			matchedItems[i].style.backgroundColor="#fff";
		 		}
				switch(event.keyCode){
			 		case 38:
				 		//alert("up");
				 		if(choIndex==-1){
				 			//alert("ok");
				 			choIndex=matchedItems.length-1;
				 		}else{
				 			choIndex-=1;
				 		}
				 		break;

			 		case 40:
				 		//alert("down");
				 		if(choIndex==matchedItems.length-1){
					 		choIndex=-1;
					 	}else{
					 		choIndex+=1;
					 	}
					 	
				 		break;
			 	}
			 	if(choIndex!=-1 && choIndex!=matchedItems.length){
			 		matchedItems[choIndex].style.backgroundColor="#eee";
			 		//alert(choIndex);
					$("searchInput").value=matchedItems[choIndex].innerText;
				}
		 	}

	 	}
	 	//alert(event.keyCode);
	 }
	 
	 function $(str){
	 	return document.getElementById(str);
	 }

	 $("searchInput").onkeyup=showOthers;
	 document.onkeydown=chooseByKey;
	 