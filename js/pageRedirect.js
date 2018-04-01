
if(checkES6()){
	var s = document.createElement("script");
	s.src="js/page.js";
	document.body.appendChild(s);
} else {
	var n = window.location.pathname.split("/").pop();
	window.location.replace("rawHTML/"+n);
}
		
function checkES6(){
	if (typeof Symbol == "undefined"){
		return false;
	}
    try {
        eval("class thing {}");
        eval("var k = (x) => x+1");
    } catch (e) { 
    	return false; 
    }
    return true;
}
