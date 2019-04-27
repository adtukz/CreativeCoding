function setup() {
  createCanvas(550, 550);
  strokeCap(ROUND);
}

function draw() {
  background(223, 230, 233);
  translate(width / 2, height / 2);

  var circleLines = int(map(mouseY, 0, height, 2, 80));
  var radius = mouseX - width / 2;
  var angle = TAU / circleLines;

  stroke(45, 52, 54);
  strokeWeight(mouseY / 20);

  for (var i = 0; i <= circleLines; i++) {
    var x = cos(angle * i) * radius;
    var y = sin(angle * i) * radius;
    line(0, 0, x, y);
  }
}

function keyPressed() {
    if(key=='s' || key=='S') saveCanvas(gd.timestamp() + '_MouseX:' + mouseX + '_MouseY:' + mouseY,'png');
}
