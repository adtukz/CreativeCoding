'use strict';

var rS = 0;
var cloudCount = 5;

//creating variables to store the colours we are creating
var sunCol;
var cloudCol;
var skyH = 210;
var skyS = 55;
var skyB = 90;

function setup() {
  createCanvas(595,842);
  colorMode(HSB, 360, 100, 100, 100);

  //initializing the colours after we set colorMode
  sunCol = color(37, 57, 99, 100);
  cloudCol = color(198, 4 , 91 , 50);
}

function draw() {
  randomSeed(rS);
  var mX = constrain(mouseX, 0, width);
  var mY = constrain(mouseY, 0, height);

  var sunY = mY;

  //Adding feeedback to the sun growing and then shrinking as the background brightens and darkens
  if(sunY < height/2) {
    var sunR = 200 + sunY/5;
  } else {
    var sunR = 368 - sunY/5;
  }

  if(sunY < height/2) {
    background(skyH, skyS, skyB + (sunY/20) - cloudCount);
  } else {
    background(skyH, skyS, skyB + ((height)/20) - (sunY/20) - cloudCount);
  }
	fill(sunCol);
	ellipse(width/2, sunY, sunR , sunR);

  fill(cloudCol);
  noStroke();
  generateClouds(cloudCount);
}

function generateClouds(cloudC) {
  for(var i = 0; i < cloudC; i++) {
    var cloudChance = random();
    if(cloudChance <= 0.33) {
      cloud1(int(random(0, width)), int(random(0, height)), int(random(3,5)));
    } else if(cloudChance <=0.66) {
      cloud2(int(random(0, width)), int(random(0, height)), int(random(3,5)));
    } else {
      cloud3(int(random(0, width)), int(random(0, height)), int(random(3,5)));
    }
  }

  sunCol = color(25 + int(random(0,10)), 57, 99, 100);
  cloudCol = color(180 , int(random(0,10)), 91 , 60 + cloudC);
}

function mouseReleased() {
  rS = int(random(100));
  cloudCount= int(random(10, 50));
  generateClouds();
}

function keyPressed() {
  //if s is pressed : save the canvas as a png image, with the Y pos of the mouse and the timestamp as the name.
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp() + "_MouseY_" + mouseY + "_RandomSeed_" + rS + "_CloudCount_" + cloudCount, 'png');
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
