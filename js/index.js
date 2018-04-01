let c = document.querySelector("canvas");
let f = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;
//console.log(c);
let spacing = c.width<c.height ? c.width/20 : c.height/20;
let center = 0.15;
let values = createBackground(spacing, center);
drawBackground(values, spacing);

let fps = 10;
let update = setInterval(updateBackground, 1000/fps, values, 5);
let draw = setInterval(drawBackground, 1000/fps, values, spacing);

resize();
window.onresize = resize;

function resize(){
	clearInterval(update);
	clearInterval(draw);
	let d = document.querySelector("#page");
	d.style.height = 0.99*window.innerHeight+"px";
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	c.style.backgroundColor = "#FF0000";
	spacing = c.width<c.height ? c.width/20 : c.height/20;
	//console.log(c.width<c.height);
	values = createBackground(spacing, center);
	drawBackground(values, spacing);
	update = setInterval(updateBackground, 1000/fps, values, 5);
    draw = setInterval(drawBackground, 1000/fps, values, spacing);
	
	let title = document.querySelectorAll(".box");
	let text = document.querySelectorAll(".titletext");
	for(let i=0;i<text.length;i++){
		let textH = text.item(i).clientHeight;
		let titleH = title.item(i).clientHeight;
		text.item(i).style.top = (50*(titleH-textH)/(titleH))+3+"%";
	}
	
	
}

function createBackground(spacing, center){
	let length = Math.ceil(c.width/spacing);
	//console.log(c.width, spacing, c.width/20);
	let height = Math.ceil(c.height/spacing);
	//console.log(length, height);
	let values = [];
	for(let i=0;i<height;i++){
		let row = [];
		for(let j=0;j<length;j++){
			let value = center + (Math.random()/10 - 0.05);
			row.push(value);
		}
		values.push(row);
	}
	//console.log(values[0].length);
	return values;
}

function drawBackground(values, spacing){
	f.clearRect(0, 0, c.width, c.height);
	//console.log(values);
	for(let i=0;i<values.length;i++){
		for(let j=0;j<values[i].length;j++){
			//f.fillStyle="hsl(220, 10%,"+Math.round(values[i][j]*100)+"%)";
			f.fillStyle="hsl("+(Math.round(values[i][j]*200)+180)+", 20%,"+(5+Math.round(values[i][j]*65))+"%)";
			f.fillRect(j*spacing, i*spacing, spacing+1, spacing+1);
		}
	}
}

function updateBackground(values, number){
	let size = values.length*values[0].length;
	let nums = Array.from({length:size}, (v, i)=>i);
	for(let i=0;i<number;i++){
		let n = Math.floor(Math.random()*nums.length);
		let r = Math.floor(nums[n]/values[0].length);
		let c = nums[n] % values[0].length;
		values[r][c] = center + (Math.random()/10 - 0.05);
		nums.splice(n, 1);
	}
}

