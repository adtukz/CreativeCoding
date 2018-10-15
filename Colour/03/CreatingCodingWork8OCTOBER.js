// P_1_2_2_01
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * extract and sort the color palette of an image
 *
 * MOUSE
 * position x          : resolution
 *
 * KEYS
 * 1-4                 : load different images
 * 5                   : no color sorting
 * 6                   : sort colors on hue
 * 7                   : sort colors on saturation
 * 8                   : sort colors on brightness
 * 9                   : sort colors on greyscale (luminance)
 * s                   : save png
 * c                   : save color palette
 */

 //Strict so that any js errors will be caught, not allowed small typos.
'use strict';

//set a var img, array colors and a var sortMode to null
var img;
var colors = [];
var sortMode = null;

//preload the image, so that it is ready to use.
function preload() {
  img = loadImage('data/pic1.jpg');
}

//setup a canvas 600 x 600, cursor to not show, no stroke on draw entities.
function setup() {
  createCanvas(600, 600);
  noCursor();
  noStroke();
}

//draw function
function draw() {
  //tile count is the floored, so if mouse x is equal to decimal it will be rounded to a lower number.
  //the width of the canvas divided by 
  //the higher number of 5, or whatever mouse x is equal to. This will create a pixelated effect from the very begininning
  var tileCount = floor(width / max(mouseX, 5));
  //rectsize is the width of the canvas divided by the amount of pixels("tiles"), we want the use to see.
  var rectSize = width / tileCount;

  //loads the image into a pixel array so that we can later target each individual pixel and find out which colour it is.
  img.loadPixels();
  //colours array is still empty.(so we can target it in draw?)
  colors = [];

  //for loop to create each of the colors for the "pixels"(tiles), we want to show the user.
  //for in the y direction going down the canvas.
  for (var gridY = 0; gridY < tileCount; gridY++) {
    //for the in x going across the canvas
    for (var gridX = 0; gridX < tileCount; gridX++) {
      //int floors the variable into an integer.
      //point x is gridX multiplied by the rectSize.
      //gridX is 0 to tileCount.

      //if the canvas is 600,600 and the mouse is at position 20
      //tileCount = floor(600/20) => 30
      //gridX will show 30 tiles across
      //rectSize will be 600/30 = 20
      //var px = int(0 to 30 * 20)

      //each colour we will grab will be 20 pixels away from each other
      //the same in the y direction, this will only change if the canvas is not a square. Which will require a further level of math, where there would be a tileCountX and tileCountY\
      //where tileCountX would be var tileCount = floor(width / max(mouseX, 5));
      //and tileCountY would be tileCount = floor(height / max(mouseY, 5));

      var px = int(gridX * rectSize);
      var py = int(gridY * rectSize);

      //var i is to get the value of each pixel in the pixel array
      //we do this with the sum below.
      //Using RGBA
      //Where 0 would be R, +1 would be G, +2 would be B and +3 would be the Alpha(A)
      var i = (py * img.width + px) * 4;

      //var c retrieve the colour by going to the pixel array and retrieving the RGBA value for the pixel at the position of py.
      //so in a 600,600 canvas, and the mouse at position 20, there will be 30 tiles, it will retrieve the RGBA values
      //for the 30 pixels within the loop.
      //it creates a colour using the p5.js function color(). which requires the RGBA to create a colour

      //so it doesnt compare any pixels against each other it just jumps through the image getting the RGBA value
      //skipping pixels and only retrieving the values of each 30th pixel.
      var c = color(img.pixels[i], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3]);
      //the colours array is populated by the var c we have created above, in my example this will create 30 colours for each row of 30 pixels(Tiles)
      colors.push(c);
    }
  }

  //Here we can use the generative-design library to sort the color objects we have created above using the color() function
  //This is so we can see how all the pixels create the image by seeing them in order.
  gd.sortColors(colors, sortMode);

  //here we are using a for loop to create the pixels(tiles) for the image.
  //var i is going to count how many pixels we create, so we can choose the colour starting at 0 in the colour array.
  var i = 0;
  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      //fill colors[i], will grab the colour i in the colours array, and set fill to equal this, filling the tile we are about to create.
      fill(colors[i]);

      //the rect(pixel(tile)), we create will be rect(x,y,sizeX,sizeY);
      //if canvas is 600,600 and mouseX is at 20
      //x = (gridX * rectSize) => (0 to 30 * 20)
      //y = (gridY * rectSize) => (0 to 30 * 20)
      //sizeX = rectSize = 20
      //sizeY = rectSize = 20

      //so each pixel we create will be 20x20 pixels, and the tile will be filled by the colour of the first pixel so the 1x1 pixel will now become a 20x20 tile.
      //and the next tile will take its first pixel 1x1 and make it 20x20 creating this pixelized image we can see in the example.
      rect(gridX * rectSize, gridY * rectSize, rectSize, rectSize);
      //i++ to get the next colour in the arry
      i++;
    }
  }
}

//if the user presses a key we can have functions execute
function keyReleased() {
  //if the user press C, we will create a Adobe Swatch Exchange(.ase) file of the pixels we can see.
  //the file will be named the timestamp.ase
  if (key == 'c' || key == 'C') writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  //if the user presses s we will save the canvas as a .png named as the timestamp.png
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  //if the user press 1,2,3 or 4, we will load in image 1,2,3 or 4.
  if (key == '1') img = loadImage('data/pic1.jpg');
  if (key == '2') img = loadImage('data/pic2.jpg');
  if (key == '3') img = loadImage('data/pic3.jpg');
  if (key == '4') img = loadImage('data/pic4.jpg');

  //if the user presses 5 we will see the image as it is meant to be seen as default.
  if (key == '5') sortMode = null;
  //if 6 is pressed we will sort the pixels by hue
  if (key == '6') sortMode = gd.HUE;
  //if 7 is pressed we will sort the pixels by saturation
  if (key == '7') sortMode = gd.SATURATION;
  //if 8 is pressed we will sort the pixels by brightness
  if (key == '8') sortMode = gd.BRIGHTNESS;
  //if 9 is pressed we will sort the pixels by greyscale
  if (key == '9') sortMode = gd.GRAYSCALE;
}