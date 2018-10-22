'use strict';

//we are now using these to create the max amount of columns and rows.
var tileCountX = 50;
var tileCountY = 10;

var hueValues = [];
var saturationValues = [];
var brightnessValues = [];

function setup() {
  //create a canvas that is the size of the users window
  createCanvas(windowWidth, windowHeight);
  //set colorMode to hsb(alpha)
  colorMode(HSB, 360, 100, 100, 100);
  //no stroke on drawn rectangles
  noStroke();

  for (var i = 0; i < tileCountX; i++) {
    hueValues[i] = floor(random(360));
    saturationValues[i] = floor(random(100));
    brightnessValues[i] = floor(random(100));
  }
}

function draw() {
  //White background if it is shown
  background(0, 0, 100);

  //prevent the users mouse values from leaving the canvas.
  //this prevents bugs from appearing
  var mX = constrain(mouseX, 0, width);
  var mY = constrain(mouseY, 0, height);

  //counter will tell us which tile we are currently drawing
  var counter = 0;

  //using map, we are maping mouseX to be from 1 to 50 for our columns.
  //so we can have from 1 to 50 rows depending how far across the canvas we move
  var currentTileCountX = int(map(mX, 0, width, 1, tileCountX));
  //same as above for y axis, makes the sketch look nicer.
  var currentTileCountY = int(map(mY, 0, height, 1, tileCountY));
  //tile width, similar to previous examples is the width divided by number of tiles we wanted
  var tileWidth = width / currentTileCountX;
  //tile hight, same as above except height divided by number of rows we want.
  var tileHeight = height / currentTileCountY;

  //loop to create our tiles
  for (var gridY = 0; gridY < tileCountY; gridY++) {
    for (var gridX = 0; gridX < tileCountX; gridX++) {
      //position x is tileWidth times which tile in the row we want to draw
      //as the tiles are to fill the screen
      var posX = tileWidth * gridX;
      //position y is tileHeight times which row we want to draw
      var posY = tileHeight * gridY;
      //index is modular of what tile we are currently on.
      //this allows us to create a pattern, as each row will have same colour shifted over a few tiles
      var index = counter % currentTileCountX;

      //fill is taken from the arrays we created for the colours
      fill(hueValues[index], saturationValues[index], brightnessValues[index]);
      //draw the rectangle at position x, position y and give it its width and height
      rect(posX, posY, tileWidth, tileHeight);
      //increase counter so the colour of the next tile will change
      counter++;
    }
  }
}
