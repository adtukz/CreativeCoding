'use strict';

console.log('Step 1');

var img;

function preload() {
  //Loads a jpg image into a p5 image.
  img = loadImage('../savedImages/pic1.jpg');
}

function setup() {
  createCanvas(600,600);
  //no cursor will appear on the canvas
  noCursor();
  //no stroke will appear on any drawn objects
  noStroke();
  //the draw function will not loop
  noLoop();
}

function draw() {
  //will load the pixels from the image into the pixels array within the image object.
  img.loadPixels();
  //will log to console the first value within the pixels array we just loaded.
  //this will log the R value for the first pixel, from the RGBA properties of each pixel
  console.log(img.pixels[0]);
  //logs to console the entire object of the image we have loaded that p5 has created for us.
  console.log(img);
}