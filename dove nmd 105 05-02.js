https://editor.p5js.org/cyprian.dove/sketches/tOsLAPjhU

var A = Math.floor(Math.random() * 256);
var B = Math.floor(Math.random() * 180);
var C = Math.floor(Math.random() * 256);
function setup() {
  createCanvas(500, 400);
  bubbles = []
  tilesPerRow=5//growth.length
  tilesPerColumn = 10
   for (let bubblesDrawn = 0; bubblesDrawn < 50; bubblesDrawn++ ) {
     let thisX = random(width);
     let thisY = random(height);
     let thisHue = random(360);
     bubbles[bubblesDrawn]=new Bubble(thisX, thisY, thisHue);
   }
}

function draw() { 
  let randomClr = "rgb(" + A + "," + B + "," + C + ")";
  background(randomClr);
   for (let bubblesShown = 0; bubblesShown < bubbles.length; bubblesShown++) {
   bubbles[ bubblesShown ].move();
   bubbles[ bubblesShown ].show();
   }
}
class Bubble {
	constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;
	}
	move() {
		this.x = this.x+ random(-20,20);
        this.y = this.y+random(-20,20);
    let bubbleIsTooFarLeft = (this.x < 0);
    let bubbleIsTooFarRight = (this.x > width);
       let bubbleIsTooLow = (this.y < 0);
    let bubbleIsTooHigh = (this.y > height);
    if (bubbleIsTooFarLeft || bubbleIsTooFarRight ) {
      this.x = - this.x;
       if (bubbleIsTooLow || bubbleIsTooHigh ) {
      this.y = - this.y;
	}
	}   
    }
	show() {
push();
      translate(this.x, this.y,this.r*2);
       fill(color(random(100,200), random(190), random(210,255)));
      stroke("tomato");
      strokeWeight(7);
      scale(.08);
ellipse(0, 0, this.r*4);
	
pop();
	}
} 
