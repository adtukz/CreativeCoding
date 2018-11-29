'use strict';

//
var font = 'Open Sans';
var word = 'DESIGN GENERATIVE ';
var sWord = 'GENERATIVE DESIGN ';
var rAngle = 0;

var rS = 0;

var sunY = 0;
var sunCycle = false;
var pauseSun = false;

var colourState = "Default";

var skyH = 210, skyS = 55, skyB = 90;
var sunH = 37, sunS = 57, sunB = 99;

var lH1 = 198, lS1 = 4, lB1 = 91;
var lH2 = 198, lS2 = 4, lB2= 91;
var lHV = 198, lSV = 4, lBV= 91;

function setup() {
  createCanvas(480, 680);
  colorMode(HSB, 360, 100, 100, 100);

  textFont(font);
  textAlign(CENTER, CENTER);

  angleMode(DEGREES);

  randomAngle();
}

function draw() {
  randomSeed(rS);
  var mY = constrain(mouseY, 0, height);
  var letterS;

  if(sunCycle === false) {
    sunY = mY;
  } else {
    sunY += 15;
  }

  if(pauseSun === true) {
    sunY -= 15;
  }

  if(sunY > height/2) {
    sunY = height/2;
  }

  if(sunY < height/2) {
    var sunR =  sunY/5;
    background(skyH, skyS, skyB + (sunY/20));
    letterS = int(map(sunY, 0, height, 20, 80));
  } else {
    var sunR =  sunY/5;
    background(skyH, skyS, skyB + ((height)/20) - (sunY/20));
    letterS = int(map(sunY, 0, height, 80, 20));
  }

  fill(sunH, sunS, sunB, 100);
  noStroke();
	//ellipse(width/2, sunY, sunR , sunR);

  for(var angle = 0; angle <= 360; angle += (360/word.length)) {
    var vX = width / 2 + cos(angle) * (sunR*2 - (sunR/8));
    var vY = sunY + sin(angle) * (sunR*2 - (sunR/8));

    var letter = map(angle, 0, 360, 0, word.length);

    var letterPosChance = random();
    if(letterPosChance < 0.25) {
      var dX = int(random(0, -200));
      var dY = int(random(0, 200));
    } else if(letterPosChance < 0.50) {
      var dX = int(random(0, 200));
      var dY = int(random(0, -200));
    } else if(letterPosChance < 0.75) {
      var dX = int(random(0, 200));
      var dY = int(random(0, 200));
    } else {
      var dX = int(random(0, -200));
      var dY = int(random(0, -200));
    }

    var mapDX;
    var mapDY;
    var mapRA;

    if(sunY < height/2) {
      mapDX = int(map(sunY, 0, height/2, dX, 0));
      mapDY = int(map(sunY, 0, height/2, dY, 0));
      mapRA = int(map(sunY, 0, height/2, rAngle, 0));
    } else {
      mapDX = int(map(sunY, height/2, height, 0, -dX));
      mapDY = int(map(sunY, height/2, height, 0, -dY));
      mapRA = int(map(sunY, height/2, height, 0, -rAngle));
    }

    strokeWeight(5);
    stroke(skyH, skyS, skyB);
    textSize(letterS);
    letterColour();
    fill(angle, lSV, lBV);
    if(letter < word.length) {
      push();
      translate(vX + mapDX, vY + mapDY);
      rotate(90  + angle + mapRA);
      text(word[letter], 0, 0);
      pop();
      var rAL = int(random(150, 300));
      for(var i = 0; i < rAL; i++){
        textSize(15);
        noStroke();
        fill(angle, lSV, lBV, 10);
        var xPos = int(random(0,width));
        var yPos = int(random(0, height));
        push();
        rotate(random(0,360));
        text(word[letter], xPos, yPos);
        pop();
      }
    }
    strokeWeight(5);
    stroke(skyH, skyS, skyB);
    var bigLetterColour;
    if(angle < 220) {
      fill(140 + angle, lSV, lBV, 100);
    } else {
      fill(angle - 220, lSV, lBV, 100);
    }
    if(letter < 10){
      textSize(55);
      text(sWord[letter], (width/6) + (letter * 35), (height*3)/4);
    }
    if(letter > 10 && letter < word.length-1) {
      textSize(55);
      text(sWord[letter], (width/4) + (letter * 38) - (400), (height*3.3)/4);
    }
  }
}

function mouseReleased() {
  rS = int(random(10000));
  randomAngle();
}

function letterColour() {
  lHV = int(random(lH1, lH2));
  lSV = int(random(lS1, lS2));
  lBV = int(random(lB1, lB2));
}

function randomAngle() {
  rAngle = int(random(0,360));
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp() + "_ColourState_" + colourState + "_SunY_" + sunY + "_RandomSeed_" + rS, 'png');
  if (key == 'm' || key == 'M') {
    sunCycle = true;
  }
  if (key == 'n' || key == 'N') {
    sunCycle = false;
  }
  if (key == 'r' || key == 'R') {
    sunY = 0;
  }
  if (key == 'p' || key == 'P') {
    pauseSun = true;
  }
  if (key == 'u' || key == 'U') {
    pauseSun = false;
  }
  if (key == '1') {
    skyH = 210, skyS = 55, skyB = 90;
    sunH = 37, sunS = 57, sunB = 99;
    lH1 = 194, lS1 = 4, lB1 = 91;
    lH2 = 194, lS2 = 4, lB2 = 91;
    rS = int(random(10000));
    colourState = "Default";
  }
  //A dark theme
  if (key == '2') {
    sunH = 195, sunS = 100, sunB = 60;
    skyH = 195, skyS = 100, skyB = 20;
    lH1 = int(random(150, 250)), lS1 = 100, lB1 = 100;
    lH2 = int(random(150, 250)), lS2 = 100, lB2 = 100;
    rS = int(random(10000));
    colourState = "DarkTheme";
  }
  //A light theme
  if (key == '3') {
    sunH = 195, sunS = 100, sunB = 100;
    skyH = 195, skyS = 30, skyB = 100;
    lH1 = int(random(150, 250)), lS1 = 100, lB1 = 80;
    lH2 = int(random(150, 250)), lS2 = 100, lB2 = 80;
    rS = int(random(10000));
    colourState = "LightTheme";
  }
}
