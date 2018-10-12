'use strict';

console.log('Step 4');

var img;
var colors = [];

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
	//The tilecount is now interactive with the users mouse.
	//As the user moves their mouse across the x axis, in a positive direction, the tiles will get bigger and the image will become more "pixelated"
  var tileCount = floor(width/max(mouseX,5));
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
    
  gd.sortColors(colors, sortMode);

 var i = 0;
  for(var gridY = 0; gridY < tileCount; gridY++) {
    for(var gridX = 0; gridX < tileCount; gridX++) {
     fill(colors[i]);
     rect(gridX*rectSize,gridY*rectSize, rectSize,rectSize);
     i++;
    }
  }
}

function keyPressed() {
	//When the user presses c, an ase(Adobe Swatch Exchange) file will be created, allowing the tiles appearing on screen to be imported to photoshop
	if (key == 'c' || key == 'C') writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
	//When the user pesses s, the image on the canvas will be saved
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

	//Here we are allowing the user to switch which image they are seeing, between the 4 options.
  if (key == '1') img = loadImage('../savedImages/pic1.jpg');
  if (key == '2') img = loadImage('../savedImages/pic2.jpg');
  if (key == '3') img = loadImage('../savedImages/pic3.jpg');
  if (key == '4') img = loadImage('../savedImages/pic4.jpg');
	
  if (key == '5') sortMode = null;
  if (key == '6') sortMode = gd.HUE;
  if (key == '7') sortMode = gd.SATURATION;
  if (key == '8') sortMode = gd.BRIGHTNESS;
  if (key == '9') sortMode = gd.GRAYSCALE;
}
