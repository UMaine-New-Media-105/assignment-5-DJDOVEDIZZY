https://editor.p5js.org/cyprian.dove/sketches/4Pb-CTh_r
var A = Math.floor(Math.random() * 256);
var B = Math.floor(Math.random() * 180);
var C = Math.floor(Math.random() * 236);

let img;
let c;
let lily = [];
let frog;
function preload() {
  // preload() runs once
  ratsprite = loadImage("images/ratsprite.png");
}
function setup() {
  createCanvas(700, 600);
  angleMode(DEGREES);
  frameRate(60);
  lifePhases = ["Seed", "Bubble", "Sprout", "Flower"];
  tilesPerRow = 5; //growth.length
  tilesPerColumn = 10;
  addX = random(-3,-5); // This is a global variable that is the speed for each mom.
  startHealth = 600; // 60 frames is one second.
   startHealth2 = 300; // 60 frames is one second.
  spawnDelay=200;
  framesDelayed=0;
  collisionDistance = 100;
  let momX = random(width);
  let momY = random(height);
  flower1 = new Flower(momX, momY);
  let dadX = random(width);
  let dadY = random(height);
  flower2 = new Flower(dadX, dadY);
  kids = [];
}

function draw() {
  let randomClr = "rgb(" + A + "," + B + "," + C + ")";
  background(randomClr);
  framesDelayed++;
  textSize(24);
  fill(0);
  text("Click to add Lilypads", width/20, height/9);
  for (var o = 0; o < lily.length; o++) {
  lily[o].display();
	lily[o].update();
  }
  flower1.move();
  flower2.move();
  flower1.show();
  flower2.show();
  for (let kidShown = 8; kidShown < kids.length; kidShown++) {
    kids[kidShown].move();
    kids[kidShown].show();
  }
  // Detect collisions and breed kid.
  if(framesDelayed > spawnDelay){
    let distanceApart = dist(flower1.x, flower1.y, flower2.x, flower2.y);
  if (distanceApart < collisionDistance) {
    let kidX = random(width);
    let kidY = random(height);
    kids.push(new Seed(kidX, kidY));
     flower1.health = startHealth;
    flower2.health = startHealth;
  }
  }
}
class Lily {
  constructor(x, y, r) { //start position
  this.x = x;
  this.y = y;
	this.r = r;
     this.addX = addX;
    this.lifespan = 0;
  }
  display() {
    push();
  rotate(PI/3.0);
 	fill(8,192,170,180);
  noStroke();
	arc(this.x, this.y, this.r, this.r, 0, (300), PIE);
    
    pop();
  }
  update() {
  this.x = this.x + random (-1,1)+this.addX;
  this.y = this.y + random (-1,1);
    // Reverse if it hits a wall.
    let isTooFarLeft = this.x < 0;
    let isTooFarRight = this.x > width;
    if (isTooFarLeft || isTooFarRight) {
      this.addX = -this.addX;
      this.y = random(height);
  }
} 
}
function mousePressed() {
	var m = new Lily(mouseX,mouseY,random(40,100));
  lily.push(m);
}

function keyPressed() {
  lily.splice(0, 1);    
}

class Frog {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
   push();
     noStroke();

  // Draw the body
  fill(120, 180, 100);
  ellipse(200, 250, 150, 100);
  // Draw the eyes
  fill(255);
  ellipse(180, 200, 30, 30);
  ellipse(220, 200, 30, 30);
  fill(0);
  ellipse(180, 200, 10, 10);
  ellipse(220, 200, 10, 10);

  // Draw the mouth
  stroke(0);
  strokeWeight(3);
  noFill();
ellipse(180, 230, 5, 5);
  ellipse(220, 230, 5, 5);
    pop();
  }

  update() {
   this.x = this.x + random (-1,1)+this.addX;
  this.y = this.y + random (-1,1);
    // Reverse if it hits a wall.
    let isTooFarLeft = this.x < 0;
    let isTooFarRight = this.x > width;
    if (isTooFarLeft || isTooFarRight) {
      this.addX = -this.addX;
      this.y = random(height);
  }
  }
}

