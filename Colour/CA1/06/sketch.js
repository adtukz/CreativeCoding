'use strict';

//
var font = 'Open Sans';
var word = 'DESIGN GENERATIVE ';

var rS = 0;

var sunY = 0;
var sunCycle = false;

var colourState = "Default";

var skyH = 210, skyS = 55, skyB = 90;
var sunH = 37, sunS = 57, sunB = 99;

function setup() {
  createCanvas(480, 680);
  colorMode(HSB, 360, 100, 100, 100);

  //
  textFont(font);
  textAlign(CENTER, CENTER);

  //
  angleMode(DEGREES);
}

function draw() {
  randomSeed(rS);
  var mY = constrain(mouseY, 0, height);
  //
  var letterS;

  if(sunCycle === false) {
    sunY = mY;
  } else {
    sunY += 5;
  }

  if(sunY > height) {
    sunY = height;
  }

  if(sunY < height/2) {
    var sunR = height/9 + sunY/3;
    background(skyH, skyS, skyB + (sunY/20));
    //
    letterS = int(map(sunY, 0, height, 10, 50));
  } else {
    var sunR = height/9 + height/3 - sunY/3;
    background(skyH, skyS, skyB + ((height)/20) - (sunY/20));
    //
    letterS = int(map(sunY, 0, height, 50, 10));
  }

  fill(sunH, sunS, sunB);
  noStroke();
	ellipse(width/2, sunY, sunR , sunR);

  for(var angle = 0; angle <= 360; angle += (360/word.length)) {
    var vX = width / 2 + cos(angle) * (sunR + (sunR/4))/2;
    var vY = sunY + sin(angle) * (sunR + (sunR/4)) /2;
    var letter = map(angle, 0, 360, 0, word.length);
    var letterA = map(letter, 0, word.length, 0, 360);

    if(letter < word.length-1) {
      push();
      translate(vX, vY);
      rotate(90  + letterA);
      line(0, 0, sunR, sunR);
      textSize(letterS);
      text(word[letter], 0, 0);
      pop();
    }
  }
}

function mouseReleased() {
  rS = int(random(10000));
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp() + "_ColourState_" + colourState + "_SunY_" + sunY + "_RandomSeed_" + rS, 'png');
  if (key == 'c' || key == 'C') {
      var colors = [];
      colors.push(color(skyH, skyS, skyB));
      writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  }
  if (key == 'm' || key == 'M') {
    sunCycle = true;
  }
  if (key == 'n' || key == 'N') {
    sunCycle = false;
  }
  if (key == 'r' || key == 'R') {
    sunY = 0;
  }
  if (key == '1') {
    skyH = 210, skyS = 55, skyB = 90;
    sunH = 37, sunS = 57, sunB = 99;
    cloudH = 198, cloudS = 4, cloudB = 91;
    rS = int(random(10000));
    colourState = "Default";
  }
}
