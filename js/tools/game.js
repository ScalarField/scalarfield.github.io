let gameloop;
let entityList = [];
let score = 0;
let spawnDelay = 30;
let spawnTimer = 30;
let cursor;
let coi = null;
let nodes = [];
let maxNodeAge = 10;
let state = 0;
let loseScreenDelay = 30;
let loseScreenTimer = 30;

let stop = ()=>{
	clearInterval(gameloop)
};

let cleanList = (list)=>list.filter((x)=>x!==null);

function drawNodeList(ctx){
	for(let i=0;i<nodes.length;i++){
		ctx.beginPath();
		ctx.arc(nodes[i].x, nodes[i].y, i/2, 0, 2*Math.PI);
		ctx.fillStyle = `hsl(${20*i}, 50%, 50%)`;
		ctx.fill();
		ctx.closePath();
		if(i < nodes.length-1){
			ctx.beginPath();
			ctx.moveTo(nodes[i].x, nodes[i].y)
			ctx.lineTo(nodes[i+1].x, nodes[i+1].y);
			ctx.strokeStyle = `hsl(${20*i}, 50%, 70%)`;
			ctx.lineWidth = i+1;
			ctx.stroke();
			ctx.closePath();
		}
	}
}

class Box{

	constructor(x, y, w, h, color){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.color = color;
		this.xv = 0;
		this.yv = 0;
		this.list = null;
		this.index = null;
		this.alive = true;
		this.deadDelay = 10;
		this.deadTimer = 0;
	}
	
	kinematics(canvas){
		if(this.alive){
			this.yv += 1;
			this.x += this.xv;
			this.y += this.yv;
			if(this.y > canvas.height + 100 || this.x < -100 || this.x > canvas.width + 100){
				//console.log("hi");
				state = 2;
			}
		}
	}
	
	collision(box){
		if(this.alive){
			let hit = false;
			if(this.x < box.x+box.w && this.x+this.w > box.x && this.y < box.y+box.h && this.y+this.h > box.y){
				hit = true;
			}
			if(hit){
				this.alive = false;
				score++;
			}
		}
	}
	
	addToList(){
		this.index = entityList.length;
		entityList.push(this);
	}
	
	deleteSelfFromList(){
		entityList[this.index] = null;
	}
	
	draw(ctx){
		ctx.fillStyle = this.color;
		if(this.alive){
			ctx.fillRect(this.x, this.y, this.w, this.h);
		} else {
			ctx.globalAlpha = 1-this.deadTimer/this.deadDelay;
			ctx.fillRect(this.x, this.y, this.w, this.h);
			ctx.globalAlpha = 1;
		}
	}

}

function spawnBox(canvas){
	let maxWidth = maxHeight = 100;
	let minWidth = minHeight = 50;
	let x, y, w, h, xv, yv;
	x = Math.floor(Math.random()*(canvas.width-maxWidth));
	y = canvas.height+10;
	w = Math.floor(Math.random()*(maxWidth-minWidth))+minWidth;
	h = Math.floor(Math.random()*(maxHeight-minHeight))+minHeight;
	let direction = (x < c.width/2)?1:-1;
	xv = Math.floor(Math.random()*5)+1;
	yv = -1*(Math.floor(Math.random()*10)+20);
	console.log(yv);
	let color = `hsl(${Math.floor(Math.random()*256)}, 50%, 70%)`;
	let box = new Box(x, y, w, h, color);
	box.xv = direction*xv;
	box.yv = yv;
	box.addToList();
}

//The collision functions below exist as part of a feature that I couldn't get to work.
//I have to debug these collision functions first before I can use them.
//They don't do anything right now.

function lineCollision(x1, y1, x2, y2, x3, y3, x4, y4){
	let a1 = y2-y1, b1 = x2-x1, c1 = a1*x1 + b1*y1;
	let a2 = y4-y3, b2 = x4-x3, c2 = a2*x3 + b2*y3;
	let det = a1*b2 - a2*b1;
	if(det === 0){
		return false;
	} else {
		let xc = (b2*c1 - b1*c2)/det;
		let yc = (a1*c2 - a2*c1)/det;
		if(xc >= Math.min(x1, x2) && xc <= Math.max(x1, x2) && yc >= Math.min(y1, y2) && yc <= Math.max(y1, y2)){
			return true;
		}
	}
	return false;
}

function rectLineCollision(box, x1, y1, x2, y2){
	let top = lineCollision(box.x, box.y, box.x+box.w, box.y, x1, y1, x2, y2);
	let right = lineCollision(box.x+box.w, box.y, box.x+box.w, box.y+box.h, x1, y1, x2, y2);
	let bottom = lineCollision(box.x, box.y+box.h, box.x+box.w, box.y+box.h, x1, y1, x2, y2);
	let left = lineCollision(box.x, box.y, box.x, box.y+box.h, x1, y1, x2, y2);
	if(top || right || bottom || left){
		return true;
	}
	return false;
}