class Seed {
  constructor(x, y) {
   this.x = x;
    this.y = y;
    this.addX = addX;
    this.health = startHealth2;
  }
  move() {
   this.x = this.x + this.addX;
    this.y = this.y;
    // Reverse if it hits a wall.
    let isTooFarLeft = this.x < 0;
    let isTooFarRight = this.x > width;
    if (isTooFarLeft || isTooFarRight) {
      this.addX = -this.addX;
      this.y = random(height);
    }
     this.health--;
  }
  show() {
     push(); 
  translate(this.x,this.y)
  let sec = second();
  if (this.health < 300) {
    seed(this.x,this.y);
    if (this.health < 250) {
      bud(this.x,this.y);
      if (this.health < 100) {
        sprout(this.x,this.y);
        if (this.health < 70) {
          bloom(this.x,this.y);
        }
      }
    }
  }
  this.health--;
  if (this.health <= 0) {
    // Remove seed from kids array
    let index = kids.indexOf(this);
    if (index !== -1) {
      kids.splice(index, 1);
    }
  }
  pop();
  }
}

function seed() {
   push();
    translate(this.x, this.y);
    scale(-0.1);
    fill("peru");
    for (let petalsDrawn = 0; petalsDrawn < 12; petalsDrawn++) {
      rotate(35);
      ellipse(0, 0, random(70, 90), random(120, 180));
    }
    pop();
  }
function bud (x,y) {
    push();
    translate(this.x, this.y);
    scale(0.2);
    fill("darkseagreen");
    for (let petalsDrawn = 0; petalsDrawn < 12; petalsDrawn++) {
      rotate(30);
      rect(0, 0, random(20), random(50, 90));
    }
    fill("palegreen");
    for (let petalsDrawn = 0; petalsDrawn < 12; petalsDrawn++) {
      rotate(40);
      rect(0, 0, random(10, 20), random(30, 80));
    }
    fill("darkolivegreen");
    for (let petalsDrawn = 0; petalsDrawn < 12; petalsDrawn++) {
      rotate(30);
      rect(0, 0, random(15, 30), random(20, 50));
    }
    noStroke();
    fill("ivory");
    for (let petalsDrawn = 0; petalsDrawn < 12; petalsDrawn++) {
      rotate(30);
      rect(0, 0, 2, 60);
    }
    fill("goldenrod");
    for (let ballsDrawn = 0; ballsDrawn < 12; ballsDrawn++) {
      rotate(40);
      ellipse(50, 5, 15, 15);
    }
    fill("goldenrod");
    for (let ballsDrawn = 0; ballsDrawn < 12; ballsDrawn++) {
      rotate(30);
      rect(0, 5, 7, 10);
    }
    fill("mediumseagreen");
    for (let ballsDrawn = 0; ballsDrawn < 12; ballsDrawn++) {
      rotate(30);
      rect(0, 5, 3, 10);
    }
    pop();
  }


function sprout() {
    push();
    translate(this.x, this.y);
    stroke("indigo");
    scale(.09);
    strokeWeight(1);
    fill("teal");
    for (let petalsDrawn = 0; petalsDrawn < 24; petalsDrawn++) {
      rotate(35);
      rect(0, 0, random(50, 90), random(120, 240));
    }
    fill("lightseagreen");
    for (let petalsDrawn = 0; petalsDrawn < 12; petalsDrawn++) {
      rotate(30);
      rect(0, 0, random(40), random(80, 130));
    }
    fill("turquoise");
    for (let petalsDrawn = 0; petalsDrawn < 24; petalsDrawn++) {
      rotate(30);
      rect(0, 0, random(35), random(12, 35));
    }
    noStroke();
    fill("ivory");
    for (let petalsDrawn = 0; petalsDrawn < 12; petalsDrawn++) {
      rotate(30);
      rect(0, 0, 2, 30);
    }
    fill("goldenrod");
    for (let ballsDrawn = 0; ballsDrawn < 12; ballsDrawn++) {
      rotate(40);
      ellipse(30, 5, 15, 15);
    }
    fill("goldenrod");
    for (let ballsDrawn = 0; ballsDrawn < 12; ballsDrawn++) {
      rotate(30);
      rect(0, 5, 7, 10);
    }
    pop();
  }

