let alphabet = "abcdefghijklmnopqrstuvwxyz";
let cipher = "";

let symbolChars = "abcdefghijklmnopqrstuvwxyz?!";
let asciiFont = ["ehvhh", "uhuhu", "fgggf", "uhhhu", "vgvgv", "vgvgg", "fgjhe", //abcdefg
				 "hhvhh", "v444v", "v22ic", "hikih", "ggggv", "hrlhh", "hpljh", //hijklmn
				 "ehhhe", "uhugg", "uiiu1", "uhuih", "fge1u", "v4444", "hhhhe", //opqrstu
				 "hhaa4", "hhlrh", "ha4ah", "ha444", "v248v", "e1604", "44404"]//vwxyz?!

//0123456789
//abcdefghij -- 1
//klmnopqrst -- 2
//uv		 -- 3

class MemeKit{
	
	constructor(){
		this.memeCount = 322; //Update this system later with dynamic count
		this.errorPresets = {
			"standard": "An error occurred. Please try again.",
			"shakespeare": "The fault, dear User, is not in my code, but in yourself, that you fell for this.",
			"rickroll": "Never gonna give you up. Never gonna let you down. Never gonna run around and desert you",
			"input" : "Suggest a joke message at: transcendentalbob@gmail.com",
			"wenceslas" : "Good King Wenceslas look'd out, On the Feast of Stephen, when the snow lay round about, Deep and crisp and even.",
			"quickmath" : "2 + 2 ≠ 4 - 1 ... Internet users, please learn some math :|",
			"profit" : "Step 1: Click on error message \nStep 2: ???? \nStep 3: Profit \nStep 3: Profit",
			"grammar" : "A non sequitur walks into a bar. This year's potato harvest is great.",
			"cipher" : "OHO JFV GIEUUJ TFBRIG BF AGEAL BRHP AHYRIG? JFV CVPB TI TFGIO.",
			"goals" : "\"Everyone can reach his goal, if he can think, wait and fast.\" -- Siddartha from the Hermann Hesse novel of the same name.",
			"nickels" : "If I had a nickel for every star in the observable universe (based on current estimates), I could cover the Earth in nickels and buy a new car with the leftovers.",
			"disfluency" : "Apparently disfluency in speech has been linked to higher information retention in the audience...",
			"emoticons" : "Wikipedia has a list of emoticons. Here's the one for Homer Simpson: ~(_8^(I)",
			"bruh" : "what"
		}
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
	
	randomMASC(){
		let alpha = alphabet.split("");
		let cipher = [];
		while(alpha.length > 0){
			let i = Math.floor(alpha.length*Math.random());
			cipher.push(alpha[i]);
			alpha.splice(i, 1);
		}
		return cipher.join("");
	}
	
	isValidCipher(ct){
		if(ct.length !== 26){
			return false;
		}
		for(let i=0;i<ct.length;i++){
			let regexp = new RegExp(ct.charAt(i), 'g');
			if( ((alphabet.match(regexp) || []).length) !== 1 ){
				return false;
			}
			let regexp2 = new RegExp(alphabet.charAt(i), 'g');
			if( ((ct.match(regexp2) || []).length) !== 1 ){
				return false;
			}
		}
		return true;
	}
	
	inputCipher(ct="random"){
		if(!this.isValidCipher(ct)){
			cipher = this.randomMASC();
		} else {
			cipher = ct;
		}
		document.querySelectorAll("[type=text], textarea").forEach( (e)=>{
			e.oninput = (event)=>{
				let key = e.value.charAt(e.value.length-1);
				let letters = "qwertyuioplkjhgfdsazxcvbnmMNBVCXZASDFGHJKLPOIUYTREWQ";
					if(letters.indexOf(key) > -1){
					let plainLetter = key.toLowerCase();
					let cipherLetter = cipher.charAt(alphabet.indexOf(plainLetter));
					if(key.toLowerCase() !== key){
						cipherLetter = cipherLetter.toUpperCase();
					}
					e.value = e.value.substring(0, e.value.length-1) + cipherLetter;
				}
			}
			e.onkeydown = (event)=>{
				if(event.key === "Backspace" && e.value.length === 1){
					e.value = "";
				}
			}
		});
		
	}
	
	asciiArt(message="random", c="*"){
		let text;
		if(message === "random"){
			text = this.randomPropertyOf(this.errorPresets);
		} else if(message in this.errorPresets){
			text = this.errorPresets[message];
		} else {
			text = message;
		}
		let textlines = text.split("`");
		let textholder = "<p style='font-family:monospace;'>";
		let textend = "</p>";
		let asciiString = "";
		for(let text of textlines){
			text = text.toLowerCase();
			for(let i=0;i<5;i++){
				for(let letter of text){
					if(symbolChars.indexOf(letter) >= 0){
						asciiString += Number(parseInt(asciiFont[symbolChars.indexOf(letter)].charAt(i), 32)).toString(2).padStart(5, '0').replace(/1/g, c).replace(/0/g, "&nbsp;") + "&nbsp;";
					} else {
						asciiString += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
					}
				}	
				//asciiString.replace(/#/g, "\0o140");
				asciiString += "<br />";
			}
			asciiString += "<br />"
		}
		return textholder+asciiString+textend;
	}
	
}
