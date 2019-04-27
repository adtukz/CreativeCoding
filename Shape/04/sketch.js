let activeStrokeCap;
let randomS;

function setup() {
  //make canvas the size of the screen
  createCanvas(window.innerWidth, window.innerHeight);
  //use degrees instead of radians
  angleMode(DEGREES);
  //randomseed = 0
  randomS = 0;
}

function draw() {
  //setting background randomseed and strokecap
  background(220);
  randomSeed(randomS);
  strokeCap(activeStrokeCap);

  //we want 50 tiles
  const tileCount = 50;
  //each tiles width is the width divided by the amount of tiles
  const tileWidth = width/tileCount;

  //angle is 0
  const shapeAngle = 0;

  //look through y then x axis to draw each line
  for(let i = 0; i < tileCount+1; i++) {
    for(let ii = 0; ii < tileCount+1; ii++) {
      push();
      let xPos = ii*tileWidth;
      let yPos = i*tileWidth;
      //pos is top left of each tile, ecah line is either drawn from top left to bottom right or bottom left to top right
      translate(xPos, yPos);
      //rand1 decides if the line is thick or thin
      let rand1 = Math.floor(random(0,2));
      //rand2 decides if the line is draw from bottom left to top right or top left to bottom right
      let rand2 = Math.floor(random(0,2));
      if(rand1 === 0) {
        stroke(20);
        strokeWeight(5);
      } else {
        stroke(10);
        strokeWeight(8);
      }
      if(rand2 === 0) {
        line(-tileWidth/2, tileWidth/2, tileWidth/2, -tileWidth/2);
      } else {
        line(-tileWidth/2, -tileWidth/2, tileWidth/2, tileWidth/2);
      }
      pop();
    }
  }
}

function mousePressed() {
    randomS = random(1000);
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') activeStrokeCap = ROUND;
  if (key == '2') activeStrokeCap = SQUARE;
  if (key == '3') activeStrokeCap = PROJECT;
}
