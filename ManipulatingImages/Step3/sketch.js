'use strict';

console.log('Step 3');

var img;
var colors = [];

//sortMode will be used later, in order to sort the tiles we are creating, by hue,saturation etc
var sortMode = null;

function preload() {
  img = loadImage('../savedImages/pic1.jpg');
}

function setup() {
  createCanvas(600,600);
  noCursor();
  noStroke();
}

function draw() {
  img.loadPixels();
  var tileCount = 20;
  var rectSize = width/tileCount;
  colors = [];
  for(var gridY = 0; gridY < tileCount; gridY++) {
    for(var gridX = 0; gridX < tileCount; gridX++) {
      var px = int(gridX * rectSize);
      var py = int(gridY * rectSize);

      var i = (py * img.width + px) * 4;

      var c = color(img.pixels[i], img.pixels[i+1], img.pixels[i+2], img.pixels[i+3]);
      colors.push(c);
    }
  }
    
	//this is where the sortMode variable will change the sorting of the tiles we have created, if it is left as null, it won't effect the order.
  gd.sortColors(colors, sortMode);

	//here we are creating a loop to draw the tiles on the screen, above we just had the color array being populated.
	//i will be used to retrieve the color object from the color array, tracking how many tiles we have made
  var i = 0;
  for(var gridY = 0; gridY < tileCount; gridY++) {
    for(var gridX = 0; gridX < tileCount; gridX++) {
			//the fill of each tile will be the color array, index of i
      fill(colors[i]);
			//the rect will be gridX, times the size of each rectangle so each time one rect is drawn we jump its width to the next, same with gridY.
			//This will make sure that the rects are evenly spaced and sized.
      rect(gridX*rectSize,gridY*rectSize, rectSize,rectSize);
			//after each rect is drawn we increase i by 1 so that we move to the next colour in the color array
      i++;
    }
  }
}

//keyPressed function allows the user to control the  tiles. We are allowing them to sort the tiles by Hue, Saturation, Brightnes, Greyscale, or keep it null which will show the tiles in the order they are drawn in by default.
function keyPressed() {
  if (key == '5') sortMode = null;
  if (key == '6') sortMode = gd.HUE;
  if (key == '7') sortMode = gd.SATURATION;
  if (key == '8') sortMode = gd.BRIGHTNESS;
  if (key == '9') sortMode = gd.GRAYSCALE;
}
