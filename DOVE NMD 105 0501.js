https://editor.p5js.org/cyprian.dove/sketches/sbezNbJxw

function setup() {
  createCanvas(500, 400);
}

function draw() {
  let bubble1 = new Bubble(100, 200, 20);
  let bubble2 = new Bubble(250, 100, 10);
  let bubble3 = new Bubble(400, 250, 30);
   let bubble4 = new Bubble(50, 70, 5);
   let bubble5 = new Bubble(250, 300, 15);
  background("pink");
  bubble1.update();
  bubble1.show();
   bubble2.update();
  bubble2.show();
   bubble3.update();
  bubble3.show();
   bubble4.update();
  bubble4.show();
   bubble5.update();
  bubble5.show();
  
}

class Bubble {
	constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;
	}
	update() {
		this.x = this.x+ random(0,10);
        this.y = this.y+random(0,10);
	}
	show() {
push();
      stroke("tomato");
      strokeWeight(3);
translate(this.x, this.y,this.r*2);
      fill("lightblue")
ellipse(0, 0, this.r*3);
	
pop();
	}
} 
