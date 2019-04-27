var tileCount = 10;

var tileWidth;
var tileHeight;
var lineSize = 50;
var shapeAngle = 0;
var maxDist;

var sizeMode = 0;

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
  tileWidth = width / tileCount;
  tileHeight = height / tileCount;
}

function draw() {
  clear();

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {

      var posX = tileWidth * gridX + tileWidth / 2;
      var posY = tileHeight * gridY + tileWidth / 2;

      // calculate angle between mouse position and actual position of the shape
      var angle = atan2(mouseY - posY, mouseX - posX) + (shapeAngle * (PI / 180));

      push();
      translate(posX, posY);
      rotate(angle);
      strokeWeight(5);
      stroke(0);
      line(0, 0, lineSize, lineSize);
      pop();
    }
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
