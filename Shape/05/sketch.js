let activeStrokeCap;
let randomS;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES);
  randomS = 0;
}

function draw() {
  background(220);
  randomSeed(randomS);
  strokeCap(activeStrokeCap);

  const tileCount = 20;
  const tileWidth = width/tileCount;

  const shapeAngle = 0;

  fill(255,50,50);

  for(let i = 0; i < tileCount+1; i++) {
    for(let ii = 0; ii < tileCount+1; ii++) {
      push();
      let xPos = ii*tileWidth;
      let yPos = i*tileWidth;
      translate(xPos, yPos);
      rotate(atan2((mouseY - yPos),(mouseX - xPos))+(shapeAngle * (PI / 180)));
      strokeWeight(5);
      line(-tileWidth/2, tileWidth/2, tileWidth/2, -tileWidth/2);
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
