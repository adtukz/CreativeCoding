'use strict';

console.log('Step 2');

var img;
var colors = [];

function preload() {
  img = loadImage('../savedImages/pic1.jpg');
}

function setup() {
  createCanvas(600,600);
  noCursor();
  noStroke();
  noLoop();
}

function draw() {
  img.loadPixels();
  //How many tiles we want to show on the screen
  var tileCount = 9;
  //How big each tile should be
  var rectSize = width/tileCount;
  //refresh our colours array, so when it loops it clears the array each time (we arent looping now, but we will)
  colors= [];
  //for loop to create the tiles in the x and y directions
  for(var gridY = 0; gridY < tileCount; gridY++) {
    for(var gridX = 0; gridX < tileCount; gridX++) {
      //the pixel where will we get the RGBA values, X and Y co-ordinates
      var px = int(gridX * rectSize);
      var py = int(gridY * rectSize);

      //the index of the R value of the pixel we are locating
      var i = (py * img.width + px) * 4;

      //creating a color object by giving it the pixels RGBA values
      var c = color(img.pixels[i], img.pixels[i+1], img.pixels[i+2], img.pixels[i+3]);
      //push the color we just made into the array
      colors.push(c);
    }
  }
  //log the colors array to console.
  console.log(colors);
}
