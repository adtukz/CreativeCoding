'use strict';

var tileCountX = 50;
var tileCountY = 10;

var hueValues = [];
var saturationValues = [];
var brightnessValues = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

  for (var i = 0; i < tileCountX; i++) {
    hueValues[i] = random(360);
    saturationValues[i] = random(100);
    brightnessValues[i] = random(100);
  }
}

function draw() {
  background(0, 0, 100);

  var mX = constrain(mouseX, 0, width);
  var mY = constrain(mouseY, 0, height);

  var counter = 0;

  var currentTileCountX = int(map(mX, 0, width, 1, tileCountX));
  var currentTileCountY = int(map(mY, 0, height, 1, tileCountY));
  var tileWidth = width / currentTileCountX;
  var tileHeight = height / currentTileCountY;

  for (var gridY = 0; gridY < tileCountY; gridY++) {
    for (var gridX = 0; gridX < tileCountX; gridX++) {
      var posX = tileWidth * gridX;
      var posY = tileHeight * gridY;
      var index = counter % currentTileCountX;

      fill(hueValues[index], saturationValues[index], brightnessValues[index]);
      rect(posX, posY, tileWidth, tileHeight);
      counter++;
    }
  }
}

//If a key is pressed.
function keyPressed() {
  //if s is pressed : save the canvas as a png image, with the timestamp as the name.
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  //if c is pressed : create an Adobe Swatch Exchange file from the colours on screen
  if (key == 'c' || key == 'C') {
    var colors = [];
    for (var i = 0; i < hueValues.length; i++) {
      colors.push(color(hueValues[i], saturationValues[i], brightnessValues[i]));
    }
    writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  }

  //if 1 is pressed : create new random colours
  if (key == '1') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = floor(random(360));
      saturationValues[i] = floor(random(100));
      brightnessValues[i] = floor(random(100));
    }
  }

  //if 2 is pressed : create new random colours, where the brightness of them all is 100
  if (key == '2') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = floor(random(360));
      saturationValues[i] = floor(random(100));
      brightnessValues[i] = 100;
    }
  }

  //if 3 is pressed : create new random colours where the saturation of them all is 100
  if (key == '3') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = floor(random(360));
      saturationValues[i] = 100;
      brightnessValues[i] = floor(random(100));
    }
  }

  //if 4 is pressed : create new random colours where the hue and saturation are 0
  if (key == '4') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = 0;
      saturationValues[i] = 0;
      brightnessValues[i] = floor(random(100));
    }
  }

  //if 5 is pressed : create new random colours where the hue is 195, saturation is 100
  if (key == '5') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = 195;
      saturationValues[i] = 100;
      brightnessValues[i] = floor(random(100));
    }
  }

  //if 6 is pressed : create new random colours where hue is 195, brightness is 100
  if (key == '6') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = 195;
      saturationValues[i] = floor(random(100));
      brightnessValues[i] = 100;
    }
  }

  //if 7 is pressed : create new random colours where hue is between 0 and 180, saturation between 80 and 100, and brightness is betwee 50 and 90
  if (key == '7') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = floor(random(180));
      saturationValues[i] = floor(random(80, 100));
      brightnessValues[i] = floor(random(50, 90));
    }
  }

  //if 8 is pressed : create new random colours where hue is between 180 and 360, saturation is 80 to 100 and brightness is 50 to 90
  if (key == '8') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = floor(random(180, 360));
      saturationValues[i] = floor(random(80, 100));
      brightnessValues[i] = floor(random(50, 90));
    }
  }

  //if 9 is pressed : create new random colours where each second colour is very similar
  if (key == '9') {
    for (var i = 0; i < tileCountX; i++) {
      if (i % 2 == 0) {
        hueValues[i] = floor(random(360));
        saturationValues[i] = 100;
        brightnessValues[i] = floor(random(100));
      } else {
        hueValues[i] = 195;
        saturationValues[i] = floor(random(100));
        brightnessValues[i] = 100;
      }
    }
  }

  //if 0 is pressed : create new random colours where they are a lot less random as the hue is set for all colours, it changes back every other tile
  if (key == '0') {
    for (var i = 0; i < tileCountX; i++) {
      if (i % 2 == 0) {
        hueValues[i] = 140;
        saturationValues[i] = floor(random(30, 100));
        brightnessValues[i] = floor(random(40, 100));
      } else {
        hueValues[i] = 210;
        saturationValues[i] = floor(random(40, 100));
        brightnessValues[i] = floor(random(50, 100));
      }
    }
  }

}
