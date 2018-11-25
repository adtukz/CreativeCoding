'use strict';

//creating a seed for the randomness
var rS = 0;

// the amount of clouds appearing on screen
var cloudCount = 20;

function setup() {
  createCanvas(595,842);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  randomSeed(rS);
  var mX = constrain(mouseX, 0, width);
  var mY = constrain(mouseY, 0, height);

  var sunR = 150;
  var sunY = mY;
  if(sunY < height/2) {
    background(210, 55, 80 + (sunY/20) - int((cloudCount / 2)));
  } else {
    background(210, 55, 80 + ((height)/20) - (sunY/20) - int((cloudCount/2)));
  }
	fill(37, 57, 99);
	ellipse(width/2, sunY, sunR , sunR);

  fill(198, 4 ,91 , 50);
  noStroke();
  //we pass the number of clouds we want to draw into the function
  generateClouds(cloudCount);
}

//function to draw the clouds
function generateClouds(cloudC) {
  //loop to create as many clouds as cloudCount specifies.
  for(var i = 0; i <= cloudC; i++) {
    //cloudChance is using the random function to have an equal chance of creating any of the cloud styles we have created
    var cloudChance = random();
    if(cloudChance <= 0.33) {
      //cloud1(startX,startY,size)
      cloud1(int(random(0, width)), int(random(0, height)), int(random(2,5)));
    } else if(cloudChance <=0.66) {
      cloud2(int(random(0, width)), int(random(0, height)), int(random(2,5)));
    } else {
      cloud3(int(random(0, width)), int(random(0, height)), int(random(2,5)));
    }
  }
}

function keyPressed() {
  //if s is pressed : save the canvas as a png image, with the Y pos of the mouse and the timestamp as the name.
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp() + "_MouseY" + mouseY + "_RandomSeed" + rS, 'png');
}

function cloud1 (startX, startY, size) {
  bezier(startX - (20 / size), startY + (10 / size), startX , startY + (200 / size), startX + (60 / size), startY + (70 / size), startX + (60 / size), startY + (60 / size));
  bezier(startX + (60 / size), startY + (60 / size), startX + (90 / size), startY + (120 / size), startX + (150 / size), startY + (150 / size), startX + (200 / size), startY + (70 / size));
  bezier(startX + (200 / size), startY + (70 / size), startX + (320 / size), startY + (40 / size), startX + (300 / size), startY + (20 / size), startX + (250 / size), startY - (20 / size));
  bezier(startX + (250 / size), startY - (20 / size), startX + (280 / size), startY - (100 / size), startX + (240 / size), startY - (80 / size), startX + (200 / size), startY - (60 / size));
  bezier(startX + (200 / size), startY - (60 / size), startX + (150 / size), startY - (100 / size), startX + (80 / size), startY - (120 / size) , startX + (40 / size), startY - (60 / size));
  bezier(startX + (40 / size), startY - (60 / size), startX, startY - (100 / size), startX - (80 / size), startY - (120 / size), startX - (20 / size), startY - (60 / size));
  bezier(startX - (20 / size), startY - (60 / size), startX - (80 / size), startY - (20 / size), startX - (80 / size), startY - (20 / size), startX - (20 / size), startY + (10 / size));
  beginShape();
   vertex(startX - (20 / size), startY + (10 / size));
   vertex(startX + (60 / size), startY + (60 / size));
   vertex(startX + (200 / size), startY + (70 / size));
   vertex(startX + (250 / size), startY - (20 / size));
   vertex(startX + (200 / size), startY - (60 / size));
   vertex(startX + (40 / size), startY - (60 / size));
   vertex(startX - (20 / size), startY - (60 / size));
  endShape();
}
function cloud2 (startX, startY, size) {
  bezier(startX - (40 / size), startY + (10 / size), startX - (20 / size), startY + (180 / size), startX + (60 / size), startY + (70 / size), startX + (100 / size), startY + (100 / size));
  bezier(startX + (100 / size), startY + (100 / size), startX + (150 / size), startY + (120 / size), startX + (150 / size), startY + (150 / size), startX + (280 / size), startY + (70 / size));
  bezier(startX + (280 / size), startY + (70 / size), startX + (320 / size), startY + (40 / size), startX + (300 / size), startY + (20 / size), startX + (280 / size), startY - (40 / size));
  bezier(startX + (280 / size), startY - (40 / size), startX + (280 / size), startY - (100 / size), startX + (240 / size), startY - (80 / size), startX + (200 / size), startY - (60 / size));
  bezier(startX + (200 / size), startY - (60 / size), startX + (140 / size), startY - (100 / size), startX + (70 / size), startY - (80/ size), startX + (30 / size), startY - (75 / size));
  bezier(startX + (30 / size), startY - (75 / size), startX, startY - (100 / size), startX - (40 / size), startY - (20 / size), startX - (40 / size), startY + (10 / size));
  beginShape();
    vertex(startX - (40 / size), startY + (10 / size));
    vertex(startX + (100 / size), startY + (100 / size));
    vertex(startX + (280 / size), startY + (70 / size));
    vertex(startX + (280 / size), startY - (40 / size));
    vertex(startX + (200 / size), startY - (60 / size));
    vertex(startX + (30 / size), startY - (75 / size));
  endShape();
}
function cloud3 (startX, startY, size) {
  bezier(startX - (80 / size), startY + (60 / size), startX - (20 / size), startY + (180 / size), startX + (60 / size), startY + (70 / size), startX + (60 / size), startY + (80 / size));
  bezier(startX + (60 / size), startY + (80 / size), startX + (120 / size), startY + (180 / size), startX + (180 / size), startY + (150 / size), startX + (240 / size), startY + (70 / size));
  bezier(startX + (240 / size), startY + (70 / size), startX + (320 / size), startY + (40 / size), startX + (300 / size), startY + (20 / size), startX + (280 / size), startY - (40 / size));
  bezier(startX + (280 / size), startY - (40 / size), startX + (240 / size), startY - (120 / size), startX + (160 / size), startY - (120 / size), startX + (120 / size), startY - (60 / size));
  bezier(startX + (120 / size), startY - (60 / size), startX + (80 / size), startY - (100 / size), startX + (70 / size), startY - (120 / size), startX + (30 / size), startY - (80 / size));
  bezier(startX + (30 / size), startY - (80 / size), startX - (20 / size), startY - (100 / size), startX - (40 / size), startY - (80 / size), startX - (40 / size), startY - (20 / size));
  bezier(startX - (40 / size), startY - (20 / size), startX - (60 / size), startY - (20 / size), startX - (100 / size), startY, startX - (80 / size), startY + (60 / size));
  beginShape();
    vertex(startX - (80 / size), startY + (60 / size));
    vertex(startX + (60 / size), startY + (80 / size));
    vertex(startX + (240 / size), startY + (70 / size));
    vertex(startX + (280 / size), startY - (40 / size));
    vertex(startX + (120 / size), startY - (60 / size));
    vertex(startX + (30 / size), startY - (80 / size));
    vertex(startX - (40 / size), startY - (20 / size));
  endShape();
}
