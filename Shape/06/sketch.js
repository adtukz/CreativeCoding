let activeStrokeCap;
let randomS;
let shapes;

function preload() {
  shapes = [];
  shapes.push(loadImage('shapes/shape2.svg'));
  console.log(shapes);
}

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  randomS = 0;
  imageMode(CENTER);
}

function draw() {
  clear();

  background(220);
  randomSeed(randomS);
  strokeCap(activeStrokeCap);

  const tileCount = 50;
  const tileWidth = width/tileCount;

  image(shapes[0], 0, 0, 50, 50);

  stroke(30);

  for(let i = 0; i < tileCount+1; i++) {
    for(let ii = 0; ii < tileCount+1; ii++) {
      push();
      let xPos = ii*tileWidth;
      let yPos = i*tileWidth;
      translate(xPos, yPos);
      rotate(atan2((mouseY - yPos),(mouseX - xPos)));
      strokeWeight(2);
      //line(-tileWidth/2, tileWidth/2, tileWidth/2, -tileWidth/2);
      image(shapes[0], 0, 0, 50, 50);
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
