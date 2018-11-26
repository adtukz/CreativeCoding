'use strict';

var rS = 0;
var cloudCount = 30;

//Creating variables so we can control the sun with the mouse, or have it run through a day cycle by default
var sunY = 0;
var sunCycle = false;

//colour state for when we save the document
var colourState = "Default";

//creating colour variables, so we can change colour of any of the elements and save and export the colours a .ase
var skyH = 210, skyS = 55, skyB = 90;
var sunH = 37, sunS = 57, sunB = 99;
var cloudH = 198, cloudS = 4, cloudB = 91;

function setup() {
  createCanvas(480, 680);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  randomSeed(rS);
  var mY = constrain(mouseY, 0, height);

  //daylight cycle, the sun's y pos is incrementally increased if the user does not want mouse movement
  if(sunCycle === false) {
    sunY = mY;
  } else {
    sunY += 5;
  }

  //if the sun is trying to move off the screen it won't.
  if(sunY > height) {
    sunY = height;
  }

  //we have changed this slightly, so the sun is proportionate to the screensize.
  if(sunY < height/2) {
    var sunR = height/9 + sunY/3;
  } else {
    var sunR = height/9 + height/3 - sunY/3;
  }

  if(sunY < height/2) {
    background(skyH, skyS, skyB + (sunY/20) - cloudCount);
  } else {
    background(skyH, skyS, skyB + ((height)/20) - (sunY/20) - cloudCount);
  }

  //updated to reflect colour variables
	fill(sunH, sunS, sunB);
	ellipse(width/2, sunY, sunR , sunR);

  //updated to reflect colour variables
  fill(cloudH, cloudS, cloudB, 65 + cloudCount/2);
  noStroke();

  generateClouds(cloudCount);
}

function generateClouds(cloudC) {
  for(var i = 0; i < cloudC; i++) {
    var cloudChance = random();
    if(cloudChance <= 0.33) {
      cloud1(int(random(0, width)), int(random(0, height)), int(random(3,5)), int(random(2,10)));
    } else if(cloudChance <=0.66) {
      cloud2(int(random(0, width)), int(random(0, height)), int(random(3,5)), int(random(2,10)));
    } else{
      cloud3(int(random(0, width)), int(random(0, height)), int(random(3,5)), int(random(2,10)));
    }
  }
}

function mouseReleased() {
  rS = int(random(10000));
  //there is now a 10% chance that there will be no clouds at all.
  if (random() <= 0.90) {
    cloudCount= int(random(10, 50));
  } else {
    cloudCount = 0;
  }
  generateClouds();
}

function keyPressed() {
  //save now includes the colour state, and displays the sun's y position instead of mouse y.
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp() + "_ColourState_" + colourState + "_SunY_" + sunY + "_RandomSeed_" + rS + "_CloudCount_" + cloudCount, 'png');
  //creating an adobe swatch file out of the colours the user can currently see.
  if (key == 'c' || key == 'C') {
      var colors = [];
      colors.push(color(skyH, skyS, skyB));
      colors.push(color(sunH, sunS, sunB));
      colors.push(color(cloudH, cloudS, cloudB));
      writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  }
  //if the user presses m the sun will move in a daylight cycle
  if (keyCode === UP_ARROW) {
    if(cloudCount <= 50) {
      cloudCount++;
    }
  }
  //if the user presses m the sun will move in a daylight cycle
  if (keyCode === DOWN_ARROW) {
    cloudCount--;
  }
  //if the user presses m the sun will move in a daylight cycle
  if (key == 'm' || key == 'M') {
    sunCycle = true;
  }
  //if the user presses n the sun will go back to following the mouse
  if (key == 'n' || key == 'N') {
    sunCycle = false;
  }
  //if the user presses r the sun will return to the top, used with the cycles to reset the sun
  if (key == 'r' || key == 'R') {
    sunY = 0;
  }
  //default colour theme
  if (key == '1') {
    skyH = 210, skyS = 55, skyB = 90;
    sunH = 37, sunS = 57, sunB = 99;
    cloudH = 198, cloudS = 4, cloudB = 91;
    rS = int(random(10000));
    colourState = "Default";
  }
  //complementary colour theme
  if (key == '2') {
    skyH = 210, skyS = 55, skyB = 90;
    sunH = 38, sunS = 55, sunB = 90;
    cloudH = 38, cloudS = 75, cloudB = 60;
    rS = int(random(10000));
    colourState = "Complementary";
  }
  //analogue colour theme
  if (key == '3') {
    skyH = 210, skyS = 55, skyB = 90;
    sunH = 242, sunS = 60, sunB = 95;
    cloudH = 178, cloudS = 60, cloudB = 95;
    rS = int(random(10000));
    colourState = "Analogue";
  }
  //triad colour theme
  if (key == '4') {
    skyH = 210, skyS = 55, skyB = 90;
    sunH = 4, sunS = 45, sunB = 92;
    cloudH = 66, cloudS = 65, cloudB = 70;
    rS = int(random(10000));
    colourState = "Triad";
  }
  //compound colour theme
  if (key == '5') {
    skyH = 210, skyS = 55, skyB = 90;
    sunH = 30, sunS = 30, sunB = 91;
    cloudH = 242, cloudS = 15, cloudB = 50;
    rS = int(random(10000));
    colourState = "Compound";
  }
  //shades colour theme
  if (key == '6') {
    skyH = 210, skyS = 55, skyB = 75;
    sunH = 210, sunS = 55, sunB = 100;
    cloudH = 210, cloudS = 55, cloudB = 50;
    rS = int(random(10000));
    colourState = "Shades";
  }
  //if we randomize hue
  if (key == '7') {
    sunH = random(360), sunS = 100, sunB = 100;
    skyH = random(360), skyS = 100, skyB = 100;
    cloudH = random(360), cloudS = 100, cloudB = 100;
    rS = int(random(10000));
    colourState = "RandomHue";
  }
  //if we randomize saturation
  if (key == '8') {
    sunH = 195, sunS = random(100), sunB = 100;
    skyH = 195, skyS = random(100), skyB = 100;
    cloudH = 195, cloudS = random(100), cloudB = 100;
    rS = int(random(10000));
    colourState = "RandomSaturation";
  }
  //if we randomize brightness
  if (key == '9') {
    sunH = 195, sunS = 100, sunB = random(100);
    skyH = 195, skyS = 100, skyB = random(100);
    cloudH = 195, cloudS = 100, cloudB = random(100);
    rS = int(random(10000));
    colourState = "RandomBrightness";
  }
  //if we randomize everything
  if (key == '0') {
    sunH = random(360), sunS = random(100), sunB = random(100);
    skyH = random(360), skyS = random(100), skyB = random(100);
    cloudH = random(360), cloudS = random(100), cloudB = random(100);
    rS = int(random(10000));
    colourState = "RandomEverything";
  }
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
