class MemeKit{
	
	constructor(){
		this.memeCount = 6; //Update this system later with dynamic count
		this.errorPresets = 
		{
			"standard" : "An error occurred. Please try again.",
			"shakespeare" : "The fault, dear User, is not in my code, but in yourself, that you fell for this.",
			"rickroll" : "Never gonna give you up. Never gonna let you down. Never gonna run around and desert you",
			"input" : "Suggest a joke message at: transcendentalbob@gmail.com",
			"wenceslas" : "Good King Wenceslas look'd out, On the Feast of Stephen, when the snow lay round about, Deep and crisp and even.",
			"quickmath" : "2 + 2 ≠ 4 - 1 ... Internet users, please learn some math :|",
			"profit" : "Step 1: Click on error message \nStep 2: ???? \nStep 3: Profit \nStep 3: Profit"
		};
	}
	
	rickroll(){
		location.assign('https://www.youtube.com/watch?v=dQw4w9WgXcQ&autoplay=1');
	}
	
	error(message="random"){
		let text;
		if(message === "random"){
			text = this.randomPropertyOf(this.errorPresets);
		} else if(message in this.errorPresets){
			text = this.errorPresets[message];
		} else {
			text = message;
		}
		alert(text);
	}
	
	rewrite(element, message="random"){
		let text;
		if(message === "random"){
			text = this.randomPropertyOf(this.errorPresets);
		} else if(message in this.errorPresets){
			text = this.errorPresets[message];
		} else {
			text = message;
		}
		element.innerHTML = text;
	}
	
	perpetual(delay, message="random"){
		setInterval(()=>{this.error(message)}, delay);
	}
	
	messWithElement(element, delay){
		setInterval(()=>{this.rewrite(element, "random")}, delay);
	}
	
	insertMeme(element, id, fit){
		if(fit){
			let r = element.getBoundingClientRect();
			element.innerHTML = this.getMeme(r.width, r.height, id);
		} else {
			element.innerHTML = this.getMeme(undefined, undefined, id);
		}
	}

	animateBox(element, minW, maxW, minH, maxH, steps, delay){
		let dW = 1, dH = -1;
		let w = minW, h = maxH;
		element.style.width = w+"px";
		element.style.height = h+"px";
		return setInterval(()=>{
			w += dW*(maxW-minW)/steps;
			h += dH*(maxH-minH)/steps;
			element.style.width = w+"px";
			element.style.height = h+"px";
			if(w <= minW || w >= maxW){
				dW *= -1;
			}
			if(h <= minH || h >= maxH){
				dH *= -1;
			}
		}, delay);
	}
	
	animateColor(element, property, c1, c2, steps, delay){ //Specify colors as RGB arrays
		let color = c1.slice(0);
		let stepSize = [ (c2[0]-c1[0])/steps, (c2[1]-c1[1])/steps, (c2[2]-c1[2])/steps];
		let direction = [ Math.sign(c2[0]-c1[0]), Math.sign(c2[1]-c1[1]), Math.sign(c2[2]-c1[2])];
		element.style.property = "rgb("+Math.round(color[0])+","+Math.round(color[1])+","+Math.round(color[2])+")";
		return setInterval(()=>{
			for(let i=0;i<color.length;i++){
				color[i] += stepSize[i]*direction[i];
				if( Math.abs( color[i] - (c2[i]+c1[i])/2  ) > Math.abs(c2[i]-c1[i])/2 ){
					direction[i] *= -1;
				}
			}
			element.style[property] = "rgb("+Math.round(color[0])+","+Math.round(color[1])+","+Math.round(color[2])+")";
		}, delay);
	}
	
	getMeme(w, h, id="random"){
		let num;
		if(id === "random"){
			num = Math.floor(Math.random()*this.memeCount) + 1;
		} else if(id <= this.memeCount && id >= 1){
			num = id;
		} else {
			num = 0;
		}
		return '<img src="https://scalarfield.github.io/images/memes/meme'+num+'.jpg" width="'+w+'" height="'+h+'" />';
	}
	
	randomPropertyOf(obj){
		let keys = Object.keys(obj);
    	return obj[keys[ keys.length * Math.random() << 0]];
	}
	
}