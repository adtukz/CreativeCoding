function setup() {
  createCanvas(720, 720);
  noFill();
  background(255);
  strokeWeight(4);
  stroke(0, 25);
}

function draw() {
  //when the user clicks we want to draw a shape on the canvas
  if (mouseIsPressed && mouseButton == LEFT) {
    //start a shape
    push();
    //move to the center of the canvas
    translate(width / 2, height / 2);

    //based on the mouse's y position we have between 2 and 10 points
    var shapePoints = int(map(mouseY + 100, 0, height, 2, 10));
    //the radius of the shape is mouse's x position minus half the canvas
    var radius = mouseX - width / 2;
    //the angle is two_pi divided by the amount of points
    var angle = TAU / shapePoints;

    //shape begings
    beginShape();
    //for each point of the shape we want a vertex
    //the x and y of the vertex are based on the cos and sin angle times the point being drawn.
    for (var i = 0; i <= shapePoints; i++) {
      var x = cos(angle * i) * radius;
      var y = sin(angle * i) * radius;
      vertex(x, y);
    }
    endShape();

    pop();
  }
}

function keyPressed() {
    //If key is pressed save the canvas as an image with timestamp and x + y pos.
    if(key=='s' || key=='S') saveCanvas(gd.timestamp() + '_MouseX:' + mouseX + '_MouseY:' + mouseY,'png');
}