function bloom(){
    push();
    translate(this.x + 40, this.y);
    stroke("indigo");
    scale(0.1);
    strokeWeight(1);
    fill("mediumvioletred");
    for (let petalsDrawn = 0; petalsDrawn < 24; petalsDrawn++) {
      rotate(35);
      rect(0, 0, random(70, 90), random(120, 240));
    }
    fill("darkmagenta");
    for (let petalsDrawn = 0; petalsDrawn < 12; petalsDrawn++) {
      rotate(30);
      rect(0, 0, random(50, 80), random(130, 210));
    }
    fill("orchid");
    for (let petalsDrawn = 0; petalsDrawn < 12; petalsDrawn++) {
      rotate(30);
      rect(0, 0, random(40), random(80, 130));
    }
    fill("palevioletred");
    for (let petalsDrawn = 0; petalsDrawn < 12; petalsDrawn++) {
      rotate(30);
      rect(0, 0, random(15, 30), random(50, 70));
    }
    fill("pink");
    for (let petalsDrawn = 0; petalsDrawn < 13; petalsDrawn++) {
      rotate(30);
      rect(0, 0, random(15), random(35));
    }
    noStroke();
    fill("ivory");
    for (let petalsDrawn = 0; petalsDrawn < 12; petalsDrawn++) {
      rotate(30);
      rect(0, 0, 2, 60);
    }
    fill("goldenrod");
    for (let ballsDrawn = 0; ballsDrawn < 12; ballsDrawn++) {
      rotate(40);
      ellipse(50, 5, 15, 15);
    }
    fill("goldenrod");
    for (let ballsDrawn = 0; ballsDrawn < 12; ballsDrawn++) {
      rotate(30);
      rect(0, 5, 7, 10);
    }
    pop();
}

class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.addX = addX;
     this.health = startHealth;
  }
  move() {
    
    this.x = this.x + this.addX;
    this.y = this.y;
    // Reverse if it hits a wall.
    let isTooFarLeft = this.x < 0;
    let isTooFarRight = this.x > width;
    if (isTooFarLeft || isTooFarRight) {
      this.addX = -this.addX;
      this.y = random(height);
    }
     this.health--;
  }
  show() {
    push();
    translate(this.x + 40, this.y);
    stroke("indigo");
    scale(0.15);
    strokeWeight(1);
    fill("indigo");
    for (let petalsDrawn = 0; petalsDrawn < 24; petalsDrawn++) {
      rotate(35);
      rect(0, 0, random(70, 90), random(120, 240));
    }
    fill("mediumblue");
    for (let petalsDrawn = 0; petalsDrawn < 12; petalsDrawn++) {
      rotate(30);
      rect(0, 0, random(50, 80), random(130, 210));
    }
    fill("royalblue");
    for (let petalsDrawn = 0; petalsDrawn < 12; petalsDrawn++) {
      rotate(45);
      rect(0, 0, random(20, 50), random(100, 170));
    }
    fill("cornflowerblue");
    for (let petalsDrawn = 0; petalsDrawn < 12; petalsDrawn++) {
      rotate(30);
      rect(0, 0, random(40), random(80, 130));
    }
    fill("paleturquoise");
    for (let petalsDrawn = 0; petalsDrawn < 12; petalsDrawn++) {
      rotate(40);
      rect(0, 0, random(10, 20), random(70, 90));
    }
    fill("slateblue");
    for (let petalsDrawn = 0; petalsDrawn < 12; petalsDrawn++) {
      rotate(30);
      rect(0, 0, random(15, 30), random(50, 70));
    }
    fill("lightskyblue");
    for (let petalsDrawn = 0; petalsDrawn < 13; petalsDrawn++) {
      rotate(30);
      rect(0, 0, random(15), random(35));
    }
    noStroke();
    fill("ivory");
    for (let petalsDrawn = 0; petalsDrawn < 12; petalsDrawn++) {
      rotate(30);
      rect(0, 0, 2, 60);
    }
    fill("goldenrod");
    for (let ballsDrawn = 0; ballsDrawn < 12; ballsDrawn++) {
      rotate(40);
      ellipse(50, 5, 15, 15);
    }
    fill("goldenrod");
    for (let ballsDrawn = 0; ballsDrawn < 12; ballsDrawn++) {
      rotate(30);
      rect(0, 5, 7, 10);
    }
    fill("mediumseagreen");
    for (let ballsDrawn = 0; ballsDrawn < 12; ballsDrawn++) {
      rotate(30);
      rect(0, 5, 3, 10);
    }
    pop();
  }
}

