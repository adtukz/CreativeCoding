'use strict';

function setup() {
  //canvas with a4  sized proportions
  createCanvas(595,842);
  //colourMode is hue/saturation/brightness
  colorMode(HSB, 360, 100, 100, 100);
  //nostroke to be drawn around the sun.
  noStroke();
}

function draw() {
  //constrain the mouse to the canvas.
  var mX = constrain(mouseX, 0, width);
  var mY = constrain(mouseY, 0, height);

  //the suns position is based on user's mouse position.
  var sunY = floor(mY);

  //Keep updating background colour for when the sun moves.
  if(sunY < height/2) {
    //while the mouse is in the top half of the canvas the background gets brighter
    background(210, 55, 60 + (sunY/20));
  } else {
    //while the mouse is in the bottom half of the canvas, the background begins to dim back to the original colour when mouse is 0
    background(210, 55, 60 + ((height)/20) - (sunY/20));
  }

  //The sun's fill is yellow.
	fill("#fdcb6e");
  //the sun's position is based on the y position of the mouse above.
	ellipse(width/2, sunY, 150, 150);
}

function keyPressed() {
  //if s is pressed : save the canvas as a png image, with the Y pos of the mouse and the timestamp as the name.
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp() + "_MouseY:" + mouseY, 'png');
}
