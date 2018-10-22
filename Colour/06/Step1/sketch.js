'use strict';

//how many colums we want
var tileCountX = 50;
//how many rows we want
var tileCountY = 10;

//an array for hue, saturation and brightness we want to use in our tiles
var hueValues = [];
var saturationValues = [];
var brightnessValues = [];

function setup() {
  //loop to create random colours for the amount of x tiles we want.
  //each row will use the same colours, just in a different order, as the last row
  for (var i = 0; i < tileCountX; i++) {
    hueValues[i] = floor(random(360));
    saturationValues[i] = floor(random(100));
    brightnessValues[i] = floor(random(100));
  }
  //log the values to check it works
  console.log(hueValues);
  console.log(saturationValues);
  console.log(brightnessValues);
}
