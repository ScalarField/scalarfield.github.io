resize();
window.onresize = resize;

function resize(){
	let d = document.querySelector("#page");
	d.style.height = 0.98*window.innerHeight+"px";
	
	let title = document.querySelector("header");
	let text = document.querySelector("h1");
	let textH = text.clientHeight;
	let titleH = title.clientHeight;
	text.style.top = (50*(titleH-textH)/(titleH))+3+"%";
	
}